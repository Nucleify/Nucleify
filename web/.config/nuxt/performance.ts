/** Konfiguracja wydajności – critters, vitalizer */
export const performanceConfig = {
	critters: {
		config: {
			preload: "swap",
			inlineFonts: false,
			preloadFonts: true,
			inlineThreshold: 20480,
		},
	},

	vitalizer: {
		disableStylesheets: false,
		disablePrefetchLinks: true,
	},
} as const;
