import type { IrAttr, IrDocument, IrExpr, IrHandler, IrNode, IrProp, IrStmt } from '../ir/types'
import { irEventToReact } from '../adapters/events'
import { toReactClassName } from '../adapters/class-name'
import { reactiveNames, stateNames } from './rewrite-state'

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

function emitPropField(prop: IrProp): string {
  const fields: string[] = [`type: '${prop.type}'`]
  if (prop.optional) fields.push('optional: true')
  if (prop.default !== undefined) fields.push(`default: ${JSON.stringify(prop.default)}`)
  return `    ${prop.name}: { ${fields.join(', ')} },`
}

function emitAttrs(attrs: IrAttr[], handlersPrefix?: string): string {
  const parts: string[] = []
  for (const attr of attrs) {
    if (attr.kind === 'static') {
      const name = toReactClassName(attr.name)
      if (typeof attr.value === 'boolean') {
        parts.push(attr.value ? name : `${name}={false}`)
      } else if (typeof attr.value === 'number') {
        parts.push(`${name}={${attr.value}}`)
      } else {
        parts.push(`${name}=${JSON.stringify(attr.value)}`)
      }
    } else if (attr.kind === 'bind') {
      const name = toReactClassName(attr.name)
      parts.push(`${name}={${emitExpr(attr.value)}}`)
    } else if (attr.kind === 'event') {
      const handlerRef = handlersPrefix ? `${handlersPrefix}.${attr.handler}` : attr.handler
      parts.push(`${irEventToReact(attr.name)}={${handlerRef}}`)
    }
  }
  return parts.length ? ` ${parts.join(' ')}` : ''
}

function emitNode(node: IrNode, indent: string, reactives: Set<string>, handlersPrefix?: string): string {
  switch (node.kind) {
    case 'text':
      return `${indent}${node.value}`
    case 'expr':
      return `${indent}{${emitExpr(wrapReactiveRead(node.value, reactives))}}`
    case 'slot':
      return `${indent}<slot />`
    case 'if': {
      const test = emitExpr(wrapReactiveRead(node.test, reactives))
      const thenExpr =
        node.then.length === 1
          ? emitNodeInline(node.then[0]!, reactives, handlersPrefix)
          : `(\n${node.then.map((c) => emitNode(c, `${indent}  `, reactives, handlersPrefix)).join('\n')}\n${indent})`
      if (!node.else?.length) {
        return `${indent}{${test} ? ${thenExpr} : null}`
      }
      const elseExpr =
        node.else.length === 1
          ? emitNodeInline(node.else[0]!, reactives, handlersPrefix)
          : `(\n${node.else.map((c) => emitNode(c, `${indent}  `, reactives, handlersPrefix)).join('\n')}\n${indent})`
      return `${indent}{${test} ? ${thenExpr} : ${elseExpr}}`
    }
    case 'for': {
      const params = node.index != null ? `(${node.item}, ${node.index})` : node.item
      const body =
        node.body.length === 1
          ? emitNodeInline(node.body[0]!, reactives, handlersPrefix)
          : `(\n${node.body.map((c) => emitNode(c, `${indent}  `, reactives, handlersPrefix)).join('\n')}\n${indent})`
      return `${indent}{${emitExpr(wrapReactiveRead(node.source, reactives))}.map(${params} => ${body})}`
    }
    case 'element':
    case 'component': {
      if (node.kind === 'element' && node.tag === 'fragment') {
        const inner = node.children.map((c) => emitNode(c, `${indent}  `, reactives, handlersPrefix)).join('\n')
        return `${indent}<>\n${inner}\n${indent}</>`
      }
      const tag = node.kind === 'component' ? node.name : node.tag
      const attrs = emitAttrs(node.props, handlersPrefix)
      if (!node.children.length) {
        return `${indent}<${tag}${attrs} />`
      }
      const inner = node.children.map((c) => emitNode(c, `${indent}  `, reactives, handlersPrefix)).join('\n')
      return `${indent}<${tag}${attrs}>\n${inner}\n${indent}</${tag}>`
    }
  }
}

function emitNodeInline(node: IrNode, reactives: Set<string>, handlersPrefix?: string): string {
  return emitNode(node, '', reactives, handlersPrefix).trim()
}

function wrapReactiveRead(expr: IrExpr, reactives: Set<string>): IrExpr {
  if (expr.kind === 'ident' && reactives.has(expr.name)) {
    return { kind: 'member', object: expr, property: 'value' }
  }
  switch (expr.kind) {
    case 'literal':
    case 'ident':
      return expr
    case 'member':
      return { ...expr, object: wrapReactiveRead(expr.object, reactives) }
    case 'binary':
      return {
        ...expr,
        left: wrapReactiveRead(expr.left, reactives),
        right: wrapReactiveRead(expr.right, reactives),
      }
    case 'call':
      return {
        ...expr,
        callee: wrapReactiveRead(expr.callee, reactives),
        args: expr.args.map((a) => wrapReactiveRead(a, reactives)),
      }
    case 'object':
      return {
        ...expr,
        properties: expr.properties.map((p) => ({
          key: p.key,
          value: wrapReactiveRead(p.value, reactives),
        })),
      }
  }
}

function emitNucStmt(stmt: IrStmt, states: Set<string>): string {
  if (stmt.kind === 'assign') {
    if (
      stmt.target.kind === 'member' &&
      stmt.target.property === 'value' &&
      stmt.target.object.kind === 'ident' &&
      states.has(stmt.target.object.name)
    ) {
      return `${stmt.target.object.name}.set(${emitExpr(stmt.value)})`
    }
    return `${emitExpr(stmt.target)} = ${emitExpr(stmt.value)}`
  }
  if (stmt.kind === 'return') {
    return stmt.value ? `return ${emitExpr(stmt.value)}` : 'return'
  }
  return emitExpr(stmt.value)
}

function emitHandlerBody(handler: IrHandler, states: Set<string>, indent: string): string[] {
  return handler.body.map((s) => `${indent}${emitNucStmt(s, states)}`)
}

function emitRenderBody(doc: IrDocument, handlersPrefix?: string): string {
  const reactives = reactiveNames(doc.state, doc.derived)
  const jsx = emitNode(doc.template, '    ', reactives, handlersPrefix)
  return jsx
}

/**
 * Emit IR → authoring `*.nuc.tsx` body (no Biome pass here; caller may format).
 */
export function emitNucTsx(doc: IrDocument): string {
  const lines: string[] = []
  const usesSetup = doc.state.length > 0 || doc.derived.length > 0
  const runtimeImports = ['component']
  if (usesSetup) {
    runtimeImports.push('state', 'derived', 'handler')
  }
  lines.push(`import { ${runtimeImports.join(', ')} } from '#nuc-compiler/runtime'`, '')
  lines.push('export default component({')
  lines.push(`  name: '${doc.name}',`)

  if (doc.props.length) {
    lines.push('  props: {')
    for (const prop of doc.props) {
      lines.push(emitPropField(prop))
    }
    lines.push('  },')
  }

  if (doc.styles?.css) {
    const css = doc.styles.css.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
    lines.push(`  styles: { css: '${css}' },`)
  }

  const states = stateNames(doc.state)

  if (usesSetup) {
    lines.push('  setup(props) {')
    for (const s of doc.state) {
      lines.push(`    const ${s.name} = state(${emitExpr(s.initial)})`)
    }
    for (const d of doc.derived) {
      lines.push(`    const ${d.name} = derived(() => ${emitExpr(wrapReactiveRead(d.from, reactiveNames(doc.state, doc.derived)))})`)
    }
    for (const handler of doc.handlers) {
      lines.push(`    const ${handler.name} = handler(() => {`)
      lines.push(...emitHandlerBody(handler, states, '      '))
      lines.push('    })')
    }
    lines.push('    return () => (')
    lines.push(emitRenderBody(doc))
    lines.push('    )')
    lines.push('  },')
  } else {
    if (doc.handlers.length) {
      lines.push('  handlers: {')
      for (const handler of doc.handlers) {
        const params = handler.params.join(', ')
        lines.push(`    ${handler.name}(${params}) {`)
        lines.push(...emitHandlerBody(handler, states, '      '))
        lines.push('    },')
      }
      lines.push('  },')
    }
    const renderParams = doc.handlers.length ? 'props, handlers' : 'props'
    lines.push(`  render: (${renderParams}) => (`)
    lines.push(emitRenderBody(doc, doc.handlers.length ? 'handlers' : undefined))
    lines.push('  ),')
  }

  lines.push('})', '')
  return `${lines.join('\n')}\n`
}
