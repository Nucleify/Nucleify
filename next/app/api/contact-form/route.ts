import { handleContactFormPost } from '../../../server/contact_form_route'

export async function POST(request: Request): Promise<Response> {
  return handleContactFormPost(request)
}
