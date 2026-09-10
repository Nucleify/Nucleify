/** Konfiguracja fontów (Google Fonts) i ikon (@nuxt/icon) */
export const googleFontsConfig = {
	families: {
		"Instrument Sans": [400, 500, 600, 700],
		"JetBrains Mono": [500, 600, 650],
	},
	display: "swap" as const,
	subsets: ["latin"],
	preload: true,
	prefetch: false,
	preconnect: false,
	download: true,
	base64: false,
};

export const iconConfig = {
	mode: "svg" as const,
	serverBundle: {
		collections: ["mdi"],
	},
	clientBundle: {
		scan: true,
		sizeLimitKb: 256,
	},
};
