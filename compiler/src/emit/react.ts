import type { IrAttr, IrDocument, IrExpr, IrNode, IrProp, IrStmt } from '../ir/types'
import { irEventToReact } from '../adapters/events'
import { toReactClassName } from '../adapters/class-name'

function emitExpr(expr: IrExpr): string {
  switch (expr.kind) {
    case 'literal':
      return JSON.stringify(expr.value)
    case 'ident':
      return expr.name
    case 'member':
      return `${emitExpr(expr.object)}.${expr.property}`
    case 'binary':
      return `(${emitExpr(expr.left)} ${expr.op} ${emitExpr(expr.right)})`
    case 'call':
      return `${emitExpr(expr.callee)}(${expr.args.map(emitExpr).join(', ')})`
  }
}

function emitPropType(type: IrProp['type']): string {
  switch (type) {
    case 'string':
      return 'string'
    case 'number':
      return 'number'
    case 'boolean':
      return 'boolean'
    default:
      return 'unknown'
  }
}

function emitAttrs(attrs: IrAttr[]): string {
  const parts: string[] = []
  for (const attr of attrs) {
    if (attr.kind === 'static') {
      const name = toReactClassName(attr.name)
      if (typeof attr.value === 'boolean') {
        if (attr.value) parts.push(name)
      } else if (typeof attr.value === 'number') {
        parts.push(`${name}={${attr.value}}`)
      } else {
        parts.push(`${name}=${JSON.stringify(attr.value)}`)
      }
    } else if (attr.kind === 'bind') {
      const name = toReactClassName(attr.name)
      parts.push(`${name}={${emitExpr(attr.value)}}`)
    } else if (attr.kind === 'event') {
      parts.push(`${irEventToReact(attr.name)}={${attr.handler}}`)
    }
  }
  return parts.length ? ` ${parts.join(' ')}` : ''
}

function emitNode(node: IrNode, indent: string): string {
  switch (node.kind) {
    case 'text':
      return `${indent}${node.value}`
    case 'expr':
      return `${indent}{${emitExpr(node.value)}}`
    case 'slot':
      return `${indent}{children}`
    case 'if': {
      const thenExpr =
        node.then.length === 1
          ? emitNodeInline(node.then[0]!)
          : `(\n${node.then.map((c) => emitNode(c, `${indent}  `)).join('\n')}\n${indent})`
      if (!node.else?.length) {
        return `${indent}{${emitExpr(node.test)} ? ${thenExpr} : null}`
      }
      const elseExpr =
        node.else.length === 1
          ? emitNodeInline(node.else[0]!)
          : `(\n${node.else.map((c) => emitNode(c, `${indent}  `)).join('\n')}\n${indent})`
      return `${indent}{${emitExpr(node.test)} ? ${thenExpr} : ${elseExpr}}`
    }
    case 'for': {
      const params = node.index != null ? `(${node.item}, ${node.index})` : `(${node.item})`
      const body =
        node.body.length === 1
          ? emitNodeInline(node.body[0]!)
          : `(\n${node.body.map((c) => emitNode(c, `${indent}  `)).join('\n')}\n${indent})`
      return `${indent}{${emitExpr(node.source)}.map(${params} => ${body})}`
    }
    case 'element':
    case 'component': {
      if (node.kind === 'element' && node.tag === 'fragment') {
        if (!node.children.length) return `${indent}<></>`
        const inner = node.children.map((c) => emitNode(c, `${indent}  `)).join('\n')
        return `${indent}<>\n${inner}\n${indent}</>`
      }
      const tag = node.kind === 'component' ? node.name : node.tag
      const attrs = emitAttrs(node.props)
      if (!node.children.length) {
        return `${indent}<${tag}${attrs} />`
      }
      const inner = node.children.map((c) => emitNode(c, `${indent}  `)).join('\n')
      return `${indent}<${tag}${attrs}>\n${inner}\n${indent}</${tag}>`
    }
  }
}

function emitNodeInline(node: IrNode): string {
  return emitNode(node, '').trim()
}

function emitStmt(stmt: IrStmt): string {
  switch (stmt.kind) {
    case 'expr':
      return emitExpr(stmt.value)
    case 'return':
      return stmt.value ? `return ${emitExpr(stmt.value)}` : 'return'
    case 'assign':
      return `${emitExpr(stmt.target)} = ${emitExpr(stmt.value)}`
  }
}

function hasSlot(node: IrNode): boolean {
  if (node.kind === 'slot') return true
  if (node.kind === 'element' || node.kind === 'component') {
    return node.children.some(hasSlot)
  }
  if (node.kind === 'if') {
    return node.then.some(hasSlot) || (node.else?.some(hasSlot) ?? false)
  }
  if (node.kind === 'for') return node.body.some(hasSlot)
  return false
}

/**
 * Emit IR → React TSX body (no headers / `'use client'` / hash).
 */
export function emitReact(doc: IrDocument, opts?: { cssFileName?: string }): string {
  const lines: string[] = []
  if (opts?.cssFileName) {
    lines.push(`import './${opts.cssFileName}'`, '')
  }

  const withChildren = hasSlot(doc.template)

  if (doc.props.length || withChildren) {
    const fields = doc.props.map((p) => {
      const opt = p.optional || p.default !== undefined ? '?' : ''
      return `  ${p.name}${opt}: ${emitPropType(p.type)}`
    })
    if (withChildren) fields.push('  children?: React.ReactNode')
    lines.push('type Props = {', ...fields, '}', '')
  }

  for (const handler of doc.handlers) {
    const params = handler.params.join(', ')
    const body = handler.body.map((s) => `  ${emitStmt(s)}`).join('\n')
    lines.push(`function ${handler.name}(${params}) {`, body, '}', '')
  }

  let propsArg = ''
  if (doc.props.length || withChildren) {
    const parts = doc.props.map((p) =>
      p.default !== undefined ? `${p.name} = ${JSON.stringify(p.default)}` : p.name,
    )
    if (withChildren) parts.push('children')
    propsArg = `{ ${parts.join(', ')} }: Props`
  }

  const template = rewritePropsAccess(emitNode(doc.template, '    '), doc.props)

  lines.push(
    `export default function ${doc.name}(${propsArg}) {`,
    '  return (',
    template,
    '  )',
    '}',
  )

  return `${lines.join('\n').trim()}\n`
}

/** After destructuring props, rewrite `props.foo` → `foo` in emitted JSX text. */
function rewritePropsAccess(code: string, props: IrProp[]): string {
  let out = code
  for (const p of props) {
    out = out.replaceAll(`props.${p.name}`, p.name)
  }
  return out
}
