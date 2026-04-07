/** Konfiguracja wydajności – critters, vitalizer */
export const performanceConfig = {
  critters: {
    config: {
      preload: 'media',
      inlineFonts: false,
      preloadFonts: false,
      pruneSource: false,
      mergeStylesheets: true,
      reduceInlineStyles: true,
      keyframes: 'all',
      compress: false,
    },
  },

  vitalizer: {
    disableStylesheets: false,
    disablePrefetchLinks: true,
  },
} as const
