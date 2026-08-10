#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { defineCommand, runMain } from 'citty'
import { COMPILER_NAME, COMPILER_PHASE } from './index'
import { ParseError, parseTsxToIr } from './parse/tsx'
import { discoverNucSources, toRepoRelative } from './sync/discover'
import { SCAFFOLD_APPS, scaffoldApp, type ScaffoldApp } from './sync/scaffold'
import { writeOutputs, type EmitApp } from './sync/write-outputs'

const main = defineCommand({
  meta: {
    name: 'nucleify-compiler',
    version: '0.0.0',
    description: 'IR-first portable UI compiler for Nucleify',
  },
  subCommands: {
    version: defineCommand({
      meta: {
        name: 'version',
        description: 'Print compiler package identity',
      },
      async run() {
        console.log(`${COMPILER_NAME} phase=${COMPILER_PHASE}`)
      },
    }),
    scaffold: defineCommand({
      meta: {
        name: 'scaffold',
        description: 'Recreate a gitignored demo app from compiler/templates',
      },
      args: {
        app: {
          type: 'positional',
          required: true,
          description: SCAFFOLD_APPS.join(' | '),
        },
        cwd: {
          type: 'string',
          description: 'Workspace root (default: process.cwd())',
        },
      },
      async run({ args }) {
        const cwd = resolve(String(args.cwd || process.cwd()))
        const app = String(args.app) as ScaffoldApp
        if (!SCAFFOLD_APPS.includes(app)) {
          console.error(`scaffold: unknown app "${app}"`)
          process.exitCode = 1
          return
        }
        const dest = scaffoldApp(app, cwd)
        console.log(`scaffold: ${app} → ${toRepoRelative(cwd, dest)}`)
      },
    }),
    build: defineCommand({
      meta: {
        name: 'build',
        description: 'Parse *.nuc.tsx → IR → emit into demo apps',
      },
      args: {
        target: {
          type: 'string',
          description: 'vue | react | all (default all)',
          default: 'all',
        },
        app: {
          type: 'string',
          description: 'vue | react | nuxt | next (only this demo app)',
        },
        force: {
          type: 'boolean',
          description: 'Overwrite dirty emit',
          default: false,
        },
        'dump-ir': {
          type: 'boolean',
          description: 'Write *.ir.json next to authoring',
          default: false,
        },
        cwd: {
          type: 'string',
          description: 'Workspace root (default: process.cwd())',
        },
      },
      async run({ args }) {
        const cwd = resolve(String(args.cwd || process.cwd()))
        const dumpIr = Boolean(args['dump-ir'])
        const target = String(args.target || 'all') as 'vue' | 'react' | 'all'
        const force = Boolean(args.force)
        const appArg = args.app ? (String(args.app) as EmitApp) : undefined
        const apps = appArg ? [appArg] : undefined
        const sources = discoverNucSources(cwd)

        if (sources.length === 0) {
          console.log('build: no *.nuc.tsx found')
          return
        }

        let ok = 0
        for (const abs of sources) {
          const rel = toRepoRelative(cwd, abs)
          try {
            const source = readFileSync(abs, 'utf8')
            const ir = parseTsxToIr(source, rel)
            if (dumpIr) {
              const outPath = abs.replace(/\.nuc\.tsx$/, '.ir.json')
              mkdirSync(dirname(outPath), { recursive: true })
              writeFileSync(outPath, `${JSON.stringify(ir, null, 2)}\n`, 'utf8')
            }
            const { written, skipped } = await writeOutputs({
              cwd,
              sourcePath: abs,
              ir,
              target,
              apps,
              force,
            })
            ok += 1
            for (const w of written) console.log(`wrote ${toRepoRelative(cwd, w)}`)
            for (const s of skipped) console.log(`skipped ${toRepoRelative(cwd, s)}`)
            console.log(`parsed ${rel} → ${ir.name}`)
          } catch (err) {
            const message = err instanceof ParseError ? err.message : String(err)
            console.error(message)
            process.exitCode = 1
          }
        }

        if (process.exitCode) {
          console.error(`build: failed (${ok}/${sources.length} ok)`)
          return
        }
        console.log(`build: ok (${ok} file(s), target=${target}${appArg ? `, app=${appArg}` : ''})`)
      },
    }),
    check: defineCommand({
      meta: {
        name: 'check',
        description: 'Validate IR and emit fingerprints (Faza 9 fills dirty)',
      },
      async run() {
        console.log('check: stub OK (full dirty check from Faza 9)')
      },
    }),
    watch: defineCommand({
      meta: {
        name: 'watch',
        description: 'Watch *.nuc.tsx and rebuild (Faza 5+)',
      },
      async run() {
        console.error('watch: not implemented yet (Faza 5)')
        process.exitCode = 1
      },
    }),
    import: defineCommand({
      meta: {
        name: 'import',
        description: 'Import dirty emit back to *.nuc.tsx (Faza 9+)',
      },
      args: {
        from: {
          type: 'string',
          description: 'vue | react',
        },
        force: {
          type: 'boolean',
          default: false,
        },
        path: {
          type: 'positional',
          required: false,
          description: 'Path to .vue / .tsx / sibling .css',
        },
      },
      async run() {
        console.error('not implemented')
        process.exitCode = 1
      },
    }),
  },
})

runMain(main)
