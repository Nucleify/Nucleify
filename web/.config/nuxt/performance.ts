/** Konfiguracja wydajności – critters, vitalizer */
export const performanceConfig = {
	critters: {
		config: {
			// Keep leftover sheets as normal stylesheets - preload:"media" FOUCs on first paint.
			preload: false,
			inlineFonts: false,
			preloadFonts: true,
			inlineThreshold: 160000,
			reduceInlineStyles: false,
		},
	},

	vitalizer: {
		disableStylesheets: false,
		disablePrefetchLinks: true,
	},
} as const;
