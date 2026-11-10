/* CMS default section props for marketing widgets + page SEO.
 * Seed SQL is regenerated from this file via:
 *   pnpm exec vite-node --config web/vitest.config.ts .config/scripts/gen-cms-defaults.mts
 */

import {
  NUC_COMPANY_CONTACT_TYPES,
  NUC_COMPANY_COPY,
  NUC_COMPANY_CUBE_FACES,
  NUC_COMPANY_GLANCE,
  NUC_COMPANY_SAVINGS,
  NUC_COMPANY_SEO,
  NUC_COMPANY_SHELLS,
  NUC_COMPANY_SURFACE,
  NUC_COMPANY_THESIS,
  NUC_COMPANY_WEDGE,
} from './content/company'

export const HOME_SECTION_DEFAULTS = {
  'section.hero': {
    railLabel: 'Intro',
    anchorId: 'intro',
    showSection: true,
    showPanel: true,
    panelSide: 'right',
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
    coreInspect: 'live slice',
    coreLive: 'seven frameworks · one module',
    modules: [
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
    ],
  },
  'section.pillars': {
    railLabel: 'Ship',
    anchorId: 'architecture',
    showSection: true,
    showShareChart: true,
    pillarsEyebrow: 'What you actually ship',
    pillarsTitle: 'Bring any framework.\nConvert to any other.',
    pillarsSupport:
      'Yes: migrate any framework to any other without adapting the project first. Convert reads your source as-is. No *.nuc.tsx rewrite, no shared_modules split, no IR-first rewrite of the app. *.nuc.tsx is optional shared UI only - never a migrate gate.',
    pillarsCta: 'Pick a framework',
    pillarsShareUnit: 'emit targets',
    pillarsShareSource: '',
    items: [
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
    ],
    shells: [
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
    ],
  },
  'section.clone': {
    railLabel: 'CLI',
    anchorId: 'clone',
    showSection: true,
    cloneEyebrow: 'Migrate your app',
    cloneTitleLead: 'Install the CLI.',
    cloneTitleTrail: 'Run framework migration.',
    cloneSupport:
      'Point nuc emit at your finished React, Vue, Next, or Nuxt app. Interactive shell picks source, target, path, and output. No rewrite into Nucleify syntax.',
    cloneCta: 'Open CLI site',
    cloneCtaNext: 'Star on GitHub',
    heroInstallLabel: 'Migrate with CLI',
    installSteps: [
      { value: 'npm install -g @nucleify/cli' },
      { value: 'nuc emit' },
    ],
  },

  'section.stack': {
    railLabel: 'Stack',
    anchorId: 'stack',
    showSection: true,
    showStage: true,
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
    items: [
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
    ],
  },
  'section.compiler_demo': {
    railLabel: 'Emit',
    anchorId: 'compiler',
    showSection: true,
    showBoard: true,
    compilerEyebrow: 'Migration in a blink',
    compilerTitleLead: 'Bring the app.',
    compilerTitleTrail: 'Skip the rewrite.',
    compilerSupport:
      'Yes - convert reads your existing Next, Nuxt, Vue, React, or other supported app as-is. No *.nuc.tsx rewrite, no shared_modules prerequisite, no IR-first rewrite of the app. Portable *.nuc.tsx is optional shared UI only.',
    compilerCta: 'Read compiler docs',
    compilerHub: '.vue',
    compilerHubLabel: 'source',
    compilerEmitLabel: 'convert',
    sourceFile: 'InboxBadge.vue',
    sourceSnippet:
      '<script setup lang="ts">\nimport { ref, computed } from \'vue\'\n\nconst props = defineProps<{ inbox: string }>()\nconst unread = ref(3)\nconst label = computed(() =>\n  unread.value ? `${props.inbox}: ${unread.value}`\n    : \'Caught up\')\nfunction clear() { unread.value = 0 }\n</script>\n\n<template>\n  <nui-button variant="filled" @click="clear">\n    {{ label }}\n  </nui-button>\n</template>',
    nodes: [
      {
        id: 'vue',
        label: 'Vue',
        icon: 'simple-icons:vuedotjs',
        color: '#42b883',
        command: 'make web --target=vue',
        file: 'InboxBadge.vue',
        snippet:
          '<script setup lang="ts">\nimport { ref, computed } from \'vue\'\n\nconst props = defineProps<{ inbox: string }>()\nconst unread = ref(3)\nconst label = computed(() =>\n  unread.value ? `${props.inbox}: ${unread.value}`\n    : \'Caught up\')\nfunction clear() { unread.value = 0 }\n</script>\n\n<template>\n  <nui-button variant="filled" @click="clear">\n    {{ label }}\n  </nui-button>\n</template>',
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
        snippet:
          "'use client'\nimport { useState, useMemo, useCallback } from 'react'\n\ntype Props = { inbox: string }\n\nexport default function InboxBadge({ inbox }: Props) {\n  const [unread, setUnread] = useState(3)\n  const label = useMemo(\n    () => (unread ? `${inbox}: ${unread}` : 'Caught up'),\n    [unread, inbox])\n  const clear = useCallback(() => setUnread(0), [])\n  return (\n    <NuiButton variant=\"filled\" onClick={clear}>\n      {label}\n    </NuiButton>\n  )\n}",
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
        snippet:
          '<script setup lang="ts">\nconst props = defineProps<{ inbox: string }>()\nconst unread = useState(\'inbox\', () => 3)\nconst label = computed(() =>\n  unread.value ? `${props.inbox}: ${unread.value}`\n    : \'Caught up\')\n</script>\n\n<template>\n  <nui-button variant="filled" @click="unread = 0">\n    {{ label }}\n  </nui-button>\n</template>',
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
        snippet:
          "'use client'\nimport { useState, useMemo } from 'react'\nimport { usePathname } from 'next/navigation'\n\ntype Props = { inbox: string }\n\nexport default function InboxBadge({ inbox }: Props) {\n  const path = usePathname()\n  const [unread, setUnread] = useState(3)\n  const label = useMemo(() =>\n    `${unread ? `${inbox}: ${unread}` : 'Caught up'} · ${path}`,\n    [unread, inbox, path])\n  return (\n    <NuiButton variant=\"filled\" onClick={() => setUnread(0)}>\n      {label}\n    </NuiButton>\n  )\n}",
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
        snippet:
          '---\ninterface Props { inbox: string }\nconst { inbox } = Astro.props\n---\n\n<nui-button id="badge" variant="filled" data-inbox={inbox}>\n  {inbox}: 3\n</nui-button>\n\n<script is:inline>\n  const el = document.getElementById(\'badge\')\n  let unread = 3\n  const paint = () => {\n    const box = el?.dataset.inbox ?? \'\'\n    if (el) el.textContent = unread ? `${box}: ${unread}` : \'Caught up\'\n  }\n  el?.addEventListener("click", () => { unread = 0; paint() })\n</script>',
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
        snippet:
          '<script lang="ts">\n  type Props = { inbox: string }\n  let { inbox }: Props = $props()\n  let unread = $state(3)\n  let label = $derived(\n    unread ? `${inbox}: ${unread}` : \'Caught up\')\n</script>\n\n<nui-button variant="filled" onclick={() => (unread = 0)}>\n  {label}\n</nui-button>',
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
        snippet:
          "import { createSignal, createMemo } from 'solid-js'\n\ntype Props = { inbox: string }\n\nexport default function InboxBadge(props: Props) {\n  const [unread, setUnread] = createSignal(3)\n  const label = createMemo(() =>\n    unread() ? `${props.inbox}: ${unread()}`\n      : 'Caught up')\n  return (\n    <nui-button variant=\"filled\" onClick={() => setUnread(0)}>\n      {label()}\n    </nui-button>\n  )\n}",
        x: 50,
        y: 88,
      },
    ],
  },
  'section.pulse': {
    railLabel: 'Scale',
    anchorId: 'pulse',
    showSection: true,
    showChart: true,
    pulseEyebrow: 'Same nucleus',
    pulseTitleLead: 'Seven frameworks.',
    pulseTitleTrail: 'One product core.',
    pulseSupport:
      'Yes - add another framework from your existing app as-is. No *.nuc.tsx rewrite and no shared_modules refactor required before convert. Only the host changes.',
    pulseCompare:
      'Convert takes your framework source as-is and emits another host. Emitted source is yours to commit.',
    pulseCta: 'Get in touch',
    pulseShellsAxis: 'frameworks online',
    pulseTraditionalLabel: 'traditional',
    pulseNucleifyLabel: 'nucleify',
    pulseCostSuffix: '×',
    pulseUnitLabel: 'product surface',
    pulseStatus: '7 frameworks · zero runtime',
    pulseScaling: 'Scaling',
    shells: [
      {
        value: 'Vue',
      },
      {
        value: 'React',
      },
      {
        value: 'Nuxt',
      },
      {
        value: 'Next',
      },
      {
        value: 'Astro',
      },
      {
        value: 'Svelte',
      },
      {
        value: 'Solid',
      },
    ],
  },
  'section.close': {
    railLabel: 'Contact',
    anchorId: 'start',
    showSection: true,
    closeTitle: 'Same app. Different framework.',
    closeSupport:
      'Next → Nuxt, Nuxt → Next, Vue → React, or the reverse - bring the finished project as-is. No Nucleify rewrite first. Tell us where you are and where you want to land.',
    closeCta: 'Talk through a migration',
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
    navDocs: 'Docs',
    navPlay: 'Playground',
    navCli: 'CLI',
    navGitHub: 'GitHub',
    playgroundHref: 'https://play.nucleify.io',
    cliHref: 'https://cli.nucleify.io',
    githubHref: 'https://github.com/Nucleify/Nucleify',
    contactTypes: [
      {
        label: 'Migrate an existing app to another framework',
        value: 'landing',
      },
      {
        label: 'Explore a guided migration',
        value: 'business',
      },
      {
        label: 'Enterprise migration support & Code Escrow',
        value: 'blog',
      },
      {
        label: 'Contribute / Open source inquiry',
        value: 'help',
      },
    ],
  },
} as const

export const INVESTOR_SECTION_DEFAULTS = {
  'section.intro': {
    railLabel: 'Pitch',
    anchorId: 'intro',
    showSection: true,
    showGlance: true,
    brand: 'Nucleify',
    heroEyebrow: 'For investors',
    headline: 'Stop funding the rewrite.',
    support:
      'Stack waves rebuild the same product. Nucleify keeps the nucleus - shared modules, idiomatic frameworks, Supabase with the business - so capital funds growth, not another platform team.',
    ctaPrimary: 'Open Playground',
    ctaSecondary: 'Contact us',
    ctaTertiary: 'See why it sticks',
    githubHref: 'https://github.com/Nucleify/Nucleify',
    glanceAria: 'Product snapshot',
    glance: {
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
    },
  },
  'section.thesis': {
    railLabel: 'Why',
    anchorId: 'thesis',
    showSection: true,
    showChart: true,
    thesisEyebrow: 'The problem',
    thesisTitle: 'Rewrite spend is a second product.',
    thesisSupport:
      'Frameworks rotate. The business should not. Product convert takes existing apps as-is; the nucleus keeps domain, typed client, and Supabase once - a stack change becomes a build target, not a rewrite gate.',
    thesisCta: 'See what you keep',
    items: [
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
    ],
    shells: [
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
    ],
  },
  'section.savings': {
    railLabel: 'Keep',
    anchorId: 'savings',
    showSection: true,
    savingsEyebrow: 'What you keep',
    savingsTitle: 'One nucleus.\nSeven frameworks.',
    savingsSupport:
      'What stays with the product when the stack changes: domain, typed client, and data plane you can verify in the repo - not a burn model.\nSeven idiomatic frameworks, owned emit, one Supabase data plane.',
    savingsCta: 'See how we grow',
    savingsNote:
      'Product facts · verify in docs and playground · not a forecast',
    glanceAria: 'Product snapshot',
    pulseStatus: 'Same product. Far less rewrite tax.',
    items: [
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
    ],
  },
  'section.wedge': {
    railLabel: 'Plan',
    anchorId: 'wedge',
    showSection: true,
    wedgeEyebrow: 'How we grow',
    wedgeTitle: 'Start free.\nStay because it works.',
    wedgeSupport:
      'Engineers install Nucleify because it removes rewrite work.\nOnce domain and Supabase live in the nucleus, leaving means rewriting the business - then paid convert and help can follow usage.',
    items: [
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
    ],
  },
  'section.surface': {
    railLabel: 'Reach',
    anchorId: 'surface',
    showSection: true,
    showStage: true,
    surfaceEyebrow: 'Where we win',
    surfaceTitle: 'One product.\nFour paths to market.',
    surfaceSupport:
      'Same shared modules. Different buyers, partners, timing, and paid add-ons - without hiring a second platform team for every framework.',
    surfaceTabsLabel: 'Market reach',
    surfaceStageLabel: 'Reach detail',
    items: [
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
    ],
  },
  'section.ask': {
    railLabel: 'Talk',
    anchorId: 'ask',
    showSection: true,
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
    navHome: 'Product',
    navDocs: 'Docs',
    navPlay: 'Playground',
    navCli: 'CLI',
    navGitHub: 'GitHub',
    playgroundHref: 'https://play.nucleify.io',
    cliHref: 'https://cli.nucleify.io',
    githubHref: 'https://github.com/Nucleify/Nucleify',
    contactTypes: [
      {
        label: 'Investment / diligence',
        value: 'business',
      },
      {
        label: 'Partnership',
        value: 'landing',
      },
      {
        label: 'Intro call',
        value: 'blog',
      },
      {
        label: 'Other',
        value: 'help',
      },
    ],
  },
} as const

export const HOME_PAGE_SEO = {
  title: 'Nucleify - Yes, Migrate Any Existing App Between Frameworks As-Is',
  description:
    'Yes - migrate a finished Next, Nuxt, Vue, or React app as-is. npm i -g @nucleify/cli && nuc emit. No Nucleify syntax rewrite. No *.nuc.tsx gate. No shared_modules refactor first. Any framework → any other.',
} as const

export const INVESTOR_PAGE_SEO = {
  title: 'Nucleify for investors - stop funding the rewrite',
  description:
    'Investor brief for Nucleify: migrate existing apps as-is, seven frameworks, shared Supabase data plane, open install and paid attach after production usage.',
} as const

export const COMPANY_PAGE_SEO = {
  title: NUC_COMPANY_SEO.title,
  description: NUC_COMPANY_SEO.description,
} as const

export const COMPANY_SECTION_DEFAULTS = {
  'section.intro': {
    railLabel: 'Pitch',
    anchorId: 'intro',
    showSection: true,
    showGlance: true,
    brand: NUC_COMPANY_COPY.brand,
    heroEyebrow: NUC_COMPANY_COPY.heroEyebrow,
    headline: NUC_COMPANY_COPY.headline,
    support: NUC_COMPANY_COPY.support,
    ctaPrimary: NUC_COMPANY_COPY.ctaPrimary,
    ctaSecondary: NUC_COMPANY_COPY.ctaSecondary,
    ctaTertiary: NUC_COMPANY_COPY.ctaTertiary,
    githubHref: NUC_COMPANY_COPY.githubHref,
    glanceAria: NUC_COMPANY_COPY.glanceAria,
    cubeFaces: [...NUC_COMPANY_CUBE_FACES],
    glance: { ...NUC_COMPANY_GLANCE },
  },
  'section.thesis': {
    railLabel: 'Why',
    anchorId: 'thesis',
    showSection: true,
    showChart: true,
    thesisEyebrow: NUC_COMPANY_COPY.thesisEyebrow,
    thesisTitle: NUC_COMPANY_COPY.thesisTitle,
    thesisSupport: NUC_COMPANY_COPY.thesisSupport,
    thesisCta: NUC_COMPANY_COPY.thesisCta,
    items: NUC_COMPANY_THESIS.map((item) => ({ ...item })),
    shells: NUC_COMPANY_SHELLS.map((item) => ({ ...item })),
  },
  'section.savings': {
    railLabel: 'Keep',
    anchorId: 'savings',
    showSection: true,
    savingsEyebrow: NUC_COMPANY_COPY.savingsEyebrow,
    savingsTitle: NUC_COMPANY_COPY.savingsTitle,
    savingsSupport: NUC_COMPANY_COPY.savingsSupport,
    savingsCta: NUC_COMPANY_COPY.savingsCta,
    savingsNote: NUC_COMPANY_COPY.savingsNote,
    glanceAria: NUC_COMPANY_COPY.glanceAria,
    pulseStatus: NUC_COMPANY_COPY.pulseStatus,
    items: NUC_COMPANY_SAVINGS.map((item) => ({ ...item })),
  },
  'section.wedge': {
    railLabel: 'Path',
    anchorId: 'wedge',
    showSection: true,
    wedgeEyebrow: NUC_COMPANY_COPY.wedgeEyebrow,
    wedgeTitle: NUC_COMPANY_COPY.wedgeTitle,
    wedgeSupport: NUC_COMPANY_COPY.wedgeSupport,
    items: NUC_COMPANY_WEDGE.map((item) => ({ ...item })),
  },
  'section.surface': {
    railLabel: 'Reach',
    anchorId: 'surface',
    showSection: true,
    showStage: true,
    surfaceEyebrow: NUC_COMPANY_COPY.surfaceEyebrow,
    surfaceTitle: NUC_COMPANY_COPY.surfaceTitle,
    surfaceSupport: NUC_COMPANY_COPY.surfaceSupport,
    surfaceTabsLabel: NUC_COMPANY_COPY.surfaceTabsLabel,
    surfaceStageLabel: NUC_COMPANY_COPY.surfaceStageLabel,
    items: NUC_COMPANY_SURFACE.map((item) => ({ ...item })),
  },
  'section.ask': {
    railLabel: 'Talk',
    anchorId: 'ask',
    showSection: true,
    askTitle: NUC_COMPANY_COPY.askTitle,
    askSupport: NUC_COMPANY_COPY.askSupport,
    askCta: NUC_COMPANY_COPY.askCta,
    askModalTitle: NUC_COMPANY_COPY.askModalTitle,
    askModalSupport: NUC_COMPANY_COPY.askModalSupport,
    askNameLabel: NUC_COMPANY_COPY.askNameLabel,
    askNamePlaceholder: NUC_COMPANY_COPY.askNamePlaceholder,
    askEmailLabel: NUC_COMPANY_COPY.askEmailLabel,
    askEmailPlaceholder: NUC_COMPANY_COPY.askEmailPlaceholder,
    askTypeLabel: NUC_COMPANY_COPY.askTypeLabel,
    askTypePlaceholder: NUC_COMPANY_COPY.askTypePlaceholder,
    askNoteLabel: NUC_COMPANY_COPY.askNoteLabel,
    askNotePlaceholder: NUC_COMPANY_COPY.askNotePlaceholder,
    askSubmit: NUC_COMPANY_COPY.askSubmit,
    askCancel: NUC_COMPANY_COPY.askCancel,
    navHome: NUC_COMPANY_COPY.navHome,
    navDocs: NUC_COMPANY_COPY.navDocs,
    navPlay: NUC_COMPANY_COPY.navPlay,
    navCli: NUC_COMPANY_COPY.navCli,
    navGitHub: NUC_COMPANY_COPY.navGitHub,
    playgroundHref: NUC_COMPANY_COPY.playgroundHref,
    cliHref: NUC_COMPANY_COPY.cliHref,
    githubHref: NUC_COMPANY_COPY.githubHref,
    contactTypes: NUC_COMPANY_CONTACT_TYPES.map((item) => ({ ...item })),
  },
} as const

export const THANK_YOU_SECTION_DEFAULTS = {
  'section.thank_you': {
    showSection: true,
    thankYouTitle: 'Thanks - we got it.',
    thankYouSupport:
      'We reply within 24h with a clear next step. Check spam if nothing lands.',
    thankYouCta: 'Back to Nucleify',
    thankYouInvestCta: 'Invest in us?',
    coreLaneUi: 'ui',
    coreLaneSdk: 'sdk',
    coreLaneData: 'data',
  },
} as const

export const THANK_YOU_PAGE_SEO = {
  title: 'Thanks - we got it.',
  description:
    'We reply within 24h with a clear next step. Check spam if nothing lands.',
} as const

export function defaultPropsForWidget(type: string): Record<string, unknown> {
  const fromHome = (
    HOME_SECTION_DEFAULTS as Record<string, Record<string, unknown>>
  )[type]
  if (fromHome) return structuredClone(fromHome) as Record<string, unknown>
  const fromInv = (
    INVESTOR_SECTION_DEFAULTS as Record<string, Record<string, unknown>>
  )[type]
  if (fromInv) return structuredClone(fromInv) as Record<string, unknown>
  const fromCompany = (
    COMPANY_SECTION_DEFAULTS as Record<string, Record<string, unknown>>
  )[type]
  if (fromCompany)
    return structuredClone(fromCompany) as Record<string, unknown>
  const fromThanks = (
    THANK_YOU_SECTION_DEFAULTS as Record<string, Record<string, unknown>>
  )[type]
  if (fromThanks) return structuredClone(fromThanks) as Record<string, unknown>
  return {}
}

export * from './content/company'
export * from './content/home'
export * from './content/investor'
