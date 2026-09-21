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
  { id: 'surface', label: 'Surface' },
  { id: 'ask', label: 'Ask' },
] as const satisfies ReadonlyArray<{ id: NucInvestorSectionId; label: string }>

export const NUC_INVESTOR_SEO = {
  title: 'Investor — Nucleify',
  description:
    'One shared nucleus for modern web stacks. Cut rewrite tax, ship Vue, React, Nuxt, Next, and more from a single install.',
  ogImage: '/img/logo.svg',
} as const

export const NUC_INVESTOR_COPY = {
  brand: 'Nucleify',
  sectionsLabel: 'Investor sections',
  heroEyebrow: 'Investor brief',
  headline: 'One nucleus.',
  support:
    'Teams burn quarters rewriting the same product across Vue, React, Nuxt, and Next. Nucleify keeps domain logic, APIs, and portable UI in one shared layer — then emits into the stack the market asks for.',
  ctaPrimary: 'Talk to us',
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
  surfaceEyebrow: 'Emit surface',
  surfaceTitle: 'Seven shells. One install.',
  surfaceSupport:
    'Product boots with make web. Portable *.nuc.tsx emits Vue, React, Nuxt, Next, Astro, Svelte, and Solid — same props, same primitives.',
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

export const NUC_INVESTOR_PROOF = [
  'Open source',
  'Multi-shell emit',
  'Supabase-ready',
] as const

export const NUC_INVESTOR_THESIS = [
  {
    index: '01',
    title: 'Stack churn is structural',
    body: 'Vue ↔ React migrations and Nuxt ↔ Next host swaps keep recurring. Each cycle duplicates domain work that should have lived once.',
  },
  {
    index: '02',
    title: 'Hiring follows frameworks',
    body: 'Talent markets price React and Vue separately. A nucleus that ships both without a second product org widens the hiring funnel.',
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

/** Intro snapshot. Dollars stay tied to the savings model. Shells = Surface. */
export const NUC_INVESTOR_DEAL = {
  source: 'nucleus',
  sourceFile: '*.nuc.tsx',
  figure: investorSaving('dollars').value,
  figureLead: '$180k',
  figureTrail: '–$320k',
  unit: 'kept / year',
  caption: 'Second team never staffed',
  note: 'Illustrative model · not a forecast',
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
    body: 'Every new shell is market coverage, not another platform team. Vue today, React tomorrow — same capital base, wider addressable surface.',
    signal: 'Leverage, not linear cost',
  },
  {
    phase: 'Monetize',
    title: 'Revenue rides the install base',
    body: 'Convert and consulting attach after the nucleus is already in production. Paid work follows usage — high intent, short sales cycle, rising attach rate.',
    signal: 'High-intent monetization',
  },
] as const

export const NUC_INVESTOR_SURFACE = [
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
