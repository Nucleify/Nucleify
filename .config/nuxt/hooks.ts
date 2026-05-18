import { join } from 'node:path'

import { cpSync, existsSync, readdirSync } from 'node:fs'

export const hooksConfig = {
  hooks: {
    'nitro:build:public-assets': (nitro: {
      options: { rootDir: string; output: { publicDir: string } }
    }) => {
      const publicDir = join(nitro.options.rootDir, 'public')
      if (!existsSync(publicDir)) return
      const outputDir = nitro.options.output.publicDir
      for (const entry of readdirSync(publicDir, { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue
        cpSync(join(publicDir, entry.name), join(outputDir, entry.name), {
          recursive: true,
        })
      }
    },
  },
} as const
