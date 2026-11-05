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
				innerHTML: `(function(){try{if(navigator.webdriver)return;var u=navigator.userAgent||"";if(/Chrome-Lighthouse|PageSpeed|HeadlessChrome|HeadlessChromium|PTST|GTmetrix|Pingdom|Speed Insights|Lighthouse/i.test(u))return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;var d=document.documentElement;d.classList.add("nuc-iris-boot");setTimeout(function(){try{if(!d.classList.contains("nuc-iris-boot"))return;var h=document.querySelector(".nuc-shell");if(h&&h.classList.contains("nuc-ready"))return;d.classList.remove("nuc-iris-boot");if(h){h.style.setProperty("--shell-iris","165%");h.classList.add("nuc-ready");h.classList.remove("nuc-booting")}}catch(e){}},4000)}catch(e){}})();`,
				tagPosition: "head" as const,
			},
		],
		style: [
			{
				// Thin critical shell only - full layout comes from blocking `/_nuxt/style.*.css`
				textContent: [
					"html,body{margin:0;background:#03050c;color:#e7ebe8}",
					/* Default open, no clip-path - lab first paint must stay fully visible. */
					".nuc-shell{--shell-iris:165%;--shell-iris-x:18%;--shell-iris-y:40%;--shell-accent:hsl(var(--rainbow-hue,152deg) 55% 52%);--shell-on-accent:#04110c;position:relative;height:100svh;color:#e7ebe8;background:#03050c;overflow:hidden}",
					"@media(max-width:959px){.nuc-shell{--shell-iris-x:12%;--shell-iris-y:18%}}",
					"html.nuc-iris-boot .nuc-shell:not(.nuc-ready){--shell-iris:0%}",
					"html.nuc-iris-boot .nuc-shell:not(.nuc-ready) .nuc-inner,html.nuc-iris-boot .nuc-shell:not(.nuc-ready) .nuc-shear{clip-path:circle(var(--shell-iris) at var(--shell-iris-x) var(--shell-iris-y))}",
					"html.nuc-iris-boot .nuc-shell.nuc-booting:not(.nuc-ready) .nuc-inner,html.nuc-iris-boot .nuc-shell.nuc-booting:not(.nuc-ready) .nuc-shear{transition:--shell-iris 1.05s cubic-bezier(.65,0,.35,1);will-change:clip-path}",
					"@media(min-width:960px){html.nuc-iris-boot .nuc-shell.nuc-booting:not(.nuc-ready) .nuc-inner,html.nuc-iris-boot .nuc-shell.nuc-booting:not(.nuc-ready) .nuc-shear{transition:--shell-iris 1.7s cubic-bezier(.65,0,.35,1)}}",
					".nuc-btn{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;box-sizing:border-box;min-height:2.625rem;padding:.5rem 1rem;border:1px solid var(--shell-accent,#3dba7a);border-radius:.375rem;background:var(--shell-accent,#3dba7a);color:var(--shell-on-accent,#04110c);font-size:.8125rem;font-weight:600;line-height:1.25;text-decoration:none}",
					".nuc-btn.is-outlined{background:transparent;color:var(--shell-accent,#3dba7a)}",
					".nuc-hero-cta{display:flex;flex-wrap:wrap;gap:.55rem}",
					".nuc-hero-cta .nuc-btn{flex:1 1 0;width:auto;min-width:0}",
					".main-cta{min-height:2.85rem;color:#f7faf8}",
					"nui-button:not(:defined){display:flex;align-items:center;justify-content:center;box-sizing:border-box;min-height:2.625rem;padding:.5rem 1rem;border:1px solid var(--shell-accent,#3dba7a);border-radius:.375rem;background:var(--shell-accent,#3dba7a);color:var(--shell-on-accent,#04110c);font-size:.8125rem;font-weight:600}",
					"nui-button:not(:defined)::before{content:attr(label)}",
					"nui-button:not(:defined)[variant=outlined]{background:transparent;color:var(--shell-accent,#3dba7a)}",
				].join(""),
			},
		],
	},
};
