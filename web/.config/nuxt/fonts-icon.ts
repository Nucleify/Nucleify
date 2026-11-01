/** Konfiguracja fontów (Google Fonts) i ikon (@nuxt/icon) */
export const googleFontsConfig = {
	families: {
		// Keep weight set small - each weight is another woff2 on the critical path.
		"Instrument Sans": [400, 600],
		// No 650 on Google Fonts; 600/700 cover brand + UI mono.
		"JetBrains Mono": [600, 700],
	},
	display: "optional" as const,
	subsets: ["latin"],
	preload: true,
	prefetch: false,
	preconnect: true,
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
