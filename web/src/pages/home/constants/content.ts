export interface NucHomePillar {
  icon: string
  index: string
  title: string
  description: string
  outcome: string
  proof: string
}

export interface NucHomePillarStep {
  index: string
  label: string
  detail: string
}

export interface NucHomeStackItem {
  label: string
  detail: string
  icon: string
  color: string
  command: string
}

export const NUC_HOME_COPY = {
  brand: 'Nucleify',
  heroEyebrow: 'Open-source nucleus',
  headline: 'Ship modules. Not scaffolding.',
  support:
    'One installable module carries API, SQL, and UI — ready for Vue, React, Nuxt, Next, Astro, Svelte, and Solid.',
  ctaPrimary: 'See why',
  ctaSecondary: 'Star on GitHub',
  githubHref: 'https://github.com/Nucleify/Nucleify',
  heroSignal: 'multi-runtime',
  heroPanelTitle: '~/nucleify',
  heroPanelRunning: 'booting shell…',
  heroPanelDone: 'ready',
  navDocs: 'Docs',
  navPlayground: 'Playground',
  navGitHub: 'GitHub',
  navLogin: 'Login',
  navMenu: 'Menu',
  navClose: 'Close',
  sectionsLabel: 'Sections',
  pillarsEyebrow: 'Why Nucleify',
  pillarsTitle: 'Stop rebuilding the same platform.',
  pillarsSupport:
    'Most teams rewrite auth, entities, and admin for every framework. Nucleify ships that once — as installable modules with API, SQL, and UI already wired.',
  pillarsCta: 'See it boot across shells',
  stackEyebrow: 'Runtime surface',
  stackTitle: 'Pick a shell. Keep the nucleus.',
  stackSupport:
    'The same modules boot across Vue, React, Nuxt, Next, Astro, Svelte, and Solid — one domain, zero rewrites.',
  stackStageLabel: 'active shell',
  pulseEyebrow: 'Scale without rewrite',
  pulseTitle: 'Add shells. Keep the cost flat.',
  pulseSupport:
    'Every new framework usually means another rewrite of the same product surface. Nucleify ships the module once — the rewrite tax stays at ×1 as you grow.',
  pulseTraditionalLabel: 'traditional',
  pulseNucleifyLabel: 'nucleify',
  pulseShellsAxis: 'shells online',
  pulseStatus: '7 shells · rewrite tax ×1',
  pulseCostSuffix: '×',
  pulseUnitLabel: 'product surface',
  coreEyebrow: 'Without forking',
  coreTitle: 'Patch the surface. Leave the nucleus.',
  coreSupport:
    'Drop a file under overrides/ — web, admin, docs, or shared_modules. Same relative path, your surface on top.',
  coreModuleLabel: 'source',
  coreOverrideLabel: 'overrides/',
  coreBoundLabel: 'bound',
  coreUnboundLabel: 'stock',
  coreKeepLabel: 'contracts kept',
  coreNucleusLabel: 'nucleus intact',
  closeTitle: 'Start from the nucleus.',
  closeSupport:
    'Clone, install modules, and keep shipping — without rebuilding the same platform twice.',
  closeCta: 'Get in touch',
  compilerEyebrow: 'Portable emit',
  compilerTitle: 'One authoring. Every shell.',
  compilerSupport:
    'A *.nuc.tsx nucleus fans out through the IR — hover a cube to light the path into that stack.',
  compilerHub: '.nuc',
  compilerHubLabel: 'authoring',
  compilerEmitLabel: 'emitting →',
  compilerCta: 'Prove it',
  closeModalTitle: 'Send a message',
  closeModalSupport: 'Drop your email and what you need — we will reply.',
  closeEmailLabel: 'Email',
  closeEmailPlaceholder: 'you@company.com',
  closeTypeLabel: 'What do you need?',
  closeTypePlaceholder: 'Choose one',
  closeSubmit: 'Send message',
  closeSending: 'Sending…',
  closeSuccess: 'Message sent. We will reply soon.',
  closeErrorGeneric: 'Could not send. Please try again.',
  closeErrorEmail: 'Enter a valid email address.',
  closeErrorType: 'Pick what you need.',
} as const

export const NUC_HOME_CONTACT_TYPES = [
  { label: 'Landing page', value: 'landing' },
  { label: 'Business site', value: 'business' },
  { label: 'Blog', value: 'blog' },
  { label: 'Help / other', value: 'help' },
] as const

export const NUC_HOME_HERO_PROOF = [
  'Typed APIs',
  'Shared UI',
  'Supabase-ready',
] as const

export interface NucHomeHeroShell {
  id: string
  label: string
  command: string
  result: string
  icon: string
  color: string
}

export const NUC_HOME_HERO_SHELLS: NucHomeHeroShell[] = [
  {
    id: 'nuxt',
    label: 'Nuxt',
    command: 'make nuxt',
    result: 'vue ssr shell · online',
    icon: 'simple-icons:nuxtdotjs',
    color: '#00dc82',
  },
  {
    id: 'next',
    label: 'Next',
    command: 'make next',
    result: 'react app router · online',
    icon: 'simple-icons:nextdotjs',
    color: '#e8e8e8',
  },
  {
    id: 'astro',
    label: 'Astro',
    command: 'make astro',
    result: 'content islands · online',
    icon: 'simple-icons:astro',
    color: '#ff5d01',
  },
  {
    id: 'svelte',
    label: 'Svelte',
    command: 'make svelte',
    result: 'reactive ui · online',
    icon: 'simple-icons:svelte',
    color: '#ff3e00',
  },
  {
    id: 'solid',
    label: 'Solid',
    command: 'make solid',
    result: 'fine-grained ui · online',
    icon: 'simple-icons:solid',
    color: '#72b7eb',
  },
]

export const NUC_HOME_SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'architecture', label: 'Why' },
  { id: 'stack', label: 'Stack' },
  { id: 'core', label: 'Craft' },
  { id: 'pulse', label: 'Scale' },
  { id: 'compiler', label: 'Emit' },
  { id: 'start', label: 'Start' },
] as const

export interface NucHomeCraftSurface {
  id: 'web' | 'admin' | 'docs' | 'shared'
  kind: string
  icon: string
  moduleFile: string
  overrideFile: string
  note: string
  preview: string
}

export const NUC_HOME_CRAFT_SURFACES: NucHomeCraftSurface[] = [
  {
    id: 'web',
    kind: 'web',
    icon: 'mdi:web',
    moduleFile: 'web/src/pages/home',
    overrideFile: 'overrides/web/src/pages/home',
    note: 'Landing shell. Your sections.',
    preview: '@nucleify/web',
  },
  {
    id: 'admin',
    kind: 'admin',
    icon: 'mdi:shield-account-outline',
    moduleFile: 'admin/src/pages',
    overrideFile: 'overrides/admin/src/pages',
    note: 'Same URL. Your back-office UI.',
    preview: '@nucleify/admin',
  },
  {
    id: 'docs',
    kind: 'docs',
    icon: 'mdi:book-open-page-variant-outline',
    moduleFile: 'docs/content/en',
    overrideFile: 'overrides/docs/content/en',
    note: 'Docs stay typed. Your wording.',
    preview: '@nucleify/docs',
  },
  {
    id: 'shared',
    kind: 'shared',
    icon: 'mdi:puzzle-outline',
    moduleFile: 'shared_modules/nuc_colors/styles/variables.scss',
    overrideFile: 'overrides/shared_modules/nuc_colors/styles/variables.scss',
    note: 'Shared tokens. Brand on top.',
    preview: 'nuc_colors',
  },
]

export type NucHomeSectionId = (typeof NUC_HOME_SECTIONS)[number]['id']

export const NUC_HOME_PILLAR_STEPS: NucHomePillarStep[] = [
  {
    index: '01',
    label: 'Install a module',
    detail: 'One package. Full surface.',
  },
  {
    index: '02',
    label: 'Keep one contract',
    detail: 'Types + API stay shared.',
  },
  {
    index: '03',
    label: 'Ship every shell',
    detail: 'Nuxt, Next, and beyond.',
  },
]

export const NUC_HOME_PILLARS: NucHomePillar[] = [
  {
    icon: 'mdi:cube-outline',
    index: '01',
    title: 'A module is a product slice',
    description:
      'Not a folder of leftovers — each nuc_* module brings routes, SQL, and UI that plug into one gateway.',
    outcome: 'Weeks of scaffolding → hours',
    proof: 'api · sql · ui in one unit',
  },
  {
    icon: 'mdi:file-code-outline',
    index: '02',
    title: 'Contracts travel with the feature',
    description:
      'Types and request helpers live beside the module, so Vue and React stay aligned without copy-paste drift.',
    outcome: 'One source of truth',
    proof: 'shared types · shared calls',
  },
  {
    icon: 'mdi:palette-swatch-outline',
    index: '03',
    title: 'UI that survives framework churn',
    description:
      'nucleify-ui (Lit) gives you a premium system once — green for Nuxt, blue for Next, same components everywhere.',
    outcome: 'One design system',
    proof: 'nui-* · framework-agnostic',
  },
]

export const NUC_HOME_STACK: NucHomeStackItem[] = [
  {
    label: 'Vue',
    detail: 'Composition API',
    icon: 'simple-icons:vuedotjs',
    color: '#42b883',
    command: 'make vue',
  },
  {
    label: 'React',
    detail: 'App components',
    icon: 'simple-icons:react',
    color: '#61dafb',
    command: 'make react',
  },
  {
    label: 'Nuxt',
    detail: 'Vue SSR shell',
    icon: 'simple-icons:nuxtdotjs',
    color: '#00dc82',
    command: 'make nuxt',
  },
  {
    label: 'Next',
    detail: 'React App Router',
    icon: 'simple-icons:nextdotjs',
    color: '#e8e8e8',
    command: 'make next',
  },
  {
    label: 'Astro',
    detail: 'Content islands',
    icon: 'simple-icons:astro',
    color: '#ff5d01',
    command: 'make astro',
  },
  {
    label: 'Svelte',
    detail: 'Reactive UI',
    icon: 'simple-icons:svelte',
    color: '#ff3e00',
    command: 'make svelte',
  },
  {
    label: 'Solid',
    detail: 'Fine-grained UI',
    icon: 'simple-icons:solid',
    color: '#72b7eb',
    command: 'make solid',
  },
]

export interface NucHomeCompilerNode {
  id: string
  label: string
  icon: string
  color: string
  command: string
  /** Percent position in the graph stage (0–100). */
  x: number
  y: number
}

/** Shells around the portable `.nuc` hub (Vite-style emit graph). */
export const NUC_HOME_COMPILER_NODES: NucHomeCompilerNode[] = [
  {
    id: 'vue',
    label: 'Vue',
    icon: 'simple-icons:vuedotjs',
    color: '#42b883',
    command: 'make vue',
    x: 26,
    y: 28,
  },
  {
    id: 'react',
    label: 'React',
    icon: 'simple-icons:react',
    color: '#61dafb',
    command: 'make react',
    x: 74,
    y: 28,
  },
  {
    id: 'nuxt',
    label: 'Nuxt',
    icon: 'simple-icons:nuxtdotjs',
    color: '#00dc82',
    command: 'make nuxt',
    x: 18,
    y: 52,
  },
  {
    id: 'next',
    label: 'Next',
    icon: 'simple-icons:nextdotjs',
    color: '#e8e8e8',
    command: 'make next',
    x: 82,
    y: 52,
  },
  {
    id: 'astro',
    label: 'Astro',
    icon: 'simple-icons:astro',
    color: '#ff5d01',
    command: 'make astro',
    x: 34,
    y: 74,
  },
  {
    id: 'svelte',
    label: 'Svelte',
    icon: 'simple-icons:svelte',
    color: '#ff3e00',
    command: 'make svelte',
    x: 66,
    y: 74,
  },
]

export const NUC_HOME_PULSE_SHELLS = [
  'Vue',
  'React',
  'Nuxt',
  'Next',
  'Astro',
  'Svelte',
  'Solid',
] as const
