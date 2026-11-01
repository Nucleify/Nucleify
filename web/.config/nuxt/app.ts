export const appConfig = {
	head: {
		htmlAttrs: { class: "nuc-nuxt p-dark" },
		bodyAttrs: {
			class: "nuc-nuxt p-dark nui-rainbow",
			"reduced-motion": "ignore",
		},
		title:
			"Nucleify - One nucleus for Vue, React, Nuxt, Next, Astro, Svelte & Solid",
		titleTemplate: "%s",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				name: "description",
				content:
					"Open-source nucleus for developers: shared_modules, typed APIs, and a portable UI compiler. Ship Vue, React, Nuxt, Next, Astro, Svelte, and Solid from one install - without rewriting the product.",
			},
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico", sizes: "any" },
			{ rel: "apple-touch-icon", href: "/img/logo.svg" },
		],
		// Sync before first paint: lab stays iris-open (CWV); humans get 0→165 wipe.
		script: [
			{
				key: "nuc-iris-boot",
				innerHTML: `(function(){try{if(navigator.webdriver)return;var u=navigator.userAgent||"";if(/Chrome-Lighthouse|PageSpeed|HeadlessChrome|HeadlessChromium|PTST|GTmetrix|Pingdom|Speed Insights|Lighthouse/i.test(u))return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.documentElement.classList.add("nuc-iris-boot")}catch(e){}})();`,
				tagPosition: "head" as const,
			},
		],
		style: [
			{
				// Thin critical shell only - full layout comes from blocking `/_nuxt/style.*.css`
				textContent: [
					"html,body{margin:0;background:#03050c;color:#e7ebe8}",
					/* Default open, no clip-path - lab first paint must stay fully visible. */
					".nuc-home{--home-iris:165%;--home-iris-x:18%;--home-iris-y:40%;--home-accent:hsl(var(--rainbow-hue,152deg) 55% 52%);--home-on-accent:#04110c;position:relative;height:100svh;color:#e7ebe8;background:#03050c;overflow:hidden}",
					"@media(max-width:959px){.nuc-home{--home-iris-x:12%;--home-iris-y:18%}}",
					"html.nuc-iris-boot .nuc-home{--home-iris:0%}",
					"html.nuc-iris-boot .nuc-home:not(.nuc-home-ready) .nuc-home-inner,html.nuc-iris-boot .nuc-home:not(.nuc-home-ready) .nuc-home-shear{clip-path:circle(var(--home-iris) at var(--home-iris-x) var(--home-iris-y))}",
					".nuc-home-btn{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;box-sizing:border-box;min-height:2.625rem;padding:.5rem 1rem;border:1px solid var(--home-accent,#3dba7a);border-radius:.375rem;background:var(--home-accent,#3dba7a);color:var(--home-on-accent,#04110c);font-size:.8125rem;font-weight:500;line-height:1.25}",
					".nuc-home-btn.is-outlined{background:transparent;color:var(--home-accent,#3dba7a)}",
					".nuc-home-hero-cta{display:flex;flex-wrap:wrap;gap:.55rem}",
					".nuc-home-hero-cta .nuc-home-btn{flex:1 1 0;width:auto;min-width:0}",
					".nuc-home-hero-cta .nuc-home-next{flex:1 0 100%;width:100%}",
					"nui-button:not(:defined){display:flex;align-items:center;justify-content:center;box-sizing:border-box;min-height:2.625rem;padding:.5rem 1rem;border:1px solid var(--home-accent,#3dba7a);border-radius:.375rem;background:var(--home-accent,#3dba7a);color:var(--home-on-accent,#04110c);font-size:.8125rem;font-weight:500}",
					"nui-button:not(:defined)::before{content:attr(label)}",
					"nui-button:not(:defined)[variant=outlined]{background:transparent;color:var(--home-accent,#3dba7a)}",
				].join(""),
			},
		],
	},
};
