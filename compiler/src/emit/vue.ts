import type { IrAttr, IrDocument, IrExpr, IrNode, IrProp, IrStmt } from '../ir/types'
import { irEventToVue } from '../adapters/events'
import { toVueClassAttr } from '../adapters/class-name'
import {
  reactiveNames,
  rewriteVueScriptStmt,
  stateNames,
  stripReactiveValue,
} from './rewrite-state'

function emitExpr(expr: IrExpr): string {
  switch (expr.kind) {
    case 'literal':
      if (typeof expr.value === 'string') {
        return `'${expr.value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
      }
      return JSON.stringify(expr.value)
    case 'ident':
      return expr.name
    case 'member':
      return `${emitExpr(expr.object)}.${expr.property}`
    case 'binary':
      return `(${emitExpr(expr.left)} ${expr.op} ${emitExpr(expr.right)})`
    case 'call':
      return `${emitExpr(expr.callee)}(${expr.args.map(emitExpr).join(', ')})`
    case 'object': {
      const body = expr.properties.map((p) => `${p.key}: ${emitExpr(p.value)}`).join(', ')
      return `{ ${body} }`
    }
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

function emitAttrs(attrs: IrAttr[], reactives: Set<string>): string {
  const parts: string[] = []
  for (const attr of attrs) {
    if (attr.kind === 'static') {
      const name = toVueClassAttr(attr.name)
      if (typeof attr.value === 'boolean') {
        parts.push(attr.value ? name : `:${name}="false"`)
      } else if (typeof attr.value === 'number') {
        parts.push(`:${name}="${attr.value}"`)
      } else {
        parts.push(`${name}="${attr.value}"`)
      }
    } else if (attr.kind === 'bind') {
      const name = toVueClassAttr(attr.name)
      parts.push(`:${name}="${emitExpr(stripReactiveValue(attr.value, reactives))}"`)
    } else if (attr.kind === 'event') {
      parts.push(`${irEventToVue(attr.name)}="${attr.handler}"`)
    }
  }
  return parts.length ? ` ${parts.join(' ')}` : ''
}

function emitNode(node: IrNode, indent: string, reactives: Set<string>): string {
  switch (node.kind) {
    case 'text':
      return `${indent}${node.value}`
    case 'expr':
      return `${indent}{{ ${emitExpr(stripReactiveValue(node.value, reactives))} }}`
    case 'slot':
      if (node.children?.length) {
        const inner = node.children.map((c) => emitNode(c, `${indent}  `, reactives)).join('\n')
        return `${indent}<slot>\n${inner}\n${indent}</slot>`
      }
      return `${indent}<slot />`
    case 'if': {
      const lines: string[] = []
      const test = emitExpr(stripReactiveValue(node.test, reactives))
      node.then.forEach((child, i) => {
        const dir = i === 0 ? `v-if="${test}"` : ''
        lines.push(emitNodeWithDirective(child, indent, dir, reactives))
      })
      for (const [i, child] of (node.else ?? []).entries()) {
        const dir = i === 0 ? 'v-else' : ''
        lines.push(emitNodeWithDirective(child, indent, dir, reactives))
      }
      return lines.join('\n')
    }
    case 'for': {
      const source = emitExpr(stripReactiveValue(node.source, reactives))
      const iter =
        node.index != null ? `(${node.item}, ${node.index}) in ${source}` : `${node.item} in ${source}`
      return node.body
        .map((child) => emitNodeWithDirective(child, indent, `v-for="${iter}"`, reactives))
        .join('\n')
    }
    case 'element':
    case 'component': {
      if (node.kind === 'element' && node.tag === 'fragment') {
        return node.children.map((c) => emitNode(c, indent, reactives)).join('\n')
      }
      const tag = node.kind === 'component' ? node.name : node.tag
      const attrs = emitAttrs(node.props, reactives)
      if (!node.children.length) {
        return `${indent}<${tag}${attrs} />`
      }
      const inner = node.children.map((c) => emitNode(c, `${indent}  `, reactives)).join('\n')
      return `${indent}<${tag}${attrs}>\n${inner}\n${indent}</${tag}>`
    }
  }
}

function emitNodeWithDirective(
  node: IrNode,
  indent: string,
  directive: string,
  reactives: Set<string>,
): string {
  if (!directive) return emitNode(node, indent, reactives)
  if (node.kind === 'element' || node.kind === 'component') {
    const tag = node.kind === 'component' ? node.name : node.tag
    if (tag === 'fragment') {
      return `${indent}<template ${directive}>\n${node.children.map((c) => emitNode(c, `${indent}  `, reactives)).join('\n')}\n${indent}</template>`
    }
    const attrs = emitAttrs(node.props, reactives)
    if (!node.children.length) {
      return `${indent}<${tag} ${directive}${attrs} />`
    }
    const inner = node.children.map((c) => emitNode(c, `${indent}  `, reactives)).join('\n')
    return `${indent}<${tag} ${directive}${attrs}>\n${inner}\n${indent}</${tag}>`
  }
  return `${indent}<template ${directive}>\n${emitNode(node, `${indent}  `, reactives)}\n${indent}</template>`
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

  const states = stateNames(doc.state)
  const needsVueReactivity = doc.state.length > 0 || doc.derived.length > 0
  if (needsVueReactivity) {
    const imports: string[] = []
    if (doc.state.length) imports.push('ref')
    if (doc.derived.length) imports.push('computed')
    scriptBody.push(`import { ${imports.join(', ')} } from 'vue'`, '')
  }

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

  for (const s of doc.state) {
    scriptBody.push(`const ${s.name} = ref(${emitExpr(s.initial)})`)
  }
  if (doc.state.length) scriptBody.push('')

  for (const d of doc.derived) {
    scriptBody.push(`const ${d.name} = computed(() => ${emitExpr(d.from)})`)
  }
  if (doc.derived.length) scriptBody.push('')

  for (const handler of doc.handlers) {
    const params = handler.params.join(', ')
    const body = handler.body
      .map((s) => `  ${emitStmt(rewriteVueScriptStmt(s, states))}`)
      .join('\n')
    scriptBody.push(`function ${handler.name}(${params}) {`, body, '}', '')
  }

  return ['<script setup lang="ts">', ...scriptBody, '</script>'].join('\n')
}

/**
 * Emit IR → Vue SFC body (no generated headers / hash).
 */
export function emitVue(doc: IrDocument, opts?: { cssFileName?: string }): string {
  const cssImport = opts?.cssFileName ? `./${opts.cssFileName}` : undefined
  const reactives = reactiveNames(doc.state, doc.derived)
  const script = emitScript(doc, cssImport)
  const template = ['<template>', emitNode(doc.template, '  ', reactives), '</template>'].join('\n')
  return `${script}\n\n${template}\n`
}

export function emitCssBody(css: string): string {
  return `${css.trim()}\n`
}
