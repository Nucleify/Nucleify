/** Security and cache headers for the admin Nuxt host. */
export function getRouteRules() {
  // Interactive creator embeds the public web preview in an iframe.
  const webOrigin = (
    process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:7777'
  ).replace(/\/$/, '')

  return {
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        // Baseline CSP for HTML; Vite HMR still needs eval/inline in local dev.
        // frame-src: web preview origin (+ local hosts — 127.0.0.1 vs localhost).
        'Content-Security-Policy':
          `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; frame-src 'self' ${webOrigin} http://127.0.0.1:* http://localhost:*; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https: wss: ws: http://127.0.0.1:* http://localhost:*; worker-src 'self' blob:`,
      },
    },
    '/api/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Cache-Control': 'no-store',
      },
    },
  }
}
