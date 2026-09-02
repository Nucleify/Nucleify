#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { defineCommand, runMain } from 'citty'
import { COMPILER_NAME, COMPILER_PHASE } from './index'
import { ParseError, parseTsxToIr } from './parse/tsx'
import { discoverNucSources, toRepoRelative } from './sync/discover'
import { checkWorkspace } from './sync/check'
import { runImport } from './sync/import'
import {
  PRODUCT_IDS,
  SCAFFOLD_APPS,
  scaffoldApp,
  type ProductId,
  type ScaffoldApp,
} from './sync/scaffold'
import { convertProduct } from './sync/convert'
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
        description: 'Recreate gitignored demo at {framework}/demo from templates',
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
        console.log(`scaffold: ${app}/demo → ${toRepoRelative(cwd, dest)}`)
      },
    }),
    convert: defineCommand({
      meta: {
        name: 'convert',
        description: 'Scaffold product shell at {product}-{framework} (tryb B)',
      },
      args: {
        product: {
          type: 'positional',
          required: true,
          description: PRODUCT_IDS.join(' | '),
        },
        target: {
          type: 'string',
          description: 'Framework: next | react | vue | nuxt',
          required: true,
        },
        force: {
          type: 'boolean',
          description: 'Wipe and recreate product shell',
          default: false,
        },
        cwd: {
          type: 'string',
          description: 'Workspace root (default: process.cwd())',
        },
      },
      async run({ args }) {
        const cwd = resolve(String(args.cwd || process.cwd()))
        const product = String(args.product) as ProductId
        const framework = String(args.target) as ScaffoldApp
        if (!PRODUCT_IDS.includes(product)) {
          console.error(`convert: unknown product "${product}"`)
          process.exitCode = 1
          return
        }
        if (!SCAFFOLD_APPS.includes(framework)) {
          console.error(`convert: unknown target "${framework}"`)
          process.exitCode = 1
          return
        }
        try {
          const { dest, copied } = convertProduct({
            product,
            framework,
            cwd,
            force: Boolean(args.force),
          })
          console.log(`convert: ${product} → ${toRepoRelative(cwd, dest)}`)
          for (const c of copied) console.log(`  copied ${c}`)
        } catch (err) {
          console.error(err instanceof Error ? err.message : String(err))
          process.exitCode = 1
        }
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
            for (const s of skipped) {
              console.error(`skipped dirty ${toRepoRelative(cwd, s)} (use import or --force)`)
              process.exitCode = 1
            }
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
      args: {
        cwd: {
          type: 'string',
          description: 'Workspace root (default: process.cwd())',
        },
      },
      async run({ args }) {
        const cwd = resolve(String(args.cwd || process.cwd()))
        const { dirty, orphans } = checkWorkspace(cwd)
        for (const path of dirty) console.error(`dirty ${path}`)
        for (const path of orphans) console.warn(`orphan emit ${path}`)
        if (dirty.length) {
          console.error(`check: ${dirty.length} dirty emit file(s)`)
          process.exitCode = 1
          return
        }
        if (orphans.length) {
          console.warn(`check: ${orphans.length} orphan emit file(s)`)
        }
        console.log('check: ok')
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
      async run({ args }) {
        const cwd = resolve(String(process.cwd()))
        const inputPath = args.path ? String(args.path) : ''
        if (!inputPath) {
          console.error('import: path required (.vue / .tsx / .css)')
          process.exitCode = 1
          return
        }
        const fromArg = args.from ? String(args.from) : undefined
        try {
          const { nucPath, written, from } = await runImport({
            cwd,
            path: inputPath,
            from: fromArg as 'vue' | 'react' | undefined,
            force: Boolean(args.force),
          })
          console.log(`imported --from=${from} ${inputPath} → ${toRepoRelative(cwd, nucPath)}`)
          for (const w of written) console.log(`wrote ${toRepoRelative(cwd, w)}`)
        } catch (err) {
          console.error(err instanceof Error ? err.message : String(err))
          process.exitCode = 1
        }
      },
    }),
  },
})

runMain(main)
