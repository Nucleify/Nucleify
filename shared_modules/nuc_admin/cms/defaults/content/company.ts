import { docsPageHref, NUC_DOCS_ORIGIN } from './home'

export { docsPageHref, NUC_DOCS_ORIGIN }

export type NucCompanySectionId =
  | 'intro'
  | 'thesis'
  | 'savings'
  | 'wedge'
  | 'surface'
  | 'ask'

export const NUC_COMPANY_SECTIONS = [
  { id: 'intro', label: 'Pitch' },
  { id: 'thesis', label: 'Why' },
  { id: 'savings', label: 'Keep' },
  { id: 'wedge', label: 'Path' },
  { id: 'surface', label: 'Reach' },
  { id: 'ask', label: 'Talk' },
] as const satisfies ReadonlyArray<{ id: NucCompanySectionId; label: string }>

export const NUC_COMPANY_SEO = {
  title:
    'Nucleify for migration companies - win briefs without a second platform team',
  description:
    'For firms that migrate other companies: keep client domain in shared TypeScript, emit idiomatic frameworks, ship owned source and one Supabase data plane - then attach convert help after go-live.',
  ogImage: '/img/og-image.png',
} as const

export const NUC_COMPANY_COPY = {
  brand: 'Nucleify',
  sectionsLabel: 'Migration company sections',
  heroEyebrow: 'For migration companies',
  headline: 'Charge the same migration fee.\nRewrite half the work.',
  support:
    'Client picks a new stack. Keep domain in shared TypeScript, emit the framework, leave Supabase with the product.',
  ctaPrimary: 'Open Playground',
  ctaSecondary: 'Walk us through a brief',
  ctaTertiary: 'See how delivery holds',
  githubHref: 'https://github.com/Nucleify/Nucleify',
  thesisEyebrow: 'Why briefs bleed',
  thesisTitle: 'Fixed fees cannot\nsurvive the rewrite.',
  thesisSupport:
    'Without a shared nucleus you rebuild components, types, validation, and glue - then chase drift while the business barely moves.\nHalf the fee dies there. Emit makes the next stack a build step.',
  savingsEyebrow: 'What you put in the offer',
  savingsTitle: 'Reuse the domain once.\nEmit every target stack.',
  savingsSupport: '',
  savingsCta: 'See where margin holds',
  savingsNote: 'Product facts · verify in docs and playground · not a forecast',
  pulseShellsAxis: 'Frameworks from one nucleus',
  wedgeEyebrow: 'How the engagement runs',
  wedgeTitle: 'Prove it on the brief.\nGrow every win into a retainer.',
  wedgeSupport:
    'Same team for every stack - then sell help and retainers.\nWin the SOW with emit they can commit, not slides.',
  surfaceEyebrow: 'Where the work shows up',
  surfaceTitle: 'Four ways briefs find you.',
  surfaceSupport:
    'Same modules for every job. Clients stuck on two stacks, paid migration work coming in, studios that cover many frameworks, and retainers after go-live - without hiring a new team for each framework.',
  surfaceTabsLabel: 'Brief types',
  surfaceStageLabel: 'Brief detail',
  askTitle: 'Walk us through the brief',
  askSupport:
    'Who the client is, stack today, target framework, and timeline - we reply with a concrete next step you can take into the proposal.',
  askCta: 'Walk us through a brief',
  askModalTitle: 'Walk us through the brief',
  askModalSupport:
    'Client context, current stack, target framework, timeline - we reply with a next step for the proposal.',
  askNameLabel: 'Name / organisation',
  askNamePlaceholder: 'Alex at Acme Delivery',
  askEmailLabel: 'Work email',
  askEmailPlaceholder: 'you@company.com',
  askTypeLabel: 'What do you need?',
  askTypePlaceholder: 'Choose one',
  askNoteLabel: 'Brief notes',
  askNotePlaceholder:
    'Client, stack today, target framework, timeline, and what “done” means…',
  askSubmit: 'Send message',
  askCancel: 'Back',
  navDocs: 'Docs',
  navPlay: 'Playground',
  navCli: 'CLI',
  navGitHub: 'GitHub',
  navHome: 'Product',
  playgroundHref: 'https://play.nucleify.io',
  cliHref: 'https://cli.nucleify.io',
  glanceAria: 'Delivery snapshot',
  pulseTraditionalLabel: 'Rewrite per client stack',
  pulseNucleifyLabel: 'One nucleus, seven frameworks',
  pulseCostSuffix: '×',
  pulseUnitLabel: 'delivery effort',
  pulseStatus: 'Hours on features. Not a second UI.',
  thesisCta: 'See what goes in the offer',
} as const

export const NUC_COMPANY_THESIS = [
  {
    index: '01',
    icon: 'mdi:cash-minus',
    title: 'Rewrite tax eats the fixed price',
    body: 'Vue → React, Nuxt → Next: without shared modules you rebuild forms, state, and glue while domain rules barely move. Margin dies before the first feature lands.',
    outcome: 'Margin leak',
    proof: 'shared_modules + emit',
  },
  {
    index: '02',
    icon: 'mdi:cube-outline',
    title: 'The nucleus is what you keep',
    body: 'Typed client, handlers, and SQL move from client to client. The UI framework is just a build target. You sell reusable delivery IP - not another hire wave every time the stack changes.',
    outcome: 'Reusable IP',
    proof: 'Supabase gateway + SQL',
  },
  {
    index: '03',
    icon: 'mdi:rocket-launch-outline',
    title: 'Sell the outcome. Tool later.',
    body: 'They can install open-core on day one. Paid convert and help attach when the nucleus is already in their production - trust first, invoice after.',
    outcome: 'Paid after prod',
    proof: 'Land → earn path',
  },
] as const

export const NUC_COMPANY_SAVINGS = [
  {
    id: 'shells',
    value: '7',
    unit: 'stacks without a rewrite',
    label: 'Take the lead without a second squad',
    detail:
      'Vue, React, Nuxt, Next, Astro, Svelte, Solid from modules you already staff. Next framework costs emit hours - not another hire wave.',
  },
  {
    id: 'runtime',
    value: '0',
    unit: 'ongoing framework tax',
    label: 'Handover that clears procurement',
    detail:
      'They get normal project code in their own repo. Nothing to rent forever - the UI you deliver is theirs to keep and change.',
  },
  {
    id: 'data',
    value: '1',
    unit: 'backend to keep alive',
    label: 'Stop paying for dual APIs',
    detail:
      'Module SQL, typed client, and gateway stay one story while frameworks change. You do not staff two backends for one migration.',
  },
] as const

export const NUC_COMPANY_GLANCE = {
  eyebrow: 'Delivery snapshot',
  from: '7',
  to: '1',
  fromLabel: 'frameworks',
  toLabel: 'shared nucleus',
  figure: '7→1',
  figureLead: '7',
  figureTrail: '1',
  figureUnit: 'frameworks / nucleus',
  line: 'Client owns emit.\nOne shared backend.\nHours on features.',
  note: 'Product facts',
} as const

export const NUC_COMPANY_CUBE_FACES = [
  { id: 'ui', label: 'Product' },
  { id: 'sdk', label: 'Nucleus' },
  { id: 'data', label: 'Delivery' },
] as const

export const NUC_COMPANY_WEDGE = [
  {
    phase: 'Land',
    icon: 'mdi:download-outline',
    title: 'Show the migration before price',
    body: 'Run playground or CLI on their Vue → React (or Nuxt → Next) brief. They see real owned source in their repo before you lock price - not another forty-slide promise.',
    signal: 'Proof before price',
  },
  {
    phase: 'Stick',
    icon: 'mdi:lock-outline',
    title: 'More stacks, same load',
    body: 'Any framework can move to any other - Vue to React, Nuxt to Next, or reverse. Bring the existing project; convert needs no *.nuc.tsx rewrite. Nucleus + compiler turn the next stack into emit, not a rewrite.',
    signal: 'Convert, not rewrite',
  },
  {
    phase: 'Expand',
    icon: 'mdi:expand-all-outline',
    title: 'Say yes to the next framework',
    body: 'Client wants Solid after Next, or Astro for docs. Same modules, same delivery team - bid every new stack wave without hiring another platform squad to carry it.',
    signal: 'Same team, new stack',
  },
  {
    phase: 'Earn',
    icon: 'mdi:cash-multiple',
    title: 'Sell help after the handoff',
    body: 'Convert, guided migration, retainers - after they already ship with the compiler on a live stack. Trust came from delivery, so the upsell is short and high intent.',
    signal: 'Retainer after trust',
  },
] as const

/** Same seven frameworks as other marketing surfaces. */
export const NUC_COMPANY_SHELLS = [
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

export const NUC_COMPANY_SURFACE = [
  {
    id: 'beachhead',
    index: '01',
    icon: 'mdi:office-building-outline',
    color: '#00dc82',
    title: 'Clients already on two UIs',
    description:
      'React/Next plus Vue/Nuxt (and a docs stack) - rewrite cost is already on this quarter’s books. Briefs land when the second stack starts to hurt.',
    outcome: 'Urgent brief',
    proof: 'Dual-stack burn',
    metric: 'Now',
  },
  {
    id: 'agency',
    index: '02',
    icon: 'mdi:handshake-outline',
    color: '#61dafb',
    title: 'You own the migration SOW',
    description:
      'Nucleus story lets you keep the client relationship and skip staffing a second platform team. Rewrite budgets pull work in - you are not cold-calling for glue work.',
    outcome: 'You keep the SOW',
    proof: 'Rewrite budget → you',
    metric: 'Pull',
  },
  {
    id: 'timing',
    index: '03',
    icon: 'mdi:timeline-clock-outline',
    color: '#ff5d01',
    title: 'When migration RFPs open',
    description:
      'Stack waves open priced migration work. Each wave is capacity you can bid without inventing a new delivery org - timing is a market thesis, not a forecast chip.',
    outcome: 'Bid ready',
    proof: 'Stack-wave RFPs',
    metric: 'Wave timing',
  },
  {
    id: 'attach',
    index: '04',
    icon: 'mdi:chart-line',
    color: '#42b883',
    title: 'Retainers after go-live',
    description:
      'Convert and consulting attach once their nucleus is in production. Post-install buyers already feel switching cost - easier upsell than a cold tooling pitch.',
    outcome: 'Attach revenue',
    proof: 'Usage → paid help',
    metric: 'Attach',
  },
] as const

/** API-stable values; company-facing labels. */
export const NUC_COMPANY_CONTACT_TYPES = [
  { label: 'Price a client migration', value: 'business' },
  { label: 'Guided conversion on a brief', value: 'landing' },
  { label: 'Retainer / delivery tooling', value: 'blog' },
  { label: 'Partner chat', value: 'help' },
] as const

export function companyHomeHref(lang: string): string {
  return `/${lang}/home`
}

export function companyDocsHref(lang: string): string {
  return docsPageHref(lang, 'getting-started/introduction')
}
