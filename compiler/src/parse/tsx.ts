import { parseSync } from 'oxc-parser'
import type {
  IrAttr,
  IrDocument,
  IrExpr,
  IrHandler,
  IrNode,
  IrProp,
  IrPropType,
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

function fail(filePath: string, source: string, node: LocNode | null | undefined, message: string): never {
  const { line, column } = locOf(source, node)
  throw new ParseError(message, filePath, line, column)
}

const PHASE7_CALLS = ['state(', 'derived(', 'handler(', 'setup('] as const

function assertNoPhase7Apis(filePath: string, source: string): void {
  for (const needle of PHASE7_CALLS) {
    const idx = source.indexOf(needle)
    if (idx !== -1) {
      const before = source.slice(0, idx)
      const lines = before.split('\n')
      throw new ParseError(
        `${needle.slice(0, -1)}() is not available until Faza 7`,
        filePath,
        lines.length,
        (lines.at(-1)?.length ?? 0) + 1,
      )
    }
  }
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

function parseExpr(filePath: string, source: string, node: any): IrExpr {
  node = unwrap(node)
  if (!node) fail(filePath, source, node, 'expected expression')

  switch (node.type) {
    case 'Literal':
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
      if (node.computed) fail(filePath, source, node, 'computed member expressions are not supported in v0.1')
      const property = node.property?.name
      if (!property) fail(filePath, source, node, 'expected member property')
      return {
        kind: 'member',
        object: parseExpr(filePath, source, node.object),
        property,
      }
    }
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

function parseStmt(filePath: string, source: string, node: any): IrStmt {
  switch (node.type) {
    case 'ExpressionStatement':
      return { kind: 'expr', value: parseExpr(filePath, source, node.expression) }
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
    default:
      fail(filePath, source, node, `unsupported statement type ${node.type}`)
  }
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
    const params = (fn.params ?? []).map((p: any) => {
      if (p.type !== 'Identifier') fail(filePath, source, p, 'handler params must be identifiers')
      return p.name as string
    })
    const bodyNode = fn.body
    let stmts: IrStmt[] = []
    if (bodyNode?.type === 'BlockStatement') {
      stmts = bodyNode.body.map((s: any) => parseStmt(filePath, source, s))
    } else if (bodyNode) {
      stmts = [{ kind: 'expr', value: parseExpr(filePath, source, bodyNode) }]
    }
    handlers.push({ name, params, body: stmts })
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

function parseJsxNode(filePath: string, source: string, node: any): IrNode {
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
    if (propKeyName(prop.key) === 'css' && prop.value?.type === 'Literal' && typeof prop.value.value === 'string') {
      css = prop.value.value
    }
  }
  return css !== undefined ? { css } : {}
}

/**
 * Parse `*.nuc.tsx` authoring source into validated IR.
 */
export function parseTsxToIr(source: string, filePath = 'anonymous.nuc.tsx'): IrDocument {
  assertNoPhase7Apis(filePath, source)

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
  let styles: { css?: string } | undefined
  let template: IrNode | null = null

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
        handlers = parseHandlersObject(filePath, source, prop.value)
        break
      case 'styles':
        styles = parseStyles(filePath, source, prop.value)
        break
      case 'render': {
        const fn = prop.value
        if (fn?.type !== 'ArrowFunctionExpression' && fn?.type !== 'FunctionExpression') {
          fail(filePath, source, fn, 'render must be a function')
        }
        const body = unwrap(fn.body)
        if (body?.type === 'BlockStatement') {
          fail(filePath, source, body, 'render must return JSX directly (expression body) in v0.1')
        }
        template = parseJsxNode(filePath, source, body)
        break
      }
      case 'state':
      case 'derived':
        fail(filePath, source, prop, `${key} is not available until Faza 7`)
        break
      default:
        if (key) fail(filePath, source, prop, `unknown component field "${key}"`)
    }
  }

  if (!template) fail(filePath, source, config, 'component() requires render')

  const doc: IrDocument = {
    irVersion: '0.1.0',
    name,
    portable: true,
    props,
    state: [],
    derived: [],
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
