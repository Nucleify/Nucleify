import { handleSupabaseApiRoute } from '../../../server/supabase_api_route'

type RouteContext = { params: Promise<{ slug: string[] }> }

async function route(
  request: Request,
  context: RouteContext
): Promise<Response> {
  const { slug } = await context.params
  return handleSupabaseApiRoute(request, slug)
}

export const GET = route
export const POST = route
export const PUT = route
export const PATCH = route
export const DELETE = route
export const HEAD = route
export const OPTIONS = route
