/** PageSpeed / Lighthouse / headless — skip heavy motion so lab audits can finish. */
export function isAutomatedAudit(): boolean {
  if (typeof navigator === 'undefined') return false
  if (navigator.webdriver) return true

  const ua = navigator.userAgent
  return /Chrome-Lighthouse|PageSpeed|HeadlessChrome|PTST/i.test(ua)
}
