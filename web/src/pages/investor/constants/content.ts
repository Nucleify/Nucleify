export type NucInvestorSectionId =
  | 'intro'
  | 'thesis'
  | 'savings'
  | 'wedge'
  | 'surface'
  | 'ask'

export const NUC_INVESTOR_SECTIONS = [
  { id: 'intro', label: 'Pitch' },
  { id: 'thesis', label: 'Thesis' },
  { id: 'savings', label: 'Savings' },
  { id: 'wedge', label: 'Wedge' },
  { id: 'surface', label: 'Coverage' },
  { id: 'ask', label: 'Ask' },
] as const satisfies ReadonlyArray<{ id: NucInvestorSectionId; label: string }>

export const NUC_INVESTOR_SEO = {
  title: 'Nucleify Investor Brief — One Codebase, Every Framework',
  description:
    'Investor brief for Nucleify: one shared codebase ships to Vue, React, Nuxt, Next, Astro, Svelte and Solid. Modeled $180k–$320k per year kept when teams stop rewriting for each framework.',
  ogImage: '/img/holo-cube.svg',
} as const

export const NUC_INVESTOR_COPY = {
  brand: 'Nucleify',
  sectionsLabel: 'Investor sections',
  heroEyebrow: 'Investor brief',
  headline: 'Stop paying for rewrites.',
  support:
    'One shared codebase. Seven frameworks. No second platform team when the stack changes.',
  ctaPrimary: 'Request intro',
  ctaSecondary: 'See product',
  ctaTertiary: 'Read the thesis',
  githubHref: 'https://github.com/Nucleify/Nucleify',
  thesisEyebrow: 'Why now',
  thesisTitle: 'Rewrite tax is the silent burn.',
  thesisSupport:
    'Framework fashion cycles every 18–36 months. Hiring plans, agency SOWs, and “greenfield” rebuilds follow. The winners own the nucleus — not the temporary shell.',
  savingsEyebrow: 'Modeled impact',
  savingsTitle: 'Time and capital you stop burning.',
  savingsSupport:
    'Planning model for a mid-size product team maintaining two shells. Not audited financials — a diligence frame for eng hours and duplicate platform spend.',
  savingsNote: 'Illustrative model · mid-size product · two concurrent shells',
  wedgeEyebrow: 'Go-to-market',
  wedgeTitle: 'Distribution first. Margin second.',
  wedgeSupport:
    'Capital compounds when adoption is free and exit is expensive. We open the door with open source, lock the nucleus into production, then monetize the layers that only scale after the install.',
  surfaceEyebrow: 'Coverage',
  surfaceTitle: 'Four surfaces. One capital base.',
  surfaceSupport:
    'The same nucleus compounds across buyers, channel, timing, and attach — without a second platform payroll.',
  surfaceTabsLabel: 'Coverage surfaces',
  surfaceStageLabel: 'Surface detail',
  askTitle: 'Diligence starts with a conversation.',
  askSupport:
    'Open-source nucleus with a consulting edge. If you are mapping the multi-framework developer tooling space, we will walk the architecture end to end.',
  askCta: 'Request intro',
  askModalTitle: 'Request an intro',
  askModalSupport:
    'Share context for diligence. We reply with a short brief, architecture walkthrough options, and a clear next step.',
  askNameLabel: 'Name / fund',
  askNamePlaceholder: 'Jordan at Northpeak',
  askEmailLabel: 'Work email',
  askEmailPlaceholder: 'you@fund.com',
  askTypeLabel: 'Context',
  askTypePlaceholder: 'Choose one',
  askNoteLabel: 'Diligence note',
  askNotePlaceholder:
    'Stage, check size range, and what you want to pressure-test…',
  askSubmit: 'Send intro',
  askCancel: 'Back',
  askTrust: [
    'Founder reply',
    'Diligence brief included',
    'Confidential by default',
  ],
  navDocs: 'Docs',
  navGitHub: 'GitHub',
  navHome: 'Product',
} as const

export const NUC_INVESTOR_THESIS = [
  {
    index: '01',
    title: 'Stack churn is structural',
    body: 'Vue ↔ React, Nuxt ↔ Next, and Astro / Svelte / Solid host swaps keep recurring. Each cycle duplicates domain work that should have lived once.',
  },
  {
    index: '02',
    title: 'Hiring follows frameworks',
    body: 'Talent markets price React, Vue, Svelte, and Solid separately. A nucleus that ships seven shells without a second product org widens the hiring funnel.',
  },
  {
    index: '03',
    title: 'Agencies sell rewrites',
    body: 'The default pitch is still “rebuild in X.” Nucleify flips that: keep the nucleus, swap the shell when the brief changes.',
  },
] as const

/**
 * Planning model — sprints / year avoided vs dual-shell maintenance.
 * Dollars use a blended fully-loaded eng cost for diligence framing only.
 */
export const NUC_INVESTOR_SAVINGS = [
  {
    id: 'sprints',
    value: '18–30',
    unit: 'sprints / year',
    label: 'Avoided dual-stack glue',
    detail: 'Shared API + UI primitives instead of parallel feature work.',
  },
  {
    id: 'dollars',
    value: '$180k–$320k',
    unit: 'modeled / year',
    label: 'At ~$10k / sprint loaded',
    detail: 'Blended cost frame for a mid-size product org — not a forecast.',
  },
  {
    id: 'cycles',
    value: '1→N',
    unit: 'shells from one install',
    label: 'Emit without a second monorepo',
    detail: 'Vue, React, Nuxt, Next, Astro, Svelte, Solid from shared_modules.',
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

/** Intro plate — three numbers, one sentence. Dollars from savings model. */
export const NUC_INVESTOR_GLANCE = {
  eyebrow: 'At a glance',
  from: '7',
  to: '1',
  fromLabel: 'frameworks',
  toLabel: 'codebase',
  figure: investorSaving('dollars').value,
  figureLead: '$180k',
  figureTrail: '–$320k',
  figureUnit: '/ year kept',
  line: 'One team. No rewrite when the stack changes.',
  stacks: 'Vue · React · Nuxt · Next · Astro · Svelte · Solid',
  note: 'Illustrative · mid-size product · not a forecast',
} as const

export const NUC_INVESTOR_WEDGE = [
  {
    phase: 'Land',
    title: 'CAC approaches zero',
    body: 'The product installs itself. Engineers pull the nucleus because it kills rewrite work — not because a salesperson booked a demo.',
    signal: 'Self-serve demand',
  },
  {
    phase: 'Stick',
    title: 'Switching cost compounds',
    body: 'Once domain logic lives in the nucleus, rip-and-replace means rewriting the business. That is lock-in earned by architecture, not by contracts.',
    signal: 'Retention by design',
  },
  {
    phase: 'Expand',
    title: 'TAM multiplies without headcount',
    body: 'Every new shell is market coverage, not another platform team. Vue or Nuxt today, Next or Astro tomorrow, Svelte or Solid when the brief asks — same capital base, wider addressable surface.',
    signal: 'Leverage, not linear cost',
  },
  {
    phase: 'Monetize',
    title: 'Revenue rides the install base',
    body: 'Convert and consulting attach after the nucleus is already in production. Paid work follows usage — high intent, short sales cycle, rising attach rate.',
    signal: 'High-intent monetization',
  },
] as const

/** Framework shells — shared labels for investor surfaces / stack lists. */
export const NUC_INVESTOR_SHELLS = [
  {
    id: 'vue',
    label: 'Vue',
    detail: 'Composition API',
    icon: 'simple-icons:vuedotjs',
    color: '#42b883',
  },
  {
    id: 'nuxt',
    label: 'Nuxt',
    detail: 'SSR shell',
    icon: 'simple-icons:nuxtdotjs',
    color: '#00dc82',
  },
  {
    id: 'react',
    label: 'React',
    detail: 'App components',
    icon: 'simple-icons:react',
    color: '#61dafb',
  },
  {
    id: 'next',
    label: 'Next',
    detail: 'App Router',
    icon: 'simple-icons:nextdotjs',
    color: '#e8e8e8',
  },
  {
    id: 'astro',
    label: 'Astro',
    detail: 'Docs host',
    icon: 'simple-icons:astro',
    color: '#ff5d01',
  },
  {
    id: 'svelte',
    label: 'Svelte',
    detail: 'Reactive UI',
    icon: 'simple-icons:svelte',
    color: '#ff3e00',
  },
  {
    id: 'solid',
    label: 'Solid',
    detail: 'Fine-grained',
    icon: 'simple-icons:solid',
    color: '#2c4f7c',
  },
] as const

/** Coverage strip — interactive tabs + detail stage. */
export const NUC_INVESTOR_SURFACE = [
  {
    id: 'beachhead',
    index: '01',
    title: 'Beachhead buyers',
    description:
      'Mid-size product orgs already paying multi-shell tax (often React/Next + Vue/Nuxt, also Astro docs, Svelte/Solid experiments). They feel rewrite burn in the current quarter — not as a roadmap idea.',
    outcome: 'Pull demand',
    proof: 'Dual-shell product teams',
    metric: 'Now',
  },
  {
    id: 'agency',
    index: '02',
    title: 'Agency channel',
    description:
      'Agencies sell migrations. A nucleus story lets them keep the brief and drop the second platform team — pull, not cold outbound.',
    outcome: 'Channel leverage',
    proof: 'Rewrite budgets to nucleus',
    metric: 'Pull',
  },
  {
    id: 'timing',
    index: '03',
    title: 'Fashion-cycle timing',
    description:
      'Framework waves every 18–36 months reopen budgets. Each cycle widens TAM without hiring a new platform org.',
    outcome: 'Timing alpha',
    proof: '18–36 month stack waves',
    metric: '18–36mo',
  },
  {
    id: 'attach',
    index: '04',
    title: 'Attach after install',
    description:
      'Convert and consulting attach once the nucleus is already in production. High intent, short cycle, rising attach on an installed base.',
    outcome: 'High-intent ARR',
    proof: 'Usage to paid attach',
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
  return `/${lang}/docs/getting-started/introduction`
}
