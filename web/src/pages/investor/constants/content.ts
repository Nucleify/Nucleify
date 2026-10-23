import { docsPageHref } from '../../../utils/docs_origin'

export type NucInvestorSectionId =
  | 'intro'
  | 'thesis'
  | 'savings'
  | 'wedge'
  | 'surface'
  | 'ask'

export const NUC_INVESTOR_SECTIONS = [
  { id: 'intro', label: 'Pitch' },
  { id: 'thesis', label: 'Why' },
  { id: 'savings', label: 'Savings' },
  { id: 'wedge', label: 'Plan' },
  { id: 'surface', label: 'Reach' },
  { id: 'ask', label: 'Talk' },
] as const satisfies ReadonlyArray<{ id: NucInvestorSectionId; label: string }>

export const NUC_INVESTOR_SEO = {
  title: 'Nucleify for investors - stop funding the rewrite',
  description:
    'Investor brief for Nucleify: less rewrite tax, durable product architecture, and a planning model of about $180k-$320k a year kept when teams stop rebuilding for every stack wave.',
  ogImage: '/img/og-image.png',
} as const

export const NUC_INVESTOR_COPY = {
  brand: 'Nucleify',
  sectionsLabel: 'Investor sections',
  heroEyebrow: 'For investors',
  headline: 'Stop funding the rewrite.',
  support:
    'Every stack wave burns budget rebuilding the same product. Nucleify makes migration the durable layer - so capital funds growth, not another rewrite of the same business.',
  ctaPrimary: 'Talk to us',
  ctaSecondary: 'See the product',
  ctaTertiary: 'See the thesis',
  githubHref: 'https://github.com/Nucleify/Nucleify',
  thesisEyebrow: 'The problem',
  thesisTitle: 'Teams pay again every time the stack changes.',
  thesisSupport:
    'Frameworks come and go. Products should not. Nucleify keeps domain, API, and SQL in shared modules and moves whole apps with an IR-first compiler - a stack change is a build target, not a rewrite project.',
  savingsEyebrow: 'What you keep',
  savingsTitle: 'Less duplicate work. Less burn.',
  savingsSupport:
    'Simple planning model for a mid-size team running two frameworks at once. Not audited numbers - a clear way to talk about saved engineering time.',
  savingsCta: 'See the growth plan',
  savingsNote: 'Example only · mid-size product · two frameworks side by side',
  pulseShellsAxis: 'Frameworks from one nucleus',
  wedgeEyebrow: 'How we grow',
  wedgeTitle: 'Start free. Stay because it works. Grow from there.',
  wedgeSupport:
    'Engineers install Nucleify because it removes rewrite pain. Once the product lives in the nucleus, switching away means rewriting the business - then paid work can follow usage.',
  surfaceEyebrow: 'Where we win',
  surfaceTitle: 'One product. Four ways it reaches the market.',
  surfaceSupport:
    'Same shared modules. Different buyers, partners, timing, and paid add-ons - without hiring a second platform team for every framework.',
  surfaceTabsLabel: 'Market reach',
  surfaceStageLabel: 'Reach detail',
  askTitle: 'Want the full walkthrough?',
  askSupport:
    'Open source at the core, with help when teams need it. Tell us what you want to check and we will reply with a short brief and next steps.',
  askCta: 'Request an intro',
  askModalTitle: 'Request an intro',
  askModalSupport:
    'A few details help us prepare. You get a short brief, an architecture walkthrough option, and a clear next step.',
  askNameLabel: 'Name / fund',
  askNamePlaceholder: 'Jordan at Northpeak',
  askEmailLabel: 'Work email',
  askEmailPlaceholder: 'you@fund.com',
  askTypeLabel: 'Why you are writing',
  askTypePlaceholder: 'Choose one',
  askNoteLabel: 'What to cover',
  askNotePlaceholder:
    'Stage, check size range, and what you want to pressure-test…',
  askSubmit: 'Send',
  askCancel: 'Back',
  askTrust: ['Founder reply', 'Short brief included', 'Kept private'],
  askDeskEyebrow: 'Investor desk',
  navDocs: 'Docs',
  navGitHub: 'GitHub',
  navHome: 'Product',
  glanceAria: 'Investment snapshot',
  pulseTraditionalLabel: 'Two stacks, separate teams',
  pulseNucleifyLabel: 'One nucleus, seven frameworks',
  pulseCostSuffix: '×',
  pulseUnitLabel: 'platform effort',
  pulseStatus: 'Same product. Far less rewrite tax.',
  thesisCta: 'See the savings',
} as const

export const NUC_INVESTOR_THESIS = [
  {
    index: '01',
    icon: 'mdi:swap-horizontal',
    title: 'Stacks keep changing',
    body: 'Vue or React. Nuxt or Next. Then Astro, Svelte, or Solid. Each change often means building the same product again.',
    outcome: 'Rewrite tax',
    proof: '18-36 month cycles',
  },
  {
    index: '02',
    icon: 'mdi:account-group-outline',
    title: 'Hiring follows the framework',
    body: 'Teams hire for one stack, then scramble for another. One nucleus that ships seven frameworks widens who you can hire without a second product org.',
    outcome: 'Wider funnel',
    proof: 'One hiring bar',
  },
  {
    index: '03',
    icon: 'mdi:briefcase-outline',
    title: 'Agencies sell rewrites',
    body: 'The usual pitch is still “rebuild it in X.” Nucleify flips that: keep the product, change the framework when the brief changes.',
    outcome: 'Keep the brief',
    proof: 'Framework, not rewrite',
  },
] as const

/**
 * Planning model - sprints / year avoided vs dual-framework maintenance.
 * Dollars use a blended fully-loaded eng cost for diligence framing only.
 */
export const NUC_INVESTOR_SAVINGS = [
  {
    id: 'sprints',
    value: '18-30',
    unit: 'sprints / year',
    label: 'Duplicate work you skip',
    detail: 'Shared API and UI instead of building the same feature twice.',
  },
  {
    id: 'dollars',
    value: '$180k-$320k',
    unit: 'modeled / year',
    label: 'About $10k per sprint loaded',
    detail: 'Rough cost for a mid-size product team - not a forecast.',
  },
  {
    id: 'cycles',
    value: '1→7',
    unit: 'frameworks from one install',
    label: 'One install, many stacks',
    detail: 'Vue, React, Nuxt, Next, Astro, Svelte, Solid from shared modules.',
  },
] as const

function investorSaving(
  id: (typeof NUC_INVESTOR_SAVINGS)[number]['id']
): (typeof NUC_INVESTOR_SAVINGS)[number] {
  const item = NUC_INVESTOR_SAVINGS.find((entry) => entry.id === id)
  if (!item) {
    throw new Error(`Missing investor saving: ${id}`)
  }
  return item
}

/** Intro plate - capital framing. Dollars from savings model. */
export const NUC_INVESTOR_GLANCE = {
  eyebrow: 'Planning model',
  from: '7',
  to: '1',
  fromLabel: 'rebuild bets',
  toLabel: 'product core',
  figure: investorSaving('dollars').value,
  figureLead: '$180k',
  figureTrail: '-$320k',
  figureUnit: '/ year kept',
  line: 'One team. Capital stays on product.',
  note: 'Example only · mid-size product · not a forecast',
} as const

export const NUC_INVESTOR_WEDGE = [
  {
    phase: 'Land',
    icon: 'mdi:download-outline',
    title: 'People install it themselves',
    body: 'Engineers pull Nucleify because it kills rewrite work - not because a salesperson booked a demo.',
    signal: 'Low cost to start',
  },
  {
    phase: 'Stick',
    icon: 'mdi:lock-outline',
    title: 'Leaving gets expensive',
    body: 'Once domain logic lives in the nucleus, ripping it out means rewriting the business. That stickiness comes from architecture, not contracts.',
    signal: 'Hard to rip out',
  },
  {
    phase: 'Expand',
    icon: 'mdi:expand-all-outline',
    title: 'More stacks, same team',
    body: 'Each new framework is more market reach, not another platform team. Nuxt today, Next or Solid tomorrow - same shared base.',
    signal: 'Reach without headcount',
  },
  {
    phase: 'Earn',
    icon: 'mdi:cash-multiple',
    title: 'Paid work follows usage',
    body: 'Convert and consulting attach after the nucleus is already in production. High intent, shorter sales cycle.',
    signal: 'Money after install',
  },
] as const

/** Framework labels for investor surfaces / stack lists. */
export const NUC_INVESTOR_SHELLS = [
  {
    id: 'vue',
    label: 'Vue',
    detail: 'UI',
    icon: 'simple-icons:vuedotjs',
    color: '#42b883',
  },
  {
    id: 'nuxt',
    label: 'Nuxt',
    detail: 'Full stack',
    icon: 'simple-icons:nuxtdotjs',
    color: '#00dc82',
  },
  {
    id: 'react',
    label: 'React',
    detail: 'UI',
    icon: 'simple-icons:react',
    color: '#61dafb',
  },
  {
    id: 'next',
    label: 'Next',
    detail: 'Full stack',
    icon: 'simple-icons:nextdotjs',
    color: '#e8e8e8',
  },
  {
    id: 'astro',
    label: 'Astro',
    detail: 'Docs',
    icon: 'simple-icons:astro',
    color: '#ff5d01',
  },
  {
    id: 'svelte',
    label: 'Svelte',
    detail: 'UI',
    icon: 'simple-icons:svelte',
    color: '#ff3e00',
  },
  {
    id: 'solid',
    label: 'Solid',
    detail: 'UI',
    icon: 'simple-icons:solid',
    color: '#2c4f7c',
  },
] as const

/** Coverage strip - interactive tabs + detail stage. */
export const NUC_INVESTOR_SURFACE = [
  {
    id: 'beachhead',
    index: '01',
    icon: 'mdi:office-building-outline',
    color: '#00dc82',
    title: 'Teams already paying twice',
    description:
      'Product teams stuck on two stacks at once (often React/Next plus Vue/Nuxt, plus docs or experiments). They feel rewrite cost this quarter - not someday.',
    outcome: 'They need it now',
    proof: 'Dual-stack product teams',
    metric: 'Now',
  },
  {
    id: 'agency',
    index: '02',
    icon: 'mdi:handshake-outline',
    color: '#61dafb',
    title: 'Agencies that move stacks',
    description:
      'Agencies sell migrations. With a nucleus story they keep the client brief and drop the second platform team - inbound, not cold outreach.',
    outcome: 'Partners bring deals',
    proof: 'Rewrite budgets → nucleus',
    metric: 'Pull',
  },
  {
    id: 'timing',
    index: '03',
    icon: 'mdi:timeline-clock-outline',
    color: '#ff5d01',
    title: 'When frameworks shift',
    description:
      'Every 18-36 months a new stack wave opens budgets. Each wave grows the market without hiring a new platform org.',
    outcome: 'Timing helps us',
    proof: '18-36 month stack waves',
    metric: '18-36mo',
  },
  {
    id: 'attach',
    index: '04',
    icon: 'mdi:chart-line',
    color: '#42b883',
    title: 'Paid help after install',
    description:
      'Convert and consulting attach once the nucleus is already in production. People already using it are ready to buy help.',
    outcome: 'Revenue after usage',
    proof: 'Usage → paid attach',
    metric: 'Attach',
  },
] as const

/** API-stable values; investor-facing labels. */
export const NUC_INVESTOR_CONTACT_TYPES = [
  { label: 'Investment / diligence', value: 'business' },
  { label: 'Partnership', value: 'landing' },
  { label: 'Intro call', value: 'blog' },
  { label: 'Other', value: 'help' },
] as const

export function investorHomeHref(lang: string): string {
  return `/${lang}/home`
}

export function investorDocsHref(lang: string): string {
  return docsPageHref(lang, 'getting-started/introduction')
}

export interface NucInvestorShellArc {
  id: string
  label: string
  d: string
  color: string
}

function polar(
  cx: number,
  cy: number,
  r: number,
  deg: number
): { x: number; y: number } {
  const rad = (deg * Math.PI) / 180
  return {
    x: Number((cx + r * Math.cos(rad)).toFixed(3)),
    y: Number((cy + r * Math.sin(rad)).toFixed(3)),
  }
}

function annularSector(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  start: number,
  end: number
): string {
  const sweep = end - start
  const large = sweep > 180 ? 1 : 0
  const outerStart = polar(cx, cy, rOuter, start)
  const outerEnd = polar(cx, cy, rOuter, end)
  const innerEnd = polar(cx, cy, rInner, end)
  const innerStart = polar(cx, cy, rInner, start)
  return [
    `M${outerStart.x} ${outerStart.y}`,
    `A${rOuter} ${rOuter} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L${innerEnd.x} ${innerEnd.y}`,
    `A${rInner} ${rInner} 0 ${large} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ')
}

/** Equal framework slices for the thesis donut (home pillars kinship). */
export function nucInvestorShellArcs(): NucInvestorShellArc[] {
  const cx = 50
  const cy = 50
  const radius = 46
  const innerRadius = 28
  const gapDeg = 3
  const count = NUC_INVESTOR_SHELLS.length
  const sweep = 360 / count
  let cursor = -90
  return NUC_INVESTOR_SHELLS.map((shell) => {
    const pad = Math.min(gapDeg / 2, sweep / 6)
    const start = cursor + pad
    const end = cursor + sweep - pad
    cursor += sweep
    return {
      id: shell.id,
      label: shell.label,
      d: annularSector(cx, cy, innerRadius, radius, start, end),
      color: shell.color,
    }
  })
}
