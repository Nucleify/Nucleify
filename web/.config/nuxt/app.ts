export const appConfig = {
	head: {
		htmlAttrs: { class: "nuc-nuxt p-dark" },
		bodyAttrs: { class: "nuc-nuxt p-dark" },
		title: "Nucleify - Modular Web Framework for Laravel & Nuxt",
		titleTemplate: "%s",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				name: "description",
				content:
					"Create scalable web apps faster with Nucleify - a modular, core-driven framework with unique modules for Laravel & Nuxt developers.",
			},
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{ rel: "apple-touch-icon", href: "/favicon.ico" },
		],
		style: [
			{
				// Keep first paint dark + mobile hero visible before CSS chunk arrives.
				textContent: [
					"html,body{margin:0;background:#070908;color:#e7ebe8}",
					".nuc-home{position:relative;height:100svh;color:#e7ebe8;background:#070908;overflow:hidden;font-family:system-ui,sans-serif}",
					".nuc-home-inner{height:100%}",
					".nuc-home-scroller{height:100%;overflow:hidden auto}",
					".nuc-home-hero{max-width:1200px;margin:0 auto;padding:3.75rem 1rem}",
					".nuc-home-hero-mark{opacity:1;transform:none}",
					".nuc-home-hero-brand{margin:0;font-size:clamp(2rem,10vw,2.75rem);font-weight:650;letter-spacing:-.06em;line-height:.92;color:#e7ebe8;font-family:ui-monospace,monospace}",
				].join(""),
			},
		],
	},
};
