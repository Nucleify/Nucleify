import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { parse as parseSfc } from '@vue/compiler-sfc'
import { NodeTypes, parse as parseVueTemplate } from '@vue/compiler-dom'
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
import { vueEventToIr } from '../adapters/events'
import { toVueClassAttr } from '../adapters/class-name'
import { ParseError, fail, parseExpr, parseStmt } from './tsx'
import { emitBaseName, inferComponentName } from '../sync/paths'

function parseExprSource(filePath: string, expr: string): IrExpr {
  const source = `const __nuc = ${expr}`
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

function parseScriptModule(filePath: string, source: string): any {
  const result = parseSync(filePath, source, { lang: 'ts', sourceType: 'module' })
  if (result.errors?.length) {
    const err = result.errors[0]
    throw new ParseError(err.message || 'parse error', filePath, err.label?.start?.line)
  }
  return result.program
}

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

function parsePropsFromDefineProps(filePath: string, source: string, typeNode: any, defaultsNode?: any): IrProp[] {
  if (typeNode?.type !== 'TSTypeLiteral') {
    fail(filePath, source, typeNode, 'defineProps must use an inline type literal in v0.1')
  }
  const defaults: Record<string, unknown> = {}
  if (defaultsNode?.type === 'ObjectExpression') {
    for (const prop of defaultsNode.properties) {
      if (prop.type !== 'Property') continue
      const key = propKeyName(prop.key)
      if (!key) continue
      if (prop.value?.type === 'Literal') defaults[key] = prop.value.value
    }
  }
  const props: IrProp[] = []
  for (const member of typeNode.members ?? []) {
    if (member.type !== 'TSPropertySignature') continue
    const name = propKeyName(member.key)
    if (!name) continue
    const optional = Boolean(member.optional)
    let type: IrPropType = 'unknown'
    const ann = member.typeAnnotation?.typeAnnotation
    if (ann?.type === 'TSStringKeyword') type = 'string'
    else if (ann?.type === 'TSNumberKeyword') type = 'number'
    else if (ann?.type === 'TSBooleanKeyword') type = 'boolean'
    const irProp: IrProp = { name, type }
    if (optional) irProp.optional = true
    if (defaults[name] !== undefined) irProp.default = defaults[name]
    props.push(irProp)
  }
  return props
}

function typeArgFromCall(call: any): any {
  return call?.typeArguments?.params?.[0] ?? call?.typeParameters?.params?.[0]
}

function parseScriptSetup(
  filePath: string,
  script: string,
): {
  props: IrProp[]
  state: IrState[]
  derived: IrDerived[]
  handlers: IrHandler[]
  cssImport?: string
} {
  const program = parseScriptModule(filePath, script)
  let props: IrProp[] = []
  const state: IrState[] = []
  const derived: IrDerived[] = []
  const handlers: IrHandler[] = []
  let cssImport: string | undefined

  for (const stmt of program.body ?? []) {
    if (stmt.type === 'ImportDeclaration') {
      const source = stmt.source?.value
      if (typeof source === 'string' && source.endsWith('.css')) {
        cssImport = source.replace(/^\.\//, '')
      }
      continue
    }
    if (stmt.type === 'VariableDeclaration' && stmt.kind === 'const') {
      for (const decl of stmt.declarations) {
        if (decl.id?.type !== 'Identifier') continue
        const name = decl.id.name as string
        const init = unwrap(decl.init)
        if (name === 'props') {
          if (init?.type === 'CallExpression' && init.callee?.name === 'defineProps') {
            props = parsePropsFromDefineProps(filePath, script, typeArgFromCall(init))
          } else if (
            init?.type === 'CallExpression' &&
            init.callee?.name === 'withDefaults' &&
            init.arguments?.[0]?.type === 'CallExpression' &&
            init.arguments[0].callee?.name === 'defineProps'
          ) {
            props = parsePropsFromDefineProps(
              filePath,
              script,
              typeArgFromCall(init.arguments[0]),
              init.arguments[1],
            )
          }
          continue
        }
        if (init?.type === 'CallExpression' && init.callee?.type === 'Identifier') {
          if (init.callee.name === 'ref' && init.arguments?.length === 1) {
            state.push({ name, initial: parseExpr(filePath, script, init.arguments[0]) })
            continue
          }
          if (init.callee.name === 'computed' && init.arguments?.length === 1) {
            const arg = init.arguments[0]
            const body =
              arg?.type === 'ArrowFunctionExpression' || arg?.type === 'FunctionExpression'
                ? unwrap(arg.body?.type === 'BlockStatement' ? arg.body.body[0]?.argument : arg.body)
                : null
            if (!body) fail(filePath, script, arg, 'computed() expects an arrow function')
            derived.push({ name, from: parseExpr(filePath, script, body) })
            continue
          }
        }
      }
      continue
    }
    if (stmt.type === 'FunctionDeclaration' && stmt.id?.type === 'Identifier') {
      handlers.push({
        name: stmt.id.name,
        params: (stmt.params ?? []).map((p: any) => {
          if (p.type !== 'Identifier') fail(filePath, script, p, 'handler params must be identifiers')
          return p.name
        }),
        body: (stmt.body?.body ?? []).map((s: any) => parseStmt(filePath, script, s)),
      })
    }
  }

  return { props, state, derived, handlers, cssImport }
}

function wrapReactiveInTemplate(expr: IrExpr, reactives: Set<string>): IrExpr {
  if (expr.kind === 'ident' && reactives.has(expr.name)) {
    return { kind: 'member', object: expr, property: 'value' }
  }
  switch (expr.kind) {
    case 'literal':
    case 'ident':
      return expr
    case 'member':
      return { ...expr, object: wrapReactiveInTemplate(expr.object, reactives) }
    case 'index':
      return {
        ...expr,
        object: wrapReactiveInTemplate(expr.object, reactives),
        index: wrapReactiveInTemplate(expr.index, reactives),
      }
    case 'conditional':
      return {
        ...expr,
        test: wrapReactiveInTemplate(expr.test, reactives),
        consequent: wrapReactiveInTemplate(expr.consequent, reactives),
        alternate: wrapReactiveInTemplate(expr.alternate, reactives),
      }
    case 'binary':
      return {
        ...expr,
        left: wrapReactiveInTemplate(expr.left, reactives),
        right: wrapReactiveInTemplate(expr.right, reactives),
      }
    case 'call':
      return {
        ...expr,
        callee: wrapReactiveInTemplate(expr.callee, reactives),
        args: expr.args.map((a) => wrapReactiveInTemplate(a, reactives)),
      }
    case 'object':
      return {
        ...expr,
        properties: expr.properties.map((p) => ({
          key: p.key,
          value: wrapReactiveInTemplate(p.value, reactives),
        })),
      }
    case 'index':
      return {
        ...expr,
        object: wrapReactiveInTemplate(expr.object, reactives),
        index: wrapReactiveInTemplate(expr.index, reactives),
      }
    case 'conditional':
      return {
        ...expr,
        test: wrapReactiveInTemplate(expr.test, reactives),
        consequent: wrapReactiveInTemplate(expr.consequent, reactives),
        alternate: wrapReactiveInTemplate(expr.alternate, reactives),
      }
    case 'array':
      return {
        ...expr,
        elements: expr.elements.map((e) => wrapReactiveInTemplate(e, reactives)),
      }
    case 'raw':
      return expr
    default:
      return expr
  }
}

function parseElementAttrs(filePath: string, props: any[], reactives: Set<string>): IrAttr[] {
  const attrs: IrAttr[] = []
  for (const prop of props ?? []) {
    if (prop.type === NodeTypes.ATTRIBUTE) {
      const name = toVueClassAttr(prop.name)
      if (name === 'ref' && prop.value?.content != null) {
        attrs.push({
          kind: 'bind',
          name: 'ref',
          value: { kind: 'ident', name: prop.value.content.trim() },
        })
        continue
      }
      if (prop.value?.content != null) {
        attrs.push({ kind: 'static', name, value: prop.value.content })
      } else {
        attrs.push({ kind: 'static', name, value: true })
      }
      continue
    }
    if (prop.type === NodeTypes.DIRECTIVE) {
      if (prop.name === 'bind' && prop.arg?.content) {
        const name = toVueClassAttr(prop.arg.content)
        attrs.push({ kind: 'bind', name, value: wrapReactiveInTemplate(parseExprSource(filePath, prop.exp.content), reactives) })
        continue
      }
      if (prop.name === 'ref' && prop.exp?.content) {
        attrs.push({
          kind: 'bind',
          name: 'ref',
          value: { kind: 'ident', name: prop.exp.content.trim() },
        })
        continue
      }
      if (prop.name === 'on' && prop.arg?.content) {
        const handler = prop.exp?.content?.trim()
        if (!handler) fail(filePath, '', prop, 'event handler expression required')
        attrs.push({
          kind: 'event',
          name: vueEventToIr('on', prop.arg.content),
          handler,
        })
        continue
      }
      if (prop.name === 'if' || prop.name === 'else' || prop.name === 'for') {
        continue
      }
      fail(filePath, '', prop, `unsupported directive v-${prop.name}`)
    }
  }
  return attrs
}

function parseTemplateNodes(filePath: string, nodes: any[], reactives: Set<string>): IrNode[] {
  const out: IrNode[] = []
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i]
    if (node.type === NodeTypes.TEXT) {
      const text = String(node.content).replace(/\s+/g, ' ').trim()
      if (text) out.push({ kind: 'text', value: text })
      continue
    }
    if (node.type === NodeTypes.INTERPOLATION) {
      out.push({ kind: 'expr', value: wrapReactiveInTemplate(parseExprSource(filePath, node.content.content), reactives) })
      continue
    }
    if (node.type === NodeTypes.ELEMENT) {
      const ifDir = node.props?.find((p: any) => p.type === NodeTypes.DIRECTIVE && p.name === 'if')
      if (ifDir) {
        const test = wrapReactiveInTemplate(parseExprSource(filePath, ifDir.exp.content), reactives)
        const thenNodes: IrNode[] = []
        const element = parseElementWithoutFlow(filePath, node, reactives)
        thenNodes.push(element)
        let j = i + 1
        const elseIfBranches: { test: IrExpr; then: IrNode[] }[] = []
        let elseNodes: IrNode[] | undefined

        while (j < nodes.length) {
          const next = nodes[j]
          if (next.type !== NodeTypes.ELEMENT) break
          const elseIfDir = next.props?.find(
            (p: any) => p.type === NodeTypes.DIRECTIVE && p.name === 'else-if',
          )
          if (elseIfDir) {
            elseIfBranches.push({
              test: wrapReactiveInTemplate(parseExprSource(filePath, elseIfDir.exp.content), reactives),
              then: [parseElementWithoutFlow(filePath, next, reactives)],
            })
            j += 1
            continue
          }
          const elseDir = next.props?.find(
            (p: any) => p.type === NodeTypes.DIRECTIVE && p.name === 'else',
          )
          if (elseDir) {
            elseNodes = [parseElementWithoutFlow(filePath, next, reactives)]
            j += 1
          }
          break
        }

        let elseBranch: IrNode[] | undefined = elseNodes
        for (let k = elseIfBranches.length - 1; k >= 0; k -= 1) {
          const branch = elseIfBranches[k]!
          elseBranch = [{ kind: 'if', test: branch.test, then: branch.then, else: elseBranch }]
        }

        out.push({ kind: 'if', test, then: thenNodes, else: elseBranch })
        i = j - 1
        continue
      }
      out.push(parseElementNode(filePath, node, reactives))
    }
  }
  return out
}

function parseElementWithoutFlow(filePath: string, node: any, reactives: Set<string>): IrNode {
  const forDir = node.props?.find((p: any) => p.type === NodeTypes.DIRECTIVE && p.name === 'for')
  if (forDir) {
    const source = forDir.exp?.content ?? ''
    const match = source.match(/^\s*\(?\s*([A-Za-z_$][\w$]*)(?:\s*,\s*([A-Za-z_$][\w$]*))?\s*\)?\s+in\s+(.+)$/)
    if (!match) fail(filePath, '', forDir, `unsupported v-for: ${source}`)
    const [, item, index, listExpr] = match
    const body = [parseElementWithoutFlow(filePath, { ...node, props: node.props.filter((p: any) => p.name !== 'for') }, reactives)]
    return {
      kind: 'for',
      source: wrapReactiveInTemplate(parseExprSource(filePath, listExpr.trim()), reactives),
      item: item!,
      index: index || undefined,
      body,
    }
  }
  const tag = node.tag as string
  const attrs = parseElementAttrs(
    filePath,
    (node.props ?? []).filter(
      (p: any) =>
        !(p.type === NodeTypes.DIRECTIVE && ['if', 'else', 'else-if', 'for'].includes(p.name)),
    ),
    reactives,
  )
  if (tag === 'slot') {
    const children = parseTemplateNodes(filePath, node.children ?? [], reactives)
    return children.length ? { kind: 'slot', children } : { kind: 'slot' }
  }
  const children = parseTemplateNodes(filePath, node.children ?? [], reactives)
  const isComponent = /^[A-Z]/.test(tag) || tag.includes('.')
  if (isComponent) {
    return { kind: 'component', name: tag, props: attrs, children }
  }
  if (!children.length) {
    return { kind: 'element', tag, props: attrs, children: [] }
  }
  return { kind: 'element', tag, props: attrs, children }
}

function parseElementNode(filePath: string, node: any, reactives: Set<string>): IrNode {
  return parseElementWithoutFlow(filePath, node, reactives)
}

function parseTemplateRoot(filePath: string, template: string, reactives: Set<string>): IrNode {
  const ast = parseVueTemplate(template)
  const children = parseTemplateNodes(filePath, ast.children, reactives)
  if (children.length === 1) return children[0]!
  return { kind: 'element', tag: 'fragment', props: [], children }
}

function normalizeStateHandlerStmts(handlers: IrHandler[], state: IrState[]): IrHandler[] {
  const states = new Set(state.map((s) => s.name))
  return handlers.map((handler) => ({
    ...handler,
    body: handler.body.map((stmt) => {
      if (
        stmt.kind === 'assign' &&
        stmt.target.kind === 'member' &&
        stmt.target.property === 'value' &&
        stmt.target.object.kind === 'ident' &&
        states.has(stmt.target.object.name)
      ) {
        return {
          kind: 'expr' as const,
          value: {
            kind: 'call' as const,
            callee: {
              kind: 'member' as const,
              object: { kind: 'ident' as const, name: stmt.target.object.name },
              property: 'set',
            },
            args: [stmt.value],
          },
        }
      }
      return stmt
    }),
  }))
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
      // try next candidate
    }
  }
  return undefined
}

/**
 * Parse generated `.vue` emit → IR (subset matching portable fixtures).
 */
export function parseVueToIr(source: string, filePath: string, opts?: { name?: string }): IrDocument {
  const { descriptor, errors } = parseSfc(source, { filename: filePath })
  if (errors.length) {
    throw new ParseError(errors.map((e) => e.message).join('; '), filePath)
  }
  const script = descriptor.scriptSetup?.content?.trim()
  if (!descriptor.template?.content) {
    throw new ParseError('expected <template> in vue emit', filePath)
  }

  const parsed = script
    ? parseScriptSetup(filePath, script)
    : {
        props: [] as IrProp[],
        state: [] as IrState[],
        derived: [] as IrDerived[],
        handlers: [] as IrHandler[],
        cssImport: undefined as string | undefined,
      }
  const reactives = new Set([...parsed.state.map((s) => s.name), ...parsed.derived.map((d) => d.name)])
  const template = parseTemplateRoot(filePath, descriptor.template.content, reactives)
  const base = emitBaseName(filePath.replace(/\.vue$/, '.nuc.tsx'))
  const name = opts?.name ?? inferComponentName(base)
  const css = loadSiblingCss(filePath, parsed.cssImport)
  const handlers = normalizeStateHandlerStmts(parsed.handlers, parsed.state)

  const doc: IrDocument = {
    irVersion: '0.1.0',
    name,
    portable: true,
    props: parsed.props,
    state: parsed.state,
    derived: parsed.derived,
    handlers,
    template,
    ...(css ? { styles: { css } } : {}),
    meta: { sourcePath: filePath },
  }

  return parseIrDocument(doc)
}

/** Parse `<template>` only (product convert — script rewritten separately). */
export function parseVueTemplateToIr(
  template: string,
  filePath: string,
  reactives: Set<string> = new Set(),
): IrNode {
  return parseTemplateRoot(filePath, template, reactives)
}

/** @deprecated alias */
export const parseVue = parseVueToIr
