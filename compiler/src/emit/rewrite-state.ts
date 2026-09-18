import type { IrExpr, IrStmt } from '../ir/types'

export function reactiveNames(state: { name: string }[], derived: { name: string }[]): Set<string> {
  return new Set([...state.map((s) => s.name), ...derived.map((d) => d.name)])
}

export function stateNames(state: { name: string }[]): Set<string> {
  return new Set(state.map((s) => s.name))
}

/** `count.set(x)` → true when `count` is a known state cell. */
export function isStateSetCall(
  expr: IrExpr,
  states: Set<string>,
): expr is IrExpr & {
  kind: 'call'
  callee: { kind: 'member'; object: { kind: 'ident'; name: string }; property: string }
  args: IrExpr[]
} {
  return (
    expr.kind === 'call' &&
    expr.callee.kind === 'member' &&
    expr.callee.object.kind === 'ident' &&
    expr.callee.property === 'set' &&
    states.has(expr.callee.object.name) &&
    expr.args.length === 1
  )
}

/** Strip `.value` on state/derived idents (Vue template / React reads). */
export function stripReactiveValue(expr: IrExpr, names: Set<string>): IrExpr {
  if (
    expr.kind === 'member' &&
    expr.property === 'value' &&
    expr.object.kind === 'ident' &&
    names.has(expr.object.name)
  ) {
    return { kind: 'ident', name: expr.object.name }
  }
  switch (expr.kind) {
    case 'literal':
    case 'ident':
      return expr
    case 'member':
      return { ...expr, object: stripReactiveValue(expr.object, names) }
    case 'binary':
      return {
        ...expr,
        left: stripReactiveValue(expr.left, names),
        right: stripReactiveValue(expr.right, names),
      }
    case 'call':
      return {
        ...expr,
        callee: stripReactiveValue(expr.callee, names),
        args: expr.args.map((a) => stripReactiveValue(a, names)),
      }
    case 'object':
      return {
        ...expr,
        properties: expr.properties.map((p) => ({
          key: p.key,
          value: stripReactiveValue(p.value, names),
        })),
      }
    case 'index':
      return {
        ...expr,
        object: stripReactiveValue(expr.object, names),
        index: stripReactiveValue(expr.index, names),
      }
    case 'conditional':
      return {
        ...expr,
        test: stripReactiveValue(expr.test, names),
        consequent: stripReactiveValue(expr.consequent, names),
        alternate: stripReactiveValue(expr.alternate, names),
      }
    case 'array':
      return {
        ...expr,
        elements: expr.elements.map((e) => stripReactiveValue(e, names)),
      }
    case 'raw':
      return expr
  }
}

/** Recurse Vue script exprs (`.set` is rewritten only at statement level). */
export function rewriteVueScriptExpr(expr: IrExpr, states: Set<string>): IrExpr {
  switch (expr.kind) {
    case 'literal':
    case 'ident':
      return expr
    case 'member':
      return { ...expr, object: rewriteVueScriptExpr(expr.object, states) }
    case 'binary':
      return {
        ...expr,
        left: rewriteVueScriptExpr(expr.left, states),
        right: rewriteVueScriptExpr(expr.right, states),
      }
    case 'call':
      return {
        ...expr,
        callee: rewriteVueScriptExpr(expr.callee, states),
        args: expr.args.map((a) => rewriteVueScriptExpr(a, states)),
      }
    case 'object':
      return {
        ...expr,
        properties: expr.properties.map((p) => ({
          key: p.key,
          value: rewriteVueScriptExpr(p.value, states),
        })),
      }
  }
}

export function rewriteVueScriptStmt(stmt: IrStmt, states: Set<string>): IrStmt {
  if (stmt.kind === 'expr' && isStateSetCall(stmt.value, states)) {
    return {
      kind: 'assign',
      target: {
        kind: 'member',
        object: { kind: 'ident', name: stmt.value.callee.object.name },
        property: 'value',
      },
      value: rewriteVueScriptExpr(stmt.value.args[0]!, states),
    }
  }
  if (stmt.kind === 'expr') {
    return { kind: 'expr', value: rewriteVueScriptExpr(stmt.value, states) }
  }
  if (stmt.kind === 'return') {
    return {
      kind: 'return',
      value: stmt.value ? rewriteVueScriptExpr(stmt.value, states) : undefined,
    }
  }
  if (stmt.kind === 'assign') {
    return {
      kind: 'assign',
      target: rewriteVueScriptExpr(stmt.target, states),
      value: rewriteVueScriptExpr(stmt.value, states),
    }
  }
  return stmt
}

export function reactSetterName(stateName: string): string {
  return `set${stateName.charAt(0).toUpperCase()}${stateName.slice(1)}`
}

/** React: strip `.value`; rewrite `count.set(x)` → `setCount(x)`. */
export function rewriteReactExpr(expr: IrExpr, states: Set<string>, reactives: Set<string>): IrExpr {
  if (isStateSetCall(expr, states)) {
    return {
      kind: 'call',
      callee: { kind: 'ident', name: reactSetterName(expr.callee.object.name) },
      args: [rewriteReactExpr(expr.args[0]!, states, reactives)],
    }
  }
  if (
    expr.kind === 'member' &&
    expr.property === 'value' &&
    expr.object.kind === 'ident' &&
    reactives.has(expr.object.name)
  ) {
    return { kind: 'ident', name: expr.object.name }
  }
  switch (expr.kind) {
    case 'literal':
    case 'ident':
      return expr
    case 'member':
      return { ...expr, object: rewriteReactExpr(expr.object, states, reactives) }
    case 'binary':
      return {
        ...expr,
        left: rewriteReactExpr(expr.left, states, reactives),
        right: rewriteReactExpr(expr.right, states, reactives),
      }
    case 'call':
      return {
        ...expr,
        callee: rewriteReactExpr(expr.callee, states, reactives),
        args: expr.args.map((a) => rewriteReactExpr(a, states, reactives)),
      }
    case 'object':
      return {
        ...expr,
        properties: expr.properties.map((p) => ({
          key: p.key,
          value: rewriteReactExpr(p.value, states, reactives),
        })),
      }
    case 'index':
      return {
        ...expr,
        object: rewriteReactExpr(expr.object, states, reactives),
        index: rewriteReactExpr(expr.index, states, reactives),
      }
    case 'conditional':
      return {
        ...expr,
        test: rewriteReactExpr(expr.test, states, reactives),
        consequent: rewriteReactExpr(expr.consequent, states, reactives),
        alternate: rewriteReactExpr(expr.alternate, states, reactives),
      }
    case 'array':
      return {
        ...expr,
        elements: expr.elements.map((e) => rewriteReactExpr(e, states, reactives)),
      }
    case 'raw':
      return expr
  }
}

export function rewriteReactStmt(stmt: IrStmt, states: Set<string>, reactives: Set<string>): IrStmt {
  switch (stmt.kind) {
    case 'expr':
      return { kind: 'expr', value: rewriteReactExpr(stmt.value, states, reactives) }
    case 'return':
      return {
        kind: 'return',
        value: stmt.value ? rewriteReactExpr(stmt.value, states, reactives) : undefined,
      }
    case 'assign':
      return {
        kind: 'assign',
        target: rewriteReactExpr(stmt.target, states, reactives),
        value: rewriteReactExpr(stmt.value, states, reactives),
      }
  }
}
