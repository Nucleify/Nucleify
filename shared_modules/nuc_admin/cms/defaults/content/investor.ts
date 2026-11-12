import { docsPageHref, NUC_DOCS_ORIGIN } from './home'

export { docsPageHref, NUC_DOCS_ORIGIN }

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
  { id: 'savings', label: 'Keep' },
  { id: 'wedge', label: 'Plan' },
  { id: 'surface', label: 'Reach' },
  { id: 'ask', label: 'Talk' },
] as const satisfies ReadonlyArray<{ id: NucInvestorSectionId; label: string }>

export const NUC_INVESTOR_SEO = {
  title: 'Nucleify for investors - stop funding the rewrite',
  description:
    'Investor brief for Nucleify: migrate existing apps as-is, seven frameworks, shared Supabase data plane, open install and paid attach after production usage.',
  ogImage: '/img/og-image.png',
} as const

export const NUC_INVESTOR_COPY = {
  brand: 'Nucleify',
  sectionsLabel: 'Investor sections',
  heroEyebrow: 'For investors',
  headline: 'Stop funding the rewrite.',
  support:
    'Stack waves rebuild the same product. Nucleify keeps the nucleus - shared modules, idiomatic frameworks, Supabase with the business - so capital funds growth, not another platform team.',
  ctaPrimary: 'Open Playground',
  ctaSecondary: 'Contact us',
  ctaTertiary: 'See why it sticks',
  githubHref: 'https://github.com/Nucleify/Nucleify',
  thesisEyebrow: 'The problem',
  thesisTitle: 'Rewrite spend is a second product.',
  thesisSupport:
    'Frameworks rotate. The business should not. Product convert takes existing apps as-is; the nucleus keeps domain, typed client, and Supabase once - a stack change becomes a build target, not a rewrite gate.',
  savingsEyebrow: 'What you keep',
  savingsTitle: 'One nucleus.\nSeven frameworks.',
  savingsSupport:
    'What stays with the product when the stack changes: domain, typed client, and data plane you can verify in the repo - not a burn model.\nSeven idiomatic frameworks, owned emit, one Supabase data plane.',
  savingsCta: 'See how we grow',
  savingsNote: 'Product facts · verify in docs and playground · not a forecast',
  pulseShellsAxis: 'Frameworks from one nucleus',
  wedgeEyebrow: 'How we grow',
  wedgeTitle: 'Start free.\nStay because it works.',
  wedgeSupport:
    'Engineers install Nucleify because it removes rewrite work.\nOnce domain and Supabase live in the nucleus, leaving means rewriting the business - then paid convert and help can follow usage.',
  surfaceEyebrow: 'Where we win',
  surfaceTitle: 'One product.\nFour paths to market.',
  surfaceSupport:
    'Same shared modules. Different buyers, partners, timing, and paid add-ons - without hiring a second platform team for every framework.',
  surfaceTabsLabel: 'Market reach',
  surfaceStageLabel: 'Reach detail',
  askTitle: 'Want the full walkthrough?',
  askSupport:
    'Open core install, paid attach after usage. Tell us what you want to pressure-test - we reply with a short brief and an architecture walkthrough option.',
  askCta: 'Request an intro',
  askModalTitle: 'Request an intro',
  askModalSupport:
    'You get a short brief, an architecture walkthrough option, and a clear next step.',
  askNameLabel: 'Name / fund',
  askNamePlaceholder: 'Jordan at Northpeak',
  askEmailLabel: 'Work email',
  askEmailPlaceholder: 'you@fund.com',
  askTypeLabel: 'Why you are writing',
  askTypePlaceholder: 'Choose one',
  askNoteLabel: 'What to cover',
  askNotePlaceholder:
    'Stage, check size range, and what you want to pressure-test…',
  askSubmit: 'Send request',
  askCancel: 'Back',
  navDocs: 'Docs',
  navPlay: 'Playground',
  navCli: 'CLI',
  navGitHub: 'GitHub',
  navHome: 'Product',
  playgroundHref: 'https://play.nucleify.io',
  cliHref: 'https://cli.nucleify.io',
  glanceAria: 'Product snapshot',
  pulseTraditionalLabel: 'Two stacks, separate teams',
  pulseNucleifyLabel: 'One nucleus, seven frameworks',
  pulseCostSuffix: '×',
  pulseUnitLabel: 'platform effort',
  pulseStatus: 'Same product. Far less rewrite tax.',
  thesisCta: 'See what you keep',
} as const

export const NUC_INVESTOR_THESIS = [
  {
    index: '01',
    icon: 'mdi:swap-horizontal',
    title: 'Rewrite is a second product',
    body: 'Vue to React, SPA to Next, docs to Astro - each wave often rebuilds UI and glue while the domain stays the same. Capital pays twice for one business.',
    outcome: 'Rewrite tax',
    proof: 'convert as-is + nucleus',
  },
  {
    index: '02',
    icon: 'mdi:cube-outline',
    title: 'Nucleus is the durable asset',
    body: 'Domain logic, typed client, and Supabase handlers/SQL live once. Frameworks are build targets. Leaving means rewriting the business, not swapping a UI kit.',
    outcome: 'Hard to rip out',
    proof: 'Supabase gateway + SQL',
  },
  {
    index: '03',
    icon: 'mdi:cash-check',
    title: 'Budget follows usage, not demos',
    body: 'Open install through engineers. Paid convert and consulting attach after the nucleus is already in production - high intent, shorter cycle.',
    outcome: 'Paid after prod',
    proof: 'Land → earn wedge',
  },
] as const

/** Product facts diligence can verify - not a dollar forecast. */
export const NUC_INVESTOR_SAVINGS = [
  {
    id: 'shells',
    value: '7',
    unit: 'idiomatic frameworks',
    label: 'One install → seven frameworks',
    detail:
      'Vue, React, Nuxt, Next, Astro, Svelte, Solid from the same shared modules.',
  },
  {
    id: 'runtime',
    value: '0',
    unit: 'runtime lock-in',
    label: 'Commit the emit',
    detail:
      'Output is host-native source you own - no forever SDK tax on the framework.',
  },
  {
    id: 'data',
    value: '1',
    unit: 'shared data plane',
    label: 'Supabase stays with the product',
    detail:
      'Module SQL, typed client, and gateway align across frameworks - one backend story.',
  },
] as const

/** Intro plate - product snapshot for capital diligence. */
export const NUC_INVESTOR_GLANCE = {
  eyebrow: 'Product snapshot',
  from: '7',
  to: '1',
  fromLabel: 'frameworks',
  toLabel: 'shared nucleus',
  figure: '7→1',
  figureLead: '7',
  figureTrail: '1',
  figureUnit: 'frameworks / nucleus',
  line: 'Owned emit.\nShared Supabase.\nCapital on growth.',
  note: 'Product facts · not a financial forecast',
} as const

export const NUC_INVESTOR_WEDGE = [
  {
    phase: 'Land',
    icon: 'mdi:download-outline',
    title: 'People install it themselves',
    body: 'Clone, playground, and CLI - engineers pull Nucleify because it kills rewrite work, not because a salesperson booked a demo.',
    signal: 'Open core install',
  },
  {
    phase: 'Stick',
    icon: 'mdi:lock-outline',
    title: 'Leaving gets expensive',
    body: 'Once domain logic and Supabase live in the nucleus, ripping it out means rewriting the business. Stickiness is architecture, not a contract.',
    signal: 'Architecture lock-in',
  },
  {
    phase: 'Expand',
    icon: 'mdi:expand-all-outline',
    title: 'More stacks, same team',
    body: 'Each new framework is more market reach, not another platform org. Nuxt today, Next or Solid tomorrow - same nucleus.',
    signal: 'Same nucleus',
  },
  {
    phase: 'Earn',
    icon: 'mdi:cash-multiple',
    title: 'Paid work follows usage',
    body: 'Convert, PoC, and consulting attach after the nucleus is already in production. High intent, shorter sales cycle.',
    signal: 'Paid after prod',
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
      'Dual-stack product teams (often React/Next plus Vue/Nuxt, plus docs or experiments) feel rewrite cost this quarter - migration briefs land when the second stack is already burning.',
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
      'Agencies sell migrations. With a nucleus story they keep the client brief and drop the second platform team - inbound from rewrite budgets, not cold outreach.',
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
      'Stack waves open budgets as teams re-platform. Each wave grows reach without hiring a new platform org - timing is a market thesis, not a forecast metric.',
    outcome: 'Timing helps us',
    proof: 'Stack-wave budgets',
    metric: 'Wave timing',
  },
  {
    id: 'attach',
    index: '04',
    icon: 'mdi:chart-line',
    color: '#42b883',
    title: 'Paid help after install',
    description:
      'Convert and consulting attach once the nucleus is already in production. Post-install PoC buyers already feel the switching cost.',
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
