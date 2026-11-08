/**
 * Sync section.compiler_demo (+ pillars outcome/cta tweaks) in marketing_props
 * from content/home.ts. Run after editing home compiler snippets.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  NUC_HOME_COMPILER_NODES,
  NUC_HOME_COMPILER_SOURCE,
  NUC_HOME_COPY,
  NUC_HOME_PILLARS,
} from '../../shared_modules/nuc_admin/cms/defaults/content/home'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const target = path.join(
  root,
  'shared_modules/nuc_admin/cms/defaults/marketing_props.ts'
)

let text = fs.readFileSync(target, 'utf8')

text = text.replace(/pillarsCta: 'See the emit'/, "pillarsCta: 'Pick a shell'")
text = text.replace(
  /\*\.nuc\.tsx → SessionGate\.vue \/ \.tsx/g,
  NUC_HOME_PILLARS[0]!.outcome
)
text = text.replace(
  /\*\.nuc\.tsx → InboxBadge\.vue \/ \.tsx/g,
  NUC_HOME_PILLARS[0]!.outcome
)

function asTsString(value: string): string {
  return JSON.stringify(value)
}

const nodesLiteral = NUC_HOME_COMPILER_NODES.map((n) => {
  return `      {
        id: ${asTsString(n.id)},
        label: ${asTsString(n.label)},
        icon: ${asTsString(n.icon)},
        color: ${asTsString(n.color)},
        command: ${asTsString(n.command)},
        file: ${asTsString(n.file)},
        snippet:
          ${asTsString(n.snippet.join('\n'))},
        x: ${n.x},
        y: ${n.y},
      }`
}).join(',\n')

const block = `  'section.compiler_demo': {
    railLabel: 'Emit',
    anchorId: 'compiler',
    showSection: true,
    showBoard: true,
    compilerEyebrow: ${asTsString(NUC_HOME_COPY.compilerEyebrow)},
    compilerTitleLead: ${asTsString(NUC_HOME_COPY.compilerTitleLead)},
    compilerTitleTrail: ${asTsString(NUC_HOME_COPY.compilerTitleTrail)},
    compilerSupport:
      ${asTsString(NUC_HOME_COPY.compilerSupport)},
    compilerCta: ${asTsString(NUC_HOME_COPY.compilerCta)},
    compilerHub: '.nuc',
    compilerHubLabel: 'author',
    compilerEmitLabel: 'emit',
    sourceFile: ${asTsString(NUC_HOME_COMPILER_SOURCE.file)},
    sourceSnippet:
      ${asTsString(NUC_HOME_COMPILER_SOURCE.snippet.join('\n'))},
    nodes: [
${nodesLiteral},
    ],
  },
`

const start = text.indexOf("  'section.compiler_demo':")
const end = text.indexOf("  'section.pulse':")
if (start < 0 || end < 0) {
  throw new Error('Could not locate section.compiler_demo / section.pulse')
}

fs.writeFileSync(target, `${text.slice(0, start)}${block}${text.slice(end)}`)
console.log('synced', target)
console.log('source', NUC_HOME_COMPILER_SOURCE.file)
console.log(
  'files',
  NUC_HOME_COMPILER_NODES.map((n) => `${n.id}:${n.file}`).join(' ')
)
