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

export class ParseError extends Error {
  constructor(
    message: string,
    readonly filePath: string,
    readonly line?: number,
    readonly column?: number,
  ) {
    super(
      line != null && column != null
        ? `${filePath}:${line}:${column}: ${message}`
        : `${filePath}: ${message}`,
    )
    this.name = 'ParseError'
  }
}

type LocNode = { start?: number; end?: number; loc?: { start?: { line: number; column: number } } }

function locOf(source: string, node: LocNode | null | undefined): { line?: number; column?: number } {
  if (node?.loc?.start) {
    return { line: node.loc.start.line, column: node.loc.start.column + 1 }
  }
  if (typeof node?.start === 'number') {
    const before = source.slice(0, node.start)
    const lines = before.split('\n')
    return { line: lines.length, column: (lines.at(-1)?.length ?? 0) + 1 }
  }
  return {}
}

function slice(source: string, start: number, end: number): string {
  return source.slice(start, end)
}

export function fail(filePath: string, source: string, node: LocNode | null | undefined, message: string): never {
  const { line, column } = locOf(source, node)
  throw new ParseError(message, filePath, line, column)
}

function propKeyName(key: any): string | null {
  if (!key) return null
  if (key.type === 'Identifier') return key.name
  if (key.type === 'Literal' && typeof key.value === 'string') return key.value
  return null
}

function unwrap(expr: any): any {
  while (expr?.type === 'ParenthesizedExpression') expr = expr.expression
  return expr
}

function eventNameFromJsx(attrName: string): string | null {
  if (!attrName.startsWith('on') || attrName.length < 3) return null
  const rest = attrName.slice(2)
  return rest.charAt(0).toLowerCase() + rest.slice(1)
}

function normalizeClassAttr(name: string): string {
  return name === 'className' ? 'class' : name
}

function isMarkerCall(node: any, name: string): boolean {
  return node?.type === 'CallExpression' && node.callee?.type === 'Identifier' && node.callee.name === name
}

export function parseExpr(filePath: string, source: string, node: any): IrExpr {
  node = unwrap(node)
  if (!node) fail(filePath, source, node, 'expected expression')

  switch (node.type) {
    case 'Literal':
      if (node.regex) {
        return { kind: 'raw', code: slice(source, node.start, node.end) }
      }
      if (
        typeof node.value === 'string' ||
        typeof node.value === 'number' ||
        typeof node.value === 'boolean' ||
        node.value === null
      ) {
        return { kind: 'literal', value: node.value }
      }
      fail(filePath, source, node, `unsupported literal ${typeof node.value}`)
    case 'Identifier':
      return { kind: 'ident', name: node.name }
    case 'MemberExpression': {
      if (node.computed) {
        return {
          kind: 'index',
          object: parseExpr(filePath, source, node.object),
          index: parseExpr(filePath, source, node.property),
        }
      }
      const property = node.property?.name
      if (!property) fail(filePath, source, node, 'expected member property')
      return {
        kind: 'member',
        object: parseExpr(filePath, source, node.object),
        property,
      }
    }
    case 'ConditionalExpression':
      return {
        kind: 'conditional',
        test: parseExpr(filePath, source, node.test),
        consequent: parseExpr(filePath, source, node.consequent),
        alternate: parseExpr(filePath, source, node.alternate),
      }
    case 'TSAsExpression':
    case 'TSNonNullExpression':
    case 'TSSatisfiesExpression':
      return parseExpr(filePath, source, node.expression)
    case 'UnaryExpression':
      if (node.operator === '!' && node.prefix) {
        return parseExpr(filePath, source, node.argument)
      }
      fail(filePath, source, node, `unsupported unary operator ${node.operator}`)
    case 'TemplateLiteral': {
      if (node.expressions?.length) {
        return { kind: 'raw', code: slice(source, node.start, node.end) }
      }
      const cooked = node.quasis?.[0]?.value?.cooked ?? node.quasis?.[0]?.value?.raw
      return { kind: 'literal', value: cooked ?? '' }
    }
    case 'ArrayExpression':
      return {
        kind: 'array',
        elements: (node.elements ?? []).map((el: any) => parseExpr(filePath, source, el)),
      }
    case 'ChainExpression':
      return { kind: 'raw', code: slice(source, node.start, node.end) }
    case 'BinaryExpression':
    case 'LogicalExpression':
      return {
        kind: 'binary',
        op: node.operator,
        left: parseExpr(filePath, source, node.left),
        right: parseExpr(filePath, source, node.right),
      }
    case 'CallExpression':
      return {
        kind: 'call',
        callee: parseExpr(filePath, source, node.callee),
        args: (node.arguments ?? []).map((arg: any) => parseExpr(filePath, source, arg)),
      }
    case 'ObjectExpression': {
      const properties: { key: string; value: IrExpr }[] = []
      for (const prop of node.properties ?? []) {
        if (prop.type !== 'Property') {
          fail(filePath, source, prop, 'object spreads are not supported in v0.1')
        }
        if (prop.computed) {
          fail(filePath, source, prop, 'computed object keys are not supported in v0.1')
        }
        const key = propKeyName(prop.key)
        if (!key) fail(filePath, source, prop, 'expected object property key')
        properties.push({ key, value: parseExpr(filePath, source, prop.value) })
      }
      return { kind: 'object', properties }
    }
    default:
      fail(filePath, source, node, `unsupported expression type ${node.type}`)
  }
}

export function parseStmt(filePath: string, source: string, node: any): IrStmt {
  switch (node.type) {
    case 'ExpressionStatement': {
      const expr = unwrap(node.expression)
      if (expr?.type === 'AssignmentExpression') {
        return {
          kind: 'assign',
          target: parseExpr(filePath, source, expr.left),
          value: parseExpr(filePath, source, expr.right),
        }
      }
      return { kind: 'expr', value: parseExpr(filePath, source, node.expression) }
    }
    case 'ReturnStatement':
      return {
        kind: 'return',
        value: node.argument ? parseExpr(filePath, source, node.argument) : undefined,
      }
    case 'AssignmentExpression':
      return {
        kind: 'assign',
        target: parseExpr(filePath, source, node.left),
        value: parseExpr(filePath, source, node.right),
      }
    case 'VariableDeclaration': {
      if (node.kind !== 'const' || node.declarations.length !== 1) {
        fail(filePath, source, node, 'only single `const` declarations are supported in handler bodies')
      }
      const decl = node.declarations[0]
      if (decl.id?.type !== 'Identifier' || !decl.init) {
        fail(filePath, source, node, 'handler const must be a simple identifier assignment')
      }
      return {
        kind: 'const',
        name: decl.id.name as string,
        value: parseExpr(filePath, source, decl.init),
      }
    }
    default:
      fail(filePath, source, node, `unsupported statement type ${node.type}`)
  }
}

function parseFnBodyStmts(filePath: string, source: string, fn: any): IrStmt[] {
  const bodyNode = fn.body
  if (bodyNode?.type === 'BlockStatement') {
    return bodyNode.body.map((s: any) => parseStmt(filePath, source, s))
  }
  if (bodyNode) {
    return [{ kind: 'expr', value: parseExpr(filePath, source, bodyNode) }]
  }
  return []
}

function parseFnParams(filePath: string, source: string, fn: any): string[] {
  return (fn.params ?? []).map((p: any) => {
    if (p.type !== 'Identifier') fail(filePath, source, p, 'params must be identifiers')
    return p.name as string
  })
}

function parseDerivedFrom(filePath: string, source: string, arg: any): IrExpr {
  if (arg?.type !== 'ArrowFunctionExpression' && arg?.type !== 'FunctionExpression') {
    fail(filePath, source, arg, 'derived() expects a function')
  }
  if (arg.async) fail(filePath, source, arg, 'async derived() is not supported in v0.1')
  const body = unwrap(arg.body)
  if (body?.type === 'BlockStatement') {
    if (body.body.length !== 1 || body.body[0]?.type !== 'ReturnStatement' || !body.body[0].argument) {
      fail(filePath, source, body, 'derived() block must be a single return expression')
    }
    return parseExpr(filePath, source, body.body[0].argument)
  }
  return parseExpr(filePath, source, body)
}

function parsePropsObject(filePath: string, source: string, node: any): IrProp[] {
  if (node?.type !== 'ObjectExpression') fail(filePath, source, node, 'props must be an object')
  const props: IrProp[] = []
  for (const prop of node.properties) {
    if (prop.type !== 'Property') fail(filePath, source, prop, 'spread props are not supported')
    const name = propKeyName(prop.key)
    if (!name) fail(filePath, source, prop, 'expected prop name')
    if (prop.value?.type !== 'ObjectExpression') {
      fail(filePath, source, prop.value, 'prop definition must be an object')
    }
    let type: IrPropType | undefined
    let optional: boolean | undefined
    let defaultValue: unknown
    for (const field of prop.value.properties) {
      if (field.type !== 'Property') continue
      const fieldName = propKeyName(field.key)
      if (fieldName === 'type' && field.value?.type === 'Literal') {
        type = field.value.value
      } else if (fieldName === 'optional' && field.value?.type === 'Literal') {
        optional = Boolean(field.value.value)
      } else if (fieldName === 'default') {
        if (field.value?.type === 'Literal') defaultValue = field.value.value
        else fail(filePath, source, field.value, 'prop default must be a literal in v0.1')
      }
    }
    if (!type || !['string', 'number', 'boolean', 'unknown'].includes(type)) {
      fail(filePath, source, prop, `invalid prop type for ${name}`)
    }
    const irProp: IrProp = { name, type }
    if (optional !== undefined) irProp.optional = optional
    if (defaultValue !== undefined) irProp.default = defaultValue
    props.push(irProp)
  }
  return props
}

function parseHandlersObject(filePath: string, source: string, node: any): IrHandler[] {
  if (node?.type !== 'ObjectExpression') fail(filePath, source, node, 'handlers must be an object')
  const handlers: IrHandler[] = []
  for (const prop of node.properties) {
    if (prop.type !== 'Property') fail(filePath, source, prop, 'spread handlers are not supported')
    const name = propKeyName(prop.key)
    if (!name) fail(filePath, source, prop, 'expected handler name')
    const fn = prop.value
    if (fn?.type !== 'FunctionExpression' && fn?.type !== 'ArrowFunctionExpression') {
      fail(filePath, source, fn, `handler ${name} must be a function`)
    }
    handlers.push({
      name,
      params: parseFnParams(filePath, source, fn),
      body: parseFnBodyStmts(filePath, source, fn),
    })
  }
  return handlers
}

function parseJsxChildren(filePath: string, source: string, children: any[]): IrNode[] {
  const out: IrNode[] = []
  for (const child of children ?? []) {
    if (child.type === 'JSXText') {
      const text = child.value.replace(/\s+/g, ' ')
      if (text.trim() === '') continue
      out.push({ kind: 'text', value: text.trim() })
      continue
    }
    if (child.type === 'JSXExpressionContainer') {
      if (child.expression?.type === 'JSXEmptyExpression') continue
      out.push(parseJsxExpression(filePath, source, child.expression))
      continue
    }
    if (child.type === 'JSXElement' || child.type === 'JSXFragment') {
      out.push(parseJsxNode(filePath, source, child))
      continue
    }
  }
  return out
}

function nodesFromMaybeJsx(filePath: string, source: string, node: any): IrNode[] {
  node = unwrap(node)
  if (node.type === 'JSXElement' || node.type === 'JSXFragment') {
    return [parseJsxNode(filePath, source, node)]
  }
  if (node.type === 'JSXFragment') return [parseJsxNode(filePath, source, node)]
  return [{ kind: 'expr', value: parseExpr(filePath, source, node) }]
}

function parseJsxExpression(filePath: string, source: string, node: any): IrNode {
  node = unwrap(node)
  if (node.type === 'ConditionalExpression') {
    return {
      kind: 'if',
      test: parseExpr(filePath, source, node.test),
      then: nodesFromMaybeJsx(filePath, source, node.consequent),
      else: nodesFromMaybeJsx(filePath, source, node.alternate),
    }
  }
  if (
    node.type === 'CallExpression' &&
    node.callee?.type === 'MemberExpression' &&
    !node.callee.computed &&
    node.callee.property?.name === 'map'
  ) {
    const fn = node.arguments?.[0]
    if (fn?.type !== 'ArrowFunctionExpression' && fn?.type !== 'FunctionExpression') {
      fail(filePath, source, fn, '.map() callback required for for-nodes')
    }
    const item = fn.params?.[0]
    const index = fn.params?.[1]
    if (item?.type !== 'Identifier') fail(filePath, source, item, 'map item must be an identifier')
    const bodyExpr = unwrap(fn.body?.type === 'BlockStatement' ? null : fn.body)
    if (fn.body?.type === 'BlockStatement') {
      fail(filePath, source, fn.body, 'map callback must return JSX expression (no block) in v0.1')
    }
    return {
      kind: 'for',
      source: parseExpr(filePath, source, node.callee.object),
      item: item.name,
      index: index?.type === 'Identifier' ? index.name : undefined,
      body: nodesFromMaybeJsx(filePath, source, bodyExpr),
    }
  }
  return { kind: 'expr', value: parseExpr(filePath, source, node) }
}

function parseJsxAttrs(filePath: string, source: string, attributes: any[]): IrAttr[] {
  const attrs: IrAttr[] = []
  for (const attr of attributes ?? []) {
    if (attr.type === 'JSXSpreadAttribute') {
      fail(filePath, source, attr, 'JSX spread attributes are not supported')
    }
    if (attr.type !== 'JSXAttribute') continue
    const rawName = attr.name?.name
    if (typeof rawName !== 'string') fail(filePath, source, attr, 'expected attribute name')

    const event = eventNameFromJsx(rawName)
    if (event) {
      const value = attr.value
      if (value?.type !== 'JSXExpressionContainer') {
        fail(filePath, source, attr, `event ${rawName} must be an expression`)
      }
      const expr = unwrap(value.expression)
      let handler: string | null = null
      if (expr.type === 'Identifier') handler = expr.name
      else if (expr.type === 'MemberExpression' && !expr.computed && expr.property?.type === 'Identifier') {
        handler = expr.property.name
      }
      if (!handler) fail(filePath, source, expr, `event ${rawName} must reference a handler`)
      attrs.push({ kind: 'event', name: event, handler })
      continue
    }

    const name = normalizeClassAttr(rawName)
    if (!attr.value) {
      attrs.push({ kind: 'static', name, value: true })
      continue
    }
    if (attr.value.type === 'Literal') {
      attrs.push({ kind: 'static', name, value: attr.value.value })
      continue
    }
    if (attr.value.type === 'JSXExpressionContainer') {
      const expr = unwrap(attr.value.expression)
      if (expr.type === 'Literal') {
        attrs.push({ kind: 'static', name, value: expr.value })
      } else {
        attrs.push({ kind: 'bind', name, value: parseExpr(filePath, source, expr) })
      }
      continue
    }
    fail(filePath, source, attr.value, `unsupported attribute value for ${name}`)
  }
  return attrs
}

function jsxTagName(nameNode: any): string {
  if (nameNode?.type === 'JSXIdentifier') return nameNode.name
  if (nameNode?.type === 'JSXMemberExpression') {
    return `${jsxTagName(nameNode.object)}.${nameNode.property.name}`
  }
  return 'unknown'
}

export function parseJsxNode(filePath: string, source: string, node: any): IrNode {
  node = unwrap(node)
  if (node.type === 'JSXFragment') {
    return {
      kind: 'element',
      tag: 'fragment',
      props: [],
      children: parseJsxChildren(filePath, source, node.children),
    }
  }
  if (node.type !== 'JSXElement') fail(filePath, source, node, `expected JSX element, got ${node.type}`)
  const tag = jsxTagName(node.openingElement.name)
  const props = parseJsxAttrs(filePath, source, node.openingElement.attributes)
  const children = parseJsxChildren(filePath, source, node.children)
  const isComponent = /^[A-Z]/.test(tag) || tag.includes('.')
  if (isComponent) {
    return { kind: 'component', name: tag, props, children }
  }
  return { kind: 'element', tag, props, children }
}

function parseRenderJsx(filePath: string, source: string, body: any): IrNode {
  const unwrapped = unwrap(body)
  if (unwrapped?.type === 'BlockStatement') {
    fail(filePath, source, unwrapped, 'render/setup return must be JSX directly (expression body) in v0.1')
  }
  return parseJsxNode(filePath, source, unwrapped)
}

type SetupResult = {
  state: IrState[]
  derived: IrDerived[]
  handlers: IrHandler[]
  template: IrNode
}

function parseSetup(filePath: string, source: string, fn: any): SetupResult {
  if (fn?.type !== 'ArrowFunctionExpression' && fn?.type !== 'FunctionExpression') {
    fail(filePath, source, fn, 'setup must be a function')
  }
  if (fn.async) fail(filePath, source, fn, 'async setup() is not supported in v0.1')
  if (fn.body?.type !== 'BlockStatement') {
    fail(filePath, source, fn.body, 'setup() must use a block body')
  }

  const state: IrState[] = []
  const derived: IrDerived[] = []
  const handlers: IrHandler[] = []
  let template: IrNode | null = null

  for (const stmt of fn.body.body) {
    if (stmt.type === 'VariableDeclaration') {
      if (stmt.kind !== 'const') {
        fail(filePath, source, stmt, 'setup() bindings must use const')
      }
      for (const decl of stmt.declarations) {
        if (decl.id?.type !== 'Identifier') {
          fail(filePath, source, decl.id, 'setup() binding must be a plain identifier')
        }
        const name = decl.id.name as string
        const init = unwrap(decl.init)
        if (isMarkerCall(init, 'state')) {
          if (!init.arguments?.length) fail(filePath, source, init, 'state() requires an initial value')
          if (init.arguments.length > 1) fail(filePath, source, init, 'state() takes a single initial value')
          state.push({ name, initial: parseExpr(filePath, source, init.arguments[0]) })
          continue
        }
        if (isMarkerCall(init, 'derived')) {
          if (init.arguments?.length !== 1) {
            fail(filePath, source, init, 'derived() takes a single compute function')
          }
          derived.push({ name, from: parseDerivedFrom(filePath, source, init.arguments[0]) })
          continue
        }
        if (isMarkerCall(init, 'handler')) {
          if (init.arguments?.length !== 1) {
            fail(filePath, source, init, 'handler() takes a single function')
          }
          const hfn = init.arguments[0]
          if (hfn?.type !== 'ArrowFunctionExpression' && hfn?.type !== 'FunctionExpression') {
            fail(filePath, source, hfn, 'handler() expects a function')
          }
          if (hfn.async) fail(filePath, source, hfn, 'async handler() is not supported in v0.1')
          handlers.push({
            name,
            params: parseFnParams(filePath, source, hfn),
            body: parseFnBodyStmts(filePath, source, hfn),
          })
          continue
        }
        fail(
          filePath,
          source,
          init,
          'setup() only allows state(), derived(), and handler() bindings',
        )
      }
      continue
    }

    if (stmt.type === 'ReturnStatement') {
      if (!stmt.argument) fail(filePath, source, stmt, 'setup() must return a render function or JSX')
      const arg = unwrap(stmt.argument)
      if (arg.type === 'ArrowFunctionExpression' || arg.type === 'FunctionExpression') {
        if (arg.async) fail(filePath, source, arg, 'async render return is not supported in v0.1')
        template = parseRenderJsx(filePath, source, arg.body)
      } else {
        template = parseRenderJsx(filePath, source, arg)
      }
      continue
    }

    fail(
      filePath,
      source,
      stmt,
      'setup() only allows const bindings and a return (no effects / watch / await)',
    )
  }

  if (!template) fail(filePath, source, fn, 'setup() must return JSX (or a render function)')
  return { state, derived, handlers, template }
}

function findComponentCall(program: any): any | null {
  for (const stmt of program.body ?? []) {
    if (stmt.type === 'ExportDefaultDeclaration') {
      const decl = stmt.declaration
      if (decl?.type === 'CallExpression' && decl.callee?.type === 'Identifier' && decl.callee.name === 'component') {
        return decl
      }
    }
  }
  return null
}

function parseStyles(filePath: string, source: string, node: any): { css?: string } | undefined {
  if (!node) return undefined
  if (node.type !== 'ObjectExpression') fail(filePath, source, node, 'styles must be an object')
  let css: string | undefined
  for (const prop of node.properties) {
    if (prop.type !== 'Property') continue
    if (propKeyName(prop.key) !== 'css') continue
    const value = prop.value
    if (value?.type === 'Literal' && typeof value.value === 'string') {
      css = value.value
    } else if (
      value?.type === 'TemplateLiteral' &&
      (!value.expressions || value.expressions.length === 0) &&
      value.quasis?.length === 1
    ) {
      css = String(value.quasis[0]?.value?.cooked ?? value.quasis[0]?.value?.raw ?? '')
    } else {
      fail(filePath, source, value, 'styles.css must be a string literal (no interpolations)')
    }
  }
  return css !== undefined ? { css } : {}
}

/**
 * Parse `*.nuc.tsx` authoring source into validated IR.
 */
export function parseTsxToIr(source: string, filePath = 'anonymous.nuc.tsx'): IrDocument {
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

  const call = findComponentCall(result.program)
  if (!call) fail(filePath, source, result.program, 'expected `export default component({ ... })`')
  const config = call.arguments?.[0]
  if (config?.type !== 'ObjectExpression') fail(filePath, source, config, 'component() expects an object')

  let name = 'Anonymous'
  let props: IrProp[] = []
  let handlers: IrHandler[] = []
  let state: IrState[] = []
  let derived: IrDerived[] = []
  let styles: { css?: string } | undefined
  let template: IrNode | null = null
  let usedSetup = false
  let usedRender = false

  for (const prop of config.properties) {
    if (prop.type !== 'Property') fail(filePath, source, prop, 'spread in component() is not supported')
    const key = propKeyName(prop.key)
    switch (key) {
      case 'name':
        if (prop.value?.type !== 'Literal' || typeof prop.value.value !== 'string') {
          fail(filePath, source, prop.value, 'name must be a string literal')
        }
        name = prop.value.value
        break
      case 'props':
        props = parsePropsObject(filePath, source, prop.value)
        break
      case 'handlers':
        if (usedSetup) {
          fail(filePath, source, prop, 'handlers cannot be combined with setup() — use handler() inside setup')
        }
        handlers = parseHandlersObject(filePath, source, prop.value)
        break
      case 'styles':
        styles = parseStyles(filePath, source, prop.value)
        break
      case 'render': {
        if (usedSetup) fail(filePath, source, prop, 'render cannot be combined with setup()')
        usedRender = true
        const fn = prop.value
        if (fn?.type !== 'ArrowFunctionExpression' && fn?.type !== 'FunctionExpression') {
          fail(filePath, source, fn, 'render must be a function')
        }
        template = parseRenderJsx(filePath, source, fn.body)
        break
      }
      case 'setup': {
        if (usedRender) fail(filePath, source, prop, 'setup cannot be combined with render')
        if (handlers.length) {
          fail(filePath, source, prop, 'setup cannot be combined with top-level handlers')
        }
        usedSetup = true
        const parsed = parseSetup(filePath, source, prop.value)
        state = parsed.state
        derived = parsed.derived
        handlers = parsed.handlers
        template = parsed.template
        break
      }
      default:
        if (key) fail(filePath, source, prop, `unknown component field "${key}"`)
    }
  }

  if (!template) fail(filePath, source, config, 'component() requires render or setup')

  const doc: IrDocument = {
    irVersion: '0.1.0',
    name,
    portable: true,
    props,
    state,
    derived,
    handlers,
    template,
    ...(styles ? { styles } : {}),
    meta: { sourcePath: filePath },
  }

  return parseIrDocument(doc)
}

/** @deprecated alias — use parseTsxToIr */
export function parseNucTsx(source: string): IrDocument {
  return parseTsxToIr(source)
}
