import type { IrAttr, IrDocument, IrExpr, IrNode, IrProp, IrStmt } from '../ir/types'
import { irEventToReact } from '../adapters/events'
import { toReactClassName } from '../adapters/class-name'
import {
  reactiveNames,
  reactSetterName,
  rewriteReactExpr,
  rewriteReactStmt,
  stateNames,
} from './rewrite-state'

type EmitCtx = {
  states: Set<string>
  reactives: Set<string>
  /** Product convert: rewrite `count = x` inline handlers → `setCount(x)`. */
  stateNames?: Set<string>
}

function rewriteInlineEventHandler(code: string, stateNames?: Set<string>): string {
  let inner = code.trim()
  if (stateNames) {
    for (const name of stateNames) {
      const m = inner.match(new RegExp(`^${name}\\s*=\\s*(.+)$`))
      if (m) {
        inner = `${reactSetterName(name)}(${m[1]!.trim()})`
        break
      }
    }
  }
  if (/^[a-zA-Z_$][\w$]*$/.test(inner)) return inner
  if (/=[^=]/.test(inner) && !inner.includes('=>')) return `() => { ${inner} }`
  return `() => ${inner}`
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
  return rewriteReactExpr(expr, ctx.states, ctx.reactives)
}

/** Convert a single class-binding expr element into a template-literal fragment. */
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

function emitClassNameAttr(
  staticClass: string | undefined,
  bindExpr: IrExpr | undefined,
  ctx: EmitCtx,
): string | null {
  if (!staticClass && !bindExpr) return null
  if (staticClass && !bindExpr) return `className=${JSON.stringify(staticClass)}`

  const mapped = bindExpr ? mapExpr(bindExpr, ctx) : undefined
  if (!mapped) return `className=${JSON.stringify(staticClass)}`

  // Single object without static: `className={\`${cond ? 'cls' : ''}\`}`
  // Single object with static: `className={\`static${cond ? ' cls' : ''}\`}`
  // Array: merge all fragments
  // Raw/other: fallback to expression

  let fragments = ''

  if (mapped.kind === 'array') {
    fragments = mapped.elements.map((el) => emitClassFragment(el, ctx)).join('')
  } else if (mapped.kind === 'object') {
    fragments = mapped.properties
      .map((p) => `\${${emitExpr(p.value)} ? ' ${p.key}' : ''}`)
      .join('')
  } else {
    // Fallback — can't merge into template literal safely
    if (staticClass) {
      return `className={\`${staticClass} \${${emitExpr(mapped)}}\`}`
    }
    return `className={${emitExpr(mapped)}}`
  }

  const prefix = staticClass ?? ''
  return `className={\`${prefix}${fragments}\`.trim()}`
}

function emitAttrs(attrs: IrAttr[], ctx: EmitCtx): string {
  const parts: string[] = []
  let staticClass: string | undefined
  let bindClass: IrExpr | undefined

  for (const attr of attrs) {
    const reactName = toReactClassName(attr.name)
    if (reactName === 'className' || attr.name === 'class') {
      if (attr.kind === 'static' && typeof attr.value === 'string') {
        staticClass = staticClass ? `${staticClass} ${attr.value}` : attr.value
      } else if (attr.kind === 'bind') {
        bindClass = attr.value
      } else if (attr.kind === 'static') {
        staticClass = staticClass ? `${staticClass} ${String(attr.value)}` : String(attr.value)
      }
      continue
    }
    if (attr.kind === 'bind' && attr.name === 'ref') {
      parts.push(`ref={${emitExpr(mapExpr(attr.value, ctx))}}`)
      continue
    }
    if (attr.kind === 'static') {
      const name = reactName
      if (typeof attr.value === 'boolean') {
        parts.push(`${name}={${attr.value ? 'true' : 'false'}}`)
      } else if (typeof attr.value === 'number') {
        parts.push(`${name}={${attr.value}}`)
      } else {
        parts.push(`${name}=${JSON.stringify(attr.value)}`)
      }
    } else if (attr.kind === 'bind') {
      const name = reactName
      parts.push(`${name}={${emitExpr(mapExpr(attr.value, ctx))}}`)
    } else if (attr.kind === 'event') {
      parts.push(`${irEventToReact(attr.name)}={${rewriteInlineEventHandler(attr.handler, ctx.stateNames)}}`)
    }
  }

  const classAttr = emitClassNameAttr(staticClass, bindClass, ctx)
  if (classAttr) parts.unshift(classAttr)

  return parts.length ? ` ${parts.join(' ')}` : ''
}

/** Emit a chained if (v-else-if) as a bare ternary without extra {…} wrapper. */
function emitChainedTernary(node: IrNode & { kind: 'if' }, indent: string, ctx: EmitCtx): string {
  const thenExpr =
    node.then.length === 1
      ? emitNodeInline(node.then[0]!, ctx)
      : `(\n${node.then.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')}\n${indent})`
  if (!node.else?.length) {
    return `${emitExpr(mapExpr(node.test, ctx))} ? ${thenExpr} : null`
  }
  const elseChild = node.else.length === 1 ? node.else[0]! : undefined
  const elseExpr =
    elseChild?.kind === 'if'
      ? emitChainedTernary(elseChild, indent, ctx)
      : node.else.length === 1
        ? emitNodeInline(node.else[0]!, ctx)
        : `(\n${node.else.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')}\n${indent})`
  return `${emitExpr(mapExpr(node.test, ctx))} ? ${thenExpr} : ${elseExpr}`
}

function emitNode(node: IrNode, indent: string, ctx: EmitCtx): string {
  switch (node.kind) {
    case 'text':
      return `${indent}${node.value}`
    case 'expr':
      return `${indent}{${emitExpr(mapExpr(node.value, ctx))}}`
    case 'slot':
      return `${indent}{children}`
    case 'if': {
      const thenExpr =
        node.then.length === 1
          ? emitNodeInline(node.then[0]!, ctx)
          : `(\n${node.then.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')}\n${indent})`
      if (!node.else?.length) {
        return `${indent}{${emitExpr(mapExpr(node.test, ctx))} ? ${thenExpr} : null}`
      }
      // Chained v-else-if: emit the inner ternary without extra {…} wrapper
      const elseChild = node.else.length === 1 ? node.else[0]! : undefined
      const elseExpr =
        elseChild?.kind === 'if'
          ? emitChainedTernary(elseChild, indent, ctx)
          : node.else.length === 1
            ? emitNodeInline(node.else[0]!, ctx)
            : `(\n${node.else.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')}\n${indent})`
      return `${indent}{${emitExpr(mapExpr(node.test, ctx))} ? ${thenExpr} : ${elseExpr}}`
    }
    case 'for': {
      const params = node.index != null ? `(${node.item}, ${node.index})` : `(${node.item})`
      const body =
        node.body.length === 1
          ? emitNodeInline(node.body[0]!, ctx)
          : `(\n${node.body.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')}\n${indent})`
      return `${indent}{${emitExpr(mapExpr(node.source, ctx))}.map(${params} => ${body})}`
    }
    case 'element':
    case 'component': {
      if (node.kind === 'element' && node.tag === 'fragment') {
        if (!node.children.length) return `${indent}<></>`
        const inner = node.children.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')
        return `${indent}<>\n${inner}\n${indent}</>`
      }
      const tag = node.kind === 'component' ? node.name : node.tag
      const attrs = emitAttrs(node.props, ctx)
      const shw = node.kind === 'element' && node.tag.includes('-') ? ' suppressHydrationWarning' : ''
      if (!node.children.length) {
        return `${indent}<${tag}${attrs}${shw} />`
      }
      const inner = node.children.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')
      return `${indent}<${tag}${attrs}${shw}>\n${inner}\n${indent}</${tag}>`
    }
  }
}

function emitNodeInline(node: IrNode, ctx: EmitCtx): string {
  return emitNode(node, '', ctx).trim()
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
    .map((s) => `${indent}  ${emitStmt(rewriteReactStmt(s, ctx.states, ctx.reactives))}`)
    .join('\n')
  return [`${indent}function ${handler.name}(${params}) {`, body, `${indent}}`, '']
}

/**
 * Emit IR → React TSX body (no headers / `'use client'` / hash).
 */
export function emitReact(doc: IrDocument, opts?: { cssFileName?: string }): string {
  const lines: string[] = []
  if (opts?.cssFileName) {
    lines.push(`import './${opts.cssFileName}'`, '')
  }

  const ctx: EmitCtx = {
    states: stateNames(doc.state),
    reactives: reactiveNames(doc.state, doc.derived),
  }
  const withState = doc.state.length > 0 || doc.derived.length > 0
  const withChildren = hasSlot(doc.template)

  if (withState) {
    const hooks: string[] = []
    if (doc.state.length) hooks.push('useState')
    if (doc.derived.length) hooks.push('useMemo')
    lines.push(`import { ${hooks.join(', ')} } from 'react'`, '')
  }

  if (doc.props.length || withChildren) {
    const fields = doc.props.map((p) => {
      const opt = p.optional || p.default !== undefined ? '?' : ''
      return `  ${p.name}${opt}: ${emitPropType(p.type)}`
    })
    if (withChildren) fields.push('  children?: React.ReactNode')
    lines.push('type Props = {', ...fields, '}', '')
  }

  // v0: handlers outside component when no reactive state (stable goldens)
  if (!withState) {
    for (const handler of doc.handlers) {
      lines.push(...emitHandlerFn(handler, ctx, ''))
    }
  }

  let propsArg = ''
  if (doc.props.length || withChildren) {
    const parts = doc.props.map((p) =>
      p.default !== undefined ? `${p.name} = ${JSON.stringify(p.default)}` : p.name,
    )
    if (withChildren) parts.push('children')
    propsArg = `{ ${parts.join(', ')} }: Props`
  }

  const inner: string[] = []
  for (const s of doc.state) {
    inner.push(
      `  const [${s.name}, ${reactSetterName(s.name)}] = useState(${emitExpr(mapExpr(s.initial, ctx))})`,
    )
  }
  for (const d of doc.derived) {
    // Simple deps: all state names referenced loosely via useMemo without custom deps API
    const deps = doc.state.map((s) => s.name).join(', ')
    inner.push(
      `  const ${d.name} = useMemo(() => ${emitExpr(mapExpr(d.from, ctx))}, [${deps}])`,
    )
  }
  if (withState && doc.handlers.length) {
    if (doc.state.length || doc.derived.length) inner.push('')
    for (const handler of doc.handlers) {
      inner.push(...emitHandlerFn(handler, ctx, '  '))
    }
  }

  const template = rewritePropsAccess(emitNode(doc.template, '    ', ctx), doc.props)
  inner.push('  return (', template, '  )')

  lines.push(`export default function ${doc.name}(${propsArg}) {`, ...inner, '}')

  return `${lines.join('\n').trim()}\n`
}

/** Product convert: template IR + rewritten `<script setup>` body. */
export function emitReactProduct(
  doc: IrDocument,
  script: { imports: string[]; body: string[] },
  opts?: { cssFileName?: string; stateNames?: Set<string> },
): string {
  const lines: string[] = []
  lines.push(...script.imports)
  if (opts?.cssFileName) {
    lines.push(`import './${opts.cssFileName}'`, '')
  } else if (script.imports.length) {
    lines.push('')
  }

  const ctx: EmitCtx = {
    states: new Set(),
    reactives: new Set(),
    stateNames: opts?.stateNames,
  }
  const inner: string[] = script.body.flatMap((line) => line.split('\n').map((l) => `  ${l}`))
  if (inner.length) inner.push('')
  inner.push('  return (', emitNode(doc.template, '    ', ctx), '  )')

  lines.push(`export default function ${doc.name}() {`, ...inner, '}')
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
