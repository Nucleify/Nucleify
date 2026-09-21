import type { IrAttr, IrDocument, IrExpr, IrNode, IrProp, IrStmt } from '../ir/types'
import { irEventToReact } from '../adapters/events'
import {
  reactiveNames,
  reactSetterName,
  stateNames,
  isStateSetCall,
} from './rewrite-state'

type EmitCtx = {
  states: Set<string>
  reactives: Set<string>
}

/** Solid: strip `.value`; `count.set(x)` → `setCount(x)`; reactive reads → `count()`. */
export function rewriteSolidExpr(expr: IrExpr, states: Set<string>, reactives: Set<string>): IrExpr {
  if (isStateSetCall(expr, states)) {
    return {
      kind: 'call',
      callee: { kind: 'ident', name: reactSetterName(expr.callee.object.name) },
      args: [rewriteSolidExpr(expr.args[0]!, states, reactives)],
    }
  }
  if (
    expr.kind === 'member' &&
    expr.property === 'value' &&
    expr.object.kind === 'ident' &&
    reactives.has(expr.object.name)
  ) {
    return { kind: 'call', callee: { kind: 'ident', name: expr.object.name }, args: [] }
  }
  switch (expr.kind) {
    case 'literal':
    case 'ident':
      return expr
    case 'member':
      return { ...expr, object: rewriteSolidExpr(expr.object, states, reactives) }
    case 'binary':
      return {
        ...expr,
        left: rewriteSolidExpr(expr.left, states, reactives),
        right: rewriteSolidExpr(expr.right, states, reactives),
      }
    case 'call':
      return {
        ...expr,
        callee: rewriteSolidExpr(expr.callee, states, reactives),
        args: expr.args.map((a) => rewriteSolidExpr(a, states, reactives)),
      }
    case 'object':
      return {
        ...expr,
        properties: expr.properties.map((p) => ({
          key: p.key,
          value: rewriteSolidExpr(p.value, states, reactives),
        })),
      }
    case 'index':
      return {
        ...expr,
        object: rewriteSolidExpr(expr.object, states, reactives),
        index: rewriteSolidExpr(expr.index, states, reactives),
      }
    case 'conditional':
      return {
        ...expr,
        test: rewriteSolidExpr(expr.test, states, reactives),
        consequent: rewriteSolidExpr(expr.consequent, states, reactives),
        alternate: rewriteSolidExpr(expr.alternate, states, reactives),
      }
    case 'array':
      return {
        ...expr,
        elements: expr.elements.map((e) => rewriteSolidExpr(e, states, reactives)),
      }
    case 'raw':
      return expr
  }
}

export function rewriteSolidStmt(stmt: IrStmt, states: Set<string>, reactives: Set<string>): IrStmt {
  switch (stmt.kind) {
    case 'expr':
      return { kind: 'expr', value: rewriteSolidExpr(stmt.value, states, reactives) }
    case 'return':
      return {
        kind: 'return',
        value: stmt.value ? rewriteSolidExpr(stmt.value, states, reactives) : undefined,
      }
    case 'assign':
      return {
        kind: 'assign',
        target: rewriteSolidExpr(stmt.target, states, reactives),
        value: rewriteSolidExpr(stmt.value, states, reactives),
      }
    case 'const':
      return {
        kind: 'const',
        name: stmt.name,
        value: rewriteSolidExpr(stmt.value, states, reactives),
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
  return rewriteSolidExpr(expr, ctx.states, ctx.reactives)
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

/** Solid JSX uses `class`, not `className`. */
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

function toSolidAttrName(name: string): string {
  if (name === 'className') return 'class'
  return name
}

function rewriteInlineEventHandler(code: string): string {
  const inner = code.trim()
  if (/^[a-zA-Z_$][\w$]*$/.test(inner)) return inner
  if (/=[^=]/.test(inner) && !inner.includes('=>')) return `() => { ${inner} }`
  return `() => ${inner}`
}

function emitAttrs(attrs: IrAttr[], ctx: EmitCtx, tag?: string): string {
  const parts: string[] = []
  let staticClass: string | undefined
  let bindClass: IrExpr | undefined
  let hasMode = false
  let classSlotIndex: number | null = null

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
    const solidName = toSolidAttrName(attr.name)
    if (attr.name === 'mode' || solidName === 'mode') hasMode = true
    if (solidName === 'class' || attr.name === 'class' || attr.name === 'className') {
      mergeClassAttr(attr)
      if (classSlotIndex === null) classSlotIndex = parts.length
      continue
    }
    if (attr.kind === 'bind' && attr.name === 'ref') {
      parts.push(`ref={${emitExpr(mapExpr(attr.value, ctx))}}`)
      continue
    }
    if (attr.kind === 'static') {
      if (typeof attr.value === 'boolean') {
        parts.push(`${solidName}={${attr.value ? 'true' : 'false'}}`)
      } else if (typeof attr.value === 'number') {
        parts.push(`${solidName}={${attr.value}}`)
      } else {
        parts.push(`${solidName}=${JSON.stringify(attr.value)}`)
      }
    } else if (attr.kind === 'bind') {
      parts.push(`${solidName}={${emitExpr(mapExpr(attr.value, ctx))}}`)
    } else if (attr.kind === 'event') {
      parts.push(`${irEventToReact(attr.name)}={${rewriteInlineEventHandler(attr.handler)}}`)
    }
  }

  const classAttr = emitClassAttr(staticClass, bindClass, ctx)
  if (classAttr) {
    parts.splice(classSlotIndex ?? parts.length, 0, classAttr)
  }

  if (tag === 'nui-icon' && !hasMode) parts.push('mode="svg"')

  return parts.length ? ` ${parts.join(' ')}` : ''
}

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
      return `${indent}{props.children}`
    case 'if': {
      const thenExpr =
        node.then.length === 1
          ? emitNodeInline(node.then[0]!, ctx)
          : `(\n${node.then.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')}\n${indent})`
      if (!node.else?.length) {
        return `${indent}{${emitExpr(mapExpr(node.test, ctx))} ? ${thenExpr} : null}`
      }
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
      if (node.kind === 'element' && (node.tag === 'fragment' || node.tag === 'template')) {
        if (!node.children.length) return `${indent}<></>`
        const inner = node.children.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')
        return `${indent}<>\n${inner}\n${indent}</>`
      }
      const tag = node.kind === 'component' ? node.name : node.tag
      const attrs = emitAttrs(node.props, ctx, tag)
      const jsx = !node.children.length
        ? `${indent}<${tag}${attrs} />`
        : `${indent}<${tag}${attrs}>\n${node.children.map((c) => emitNode(c, `${indent}  `, ctx)).join('\n')}\n${indent}</${tag}>`
      return jsx
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
    .map((s) => `${indent}  ${emitStmt(rewriteSolidStmt(s, ctx.states, ctx.reactives))}`)
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
 * Emit IR → Solid TSX body (no headers / hash).
 */
export function emitSolid(doc: IrDocument, opts?: { cssFileName?: string }): string {
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
    if (doc.state.length) hooks.push('createSignal')
    if (doc.derived.length) hooks.push('createMemo')
    lines.push(`import { ${hooks.join(', ')} } from 'solid-js'`, '')
  } else if (withChildren) {
    lines.push(`import type { JSX } from 'solid-js'`, '')
  }

  if (doc.props.length || withChildren) {
    const fields = doc.props.map((p) => {
      const opt = p.optional || p.default !== undefined ? '?' : ''
      return `  ${p.name}${opt}: ${emitPropType(p.type)}`
    })
    if (withChildren) fields.push('  children?: JSX.Element')
    lines.push('type Props = {', ...fields, '}', '')
  }

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
      `  const [${s.name}, ${reactSetterName(s.name)}] = createSignal(${emitExpr(mapExpr(s.initial, ctx))})`,
    )
  }
  for (const d of doc.derived) {
    inner.push(`  const ${d.name} = createMemo(() => ${emitExpr(mapExpr(d.from, ctx))})`)
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
