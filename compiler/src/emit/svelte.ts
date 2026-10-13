import type { IrAttr, IrDocument, IrExpr, IrNode, IrProp, IrStmt } from '../ir/types'
import { irEventToSvelte } from '../adapters/events'
import { mapNuxtIconTag } from '../adapters/nuxt-icon'
import {
  reactiveNames,
  stateNames,
  isStateSetCall,
  stripReactiveValue,
} from './rewrite-state'

type EmitCtx = {
  states: Set<string>
  reactives: Set<string>
  stateNames?: Set<string>
}

/** Svelte: strip `.value`; `count.set(x)` handled at stmt level as `count = x`. */
export function rewriteSvelteExpr(expr: IrExpr, states: Set<string>, reactives: Set<string>): IrExpr {
  if (isStateSetCall(expr, states)) {
    // Fallback when set appears mid-expression — rare; emit assign via raw.
    const name = expr.callee.object.name
    const arg = rewriteSvelteExpr(expr.args[0]!, states, reactives)
    return { kind: 'raw', code: `(${name} = ${emitExpr(arg)})` }
  }
  return stripReactiveValue(expr, reactives)
}

export function rewriteSvelteStmt(stmt: IrStmt, states: Set<string>, reactives: Set<string>): IrStmt {
  if (stmt.kind === 'expr' && isStateSetCall(stmt.value, states)) {
    return {
      kind: 'assign',
      target: { kind: 'ident', name: stmt.value.callee.object.name },
      value: rewriteSvelteExpr(stmt.value.args[0]!, states, reactives),
    }
  }
  switch (stmt.kind) {
    case 'expr':
      return { kind: 'expr', value: rewriteSvelteExpr(stmt.value, states, reactives) }
    case 'return':
      return {
        kind: 'return',
        value: stmt.value ? rewriteSvelteExpr(stmt.value, states, reactives) : undefined,
      }
    case 'assign':
      return {
        kind: 'assign',
        target: rewriteSvelteExpr(stmt.target, states, reactives),
        value: rewriteSvelteExpr(stmt.value, states, reactives),
      }
    case 'const':
      return {
        kind: 'const',
        name: stmt.name,
        value: rewriteSvelteExpr(stmt.value, states, reactives),
      }
  }
}

function emitExpr(expr: IrExpr): string {
  switch (expr.kind) {
    case 'literal':
      return JSON.stringify(expr.value)
    case 'ident':
      return expr.name
    case 'member':
      return `${emitExpr(expr.object)}.${expr.property}`
    case 'index':
      return `${emitExpr(expr.object)}[${emitExpr(expr.index)}]`
    case 'conditional':
      return `(${emitExpr(expr.test)} ? ${emitExpr(expr.consequent)} : ${emitExpr(expr.alternate)})`
    case 'binary':
      return `(${emitExpr(expr.left)} ${expr.op} ${emitExpr(expr.right)})`
    case 'call':
      return `${emitExpr(expr.callee)}(${expr.args.map(emitExpr).join(', ')})`
    case 'object': {
      const body = expr.properties
        .map((p) => {
          const key = /^[a-zA-Z_$][\w$]*$/.test(p.key) ? p.key : JSON.stringify(p.key)
          return `${key}: ${emitExpr(p.value)}`
        })
        .join(', ')
      return `{ ${body} }`
    }
    case 'array':
      return `[${expr.elements.map(emitExpr).join(', ')}]`
    case 'raw':
      return expr.code
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

function mapExpr(expr: IrExpr, ctx: EmitCtx): IrExpr {
  return rewriteSvelteExpr(expr, ctx.states, ctx.reactives)
}

function emitClassFragment(expr: IrExpr, ctx: EmitCtx): string {
  const mapped = mapExpr(expr, ctx)
  switch (mapped.kind) {
    case 'object':
      return mapped.properties
        .map((p) => `\${${emitExpr(p.value)} ? ' ${p.key}' : ''}`)
        .join('')
    case 'literal':
      if (typeof mapped.value === 'string') return ` ${mapped.value}`
      return ''
    case 'raw':
      return ` \${${mapped.code}}`
    default:
      return ` \${${emitExpr(mapped)}}`
  }
}

function emitClassAttr(
  staticClass: string | undefined,
  bindExpr: IrExpr | undefined,
  ctx: EmitCtx,
): string | null {
  if (!staticClass && !bindExpr) return null
  if (staticClass && !bindExpr) return `class=${JSON.stringify(staticClass)}`

  const mapped = bindExpr ? mapExpr(bindExpr, ctx) : undefined
  if (!mapped) return `class=${JSON.stringify(staticClass)}`

  let fragments = ''
  if (mapped.kind === 'array') {
    fragments = mapped.elements.map((el) => emitClassFragment(el, ctx)).join('')
  } else if (mapped.kind === 'object') {
    fragments = mapped.properties
      .map((p) => `\${${emitExpr(p.value)} ? ' ${p.key}' : ''}`)
      .join('')
  } else {
    if (staticClass) {
      return `class={\`${staticClass} \${${emitExpr(mapped)}}\`}`
    }
    return `class={${emitExpr(mapped)}}`
  }

  const prefix = staticClass ?? ''
  return `class={\`${prefix}${fragments}\`.trim()}`
}

function toSvelteAttrName(name: string): string {
  if (name === 'className') return 'class'
  return name
}

function rewriteInlineEventHandler(code: string, stateNames?: Set<string>): string {
  let inner = code.trim()
  if (stateNames) {
    for (const name of stateNames) {
      const m = inner.match(new RegExp(`^${name}\\s*=\\s*(.+)$`))
      if (m) {
        // Vue `x = $event` → assignment (runes); keep `$event` as param.
        inner = `${name} = ${m[1]!.trim()}`
        break
      }
    }
  }
  if (/^[a-zA-Z_$][\w$]*$/.test(inner)) return inner
  const args = /\$event\b/.test(inner) ? '$event' : ''
  if (/=[^=]/.test(inner) && !inner.includes('=>')) return `(${args}) => { ${inner} }`
  return `(${args}) => ${inner}`
}

function emitStyleObject(expr: IrExpr, ctx: EmitCtx): string {
  const mapped = mapExpr(expr, ctx)
  if (mapped.kind !== 'object') {
    return `style={${emitExpr(mapped)}}`
  }
  const parts = mapped.properties.map((p) => {
    const cssKey = p.key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
    if (p.value.kind === 'literal' && typeof p.value.value === 'string') {
      return `${cssKey}: ${p.value.value}`
    }
    return `${cssKey}: \${${emitExpr(p.value)}}`
  })
  const hasInterp = mapped.properties.some((p) => !(p.value.kind === 'literal' && typeof p.value.value === 'string'))
  if (!hasInterp) {
    return `style=${JSON.stringify(parts.join('; '))}`
  }
  return `style={\`${parts.join('; ')}\`}`
}

const SVELTE_NATIVE_INTERACTIVE = new Set([
  'a',
  'button',
  'input',
  'select',
  'textarea',
  'summary',
  'option',
  'details',
])

const SVELTE_HOVER_EVENTS = new Set(['mouseenter', 'mouseleave', 'mouseover', 'mouseout'])

/** Svelte a11y: non-native hosts need role / keyboard; labels wrapping CE need ignore. */
function svelteA11yIgnoreCodes(tag: string, attrs: IrAttr[]): string[] {
  const codes: string[] = []
  if (tag === 'label') codes.push('a11y_label_has_associated_control')
  const events = attrs.filter((a) => a.kind === 'event').map((a) => a.name)
  if (!events.length) return codes
  const native = SVELTE_NATIVE_INTERACTIVE.has(tag)
  if (native) return codes
  if (events.includes('click')) {
    codes.push('a11y_click_events_have_key_events', 'a11y_no_static_element_interactions')
  } else if (events.some((e) => SVELTE_HOVER_EVENTS.has(e))) {
    codes.push('a11y_no_static_element_interactions')
  }
  return [...new Set(codes)]
}

function emitAttrs(attrs: IrAttr[], ctx: EmitCtx, tag?: string): string {
  const parts: string[] = []
  let staticClass: string | undefined
  let bindClass: IrExpr | undefined
  let hasMode = false
  let hasRole = false
  let hasTabIndex = false
  let hasKeyDown = false
  let classSlotIndex: number | null = null
  const eventNames: string[] = []

  const mergeClassAttr = (attr: IrAttr): void => {
    if (attr.kind === 'static' && typeof attr.value === 'string') {
      staticClass = staticClass ? `${staticClass} ${attr.value}` : attr.value
    } else if (attr.kind === 'bind') {
      bindClass = attr.value
    } else if (attr.kind === 'static') {
      staticClass = staticClass ? `${staticClass} ${String(attr.value)}` : String(attr.value)
    }
  }

  for (const attr of attrs) {
    const svelteName = toSvelteAttrName(attr.name)
    if (attr.name === 'mode' || svelteName === 'mode') hasMode = true
    if (svelteName === 'role' || attr.name === 'role') hasRole = true
    if (svelteName === 'tabindex' || attr.name === 'tabIndex' || attr.name === 'tabindex') {
      hasTabIndex = true
    }
    if (attr.kind === 'event' && attr.name === 'keydown') hasKeyDown = true
    if (svelteName === 'key' || attr.name === 'key') continue
    if (svelteName === 'class' || attr.name === 'class' || attr.name === 'className') {
      mergeClassAttr(attr)
      if (classSlotIndex === null) classSlotIndex = parts.length
      continue
    }
    if (attr.kind === 'bind' && attr.name === 'ref') {
      parts.push(`bind:this={${emitExpr(mapExpr(attr.value, ctx))}}`)
      continue
    }
    if (attr.kind === 'bind' && (attr.name === 'style' || svelteName === 'style')) {
      parts.push(emitStyleObject(attr.value, ctx))
      continue
    }
    if (attr.kind === 'static') {
      if (typeof attr.value === 'boolean') {
        parts.push(`${svelteName}={${attr.value ? 'true' : 'false'}}`)
      } else if (typeof attr.value === 'number') {
        parts.push(`${svelteName}={${attr.value}}`)
      } else {
        parts.push(`${svelteName}=${JSON.stringify(attr.value)}`)
      }
    } else if (attr.kind === 'bind') {
      parts.push(`${svelteName}={${emitExpr(mapExpr(attr.value, ctx))}}`)
    } else if (attr.kind === 'event') {
      eventNames.push(attr.name)
      parts.push(
        `${irEventToSvelte(attr.name)}={${rewriteInlineEventHandler(attr.handler, ctx.stateNames)}}`,
      )
    }
  }

  const classAttr = emitClassAttr(staticClass, bindClass, ctx)
  if (classAttr) {
    parts.splice(classSlotIndex ?? parts.length, 0, classAttr)
  }

  if (tag === 'nui-icon' && !hasMode) parts.push('mode="svg"')

  // Satisfy Svelte a11y for static / custom-element hosts with pointer handlers.
  if (tag && !SVELTE_NATIVE_INTERACTIVE.has(tag)) {
    const hasClick = eventNames.includes('click')
    const hasHover = eventNames.some((e) => SVELTE_HOVER_EVENTS.has(e))
    if (hasClick) {
      if (!hasRole) parts.push('role="button"')
      if (!hasTabIndex) parts.push('tabindex="0"')
      if (!hasKeyDown) {
        parts.push(
          'onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.currentTarget.dispatchEvent(new MouseEvent("click", { bubbles: true })) } }}',
        )
      }
    } else if (hasHover && !hasRole) {
      parts.push('role="group"')
    }
  }

  return parts.length ? ` ${parts.join(' ')}` : ''
}

const SVELTE_VOID_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
])

function emitNode(node: IrNode, indent: string, ctx: EmitCtx): string {
  switch (node.kind) {
    case 'text':
      return `${indent}${node.value}`
    case 'expr':
      return `${indent}{${emitExpr(mapExpr(node.value, ctx))}}`
    case 'slot':
      return `${indent}{@render children?.()}`
    case 'if': {
      const test = emitExpr(mapExpr(node.test, ctx))
      const thenBody = node.then.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')
      if (!node.else?.length) {
        return `${indent}{#if ${test}}\n${thenBody}\n${indent}{/if}`
      }
      const elseChild = node.else.length === 1 ? node.else[0]! : undefined
      if (elseChild?.kind === 'if') {
        const chain = emitElseIfChain(elseChild, indent, ctx)
        return `${indent}{#if ${test}}\n${thenBody}\n${chain}\n${indent}{/if}`
      }
      const elseBody = node.else.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')
      return `${indent}{#if ${test}}\n${thenBody}\n${indent}{:else}\n${elseBody}\n${indent}{/if}`
    }
    case 'for': {
      const source = emitExpr(mapExpr(node.source, ctx))
      const key = node.index != null ? ` (${node.index})` : ''
      const binding =
        node.index != null ? `${node.item}, ${node.index}` : node.item
      const body = node.body.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')
      return `${indent}{#each ${source} as ${binding}${key}}\n${body}\n${indent}{/each}`
    }
    case 'element':
    case 'component': {
      if (node.kind === 'element' && (node.tag === 'fragment' || node.tag === 'template')) {
        if (!node.children.length) return `${indent}`
        return node.children.map((c) => emitNode(c, indent, ctx)).join('\n')
      }
      const rawTag = node.kind === 'component' ? node.name : node.tag
      const { tag, props } = mapNuxtIconTag(rawTag, node.props)
      const ignoreCodes = svelteA11yIgnoreCodes(tag, props)
      const ignore =
        ignoreCodes.length > 0
          ? `${indent}<!-- svelte-ignore ${ignoreCodes.join(' ')} -->\n`
          : ''
      const attrs = emitAttrs(props, ctx, tag)
      if (!node.children.length) {
        // Svelte rejects self-closing non-void HTML / custom elements.
        if (SVELTE_VOID_TAGS.has(tag)) return `${ignore}${indent}<${tag}${attrs} />`
        return `${ignore}${indent}<${tag}${attrs}></${tag}>`
      }
      const inner = node.children.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')
      return `${ignore}${indent}<${tag}${attrs}>\n${inner}\n${indent}</${tag}>`
    }
  }
}

function emitElseIfChain(node: IrNode & { kind: 'if' }, indent: string, ctx: EmitCtx): string {
  const test = emitExpr(mapExpr(node.test, ctx))
  const thenBody = node.then.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')
  let out = `${indent}{:else if ${test}}\n${thenBody}`
  if (!node.else?.length) return out
  const elseChild = node.else.length === 1 ? node.else[0]! : undefined
  if (elseChild?.kind === 'if') {
    return `${out}\n${emitElseIfChain(elseChild, indent, ctx)}`
  }
  const elseBody = node.else.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')
  return `${out}\n${indent}{:else}\n${elseBody}`
}

function emitStmt(stmt: IrStmt): string {
  switch (stmt.kind) {
    case 'expr':
      return emitExpr(stmt.value)
    case 'return':
      return stmt.value ? `return ${emitExpr(stmt.value)}` : 'return'
    case 'assign':
      return `${emitExpr(stmt.target)} = ${emitExpr(stmt.value)}`
    case 'const':
      return `const ${stmt.name} = ${emitExpr(stmt.value)}`
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

function emitHandlerFn(handler: IrDocument['handlers'][number], ctx: EmitCtx, indent: string): string[] {
  const params = handler.params.join(', ')
  const body = handler.body
    .map((s) => `${indent}  ${emitStmt(rewriteSvelteStmt(s, ctx.states, ctx.reactives))}`)
    .join('\n')
  return [`${indent}function ${handler.name}(${params}) {`, body, `${indent}}`, '']
}

function rewritePropsAccess(code: string, props: IrProp[]): string {
  let out = code
  for (const p of props) {
    out = out.replaceAll(`props.${p.name}`, p.name)
  }
  return out
}

/**
 * Emit IR → Svelte 5 SFC body (no headers / hash). Runes: `$state` / `$derived` / `$props`.
 */
export function emitSvelte(doc: IrDocument, opts?: { cssFileName?: string }): string {
  const script: string[] = []
  if (opts?.cssFileName) {
    script.push(`  import './${opts.cssFileName}'`, '')
  }

  const ctx: EmitCtx = {
    states: stateNames(doc.state),
    reactives: reactiveNames(doc.state, doc.derived),
  }
  const withChildren = hasSlot(doc.template)

  if (doc.props.length || withChildren) {
    const fields = doc.props.map((p) => {
      const opt = p.optional || p.default !== undefined ? '?' : ''
      return `    ${p.name}${opt}: ${emitPropType(p.type)}`
    })
    if (withChildren) fields.push('    children?: import("svelte").Snippet')
    script.push('  type Props = {', ...fields, '  }', '')

    const parts = doc.props.map((p) =>
      p.default !== undefined ? `${p.name} = ${JSON.stringify(p.default)}` : p.name,
    )
    if (withChildren) parts.push('children')
    script.push(`  let { ${parts.join(', ')} }: Props = $props()`, '')
  }

  for (const s of doc.state) {
    script.push(
      `  let ${s.name} = $state(${emitExpr(mapExpr(s.initial, ctx))})`,
    )
  }
  for (const d of doc.derived) {
    script.push(`  let ${d.name} = $derived(${emitExpr(mapExpr(d.from, ctx))})`)
  }
  if (doc.state.length || doc.derived.length) script.push('')

  for (const handler of doc.handlers) {
    script.push(...emitHandlerFn(handler, ctx, '  '))
  }

  // Drop trailing blank from last handler
  while (script.length && script[script.length - 1] === '') script.pop()

  const markup = rewritePropsAccess(emitNode(doc.template, '', ctx), doc.props)

  const scriptBlock =
    script.length > 0
      ? `<script lang="ts">\n${script.join('\n')}\n</script>\n\n`
      : ''

  return `${scriptBlock}${markup}\n`
}

/** Product convert: template IR + rewritten `<script setup>` body (already runes-shaped). */
export function emitSvelteProduct(
  doc: IrDocument,
  script: {
    imports: string[]
    body: string[]
    propsType?: string
    propNames?: string[]
    emitFields?: string[]
    emitHandlers?: string[]
  },
  opts?: { cssFileName?: string; stateNames?: Set<string> },
): string {
  const lines: string[] = []
  lines.push(...script.imports)
  if (opts?.cssFileName) {
    lines.push(`import './${opts.cssFileName}'`)
  }
  if (lines.length) lines.push('')

  const propsType = mergeSveltePropsType(script.propsType, script.emitFields ?? [])
  const propNames = [...(script.propNames ?? []), ...(script.emitHandlers ?? [])]
  if (propsType) {
    lines.push(`type Props = ${propsType}`, '')
  }
  if (propNames.length) {
    lines.push(`let { ${propNames.join(', ')} }: Props = $props()`, '')
  }

  for (const line of script.body) {
    for (const part of line.split('\n')) {
      lines.push(part)
    }
  }
  if (script.body.length) lines.push('')

  const ctx: EmitCtx = {
    states: new Set(),
    reactives: new Set(),
    stateNames: opts?.stateNames,
  }
  const markup = rewriteVueEmitCalls(emitNode(doc.template, '', ctx))

  const scriptInner = lines.join('\n').replace(/\n+$/, '')
  return `<script lang="ts">\n${scriptInner}\n</script>\n\n${markup}\n`
}

/** Product emit callbacks stay React-cased (`onFocus`) to match rewritten script props. */
function productEmitHandler(event: string): string {
  return `on${event.charAt(0).toUpperCase()}${event.slice(1)}`
}

function mergeSveltePropsType(typeLiteral: string | undefined, emitFields: string[]): string | undefined {
  if (!typeLiteral && emitFields.length === 0) return undefined
  const base = (typeLiteral ?? '{}').trim()
  if (!emitFields.length) return base
  if (!base.endsWith('}')) {
    return `{ ${[base, ...emitFields].join('; ')} }`
  }
  const inner = base.slice(0, -1).trimEnd()
  const pad = inner.includes('\n') ? '\n  ' : ' '
  return `${inner}${pad}${emitFields.join(pad)}\n}`
}

function rewriteVueEmitCalls(code: string): string {
  return code.replace(/\$emit\(\s*(['"])(\w+)\1\s*(?:,\s*)?/g, (_m, _q, event: string) => {
    return `${productEmitHandler(event)}?.(`
  })
}
