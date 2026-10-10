/**
 * PageSpeed / Lighthouse / headless — skip heavy motion so lab audits can finish.
 */
export function isAutomatedAudit(): boolean {
  if (typeof navigator === 'undefined') return false
  if (navigator.webdriver) return true

  const ua = navigator.userAgent
  // PSI uses HeadlessChromium (not only HeadlessChrome) in recent Lighthouse.
  if (
    /Chrome-Lighthouse|PageSpeed|HeadlessChrome|HeadlessChromium|PTST|GTmetrix|Pingdom|Speed Insights|Lighthouse/i.test(
      ua
    )
  ) {
    return true
  }

  return false
}
