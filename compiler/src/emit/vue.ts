import type { IrAttr, IrDocument, IrExpr, IrNode, IrProp, IrStmt } from '../ir/types'
import { irEventToVue } from '../adapters/events'
import { toVueClassAttr } from '../adapters/class-name'

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
      const name = toVueClassAttr(attr.name)
      if (typeof attr.value === 'boolean') {
        if (attr.value) parts.push(name)
      } else if (typeof attr.value === 'number') {
        parts.push(`:${name}="${attr.value}"`)
      } else {
        parts.push(`${name}="${attr.value}"`)
      }
    } else if (attr.kind === 'bind') {
      const name = toVueClassAttr(attr.name)
      parts.push(`:${name}="${emitExpr(attr.value)}"`)
    } else if (attr.kind === 'event') {
      parts.push(`${irEventToVue(attr.name)}="${attr.handler}"`)
    }
  }
  return parts.length ? ` ${parts.join(' ')}` : ''
}

function emitNode(node: IrNode, indent: string): string {
  switch (node.kind) {
    case 'text':
      return `${indent}${node.value}`
    case 'expr':
      return `${indent}{{ ${emitExpr(node.value)} }}`
    case 'slot':
      if (node.children?.length) {
        const inner = node.children.map((c) => emitNode(c, `${indent}  `)).join('\n')
        return `${indent}<slot>\n${inner}\n${indent}</slot>`
      }
      return `${indent}<slot />`
    case 'if': {
      const lines: string[] = []
      node.then.forEach((child, i) => {
        const dir = i === 0 ? `v-if="${emitExpr(node.test)}"` : ''
        lines.push(emitNodeWithDirective(child, indent, dir))
      })
      for (const [i, child] of (node.else ?? []).entries()) {
        const dir = i === 0 ? 'v-else' : ''
        lines.push(emitNodeWithDirective(child, indent, dir))
      }
      return lines.join('\n')
    }
    case 'for': {
      const iter =
        node.index != null
          ? `(${node.item}, ${node.index}) in ${emitExpr(node.source)}`
          : `${node.item} in ${emitExpr(node.source)}`
      return node.body.map((child) => emitNodeWithDirective(child, indent, `v-for="${iter}"`)).join('\n')
    }
    case 'element':
    case 'component': {
      if (node.kind === 'element' && node.tag === 'fragment') {
        return node.children.map((c) => emitNode(c, indent)).join('\n')
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

function emitNodeWithDirective(node: IrNode, indent: string, directive: string): string {
  if (!directive) return emitNode(node, indent)
  if (node.kind === 'element' || node.kind === 'component') {
    const tag = node.kind === 'component' ? node.name : node.tag
    if (tag === 'fragment') {
      return `${indent}<template ${directive}>\n${node.children.map((c) => emitNode(c, `${indent}  `)).join('\n')}\n${indent}</template>`
    }
    const attrs = emitAttrs(node.props)
    if (!node.children.length) {
      return `${indent}<${tag} ${directive}${attrs} />`
    }
    const inner = node.children.map((c) => emitNode(c, `${indent}  `)).join('\n')
    return `${indent}<${tag} ${directive}${attrs}>\n${inner}\n${indent}</${tag}>`
  }
  return `${indent}<template ${directive}>\n${emitNode(node, `${indent}  `)}\n${indent}</template>`
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

function emitScript(doc: IrDocument, cssImport?: string): string {
  const scriptBody: string[] = []
  if (cssImport) scriptBody.push(`import '${cssImport}'`, '')

  if (doc.props.length) {
    const fields = doc.props
      .map((p) => {
        const opt = p.optional || p.default !== undefined ? '?' : ''
        return `  ${p.name}${opt}: ${emitPropType(p.type)}`
      })
      .join('\n')
    const defaults = doc.props.filter((p) => p.default !== undefined)
    if (defaults.length) {
      const defObj = defaults.map((p) => `  ${p.name}: ${JSON.stringify(p.default)},`).join('\n')
      scriptBody.push(
        'const props = withDefaults(',
        '  defineProps<{',
        fields,
        '  }>(),',
        '  {',
        defObj,
        '  },',
        ')',
      )
    } else {
      scriptBody.push('const props = defineProps<{', fields, '}>()')
    }
    scriptBody.push('')
  }

  for (const handler of doc.handlers) {
    const params = handler.params.join(', ')
    const body = handler.body.map((s) => `  ${emitStmt(s)}`).join('\n')
    scriptBody.push(`function ${handler.name}(${params}) {`, body, '}', '')
  }

  return ['<script setup lang="ts">', ...scriptBody, '</script>'].join('\n')
}

/**
 * Emit IR → Vue SFC body (no generated headers / hash).
 */
export function emitVue(doc: IrDocument, opts?: { cssFileName?: string }): string {
  const cssImport = opts?.cssFileName ? `./${opts.cssFileName}` : undefined
  const script = emitScript(doc, cssImport)
  const template = ['<template>', emitNode(doc.template, '  '), '</template>'].join('\n')
  return `${script}\n\n${template}\n`
}

export function emitCssBody(css: string): string {
  return `${css.trim()}\n`
}
