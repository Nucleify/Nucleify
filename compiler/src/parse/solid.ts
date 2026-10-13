import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { parseSync } from 'oxc-parser'
import type {
  IrAttr,
  IrDerived,
  IrDocument,
  IrExpr,
  IrHandler,
  IrNode,
  IrProp,
  IrPropType,
  IrState,
  IrStmt,
} from '../ir/types'
import { parseIrDocument } from '../ir/schema'
import { ParseError, fail, parseExpr, parseJsxNode, parseStmt } from './tsx'
import { emitBaseName, inferComponentName } from '../sync/paths'
import { reactSetterName } from '../emit/rewrite-state'

function unwrap(node: any): any {
  while (node?.type === 'ParenthesizedExpression') node = node.expression
  return node
}

function propKeyName(key: any): string | null {
  if (!key) return null
  if (key.type === 'Identifier') return key.name
  if (key.type === 'Literal' && typeof key.value === 'string') return key.value
  return null
}

function stripHeaders(source: string): string {
  return source.replace(/^\uFEFF/, '').replace(/^(?:\/\/.*\n)+/, '')
}

function parseModule(filePath: string, source: string): any {
  const result = parseSync(filePath, source, { lang: 'tsx', sourceType: 'module' })
  if (result.errors?.length) {
    const err = result.errors[0]
    throw new ParseError(
      err.message || 'parse error',
      filePath,
      err.label?.start?.line,
      err.label?.start?.column != null ? err.label.start.column + 1 : undefined,
    )
  }
  return result.program
}

function parsePropsType(filePath: string, source: string, typeNode: any): IrProp[] {
  if (typeNode?.type !== 'TSTypeLiteral') {
    fail(filePath, source, typeNode, 'Props must be an inline type literal in v0.1')
  }
  const props: IrProp[] = []
  for (const member of typeNode.members ?? []) {
    if (member.type !== 'TSPropertySignature') continue
    const name = propKeyName(member.key)
    if (!name || name === 'children') continue
    const optional = Boolean(member.optional)
    let type: IrPropType = 'unknown'
    const ann = member.typeAnnotation?.typeAnnotation
    if (ann?.type === 'TSStringKeyword') type = 'string'
    else if (ann?.type === 'TSNumberKeyword') type = 'number'
    else if (ann?.type === 'TSBooleanKeyword') type = 'boolean'
    const irProp: IrProp = { name, type }
    if (optional) irProp.optional = true
    props.push(irProp)
  }
  return props
}

function applyDefaultsFromParams(props: IrProp[], params: any[]): IrProp[] {
  const first = params?.[0]
  if (first?.type !== 'ObjectPattern') return props
  const defaults = new Map<string, unknown>()
  for (const prop of first.properties ?? []) {
    if (prop.type !== 'Property' || prop.value?.type !== 'AssignmentPattern') continue
    const name = propKeyName(prop.key)
    if (!name) continue
    const right = unwrap(prop.value.right)
    if (right?.type === 'Literal') defaults.set(name, right.value)
  }
  return props.map((p) =>
    defaults.has(p.name) ? { ...p, default: defaults.get(p.name), optional: true } : p,
  )
}

/**
 * Solid emit → portable IR: `count()` / `double()` → `.value`; `setCount(x)` → `count.set(x)`.
 */
function rewriteExprToPortable(
  expr: IrExpr,
  props: Set<string>,
  states: Set<string>,
  reactives: Set<string>,
): IrExpr {
  if (expr.kind === 'ident') {
    if (props.has(expr.name)) {
      return { kind: 'member', object: { kind: 'ident', name: 'props' }, property: expr.name }
    }
    return expr
  }
  if (expr.kind === 'call') {
    const callee = expr.callee
    if (callee.kind === 'ident' && reactives.has(callee.name) && expr.args.length === 0) {
      return { kind: 'member', object: { kind: 'ident', name: callee.name }, property: 'value' }
    }
    if (
      callee.kind === 'ident' &&
      callee.name.startsWith('set') &&
      callee.name.length > 3
    ) {
      const stateName = callee.name.slice(3, 4).toLowerCase() + callee.name.slice(4)
      if (states.has(stateName) && reactSetterName(stateName) === callee.name) {
        return {
          kind: 'call',
          callee: {
            kind: 'member',
            object: { kind: 'ident', name: stateName },
            property: 'set',
          },
          args: expr.args.map((a) => rewriteExprToPortable(a, props, states, reactives)),
        }
      }
    }
    return {
      ...expr,
      callee: rewriteExprToPortable(expr.callee, props, states, reactives),
      args: expr.args.map((a) => rewriteExprToPortable(a, props, states, reactives)),
    }
  }
  switch (expr.kind) {
    case 'literal':
      return expr
    case 'member':
      return { ...expr, object: rewriteExprToPortable(expr.object, props, states, reactives) }
    case 'binary':
      return {
        ...expr,
        left: rewriteExprToPortable(expr.left, props, states, reactives),
        right: rewriteExprToPortable(expr.right, props, states, reactives),
      }
    case 'object':
      return {
        ...expr,
        properties: expr.properties.map((p) => ({
          key: p.key,
          value: rewriteExprToPortable(p.value, props, states, reactives),
        })),
      }
    case 'index':
      return {
        ...expr,
        object: rewriteExprToPortable(expr.object, props, states, reactives),
        index: rewriteExprToPortable(expr.index, props, states, reactives),
      }
    case 'conditional':
      return {
        ...expr,
        test: rewriteExprToPortable(expr.test, props, states, reactives),
        consequent: rewriteExprToPortable(expr.consequent, props, states, reactives),
        alternate: rewriteExprToPortable(expr.alternate, props, states, reactives),
      }
    case 'array':
      return {
        ...expr,
        elements: expr.elements.map((e) => rewriteExprToPortable(e, props, states, reactives)),
      }
    case 'raw':
      return expr
  }
}

function rewriteStmtToPortable(
  stmt: IrStmt,
  props: Set<string>,
  states: Set<string>,
  reactives: Set<string>,
): IrStmt {
  if (stmt.kind === 'expr') {
    return { kind: 'expr', value: rewriteExprToPortable(stmt.value, props, states, reactives) }
  }
  if (stmt.kind === 'return') {
    return {
      kind: 'return',
      value: stmt.value
        ? rewriteExprToPortable(stmt.value, props, states, reactives)
        : undefined,
    }
  }
  if (stmt.kind === 'const') {
    return {
      kind: 'const',
      name: stmt.name,
      value: rewriteExprToPortable(stmt.value, props, states, reactives),
    }
  }
  return {
    kind: 'assign',
    target: rewriteExprToPortable(stmt.target, props, states, reactives),
    value: rewriteExprToPortable(stmt.value, props, states, reactives),
  }
}

function rewriteNodeToPortable(
  node: IrNode,
  props: Set<string>,
  states: Set<string>,
  reactives: Set<string>,
): IrNode {
  switch (node.kind) {
    case 'text':
      return node
    case 'expr':
      return {
        kind: 'expr',
        value: rewriteExprToPortable(node.value, props, states, reactives),
      }
    case 'slot':
      return {
        kind: 'slot',
        children: node.children?.map((c) => rewriteNodeToPortable(c, props, states, reactives)),
      }
    case 'if':
      return {
        kind: 'if',
        test: rewriteExprToPortable(node.test, props, states, reactives),
        then: node.then.map((c) => rewriteNodeToPortable(c, props, states, reactives)),
        else: node.else?.map((c) => rewriteNodeToPortable(c, props, states, reactives)),
      }
    case 'for':
      return {
        kind: 'for',
        source: rewriteExprToPortable(node.source, props, states, reactives),
        item: node.item,
        index: node.index,
        body: node.body.map((c) => rewriteNodeToPortable(c, props, states, reactives)),
      }
    case 'element':
    case 'component': {
      const rewriteAttr = (attr: IrAttr): IrAttr => {
        if (attr.kind === 'bind') {
          return {
            ...attr,
            value: rewriteExprToPortable(attr.value, props, states, reactives),
          }
        }
        return attr
      }
      if (node.kind === 'element') {
        return {
          ...node,
          props: node.props.map(rewriteAttr),
          children: node.children.map((c) => rewriteNodeToPortable(c, props, states, reactives)),
        }
      }
      return {
        ...node,
        props: node.props.map(rewriteAttr),
        children: node.children.map((c) => rewriteNodeToPortable(c, props, states, reactives)),
      }
    }
  }
}

function parseHandlerFn(filePath: string, source: string, fn: any, name: string): IrHandler {
  return {
    name,
    params: (fn.params ?? []).map((p: any) => {
      if (p.type !== 'Identifier') fail(filePath, source, p, 'handler params must be identifiers')
      return p.name as string
    }),
    body:
      fn.body?.type === 'BlockStatement'
        ? fn.body.body.map((s: any) => parseStmt(filePath, source, s))
        : fn.body
          ? [{ kind: 'expr', value: parseExpr(filePath, source, fn.body) }]
          : [],
  }
}

function loadSiblingCss(filePath: string, cssImport?: string): string | undefined {
  if (!cssImport) return undefined
  const candidates = [
    join(dirname(filePath), cssImport),
    join(dirname(filePath), '../css', cssImport),
  ]
  for (const cssPath of candidates) {
    try {
      const raw = readFileSync(cssPath, 'utf8')
      return raw.replace(/^\/\*[\s\S]*?\*\/\s*/gm, '').replace(/\s+/g, ' ').trim()
    } catch {
      // next
    }
  }
  return undefined
}

/**
 * Parse generated Solid `.tsx` emit → IR (subset matching portable fixtures).
 */
export function parseSolidToIr(
  source: string,
  filePath: string,
  opts?: { name?: string },
): IrDocument {
  const body = stripHeaders(source)
  const program = parseModule(filePath, body)

  let props: IrProp[] = []
  const state: IrState[] = []
  const derived: IrDerived[] = []
  const handlers: IrHandler[] = []
  let cssImport: string | undefined
  let componentFn: any | null = null
  let componentName = opts?.name

  for (const stmt of program.body ?? []) {
    if (stmt.type === 'ImportDeclaration') {
      const value = stmt.source?.value
      if (typeof value === 'string' && value.endsWith('.css')) {
        cssImport = value.replace(/^\.\//, '')
      }
      continue
    }
    if (stmt.type === 'TSTypeAliasDeclaration' && stmt.id?.name === 'Props') {
      props = parsePropsType(filePath, body, stmt.typeAnnotation)
      continue
    }
    if (stmt.type === 'FunctionDeclaration' && stmt.id?.type === 'Identifier') {
      handlers.push(parseHandlerFn(filePath, body, stmt, stmt.id.name))
      continue
    }
    if (stmt.type === 'ExportDefaultDeclaration') {
      const decl = stmt.declaration
      if (decl?.type === 'FunctionDeclaration') {
        componentFn = decl
        componentName = componentName ?? decl.id?.name
      }
    }
  }

  if (!componentFn) {
    fail(filePath, body, program, 'expected `export default function Component(...)`')
  }

  const componentHandlerIdx = handlers.findIndex((h) => h.name === componentFn.id?.name)
  if (componentHandlerIdx >= 0) handlers.splice(componentHandlerIdx, 1)

  props = applyDefaultsFromParams(props, componentFn.params)

  const block = componentFn.body
  if (block?.type !== 'BlockStatement') {
    fail(filePath, body, componentFn, 'component body must be a block')
  }

  let templateNode: any | null = null
  for (const stmt of block.body ?? []) {
    if (stmt.type === 'VariableDeclaration') {
      for (const decl of stmt.declarations) {
        // createSignal: const [count, setCount] = createSignal(0)
        if (
          decl.id?.type === 'ArrayPattern' &&
          decl.id.elements?.[0]?.type === 'Identifier' &&
          decl.init?.type === 'CallExpression' &&
          decl.init.callee?.type === 'Identifier' &&
          decl.init.callee.name === 'createSignal'
        ) {
          const name = decl.id.elements[0].name as string
          const initial = decl.init.arguments?.[0]
          if (!initial) fail(filePath, body, decl.init, 'createSignal requires an initial value')
          state.push({ name, initial: parseExpr(filePath, body, initial) })
          continue
        }
        // createMemo: const double = createMemo(() => ...)
        if (
          decl.id?.type === 'Identifier' &&
          decl.init?.type === 'CallExpression' &&
          decl.init.callee?.type === 'Identifier' &&
          decl.init.callee.name === 'createMemo'
        ) {
          const name = decl.id.name as string
          const fn = decl.init.arguments?.[0]
          if (fn?.type !== 'ArrowFunctionExpression' && fn?.type !== 'FunctionExpression') {
            fail(filePath, body, fn, 'createMemo expects a function')
          }
          const fromBody = unwrap(
            fn.body?.type === 'BlockStatement' ? fn.body.body[0]?.argument : fn.body,
          )
          if (!fromBody) fail(filePath, body, fn, 'createMemo body required')
          derived.push({ name, from: parseExpr(filePath, body, fromBody) })
          continue
        }
      }
      continue
    }
    if (stmt.type === 'FunctionDeclaration' && stmt.id?.type === 'Identifier') {
      handlers.push(parseHandlerFn(filePath, body, stmt, stmt.id.name))
      continue
    }
    if (stmt.type === 'ReturnStatement') {
      templateNode = unwrap(stmt.argument)
    }
  }

  if (!templateNode) {
    fail(filePath, body, componentFn, 'component must return JSX')
  }

  const propNames = new Set(props.map((p) => p.name))
  const stateNames = new Set(state.map((s) => s.name))
  const reactives = new Set([...stateNames, ...derived.map((d) => d.name)])

  let template = parseJsxNode(filePath, body, templateNode)
  template = rewriteNodeToPortable(template, propNames, stateNames, reactives)

  const rewrittenHandlers = handlers.map((h) => ({
    ...h,
    body: h.body.map((s) => rewriteStmtToPortable(s, propNames, stateNames, reactives)),
  }))

  const rewrittenDerived = derived.map((d) => ({
    ...d,
    from: rewriteExprToPortable(d.from, propNames, stateNames, reactives),
  }))

  const css = loadSiblingCss(filePath, cssImport)
  const base = emitBaseName(filePath.replace(/\.tsx$/, '.nuc.tsx'))
  const name = componentName ?? inferComponentName(base)

  const doc: IrDocument = {
    irVersion: '0.1.0',
    name,
    portable: true,
    props,
    state,
    derived: rewrittenDerived,
    handlers: rewrittenHandlers,
    template,
    ...(css ? { styles: { css } } : {}),
    meta: { sourcePath: filePath },
  }

  return parseIrDocument(doc)
}

/** @deprecated alias */
export const parseSolid = parseSolidToIr
