import { readBody } from 'h3'

import type { ApiContext, ApiHandlerResult, Json } from 'nuc_server'
import {
  type GatewayListScope,
  gatewayUserFromJwt,
  resolveGatewayListScope,
} from 'nuc_server'

import {
  apiBody,
  apiDeleted,
  apiError,
  apiMethodNotAllowed,
  apiOk,
  fromScopeError,
  fromSupabaseError,
} from './response'

export type { ApiContext, Json } from 'nuc_server'

export async function requireGatewayScope(
  ctx: ApiContext
): Promise<GatewayListScope | ApiHandlerResult> {
  const scope = await resolveGatewayListScope(ctx.supabase, ctx.event)
  if ('error' in scope) return fromScopeError(scope)
  return scope
}

export async function requireGatewayUser(ctx: ApiContext) {
  const auth = await gatewayUserFromJwt(ctx.supabase, ctx.event)
  if ('error' in auth) return fromScopeError(auth)
  return auth
}

const COUNT_SEGMENT = 'count-by-created-last-week'

function oneWeekAgoIso(): string {
  const d = new Date()
  d.setDate(d.getDate() - 7)
  return d.toISOString()
}

function applyScopeEq<T>(q: T, scope: GatewayListScope, column: string): T {
  if (scope.mode === 'own')
    return (q as { eq: (c: string, v: string) => T }).eq(column, scope.userId)
  return q
}

export type CountLastWeekOptions = {
  table: string
  pathStyle?: 'suffix' | 'nested'
  scoped?: boolean
  scopeColumn?: string
  countShape?: 'scalar' | 'object'
}

export async function tryCountByCreatedLastWeek(
  ctx: ApiContext,
  opts: CountLastWeekOptions
): Promise<ApiHandlerResult | null> {
  const { method, segments, supabase } = ctx
  if (method !== 'GET') return null

  const pathStyle = opts.pathStyle ?? 'suffix'
  const matches =
    pathStyle === 'nested'
      ? segments[1] === COUNT_SEGMENT
      : segments.length === 2 && segments[1] === COUNT_SEGMENT
  if (!matches) return null

  const scopeColumn = opts.scopeColumn ?? 'user_id'
  let q = supabase
    .from(opts.table)
    .select('id', { count: 'exact', head: true })
    .gte('created_at', oneWeekAgoIso())

  if (opts.scoped) {
    const scope = await requireGatewayScope(ctx)
    if ('handled' in scope) return scope
    q = applyScopeEq(q, scope, scopeColumn)
  }

  const { count, error } = await q
  if (error) return fromSupabaseError(error)
  const value = count ?? 0
  const payload = opts.countShape === 'object' ? { count: value } : value
  return apiOk(ctx, payload)
}

export type ScopedCrudOptions = {
  table: string
  scopeColumn?: string
  orderBy?: { column: string; ascending: boolean }
  formatRow?: (row: unknown) => unknown
  formatRows?: (rows: unknown[]) => unknown[]
  prepareCreateBody?: (body: Json, scope: GatewayListScope) => Json
  prepareUpdateBody?: (body: Json, scope: GatewayListScope) => Json
  beforeUpdate?: (
    ctx: ApiContext,
    scope: GatewayListScope,
    id: string
  ) => ApiHandlerResult | null
  createStatus?: number
  countShape?: 'scalar' | 'object'
}

export async function tryScopedCrud(
  ctx: ApiContext,
  opts: ScopedCrudOptions
): Promise<ApiHandlerResult | null> {
  const count = await tryCountByCreatedLastWeek(ctx, {
    table: opts.table,
    pathStyle: 'suffix',
    scoped: true,
    scopeColumn: opts.scopeColumn,
    countShape: opts.countShape,
  })
  if (count) return count

  const { method, segments, supabase } = ctx
  const scopeColumn = opts.scopeColumn ?? 'user_id'
  const formatRow = opts.formatRow ?? ((r: unknown) => r)
  const formatRows = opts.formatRows ?? ((rows: unknown[]) => rows)

  if (method === 'GET' && segments.length === 1) {
    const scope = await requireGatewayScope(ctx)
    if ('handled' in scope) return scope

    let q = supabase.from(opts.table).select('*')
    if (opts.orderBy)
      q = q.order(opts.orderBy.column, { ascending: opts.orderBy.ascending })
    q = applyScopeEq(q, scope, scopeColumn)
    const { data, error } = await q
    if (error) return fromSupabaseError(error)
    return apiOk(ctx, formatRows(data || []))
  }

  if (method === 'POST' && segments.length === 1) {
    const scope = await requireGatewayScope(ctx)
    if ('handled' in scope) return scope

    const raw = (await readBody(ctx.event)) as Json | null
    let body: Json = { ...(raw ?? {}) }
    if (opts.prepareCreateBody) body = opts.prepareCreateBody(body, scope)
    else if (scope.mode === 'own')
      body = { ...body, [scopeColumn]: scope.userId }

    const { data, error } = await supabase
      .from(opts.table)
      .insert(body)
      .select('*')
      .single()
    if (error) return fromSupabaseError(error, 400)
    return apiOk(ctx, data ? formatRow(data) : data, opts.createStatus ?? 201)
  }

  if ((method === 'PUT' || method === 'PATCH') && segments.length === 2) {
    const scope = await requireGatewayScope(ctx)
    if ('handled' in scope) return scope

    if (opts.beforeUpdate) {
      const denied = opts.beforeUpdate(ctx, scope, segments[1]!)
      if (denied) return denied
    }

    let body = (await readBody(ctx.event)) as Json
    if (opts.prepareUpdateBody) body = opts.prepareUpdateBody(body, scope)

    let q = supabase.from(opts.table).update(body).eq('id', segments[1])
    q = applyScopeEq(q, scope, scopeColumn)
    const { data, error } = await q.select('*').single()
    if (error) return fromSupabaseError(error, 400)
    return apiOk(ctx, data ? formatRow(data) : data)
  }

  if (method === 'DELETE' && segments.length === 2) {
    const scope = await requireGatewayScope(ctx)
    if ('handled' in scope) return scope

    let q = supabase.from(opts.table).delete().eq('id', segments[1])
    q = applyScopeEq(q, scope, scopeColumn)
    const { error } = await q
    if (error) return fromSupabaseError(error)
    return apiDeleted()
  }

  return null
}

export type SimpleCrudCreateResult = Record<string, unknown> | { error: string }

export type SimpleCrudOptions = {
  table: string
  orderBy?: { column: string; ascending: boolean }
  formatRow?: (row: unknown) => unknown
  formatRows?: (rows: unknown[]) => unknown[]
  /** POST body → insert row, or `{ error }` for 400. Replaces validateCreate + buildCreateRow. */
  mapCreate?: (body: Json) => SimpleCrudCreateResult
  validateCreate?: (body: Json) => string | null
  buildCreateRow?: (body: Json) => Record<string, unknown>
  createErrorStatus?: number
  getByIdNotFoundStatus?: number
  countShape?: 'scalar' | 'object'
}

export async function trySimpleCrud(
  ctx: ApiContext,
  opts: SimpleCrudOptions
): Promise<ApiHandlerResult | null> {
  const count = await tryCountByCreatedLastWeek(ctx, {
    table: opts.table,
    pathStyle: 'nested',
    countShape: opts.countShape ?? 'object',
  })
  if (count) return count

  const { method, segments, supabase } = ctx
  const formatRow = opts.formatRow ?? ((r: unknown) => r)
  const formatRows = opts.formatRows ?? ((rows: unknown[]) => rows)

  if (method === 'GET' && segments.length === 1) {
    let q = supabase.from(opts.table).select('*')
    if (opts.orderBy)
      q = q.order(opts.orderBy.column, { ascending: opts.orderBy.ascending })
    const { data, error } = await q
    if (error) return fromSupabaseError(error)
    return apiOk(ctx, formatRows(data || []))
  }

  if (method === 'POST' && segments.length === 1) {
    const body = (await readBody(ctx.event)) as Json
    let row: Record<string, unknown>
    if (opts.mapCreate) {
      const mapped = opts.mapCreate(body)
      if ('error' in mapped) return apiError(400, String(mapped.error))
      row = mapped
    } else {
      if (opts.validateCreate) {
        const err = opts.validateCreate(body)
        if (err) return apiError(400, err)
      }
      row = opts.buildCreateRow
        ? opts.buildCreateRow(body)
        : (body as Record<string, unknown>)
    }
    const { data, error } = await supabase
      .from(opts.table)
      .insert(row)
      .select('*')
      .single()
    if (error) return fromSupabaseError(error, opts.createErrorStatus ?? 400)
    return apiOk(ctx, formatRow(data))
  }

  if (method === 'GET' && segments.length === 2) {
    const { data, error } = await supabase
      .from(opts.table)
      .select('*')
      .eq('id', segments[1])
      .maybeSingle()
    if (error)
      return fromSupabaseError(error, opts.getByIdNotFoundStatus ?? 404)
    return apiOk(ctx, formatRow(data))
  }

  if (method === 'DELETE' && segments.length === 2) {
    const { error } = await supabase
      .from(opts.table)
      .delete()
      .eq('id', segments[1])
    if (error) return fromSupabaseError(error)
    return apiDeleted()
  }

  return null
}

export type ReadOnlyTableOptions = {
  table: string
  formatRows?: (rows: unknown[]) => unknown[]
  postNotImplemented?: string
}

/** GET list + count-by-created-last-week; POST → 501. */
export async function tryReadOnlyTable(
  ctx: ApiContext,
  opts: ReadOnlyTableOptions
): Promise<ApiHandlerResult | null> {
  const count = await tryCountByCreatedLastWeek(ctx, {
    table: opts.table,
    pathStyle: 'suffix',
  })
  if (count) return count

  const { method, segments, supabase } = ctx
  const formatRows = opts.formatRows ?? ((rows: unknown[]) => rows)

  if (method === 'GET' && segments.length === 1) {
    const { data, error } = await supabase.from(opts.table).select('*')
    if (error) return fromSupabaseError(error)
    return apiOk(ctx, formatRows(data || []))
  }
  if (method === 'POST' && segments.length === 1)
    return apiError(501, opts.postNotImplemented ?? 'Use module write flow.')
  return null
}

export type EqGetRoute = {
  match: (segments: string[]) => boolean
  table: string
  eq: (segments: string[]) => Record<string, string>
  order?: { column: string; ascending: boolean }
}

export async function tryGetEqRoutes(
  ctx: ApiContext,
  routes: EqGetRoute[]
): Promise<ApiHandlerResult | null> {
  if (ctx.method !== 'GET') return null
  for (const route of routes) {
    if (!route.match(ctx.segments)) continue
    let q = ctx.supabase.from(route.table).select('*')
    for (const [col, val] of Object.entries(route.eq(ctx.segments)))
      q = q.eq(col, val)
    if (route.order)
      q = q.order(route.order.column, { ascending: route.order.ascending })
    const { data, error } = await q
    if (error) return fromSupabaseError(error)
    return apiOk(ctx, data || [])
  }
  return null
}

export type JwtUserTableOptions = {
  table: string
  onPut: (
    ctx: ApiContext,
    userId: string,
    body: Json
  ) => Promise<ApiHandlerResult>
}

/** GET rows for JWT user; PUT/PATCH via `onPut`. */
export async function tryJwtUserTable(
  ctx: ApiContext,
  opts: JwtUserTableOptions
): Promise<ApiHandlerResult | null> {
  const { method, supabase } = ctx
  if (method !== 'GET' && method !== 'PUT' && method !== 'PATCH') return null

  const auth = await requireGatewayUser(ctx)
  if ('handled' in auth) return auth

  if (method === 'GET') {
    const { data, error } = await supabase
      .from(opts.table)
      .select('*')
      .eq('user_id', auth.user.id)
    if (error) return fromSupabaseError(error)
    return apiBody({ data: data || [] })
  }

  const body = (await readBody(ctx.event)) as Json
  return opts.onPut(ctx, auth.user.id, body)
}

export async function dispatchApiHandlers(
  ctx: ApiContext,
  handlers: Array<(ctx: ApiContext) => Promise<ApiHandlerResult | null>>
): Promise<ApiHandlerResult> {
  for (const handler of handlers) {
    const result = await handler(ctx)
    if (result) return result
  }
  return apiMethodNotAllowed()
}

export async function withGatewayUser(
  ctx: ApiContext,
  fn: (ctx: ApiContext, userId: string) => Promise<ApiHandlerResult>
): Promise<ApiHandlerResult> {
  const auth = await requireGatewayUser(ctx)
  if ('handled' in auth) return auth
  return fn(ctx, String(auth.user.id).trim())
}
