import {
  cpSync,
  existsSync,
  lstatSync,
  readdirSync,
  rmSync,
} from 'node:fs'
import { join } from 'node:path'

export const hooksConfig = {
  hooks: {
    'nitro:build:public-assets': (nitro: {
      options: {
        rootDir: string
        output: { publicDir: string; serverDir: string }
      }
    }) => {
      const publicDir = join(nitro.options.rootDir, 'public')
      const outputDir = nitro.options.output.publicDir
      if (!existsSync(publicDir)) return

      for (const entry of readdirSync(publicDir, { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue
        const srcPath = join(publicDir, entry.name)
        const destPath = join(outputDir, entry.name)
        try {
          if (
            existsSync(destPath) ||
            lstatSync(destPath, { throwIfNoEntry: false })
          ) {
            rmSync(destPath, { recursive: true, force: true })
          }
          cpSync(srcPath, destPath, {
            recursive: true,
            dereference: true,
            force: true,
          })
        } catch {
          // Ignore if already copied by Nitro
        }
      }
    },
  },
} as const
