export const NUC_DOCS_ORIGIN = 'https://docs.nucleify.io'
export const NUC_PLAY_ORIGIN = 'https://play.nucleify.io'
export const NUC_CLI_ORIGIN = 'https://cli.nucleify.io'

export function docsPageHref(lang: string, pathWithinDocs: string): string {
  const path = pathWithinDocs.replace(/^\/+/, '')
  return `${NUC_DOCS_ORIGIN}/${lang}/docs/${path}`
}

export function homePlayHref(): string {
  return NUC_PLAY_ORIGIN
}

export function homeCliHref(): string {
  return NUC_CLI_ORIGIN
}

export interface NucHomePillar {
  icon: string
  index: string
  title: string
  description: string
  outcome: string
  proof: string
}

export interface NucHomeShell {
  id: string
  label: string
  detail: string
  icon: string
  color: string
}

export interface NucHomeShellArc {
  id: string
  label: string
  d: string
  color: string
}

/** Equal framework slices for the pillars donut - same layout as investor thesis. */
export const NUC_HOME_SHELLS: readonly NucHomeShell[] = [
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
]

export function nucHomeShellLine(): string {
  return NUC_HOME_SHELLS.map((shell) => shell.label).join(' · ')
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

export function nucHomeShellArcs(): NucHomeShellArc[] {
  const cx = 50
  const cy = 50
  const radius = 46
  const innerRadius = 28
  const gapDeg = 3
  const sweep = 360 / NUC_HOME_SHELLS.length
  let cursor = -90
  return NUC_HOME_SHELLS.map((shell) => {
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

export interface NucHomeStackItem {
  label: string
  icon: string
  color: string
  command: string
  adminCommand: string
  cliCommand: string
}

export const NUC_HOME_SEO = {
  title: 'Nucleify - Yes, Migrate Any Existing App Between Frameworks As-Is',
  description:
    'Yes - migrate a finished Next, Nuxt, Vue, or React app as-is. npm i -g @nucleify/cli && nuc emit. No Nucleify syntax rewrite. No *.nuc.tsx gate. No shared_modules refactor first. Any framework → any other.',
  ogImage: 'https://nucleify.io/img/og-image.png',
} as const

export const NUC_HOME_DOCS = {
  intro: 'getting-started/introduction',
  install: 'getting-started/installation',
  compiler: 'core-concepts/compiler',
  cli: 'core-concepts/cli',
  playground: 'core-concepts/playground',
  overrides: 'core-concepts/overriding',
  modules: 'core-concepts/modules',
} as const

export function homeDocsHref(
  lang: string,
  page: keyof typeof NUC_HOME_DOCS
): string {
  return docsPageHref(lang, NUC_HOME_DOCS[page])
}

export function homeThankYouHref(lang: string): string {
  return `/${lang}/thank-you`
}

export function homeHref(lang: string): string {
  return `/${lang}/home`
}

export function homeInvestorHref(lang: string): string {
  return `/${lang}/investor`
}

export const NUC_HOME_COPY = {
  brand: 'Nucleify',
  heroEyebrow: 'Migrate any framework',
  headlineLead: 'Keep the product.',
  headlineTrail: 'Migrate the framework.',
  support:
    'Yes - bring any existing Next, Nuxt, Vue, React, or other supported app as-is and convert the framework (Next → Nuxt, Nuxt → Next, Vue → React, and reverse). No *.nuc.tsx rewrite. No shared_modules refactor first. No Nucleify token rewrite.',
  ctaPrimary: 'Integrate our CLI',
  ctaSecondary: 'Open Playground',
  playgroundHref: 'https://play.nucleify.io',
  cliHref: 'https://cli.nucleify.io',
  githubHref: 'https://github.com/Nucleify/Nucleify',
  heroSignal: 'multi-runtime',
  heroPanelTitle: '~/nucleify',
  heroPanelRunning: 'booting framework…',
  heroPanelDone: 'ready',
  heroInstallLabel: 'Migrate with CLI',
  navDocs: 'Docs',
  navPlay: 'Playground',
  navCli: 'CLI',
  navPlayground: 'Playground',
  navGitHub: 'GitHub',
  navLogin: 'Login',
  navMenu: 'Menu',
  navClose: 'Close',
  sectionsLabel: 'Sections',
  pillarsEyebrow: 'What you actually ship',
  pillarsTitle: 'Bring any framework.\nConvert to any other.',
  pillarsSupport:
    'Yes: migrate any framework to any other without adapting the project first. Convert reads your source as-is. No *.nuc.tsx rewrite, no shared_modules split, no IR-first rewrite of the app. *.nuc.tsx is optional shared UI only - never a migrate gate.',
  pillarsCta: 'Pick a framework',
  pillarsShareUnit: 'emit targets',
  pillarsShareSource: '',
  stackEyebrow: 'Web + admin · migrate both',
  stackTitle: 'Migrate every surface.\nTo any framework.',
  stackSupport:
    'Nucleify ships a dedicated web app and a dedicated admin - migrate either one to Vue, React, Nuxt, Next, Astro, Svelte, or Solid. Convert each product as-is; no *.nuc.tsx rewrite, no shared_modules refactor, no token rewrite required.',
  stackCta: 'Pick a framework',
  stackStageLabel: 'target framework',
  stackWebLabel: 'Web',
  stackAdminLabel: 'Admin',
  stackCliLabel: 'CLI',
  stackCopyLabel: 'Copy',
  stackCopiedLabel: 'Copied!',
  stackCliInstallLead: 'To install the CLI, go to',
  stackCliInstallHost: 'cli.nucleify.io',
  pulseEyebrow: 'Same nucleus',
  pulseTitleLead: 'Seven frameworks.',
  pulseTitleTrail: 'One product core.',
  pulseSupport:
    'Yes - add another framework from your existing app as-is. No *.nuc.tsx rewrite and no shared_modules refactor required before convert. Only the host changes.',
  pulseCta: 'Get in touch',
  pulseCompare:
    'Convert takes your framework source as-is and emits another host. Emitted source is yours to commit.',
  pulseTraditionalLabel: 'traditional',
  pulseNucleifyLabel: 'nucleify',
  pulseShellsAxis: 'frameworks online',
  pulseStatus: '7 frameworks · zero runtime',
  pulseScaling: 'Scaling',
  pulseCostSuffix: '×',
  pulseUnitLabel: 'product surface',
  coreEyebrow: 'One installable unit',
  coreTitle: 'A module is a product slice.',
  coreSupport:
    'API, Supabase SQL, and UI in one nuc_* package. Drop it on the gateway - every framework stays aligned.',
  coreCta: 'See the modules',
  coreDocsCta: 'Read modules docs',
  coreLaneSdk: 'sdk',
  coreLaneData: 'data',
  coreLaneUi: 'ui',
  coreLive: 'seven frameworks · one module',
  coreInspect: 'live slice',
  startEyebrow: 'Shared nucleus + Supabase',
  startTitle: 'A module is a product slice.',
  startCta: 'Get in touch',
  cloneEyebrow: 'Migrate your app',
  cloneTitleLead: 'Install the CLI.',
  cloneTitleTrail: 'Run framework migration.',
  cloneSupport:
    'Point nuc emit at your finished React, Vue, Next, or Nuxt app. Interactive shell picks source, target, path, and output. No rewrite into Nucleify syntax.',
  cloneCta: 'Open CLI site',
  cloneCtaNext: 'Star on GitHub',

  closeTitle: 'Same app. Different framework.',
  closeSupport:
    'Next → Nuxt, Nuxt → Next, Vue → React, or the reverse - bring the finished project as-is. No Nucleify rewrite first. Tell us where you are and where you want to land.',
  closeCta: 'Talk through a migration',
  compilerEyebrow: 'Migration in a blink',
  compilerTitleLead: 'Bring the app.',
  compilerTitleTrail: 'Skip the rewrite.',
  compilerSupport:
    'Yes - convert reads your existing Next, Nuxt, Vue, React, or other supported app as-is. No Nucleify-syntax rewrite, no *.nuc.tsx gate, no shared_modules prerequisite, no IR-first rewrite of the app. Portable *.nuc.tsx is optional shared UI only.',

  compilerHub: '.vue',
  compilerHubLabel: 'source',
  compilerEmitLabel: 'convert',
  compilerCta: 'Read compiler docs',
  closeModalTitle: 'Tell us about the move',
  closeModalSupport:
    'Current stack, target framework, timeline - we reply with a concrete next step.',
  closeNameLabel: 'Name / organisation',
  closeNamePlaceholder: 'Alex at Acme',
  closeEmailLabel: 'Work email',
  closeEmailPlaceholder: 'you@company.com',
  closeTypeLabel: 'What do you need?',
  closeTypePlaceholder: 'Choose one',
  closeNoteLabel: 'Project note',
  closeNotePlaceholder:
    'Stack today, target framework, timeline, and what success looks like…',
  closeSubmit: 'Send message',
  closeCancel: 'Back',
  closeSending: 'Sending…',
  closeSuccess: 'Message sent. We will reply within 24h.',
  closeErrorGeneric: 'Could not send. Please try again.',
  closeErrorEmail: 'Enter a valid email address.',
  closeErrorType: 'Pick what you need.',
  closeErrorMessage: 'Message is too long.',
  thankYouEyebrow: 'Sent',
  thankYouTitle: 'Thanks - we got it.',
  thankYouSupport:
    'We reply within 24h with a concrete next step and your migration assessment.',
  thankYouCta: 'Back to Nucleify',
  thankYouInvestCta: 'Invest in us?',
  thankYouCubeCaption: 'Nucleus online',
  thankYouProof: ['Reply within 24h', 'Concrete next step', 'Zero lock-in PoC'],
  thankYouSeoTitle: 'Thank you - Nucleify',
  thankYouSeoDescription:
    'Your message was sent. Nucleify will reply within 24 hours.',
} as const

/** Default terminal rows (npm). UI also offers pnpm / yarn / npx tabs. */
export const NUC_HOME_INSTALL_STEPS = [
  'npm install -g @nucleify/cli',
  'nuc emit',
] as const

/** Values stay API-stable; labels are developer-intent. */
export const NUC_HOME_CONTACT_TYPES = [
  { label: 'Migrate an existing app to another framework', value: 'landing' },
  { label: 'Explore a guided migration', value: 'business' },
  { label: 'Enterprise migration support & Code Escrow', value: 'blog' },
  { label: 'Contribute / Open source inquiry', value: 'help' },
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
    command: 'make web --target=nuxt',
    result: 'nuxt product · online',
    icon: 'simple-icons:nuxtdotjs',
    color: '#00dc82',
  },
  {
    id: 'next',
    label: 'Next',
    command: 'make web --target=next',
    result: 'next product · online',
    icon: 'simple-icons:nextdotjs',
    color: '#e8e8e8',
  },
  {
    id: 'astro',
    label: 'Astro',
    command: 'make web --target=astro',
    result: 'astro docs host · online',
    icon: 'simple-icons:astro',
    color: '#ff5d01',
  },
  {
    id: 'svelte',
    label: 'Svelte',
    command: 'make web --target=svelte',
    result: 'reactive ui · online',
    icon: 'simple-icons:svelte',
    color: '#ff3e00',
  },
  {
    id: 'solid',
    label: 'Solid',
    command: 'make web --target=solid',
    result: 'fine-grained ui · online',
    icon: 'simple-icons:solid',
    color: '#72b7eb',
  },
]

export const NUC_HOME_SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'compiler', label: 'Emit' },
  { id: 'architecture', label: 'Ship' },
  { id: 'stack', label: 'Stack' },
  { id: 'clone', label: 'Clone' },
  { id: 'start', label: 'Contact' },
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
    note: 'Typed client + Supabase gateway. Every framework.',
    lanes: [
      {
        id: 'sdk',
        title: 'Typed client',
        path: 'shared_modules/nuc_api/utils/api_request.ts',
        detail: 'One helper.\nTyped end to end.',
      },
      {
        id: 'data',
        title: 'Supabase gateway',
        path: 'shared_modules/nuc_api/supabase/api/gateway_dispatch.ts',
        detail: 'Nitro hands off to nuc_*.\nNo second backend.',
      },
      {
        id: 'ui',
        title: 'Feedback',
        path: 'shared_modules/nuc_api/utils/use_toast.ts',
        detail: 'Toasts ride with the API.\nAuth UI included.',
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
        detail: 'One token file.\nBrand paints on top.',
      },
      {
        id: 'data',
        title: 'Theme sync',
        path: 'shared_modules/nuc_colors/supabase/api/handle.ts',
        detail: 'Preferences land in Supabase.\nUser and system.',
      },
      {
        id: 'ui',
        title: 'Color picker',
        path: 'shared_modules/nuc_colors/components/color-picker',
        detail: 'Ship the picker.\nSwap the brand.',
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
        detail: 'Fetch catalogs once.\nKeys stay aligned.',
      },
      {
        id: 'data',
        title: 'Translations',
        path: 'shared_modules/nuc_languages/supabase/api/handle.ts',
        detail: 'Copy lives in Supabase.\nSeeded per locale.',
      },
      {
        id: 'ui',
        title: 'Catalog',
        path: 'shared_modules/nuc_languages/constants/languages.ts',
        detail: 'Locales the picker shows.\nOne shared list.',
      },
    ],
  },
  {
    id: 'stores',
    name: 'nuc_stores',
    icon: 'mdi:database-outline',
    note: 'Shared state. Shared verbs.',
    lanes: [
      {
        id: 'sdk',
        title: 'Shared barrel',
        path: 'shared_modules/nuc_stores/index.ts',
        detail: 'Shared verbs.\nShared barrel.',
      },
      {
        id: 'data',
        title: 'Persist',
        path: 'shared_modules/nuc_stores/cookie/set_item/index.ts',
        detail: 'Cookie, local, session.\nOne set/get.',
      },
      {
        id: 'ui',
        title: 'Primitives',
        path: 'shared_modules/nuc_stores/zustand/use_boolean_store.ts',
        detail: 'Tiny building blocks.\nNo per-app rewrites.',
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
        detail: 'Composable and hook.\nOne preference.',
      },
      {
        id: 'data',
        title: 'SSR lock',
        path: 'shared_modules/nuc_dark_mode/plugins/dark_mode.server.ts',
        detail: 'Locked before paint.\nNo theme flash.',
      },
      {
        id: 'ui',
        title: 'Apply',
        path: 'shared_modules/nuc_dark_mode/utils/apply_dark_mode.ts',
        detail: 'Class plus tokens.\nUI follows along.',
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
        detail: 'Shared helpers every framework already imports.',
      },
      {
        id: 'data',
        title: 'Register',
        path: 'shared_modules/nuc_globals/nuc_globals.ts',
        detail: 'Types, media, and globals - booted once.',
      },
      {
        id: 'ui',
        title: 'Global styles',
        path: 'shared_modules/nuc_globals/styles/_index.scss',
        detail: 'Shared SCSS DNA every framework speaks.',
      },
    ],
  },
]

export type NucHomeSectionId = (typeof NUC_HOME_SECTIONS)[number]['id']

export const NUC_HOME_PILLARS: NucHomePillar[] = [
  {
    icon: 'mdi:swap-horizontal',
    index: '01',
    title: 'Any framework → any other',
    description:
      'Yes. Bring Nuxt, Next, Vue, React, or another supported framework as-is - including a traditional Next or Nuxt app - and convert to the target. No *.nuc.tsx rewrite, no shared_modules split, no token rewrite. *.nuc.tsx is optional shared UI only.',
    outcome: 'any stack → convert → emit',
    proof: 'nuc emit convert',
  },
  {
    icon: 'mdi:package-variant',
    index: '02',
    title: 'One business core. Many hosts.',
    description:
      'Auth helpers, validation, and the typed API client are written once. Move any framework to any other - the product contracts stay the same. A stack change becomes a host swap - not another rewrite of forms, session, and API glue.',
    outcome: 'Same types on every framework',
    proof: 'api_request.ts',
  },
  {
    icon: 'mdi:database-outline',
    index: '03',
    title: 'Data plane: Supabase',
    description:
      'Each module ships SQL migrations, Nitro gateway handlers, and UI together. Every emit target hits the same Supabase gateway - auth and tables stay with the nucleus. One data plane per framework - nothing forks on stack change.',
    outcome: 'SQL + handlers',
    proof: 'gateway_dispatch.ts',
  },
]

export const NUC_HOME_STACK: NucHomeStackItem[] = [
  {
    label: 'Vue',
    icon: 'simple-icons:vuedotjs',
    color: '#42b883',
    command: 'make web --target=vue',
    adminCommand: 'make admin --target=vue',
    cliCommand: 'nuc emit ./Button.vue --target=vue',
  },
  {
    label: 'React',
    icon: 'simple-icons:react',
    color: '#61dafb',
    command: 'make web --target=react',
    adminCommand: 'make admin --target=react',
    cliCommand: 'nuc emit ./Button.vue --target=react',
  },
  {
    label: 'Nuxt',
    icon: 'simple-icons:nuxtdotjs',
    color: '#00dc82',
    command: 'make web --target=nuxt',
    adminCommand: 'make admin --target=nuxt',
    cliCommand: 'nuc emit ./Button.vue --target=nuxt',
  },
  {
    label: 'Next',
    icon: 'simple-icons:nextdotjs',
    color: '#e8e8e8',
    command: 'make web --target=next',
    adminCommand: 'make admin --target=next',
    cliCommand: 'nuc emit ./Button.vue --target=next',
  },
  {
    label: 'Astro',
    icon: 'simple-icons:astro',
    color: '#ff5d01',
    command: 'make web --target=astro',
    adminCommand: 'make admin --target=astro',
    cliCommand: 'nuc emit ./Button.vue --target=astro',
  },
  {
    label: 'Svelte',
    icon: 'simple-icons:svelte',
    color: '#ff3e00',
    command: 'make web --target=svelte',
    adminCommand: 'make admin --target=svelte',
    cliCommand: 'nuc emit ./Button.vue --target=svelte',
  },
  {
    label: 'Solid',
    icon: 'simple-icons:solid',
    color: '#72b7eb',
    command: 'make web --target=solid',
    adminCommand: 'make admin --target=solid',
    cliCommand: 'nuc emit ./Button.vue --target=solid',
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
  /** Percent position in the graph stage (0-100). */
  x: number
  y: number
}

const SNIPPET_VUE = [
  '<script setup lang="ts">',
  "import { ref, computed } from 'vue'",
  '',
  'const props = defineProps<{ inbox: string }>()',
  'const unread = ref(3)',
  'const label = computed(() =>',
  '  unread.value ? `${props.inbox}: ${unread.value}`',
  "    : 'Caught up')",
  'function clear() { unread.value = 0 }',
  '</script>',
  '',
  '<template>',
  '  <nui-button variant="filled" @click="clear">',
  '    {{ label }}',
  '  </nui-button>',
  '</template>',
]

const SNIPPET_NUXT = [
  '<script setup lang="ts">',
  'const props = defineProps<{ inbox: string }>()',
  "const unread = useState('inbox', () => 3)",
  'const label = computed(() =>',
  '  unread.value ? `${props.inbox}: ${unread.value}`',
  "    : 'Caught up')",
  '</script>',
  '',
  '<template>',
  '  <nui-button variant="filled" @click="unread = 0">',
  '    {{ label }}',
  '  </nui-button>',
  '</template>',
]

const SNIPPET_REACT = [
  "'use client'",
  "import { useState, useMemo, useCallback } from 'react'",
  '',
  'type Props = { inbox: string }',
  '',
  'export default function InboxBadge({ inbox }: Props) {',
  '  const [unread, setUnread] = useState(3)',
  '  const label = useMemo(',
  "    () => (unread ? `${inbox}: ${unread}` : 'Caught up'),",
  '    [unread, inbox])',
  '  const clear = useCallback(() => setUnread(0), [])',
  '  return (',
  '    <NuiButton variant="filled" onClick={clear}>',
  '      {label}',
  '    </NuiButton>',
  '  )',
  '}',
]

const SNIPPET_NEXT = [
  "'use client'",
  "import { useState, useMemo } from 'react'",
  "import { usePathname } from 'next/navigation'",
  '',
  'type Props = { inbox: string }',
  '',
  'export default function InboxBadge({ inbox }: Props) {',
  '  const path = usePathname()',
  '  const [unread, setUnread] = useState(3)',
  '  const label = useMemo(() =>',
  "    `${unread ? `${inbox}: ${unread}` : 'Caught up'} · ${path}`,",
  '    [unread, inbox, path])',
  '  return (',
  '    <NuiButton variant="filled" onClick={() => setUnread(0)}>',
  '      {label}',
  '    </NuiButton>',
  '  )',
  '}',
]

const SNIPPET_SVELTE = [
  '<script lang="ts">',
  '  type Props = { inbox: string }',
  '  let { inbox }: Props = $props()',
  '  let unread = $state(3)',
  '  let label = $derived(',
  "    unread ? `${inbox}: ${unread}` : 'Caught up')",
  '</script>',
  '',
  '<nui-button variant="filled" onclick={() => (unread = 0)}>',
  '  {label}',
  '</nui-button>',
]

const SNIPPET_ASTRO = [
  '---',
  'interface Props { inbox: string }',
  'const { inbox } = Astro.props',
  '---',
  '',
  '<nui-button id="badge" variant="filled" data-inbox={inbox}>',
  '  {inbox}: 3',
  '</nui-button>',
  '',
  '<script is:inline>',
  "  const el = document.getElementById('badge')",
  '  let unread = 3',
  '  const paint = () => {',
  "    const box = el?.dataset.inbox ?? ''",
  "    if (el) el.textContent = unread ? `${box}: ${unread}` : 'Caught up'",
  '  }',
  '  el?.addEventListener("click", () => { unread = 0; paint() })',
  '</script>',
]

const SNIPPET_SOLID = [
  "import { createSignal, createMemo } from 'solid-js'",
  '',
  'type Props = { inbox: string }',
  '',
  'export default function InboxBadge(props: Props) {',
  '  const [unread, setUnread] = createSignal(3)',
  '  const label = createMemo(() =>',
  '    unread() ? `${props.inbox}: ${unread()}`',
  "      : 'Caught up')",
  '  return (',
  '    <nui-button variant="filled" onClick={() => setUnread(0)}>',
  '      {label()}',
  '    </nui-button>',
  '  )',
  '}',
]

/** Convert input: existing framework source (not `*.nuc.tsx`). */
export const NUC_HOME_COMPILER_SOURCE = {
  file: 'InboxBadge.vue',
  snippet: SNIPPET_VUE,
} as const

/** Framework targets around the convert hub (existing app → host emit). */
export const NUC_HOME_COMPILER_NODES: NucHomeCompilerNode[] = [
  {
    id: 'vue',
    label: 'Vue',
    icon: 'simple-icons:vuedotjs',
    color: '#42b883',
    command: 'make web --target=vue',
    file: 'InboxBadge.vue',
    snippet: SNIPPET_VUE,
    x: 26,
    y: 28,
  },
  {
    id: 'react',
    label: 'React',
    icon: 'simple-icons:react',
    color: '#61dafb',
    command: 'make web --target=react',
    file: 'InboxBadge.tsx',
    snippet: SNIPPET_REACT,
    x: 74,
    y: 28,
  },
  {
    id: 'nuxt',
    label: 'Nuxt',
    icon: 'simple-icons:nuxtdotjs',
    color: '#00dc82',
    command: 'make web --target=nuxt',
    file: 'InboxBadge.vue',
    snippet: SNIPPET_NUXT,
    x: 18,
    y: 52,
  },
  {
    id: 'next',
    label: 'Next',
    icon: 'simple-icons:nextdotjs',
    color: '#e8e8e8',
    command: 'make web --target=next',
    file: 'InboxBadge.tsx',
    snippet: SNIPPET_NEXT,
    x: 82,
    y: 52,
  },
  {
    id: 'astro',
    label: 'Astro',
    icon: 'simple-icons:astro',
    color: '#ff5d01',
    command: 'make web --target=astro',
    file: 'InboxBadge.astro',
    snippet: SNIPPET_ASTRO,
    x: 34,
    y: 74,
  },
  {
    id: 'svelte',
    label: 'Svelte',
    icon: 'simple-icons:svelte',
    color: '#ff3e00',
    command: 'make web --target=svelte',
    file: 'InboxBadge.svelte',
    snippet: SNIPPET_SVELTE,
    x: 66,
    y: 74,
  },
  {
    id: 'solid',
    label: 'Solid',
    icon: 'simple-icons:solid',
    color: '#72b7eb',
    command: 'make web --target=solid',
    file: 'InboxBadge.tsx',
    snippet: SNIPPET_SOLID,
    x: 50,
    y: 88,
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
