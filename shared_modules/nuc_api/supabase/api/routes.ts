import { readBody } from 'h3'

import type { ApiContext, Json } from 'nuc_server'

import { type ApiHandlerResult, apiBody } from './response'

export type ApiRoute = (ctx: ApiContext) => Promise<ApiHandlerResult | null>

export type ApiAuthRoute = (
  ctx: ApiContext,
  userId: string
) => Promise<ApiHandlerResult | null>

export type RouteMatch = {
  method?: string | readonly string[]
  len?: number
  path?: readonly (string | undefined)[]
}

export function seg(ctx: ApiContext, index: number): string | undefined {
  return ctx.segments[index]
}

export function trimStr(v: unknown, fallback = ''): string {
  return typeof v === 'string' && v.trim() ? v.trim() : fallback
}

export function apiHandled(status: number, body: unknown): ApiHandlerResult {
  return { handled: true, status, body }
}

export function apiMsg(message: string): ApiHandlerResult {
  return apiBody({ message })
}

export function when(
  spec: RouteMatch,
  run: (ctx: ApiContext) => Promise<ApiHandlerResult | null>
): ApiRoute {
  return async (ctx) => (match(ctx, spec) ? run(ctx) : null)
}

export function whenAuth(
  spec: RouteMatch,
  run: (ctx: ApiContext, userId: string) => Promise<ApiHandlerResult | null>
): ApiAuthRoute {
  return async (ctx, userId) => (match(ctx, spec) ? run(ctx, userId) : null)
}

export function whenWith<T>(
  spec: RouteMatch,
  run: (ctx: ApiContext, arg: T) => Promise<ApiHandlerResult | null>
): (ctx: ApiContext, arg: T) => Promise<ApiHandlerResult | null> {
  return async (ctx, arg) => (match(ctx, spec) ? run(ctx, arg) : null)
}

export function match(ctx: ApiContext, spec: RouteMatch): boolean {
  if (spec.method !== undefined) {
    const methods = (
      typeof spec.method === 'string' ? [spec.method] : spec.method
    ) as string[]
    if (!methods.includes(ctx.method)) return false
  }
  if (spec.len !== undefined && ctx.segments.length !== spec.len) return false
  if (spec.path) {
    for (let i = 0; i < spec.path.length; i++) {
      const expected = spec.path[i]
      if (expected === undefined) continue
      if (ctx.segments[i] !== expected) return false
    }
  }
  return true
}

export async function dispatchRoutes(
  routes: ApiRoute[],
  ctx: ApiContext
): Promise<ApiHandlerResult | null> {
  for (const route of routes) {
    const result = await route(ctx)
    if (result) return result
  }
  return null
}

export async function dispatchWith<T>(
  routes: ((ctx: ApiContext, arg: T) => Promise<ApiHandlerResult | null>)[],
  ctx: ApiContext,
  arg: T
): Promise<ApiHandlerResult | null> {
  for (const route of routes) {
    const result = await route(ctx, arg)
    if (result) return result
  }
  return null
}

export async function dispatchAuthRoutes(
  routes: ApiAuthRoute[],
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  return dispatchWith(routes, ctx, userId)
}

export async function readJsonBody(ctx: ApiContext): Promise<Json> {
  return ((await readBody(ctx.event)) as Json | null) ?? {}
}

export function decodeSeg(value: string): string {
  return decodeURIComponent(value)
}

export function nowIso(): string {
  return new Date().toISOString()
}

export function normalizeUuid(v: unknown): string {
  if (v == null || v === '') return ''
  return String(v).trim()
}

export function parsePositiveInt(value: string | undefined): number | null {
  if (!value || !/^\d+$/.test(value)) return null
  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? n : null
}

export function segId(ctx: ApiContext, index: number): number | null {
  return parsePositiveInt(seg(ctx, index))
}

export function segLocale(ctx: ApiContext, index = 2): string | null {
  const s = seg(ctx, index)
  return s ? decodeSeg(s) : null
}

export function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return []
  return v.map((x) => String(x).trim()).filter(Boolean)
}

export function escapeIlike(term: string): string {
  return term.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
}

export async function fetchUserProfiles(
  supabase: ApiContext['supabase'],
  ids: string[],
  columns = 'id,name,email'
): Promise<Map<string, Record<string, unknown>>> {
  const uniq = [...new Set(ids.map(normalizeUuid).filter(Boolean))]
  if (uniq.length === 0) return new Map()
  const { data, error } = await supabase
    .from('user_profiles')
    .select(columns)
    .in('id', uniq)
  if (error || !data) return new Map()
  const map = new Map<string, Record<string, unknown>>()
  for (const row of data) {
    const r = row as unknown as Record<string, unknown>
    const id = normalizeUuid(r.id)
    if (id) map.set(id, r)
  }
  return map
}
