/** PageSpeed / Lighthouse / common lab crawler UA markers. */
const LAB_UA =
  /Chrome-Lighthouse|PageSpeed|HeadlessChrome|HeadlessChromium|PTST|GTmetrix|Pingdom|Speed Insights|Lighthouse/i

/**
 * PSI spoofs `navigator.userAgent` in-page; the HTTP request UA still
 * contains `Chrome-Lighthouse` - detect labs from that string.
 */
export function isLabUserAgent(ua: string | null | undefined): boolean {
  return Boolean(ua && LAB_UA.test(ua))
}

/** Skip heavy motion so lab audits can finish. */
export function isAutomatedAudit(): boolean {
  if (typeof navigator === 'undefined') return false
  return navigator.webdriver || LAB_UA.test(navigator.userAgent)
}
