import './load-env'

export const runtimeConfig = {
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  authEmailResendKey: process.env.AUTH_EMAIL_RESEND_KEY || '',
  authEmailFrom: process.env.AUTH_EMAIL_FROM || 'business@nucleify.io',
  contactFormRecipient:
    process.env.CONTACT_FORM_EMAIL || 'business@nucleify.io',
  public: {
    appUrl: process.env.NUXT_PUBLIC_ADMIN_URL || 'https://admin.nucleify.io',
    webOrigin: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:7777',
    apiUrl: process.env.NUXT_PUBLIC_API_URL || '/api',
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseKey: process.env.SUPABASE_KEY || '',
    appEnv: process.env.APP_ENV || 'production',
  },
}
