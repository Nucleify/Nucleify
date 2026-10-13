import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { parse as parseSvelteSource } from 'svelte/compiler'
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
import { svelteEventToIr } from '../adapters/events'
import { ParseError, fail, parseExpr, parseStmt } from './tsx'
import { emitBaseName, inferComponentName } from '../sync/paths'

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

function extractScript(source: string): string {
  const m = source.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i)
  return m?.[1]?.trim() ?? ''
}

function parseModule(filePath: string, source: string): any {
  const result = parseSync(filePath, source, { lang: 'ts', sourceType: 'module' })
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

function parseExprSource(filePath: string, expr: string): IrExpr {
  const source = `const __nuc = (${expr})`
  const result = parseSync(filePath, source, { lang: 'ts', sourceType: 'module' })
  if (result.errors?.length) {
    const err = result.errors[0]
    throw new ParseError(err.message || 'parse error', filePath, err.label?.start?.line)
  }
  const decl = result.program.body[0]
  if (decl?.type !== 'VariableDeclaration' || !decl.declarations[0]?.init) {
    throw new ParseError(`invalid expression: ${expr}`, filePath)
  }
  return parseExpr(filePath, source, decl.declarations[0].init)
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

function applyDefaultsFromPropsDestructure(props: IrProp[], decl: any): IrProp[] {
  if (decl?.id?.type !== 'ObjectPattern') return props
  const defaults = new Map<string, unknown>()
  for (const prop of decl.id.properties ?? []) {
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

function isRunesCall(init: any, name: string): boolean {
  return (
    init?.type === 'CallExpression' &&
    init.callee?.type === 'Identifier' &&
    init.callee.name === name
  )
}

function parseHandlerFn(filePath: string, source: string, fn: any, name: string): IrHandler {
  return {
    name,
    params: (fn.params ?? [])
      .map((p: any) => (p.type === 'Identifier' ? p.name : null))
      .filter(Boolean) as string[],
    body:
      fn.body?.type === 'BlockStatement'
        ? fn.body.body.map((s: any) => parseStmt(filePath, source, s))
        : fn.body
          ? [{ kind: 'expr', value: parseExpr(filePath, source, fn.body) }]
          : [],
  }
}

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
    if (reactives.has(expr.name)) {
      return { kind: 'member', object: expr, property: 'value' }
    }
    return expr
  }
  if (expr.kind === 'call') {
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
  if (stmt.kind === 'assign') {
    const target = stmt.target
    // Svelte: `count = count + 1` → IR `count.set(...)`
    if (target.kind === 'ident' && states.has(target.name)) {
      return {
        kind: 'expr',
        value: {
          kind: 'call',
          callee: {
            kind: 'member',
            object: { kind: 'ident', name: target.name },
            property: 'set',
          },
          args: [rewriteExprToPortable(stmt.value, props, states, reactives)],
        },
      }
    }
    return {
      kind: 'assign',
      target: rewriteExprToPortable(stmt.target, props, states, reactives),
      value: rewriteExprToPortable(stmt.value, props, states, reactives),
    }
  }
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
  return stmt
}

function rewriteAttrToPortable(
  attr: IrAttr,
  props: Set<string>,
  states: Set<string>,
  reactives: Set<string>,
): IrAttr {
  if (attr.kind === 'bind') {
    return {
      ...attr,
      value: rewriteExprToPortable(attr.value, props, states, reactives),
    }
  }
  return attr
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
    case 'element':
    case 'component':
      return {
        ...node,
        props: node.props.map((attr) => rewriteAttrToPortable(attr, props, states, reactives)),
        children: node.children.map((c) => rewriteNodeToPortable(c, props, states, reactives)),
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
  }
}

function sliceExpr(source: string, node: { start: number; end: number }): string {
  return source.slice(node.start, node.end)
}

function parseTemplateExpr(
  filePath: string,
  source: string,
  node: any,
): IrExpr {
  if (!node) throw new ParseError('missing expression', filePath)
  if (node.type === 'Identifier') {
    return { kind: 'ident', name: node.name }
  }
  return parseExprSource(filePath, sliceExpr(source, node))
}

function svelteEventName(attrName: string): string | null {
  if (/^on[a-z]/.test(attrName)) return svelteEventToIr(attrName)
  return null
}

/** Svelte modern AST: expression attrs are a single ExpressionTag; legacy uses an array. */
function attributeChunks(value: unknown): any[] {
  if (value == null || value === true) return []
  return Array.isArray(value) ? value : [value]
}

function parseAttribute(
  filePath: string,
  source: string,
  attr: any,
): IrAttr | null {
  const name = attr.name as string
  if (!name) return null
  const chunks = attributeChunks(attr.value)
  if (name.startsWith('on') && chunks[0]?.type === 'ExpressionTag') {
    const expr = chunks[0].expression
    const irEvent = svelteEventName(name) ?? name.slice(2)
    // Portable import only supports named handlers (`onclick={onInc}`).
    if (expr?.type === 'Identifier') {
      return { kind: 'event', name: irEvent, handler: expr.name }
    }
    return null
  }
  if (attr.value == null || attr.value === true) {
    // shorthand {disabled} → bind disabled={disabled}
    return {
      kind: 'bind',
      name,
      value: { kind: 'ident', name },
    }
  }
  if (chunks.length === 1 && chunks[0]?.type === 'Text') {
    return { kind: 'static', name, value: chunks[0].data }
  }
  if (chunks.length === 1 && chunks[0]?.type === 'ExpressionTag') {
    return {
      kind: 'bind',
      name,
      value: parseTemplateExpr(filePath, source, chunks[0].expression),
    }
  }
  // Mixed / template string attrs — join as raw expression when single ExpressionTag-like
  const parts = chunks.map((c: any) => {
    if (c.type === 'Text') return JSON.stringify(c.data)
    if (c.type === 'ExpressionTag') return `(${sliceExpr(source, c.expression)})`
    return '""'
  })
  return {
    kind: 'bind',
    name,
    value: { kind: 'raw', code: parts.join(' + ') },
  }
}

function parseFragmentChildren(
  filePath: string,
  source: string,
  fragment: any,
): IrNode[] {
  const nodes: IrNode[] = []
  for (const child of fragment?.nodes ?? []) {
    const n = parseTemplateNode(filePath, source, child)
    if (!n) continue
    if (n.kind === 'text' && !n.value.trim()) continue
    nodes.push(n)
  }
  return nodes
}

function wrapChildren(children: IrNode[]): IrNode {
  if (children.length === 0) {
    return { kind: 'element', tag: 'fragment', props: [], children: [] }
  }
  if (children.length === 1) return children[0]!
  return { kind: 'element', tag: 'fragment', props: [], children }
}

function parseTemplateNode(filePath: string, source: string, node: any): IrNode | null {
  if (!node) return null
  switch (node.type) {
    case 'Text': {
      const data = node.data as string
      if (!data || !data.trim()) return null
      return { kind: 'text', value: data }
    }
    case 'Comment':
      return null
    case 'ExpressionTag':
      return {
        kind: 'expr',
        value: parseTemplateExpr(filePath, source, node.expression),
      }
    case 'RegularElement':
    case 'Component': {
      const tag = node.name as string
      const props: IrAttr[] = []
      for (const attr of node.attributes ?? []) {
        if (attr.type !== 'Attribute') continue
        const ir = parseAttribute(filePath, source, attr)
        if (ir) props.push(ir)
      }
      const children = parseFragmentChildren(filePath, source, node.fragment)
      if (node.type === 'Component' || (tag.includes('-') && !/^[a-z]+$/.test(tag))) {
        // Custom elements / Svelte components — IR uses element for nui-* CEs.
        return { kind: 'element', tag, props, children }
      }
      return { kind: 'element', tag, props, children }
    }
    case 'IfBlock': {
      const test = parseTemplateExpr(filePath, source, node.test)
      const thenNodes = parseFragmentChildren(filePath, source, node.consequent).filter(
        (n) => !(n.kind === 'text' && !n.value.trim()),
      )
      const elseNodes = node.alternate
        ? parseFragmentChildren(filePath, source, node.alternate).filter(
            (n) => !(n.kind === 'text' && !n.value.trim()),
          )
        : undefined
      return {
        kind: 'if',
        test,
        then: thenNodes,
        ...(elseNodes?.length ? { else: elseNodes } : {}),
      }
    }
    case 'EachBlock': {
      const sourceExpr = parseTemplateExpr(filePath, source, node.expression)
      let item = 'item'
      let index: string | undefined
      const ctx = node.context
      if (ctx?.type === 'Identifier') item = ctx.name
      // Modern AST: `index` is a bare string; legacy may use Identifier.
      if (typeof node.index === 'string' && node.index) index = node.index
      else if (node.index?.type === 'Identifier') index = node.index.name
      if (ctx?.type === 'ArrayPattern') {
        const els = ctx.elements ?? []
        if (els[0]?.type === 'Identifier') item = els[0].name
        if (els[1]?.type === 'Identifier') index = els[1].name
      }
      const key = node.key ? parseTemplateExpr(filePath, source, node.key) : undefined
      const body = parseFragmentChildren(filePath, source, node.body ?? node.fragment).filter(
        (n) => !(n.kind === 'text' && !n.value.trim()),
      )
      // Portable IR stores :key as a bind attr on the first element child when present.
      if (key && body[0]?.kind === 'element') {
        body[0] = {
          ...body[0],
          props: [{ kind: 'bind', name: 'key', value: key }, ...body[0].props],
        }
      }
      return {
        kind: 'for',
        source: sourceExpr,
        item,
        ...(index ? { index } : {}),
        body,
      }
    }
    case 'SnippetBlock':
    case 'RenderTag':
      return { kind: 'slot' }
    default:
      return null
  }
}

function parseTemplateRoot(filePath: string, source: string, fragment: any): IrNode {
  const children = parseFragmentChildren(filePath, source, fragment).filter((n) => {
    // Drop leading/trailing pure whitespace text nodes at root
    return !(n.kind === 'text' && !n.value.trim())
  })
  return wrapChildren(children)
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
 * Parse generated Svelte 5 `.svelte` emit → IR (portable fixture subset).
 */
export function parseSvelteToIr(
  source: string,
  filePath: string,
  opts?: { name?: string },
): IrDocument {
  let ast: ReturnType<typeof parseSvelteSource>
  try {
    ast = parseSvelteSource(source, { filename: filePath, modern: true })
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : typeof err === 'object' && err && 'message' in err && typeof (err as { message: unknown }).message === 'string'
          ? (err as { message: string }).message
          : 'svelte parse failed'
    throw new ParseError(message, filePath)
  }

  const script = extractScript(source)
  let props: IrProp[] = []
  const state: IrState[] = []
  const derived: IrDerived[] = []
  const handlers: IrHandler[] = []
  let cssImport: string | undefined
  let propsDecl: any | null = null

  if (script) {
    const program = parseModule(filePath, script)
    for (const stmt of program.body ?? []) {
      if (stmt.type === 'ImportDeclaration') {
        const value = stmt.source?.value
        if (typeof value === 'string' && value.endsWith('.css')) {
          cssImport = value.replace(/^\.\//, '')
        }
        continue
      }
      if (stmt.type === 'TSTypeAliasDeclaration' && stmt.id?.name === 'Props') {
        props = parsePropsType(filePath, script, stmt.typeAnnotation)
        continue
      }
      if (stmt.type === 'VariableDeclaration') {
        for (const decl of stmt.declarations ?? []) {
          if (isRunesCall(decl.init, '$props')) {
            propsDecl = decl
            continue
          }
          if (decl.id?.type === 'Identifier' && isRunesCall(decl.init, '$state')) {
            const initial = decl.init.arguments?.[0]
            if (!initial) fail(filePath, script, decl.init, '$state requires an initial value')
            state.push({ name: decl.id.name, initial: parseExpr(filePath, script, initial) })
            continue
          }
          if (decl.id?.type === 'Identifier' && isRunesCall(decl.init, '$derived')) {
            const arg = decl.init.arguments?.[0]
            if (!arg) fail(filePath, script, decl.init, '$derived requires an expression')
            derived.push({
              name: decl.id.name,
              from: parseExpr(filePath, script, arg),
            })
            continue
          }
        }
        continue
      }
      if (stmt.type === 'FunctionDeclaration' && stmt.id?.type === 'Identifier') {
        handlers.push(parseHandlerFn(filePath, script, stmt, stmt.id.name))
      }
    }
  }

  if (propsDecl) props = applyDefaultsFromPropsDestructure(props, propsDecl)

  const propNames = new Set(props.map((p) => p.name))
  const stateNames = new Set(state.map((s) => s.name))
  const reactives = new Set([...stateNames, ...derived.map((d) => d.name)])

  let template = parseTemplateRoot(filePath, source, ast.fragment)
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
  const base = emitBaseName(filePath.replace(/\.svelte$/, '.nuc.tsx'))
  const name = opts?.name ?? inferComponentName(base)

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
export const parseSvelte = parseSvelteToIr
