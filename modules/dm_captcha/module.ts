import { addServerHandler, defineNuxtModule, resolvePath } from '@nuxt/kit'

export default async function () {
  addServerHandler({
    route: '/api/captcha/validate',
    handler: await resolvePath(__dirname + '/server/validate.ts'),
  })
}
