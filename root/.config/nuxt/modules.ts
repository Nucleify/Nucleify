export const modules = [
	"@nuxt/icon",
	...(process.env.NODE_ENV === "production" ? ["@nuxtjs/critters"] : []),
	"@nuxtjs/google-fonts",
	"@nuxtjs/i18n",
	"@nuxtjs/robots",
	"@nuxtjs/sitemap",
	"nuxt-schema-org",
	"nuxt-seo-utils",
	"nuxt-vitalizer",
	...(process.env.APP_ENV === "local"
		? [
				"@nuxt/test-utils/module",
				"nuxt-link-checker",
			]
		: []),
];
