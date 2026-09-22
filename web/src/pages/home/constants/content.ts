export interface NucHomePillar {
  icon: string
  index: string
  title: string
  description: string
  outcome: string
  proof: string
}

export interface NucHomeWebShareSlice {
  id: string
  label: string
  pct: number
}

export interface NucHomeWebShareGroup {
  id: string
  label: string
  color: string
  sliceIds: readonly string[]
}

export interface NucHomeWebShareArc {
  id: string
  label: string
  d: string
  color: string
}

/**
 * Relative origin counts among Nucleify emit targets — not % of all websites.
 * HTTP Archive (Jul 2026) for React / Next / Vue / Nuxt / Svelte / Astro;
 * Solid from Wappalyzer live-site count, scaled to the same unit (thousands).
 * Family pairs share one wedge and one color: React/Next blue, Vue/Nuxt green.
 */
export const NUC_HOME_WEB_SHARE = {
  cx: 50,
  cy: 50,
  radius: 46,
  innerRadius: 30,
  gapDeg: 1.6,
  slices: [
    { id: 'react', label: 'React', pct: 1306 },
    { id: 'next', label: 'Next.js', pct: 358 },
    { id: 'vue', label: 'Vue', pct: 610 },
    { id: 'nuxt', label: 'Nuxt', pct: 93 },
    { id: 'astro', label: 'Astro', pct: 41 },
    { id: 'svelte', label: 'Svelte', pct: 90 },
    { id: 'solid', label: 'Solid', pct: 19 },
  ],
  groups: [
    {
      id: 'react-next',
      label: 'React & Next.js',
      color: '#61dafb',
      sliceIds: ['react', 'next'],
    },
    {
      id: 'vue-nuxt',
      label: 'Vue & Nuxt',
      color: '#42b883',
      sliceIds: ['vue', 'nuxt'],
    },
    { id: 'astro', label: 'Astro', color: '#ff5d01', sliceIds: ['astro'] },
    { id: 'svelte', label: 'Svelte', color: '#ff3e00', sliceIds: ['svelte'] },
    { id: 'solid', label: 'Solid', color: '#72b7eb', sliceIds: ['solid'] },
  ],
} as const satisfies {
  cx: number
  cy: number
  radius: number
  innerRadius: number
  gapDeg: number
  slices: readonly NucHomeWebShareSlice[]
  groups: readonly NucHomeWebShareGroup[]
}

export function nucHomeWebShareLine(): string {
  return NUC_HOME_WEB_SHARE.groups.map((group) => group.label).join(' · ')
}

export function nucHomeWebShareLegend(): Array<{
  id: string
  label: string
  color: string
}> {
  return NUC_HOME_WEB_SHARE.groups.map((group) => ({
    id: group.id,
    label: group.label,
    color: group.color,
  }))
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

export function nucHomeWebShareArcs(): NucHomeWebShareArc[] {
  const { cx, cy, radius, innerRadius, gapDeg, slices, groups } =
    NUC_HOME_WEB_SHARE
  const byId = Object.fromEntries(slices.map((slice) => [slice.id, slice]))
  const packed = groups.map((group) => {
    const weight = group.sliceIds.reduce((sum, id) => sum + byId[id]!.pct, 0)
    return { group, weight }
  })
  const total = packed.reduce((sum, item) => sum + item.weight, 0)
  let cursor = -90
  return packed.map(({ group, weight }) => {
    const sweep = (weight / total) * 360
    const pad = Math.min(gapDeg / 2, sweep / 6)
    const start = cursor + pad
    const end = cursor + sweep - pad
    cursor += sweep
    return {
      id: group.id,
      label: group.label,
      d: annularSector(cx, cy, innerRadius, radius, start, end),
      color: group.color,
    }
  })
}

export interface NucHomeStackItem {
  label: string
  detail: string
  icon: string
  color: string
  command: string
}

export const NUC_HOME_SEO = {
  title: 'Nucleify — Modular monorepo for Vue, React, Nuxt & Next',
  description:
    'Open-source nucleus for developers: shared_modules, typed APIs, and a portable UI compiler. Ship Vue, React, Nuxt, Next, and Supabase from one install — without rewriting the product.',
  ogImage: 'https://nucleify.io/img/logo.svg',
} as const

export const NUC_HOME_DOCS = {
  intro: 'getting-started/introduction',
  install: 'getting-started/installation',
  compiler: 'core-concepts/compiler',
  overrides: 'core-concepts/overriding',
  modules: 'core-concepts/modules',
} as const

export function homeDocsHref(
  lang: string,
  page: keyof typeof NUC_HOME_DOCS
): string {
  return `/${lang}/docs/${NUC_HOME_DOCS[page]}`
}

export const NUC_HOME_COPY = {
  brand: 'Nucleify',
  heroEyebrow: 'Open-source nucleus',
  headline: 'Ship one module. Boot every shell.',
  support:
    'shared_modules carry API, SQL, and UI. The portable compiler emits Vue, React, Nuxt, and Next — Supabase already on the gateway.',
  ctaPrimary: 'Read the docs',
  ctaSecondary: 'Star on GitHub',
  ctaTertiary: 'Why Nucleify',
  githubHref: 'https://github.com/Nucleify/Nucleify',
  heroSignal: 'multi-runtime',
  heroPanelTitle: '~/nucleify',
  heroPanelRunning: 'booting shell…',
  heroPanelDone: 'ready',
  heroInstallLabel: 'Get running',
  navDocs: 'Docs',
  navPlayground: 'Playground',
  navGitHub: 'GitHub',
  navLogin: 'Login',
  navMenu: 'Menu',
  navClose: 'Close',
  sectionsLabel: 'Sections',
  pillarsEyebrow: 'Why Nucleify',
  pillarsTitle: 'One shared layer. Every modern stack.',
  pillarsSupport:
    'Framework used to be the product. Auth, entities, admin — rewritten for Vue, then React, then whatever ships next. Nucleify inverts the tax. One module. Seven emit targets. Same types on the gateway.',
  pillarsCta: 'Get running',
  pillarsShareUnit: 'top stacks',
  pillarsShareSource: 'Modern web. One emit surface.',
  stackEyebrow: 'Runtime surface',
  stackTitle: 'Pick a shell. Keep the nucleus.',
  stackSupport:
    'One domain in shared_modules. Product shells boot with make web; emit demos fan the same nucleus into Vue, React, Nuxt, and Next.',
  stackCta: 'See the emit',
  stackStageLabel: 'active shell',
  pulseEyebrow: 'Scale without rewrite',
  pulseTitle: 'Add shells. Keep the cost flat.',
  pulseSupport:
    'A new framework usually means another rewrite of the same product. Nucleify ships the module once — rewrite tax stays at ×1 as shells come online.',
  pulseCta: 'Get in touch',
  pulseCompare:
    'Traditional cost grows with each shell. Nucleify stays at one product surface.',
  pulseTraditionalLabel: 'traditional',
  pulseNucleifyLabel: 'nucleify',
  pulseShellsAxis: 'shells online',
  pulseStatus: '7 shells · rewrite tax 0%',
  pulseScaling: 'Scaling',
  pulseCostSuffix: '×',
  pulseUnitLabel: 'product surface',
  coreEyebrow: 'One installable unit',
  coreTitle: 'A module is a product slice.',
  coreSupport:
    'API, SQL, and UI in one nuc_* package. Drop it on the gateway — Vue and React stay aligned.',
  coreCta: 'See the cost stay flat',
  coreDocsCta: 'Read modules docs',
  coreLaneSdk: 'sdk',
  coreLaneData: 'data',
  coreLaneUi: 'ui',
  coreLive: 'vue · react · one module',
  coreInspect: 'live slice',
  startEyebrow: 'One installable unit',
  startTitle: 'A module is a product slice.',
  startCta: 'Get in touch',
  cloneEyebrow: 'Get running',
  cloneTitle: 'Clone the nucleus. Ship today.',
  cloneSupport:
    'Three commands from the repo root. Then open localhost and read the docs — or ping us if you want in.',
  cloneCta: 'Read the docs',
  cloneCtaNext: 'Pick a shell',
  closeTitle: 'Get in touch.',
  closeSupport:
    'Open source, contribute, or consulting — drop an email and we will reply.',
  closeCta: 'Get in touch',
  compilerEyebrow: 'Portable compiler',
  compilerTitle: 'Author once. Open the emit.',
  compilerSupport:
    'Write the component in *.nuc.tsx. The IR prints Vue, React, Nuxt, Next, Astro, and Svelte in native syntax — same props, same primitive.',
  compilerHub: '.nuc',
  compilerHubLabel: 'author',
  compilerEmitLabel: 'emit',
  compilerCta: 'Read compiler docs',
  closeModalTitle: 'Start a conversation',
  closeModalSupport:
    'Tell us who you are and what you need. We reply with a concrete next step — no sales theatre.',
  closeNameLabel: 'Name / organisation',
  closeNamePlaceholder: 'Alex at Acme',
  closeEmailLabel: 'Work email',
  closeEmailPlaceholder: 'you@company.com',
  closeTypeLabel: 'What do you need?',
  closeTypePlaceholder: 'Choose one',
  closeNoteLabel: 'Project note',
  closeNotePlaceholder: 'Stack today, timeline, and what success looks like…',
  closeSubmit: 'Send message',
  closeCancel: 'Back',
  closeSending: 'Sending…',
  closeSuccess: 'Message sent. We will reply soon.',
  closeErrorGeneric: 'Could not send. Please try again.',
  closeErrorEmail: 'Enter a valid email address.',
  closeErrorType: 'Pick what you need.',
  closeErrorMessage: 'Message is too long.',
  closeTrust: [
    'Reply within 2 business days',
    'No spam, no drip sequences',
    'Open-source friendly',
  ],
} as const

export const NUC_HOME_INSTALL_STEPS = [
  'git clone https://github.com/Nucleify/Nucleify.git',
  'make run',
  'make web',
] as const

/** Values stay API-stable; labels are developer-intent. */
export const NUC_HOME_CONTACT_TYPES = [
  { label: 'Open source / eval', value: 'landing' },
  { label: 'Contribute', value: 'business' },
  { label: 'Consulting', value: 'blog' },
  { label: 'Other', value: 'help' },
] as const

export const NUC_HOME_HERO_PROOF = [
  'Typed APIs',
  'Portable UI',
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
    command: 'make web target=NUXT',
    result: 'nuxt product shell · online',
    icon: 'simple-icons:nuxtdotjs',
    color: '#00dc82',
  },
  {
    id: 'next',
    label: 'Next',
    command: 'make web target=NEXT',
    result: 'next product shell · online',
    icon: 'simple-icons:nextdotjs',
    color: '#e8e8e8',
  },
  {
    id: 'astro',
    label: 'Astro',
    command: 'make web target=ASTRO',
    result: 'astro docs host · online',
    icon: 'simple-icons:astro',
    color: '#ff5d01',
  },
  {
    id: 'svelte',
    label: 'Svelte',
    command: 'make web target=SVELTE',
    result: 'reactive ui · online',
    icon: 'simple-icons:svelte',
    color: '#ff3e00',
  },
  {
    id: 'solid',
    label: 'Solid',
    command: 'make web target=SOLID',
    result: 'fine-grained ui · online',
    icon: 'simple-icons:solid',
    color: '#72b7eb',
  },
]

export const NUC_HOME_SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'architecture', label: 'Why' },
  { id: 'clone', label: 'Clone' },
  { id: 'stack', label: 'Shells' },
  { id: 'compiler', label: 'Emit' },
  { id: 'pulse', label: 'Scale' },
  { id: 'start', label: 'Start' },
] as const

export type NucHomeModuleLaneId = 'sdk' | 'data' | 'ui'

export interface NucHomeModuleLane {
  id: NucHomeModuleLaneId
  title: string
  path: string
  detail: string
}

export interface NucHomeModule {
  id: string
  name: string
  icon: string
  note: string
  lanes: NucHomeModuleLane[]
}

export const NUC_HOME_MODULES: NucHomeModule[] = [
  {
    id: 'api',
    name: 'nuc_api',
    icon: 'mdi:api',
    note: 'One client. One gateway. Every shell.',
    lanes: [
      {
        id: 'sdk',
        title: 'Typed client',
        path: 'shared_modules/nuc_api/utils/api_request.ts',
        detail: 'One request helper. Vue and React stay on the same types.',
      },
      {
        id: 'data',
        title: 'Gateway',
        path: 'shared_modules/nuc_api/supabase/api/gateway_dispatch.ts',
        detail: 'Nitro hands the request to the module. No second backend.',
      },
      {
        id: 'ui',
        title: 'Feedback',
        path: 'shared_modules/nuc_api/utils/use_toast.ts',
        detail: 'Auth forms and toasts ship with the API — not per app.',
      },
    ],
  },
  {
    id: 'colors',
    name: 'nuc_colors',
    icon: 'mdi:palette-outline',
    note: 'Tokens in, brand on top.',
    lanes: [
      {
        id: 'sdk',
        title: 'Design tokens',
        path: 'shared_modules/nuc_colors/styles/variables/_index.scss',
        detail: 'One token file. Nuxt green, Next blue — same names.',
      },
      {
        id: 'data',
        title: 'Theme sync',
        path: 'shared_modules/nuc_colors/supabase/api/handle.ts',
        detail: 'User and system colors persist in Supabase.',
      },
      {
        id: 'ui',
        title: 'Color picker',
        path: 'shared_modules/nuc_colors/components/color-picker',
        detail: 'The control you ship. Brand swaps values, not the UI.',
      },
    ],
  },
  {
    id: 'languages',
    name: 'nuc_languages',
    icon: 'mdi:translate',
    note: 'Copy, locale, one table.',
    lanes: [
      {
        id: 'sdk',
        title: 'Locale load',
        path: 'shared_modules/nuc_languages/utils/fetch_locale_messages.ts',
        detail: 'Load catalogs once. Same keys on Vue and React.',
      },
      {
        id: 'data',
        title: 'Translations',
        path: 'shared_modules/nuc_languages/supabase/api/handle.ts',
        detail: 'Copy lives in Supabase, seeded per locale.',
      },
      {
        id: 'ui',
        title: 'Catalog',
        path: 'shared_modules/nuc_languages/constants/languages.ts',
        detail: 'The locales the picker shows. One list, every shell.',
      },
    ],
  },
  {
    id: 'stores',
    name: 'nuc_stores',
    icon: 'mdi:database-outline',
    note: 'Pinia, Zustand, same verbs.',
    lanes: [
      {
        id: 'sdk',
        title: 'Shared barrel',
        path: 'shared_modules/nuc_stores/index.ts',
        detail: 'Pinia on Nuxt, Zustand on Next. Same verbs.',
      },
      {
        id: 'data',
        title: 'Persist',
        path: 'shared_modules/nuc_stores/cookie/set_item/index.ts',
        detail: 'Cookie, local, session — one set/get anywhere.',
      },
      {
        id: 'ui',
        title: 'Primitives',
        path: 'shared_modules/nuc_stores/zustand/use_boolean_store.ts',
        detail: 'Tiny stores you do not rewrite per framework.',
      },
    ],
  },
  {
    id: 'dark',
    name: 'nuc_dark_mode',
    icon: 'mdi:weather-night',
    note: 'Load. Remember. Apply.',
    lanes: [
      {
        id: 'sdk',
        title: 'useDarkMode',
        path: 'shared_modules/nuc_dark_mode/utils/use_dark_mode.ts',
        detail: 'Composable and hook. Same preference, both runtimes.',
      },
      {
        id: 'data',
        title: 'SSR lock',
        path: 'shared_modules/nuc_dark_mode/plugins/dark_mode.server.ts',
        detail: 'Preference lands before paint. No theme flash.',
      },
      {
        id: 'ui',
        title: 'Apply',
        path: 'shared_modules/nuc_dark_mode/utils/apply_dark_mode.ts',
        detail: 'Class + tokens. The surface follows the nucleus.',
      },
    ],
  },
  {
    id: 'globals',
    name: 'nuc_globals',
    icon: 'mdi:earth',
    note: 'Breakpoints, types, global SCSS.',
    lanes: [
      {
        id: 'sdk',
        title: 'Media helpers',
        path: 'shared_modules/nuc_globals/media/utils/is_mobile.ts',
        detail: 'isMobile / isDesktop from one source.',
      },
      {
        id: 'data',
        title: 'Register',
        path: 'shared_modules/nuc_globals/nuc_globals.ts',
        detail: 'Plugin boots shared types and the media layer.',
      },
      {
        id: 'ui',
        title: 'Global styles',
        path: 'shared_modules/nuc_globals/styles/_index.scss',
        detail: 'Layout primitives every shell already speaks.',
      },
    ],
  },
]

export type NucHomeSectionId = (typeof NUC_HOME_SECTIONS)[number]['id']

export const NUC_HOME_PILLARS: NucHomePillar[] = [
  {
    icon: 'mdi:cube-outline',
    index: '01',
    title: 'A module is a product slice',
    description:
      'Install the feature, not a rewrite. A nuc_* package drops API, SQL, and UI on one gateway — ready in Vue and React from the same unit.',
    outcome: 'Weeks of scaffolding → hours',
    proof: 'api · sql · ui in one unit',
  },
  {
    icon: 'mdi:file-code-outline',
    index: '02',
    title: 'The contract is the product',
    description:
      'Types and request helpers live beside the feature. Shells stay interchangeable. The wire does not drift when the framework does.',
    outcome: 'One source of truth',
    proof: 'shared types · shared calls',
  },
  {
    icon: 'mdi:palette-swatch-outline',
    index: '03',
    title: 'UI that outlives the framework',
    description:
      'nucleify-ui (Lit) is the premium system once — green for Nuxt, blue for Next, same primitives everywhere. Framework churn stops at the shell.',
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
    command: 'make web target=VUE',
  },
  {
    label: 'React',
    detail: 'App components',
    icon: 'simple-icons:react',
    color: '#61dafb',
    command: 'make web target=REACT',
  },
  {
    label: 'Nuxt',
    detail: 'Vue SSR shell',
    icon: 'simple-icons:nuxtdotjs',
    color: '#00dc82',
    command: 'make web target=NUXT',
  },
  {
    label: 'Next',
    detail: 'React App Router',
    icon: 'simple-icons:nextdotjs',
    color: '#e8e8e8',
    command: 'make web target=NEXT',
  },
  {
    label: 'Astro',
    detail: 'Docs host',
    icon: 'simple-icons:astro',
    color: '#ff5d01',
    command: 'make web target=ASTRO',
  },
  {
    label: 'Svelte',
    detail: 'Reactive UI',
    icon: 'simple-icons:svelte',
    color: '#ff3e00',
    command: 'make web target=SVELTE',
  },
  {
    label: 'Solid',
    detail: 'Fine-grained UI',
    icon: 'simple-icons:solid',
    color: '#72b7eb',
    command: 'make web target=SOLID',
  },
]

export interface NucHomeCompilerNode {
  id: string
  label: string
  icon: string
  color: string
  command: string
  file: string
  snippet: string[]
  /** Percent position in the graph stage (0–100). */
  x: number
  y: number
}

const SNIPPET_VUE = [
  '<script setup lang="ts">',
  'defineProps<{ label: string }>()',
  '</script>',
  '',
  '<template>',
  '  <nui-button variant="filled">',
  '    {{ label }}',
  '  </nui-button>',
  '</template>',
]

const SNIPPET_TSX = [
  'type Props = { label: string }',
  '',
  'export function Button({ label }: Props) {',
  '  return (',
  '    <NuiButton variant="filled">',
  '      {label}',
  '    </NuiButton>',
  '  )',
  '}',
]

const SNIPPET_SVELTE = [
  '<script lang="ts">',
  '  export let label: string',
  '</script>',
  '',
  '<nui-button variant="filled">',
  '  {label}',
  '</nui-button>',
]

const SNIPPET_ASTRO = [
  '---',
  'const { label } = Astro.props',
  '---',
  '',
  '<nui-button variant="filled">',
  '  {label}',
  '</nui-button>',
]

export const NUC_HOME_COMPILER_SOURCE = {
  file: 'Button.nuc.tsx',
  snippet: [
    'export default component({',
    '  render: (props) => (',
    '    <nui-button variant="filled">',
    '      {props.label}',
    '    </nui-button>',
    '  ),',
    '})',
  ],
} as const

/** Shells around the portable `.nuc` hub (Vite-style emit graph). */
export const NUC_HOME_COMPILER_NODES: NucHomeCompilerNode[] = [
  {
    id: 'vue',
    label: 'Vue',
    icon: 'simple-icons:vuedotjs',
    color: '#42b883',
    command: 'make web target=VUE',
    file: 'Button.vue',
    snippet: SNIPPET_VUE,
    x: 26,
    y: 28,
  },
  {
    id: 'react',
    label: 'React',
    icon: 'simple-icons:react',
    color: '#61dafb',
    command: 'make web target=REACT',
    file: 'Button.tsx',
    snippet: SNIPPET_TSX,
    x: 74,
    y: 28,
  },
  {
    id: 'nuxt',
    label: 'Nuxt',
    icon: 'simple-icons:nuxtdotjs',
    color: '#00dc82',
    command: 'make web target=NUXT',
    file: 'Button.vue',
    snippet: SNIPPET_VUE,
    x: 18,
    y: 52,
  },
  {
    id: 'next',
    label: 'Next',
    icon: 'simple-icons:nextdotjs',
    color: '#e8e8e8',
    command: 'make web target=NEXT',
    file: 'Button.tsx',
    snippet: SNIPPET_TSX,
    x: 82,
    y: 52,
  },
  {
    id: 'astro',
    label: 'Astro',
    icon: 'simple-icons:astro',
    color: '#ff5d01',
    command: 'make web target=ASTRO',
    file: 'Button.astro',
    snippet: SNIPPET_ASTRO,
    x: 34,
    y: 74,
  },
  {
    id: 'svelte',
    label: 'Svelte',
    icon: 'simple-icons:svelte',
    color: '#ff3e00',
    command: 'make web target=SVELTE',
    file: 'Button.svelte',
    snippet: SNIPPET_SVELTE,
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
