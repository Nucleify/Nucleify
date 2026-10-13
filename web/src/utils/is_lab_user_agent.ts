/** Request / navigator UA strings used by PageSpeed, Lighthouse, and common lab crawlers. */
const LAB_UA =
  /Chrome-Lighthouse|PageSpeed|HeadlessChrome|HeadlessChromium|PTST|GTmetrix|Pingdom|Speed Insights|Lighthouse/i

/**
 * PSI spoofs `navigator.userAgent` to a normal mobile Chrome string, but the
 * HTTP request UA still contains `Chrome-Lighthouse` — detect labs from that.
 */
export function isLabUserAgent(ua: string | null | undefined): boolean {
  return Boolean(ua && LAB_UA.test(ua))
}
