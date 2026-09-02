import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(import.meta.url), "../../..");

/** Lit/`nucleify-ui` must not run in Workers; stub DOM globals if anything leaks in. */
const workerDomShim = `
(() => {
  const g = globalThis;
  if (typeof g.EventTarget === 'undefined') {
    g.EventTarget = class EventTarget {
      addEventListener() {}
      removeEventListener() {}
      dispatchEvent() { return true; }
    };
  }
  if (typeof g.HTMLElement === 'undefined') {
    g.HTMLElement = class HTMLElement extends g.EventTarget {};
  }
  if (typeof g.customElements === 'undefined') {
    const registry = new Map();
    g.customElements = {
      define(name, ctor) { registry.set(name, ctor); },
      get(name) { return registry.get(name); },
      whenDefined(name) { return Promise.resolve(registry.get(name)); },
      upgrade() {},
    };
  }
})();
`;

function isPrerenderEnabled(): boolean {
	if (process.env.CI === "true") return false;
	if (process.env.PRERENDER === "false") return false;
	return true;
}

export const nitroConfig = {
	ssr: process.env.SSR === "true",
	nitro: {
		preset: process.env.NITRO_PRESET || "cloudflare",
		esbuild: {
			options: {
				banner: workerDomShim,
			},
		},
		alias: {
			nucleify: resolve(root, "src/nucleify.ts"),
			modules: resolve(root, "../shared_modules"),
			nuc_api: resolve(
				root,
				"../shared_modules/nuc_api/supabase/api/server.ts",
			),
			nuc_client: resolve(root, "src/nuc_client.ts"),
			nuc_server: resolve(root, "src/server/nuc_server.ts"),
		},
		externals: {
			inline: ["vue", "vue-router", "@unhead/vue"],
		},
		prerender: {
			crawlLinks: process.env.PRERENDER_CRAWL_LINKS === "true",
			failOnError: isPrerenderEnabled(),
			routes: [],
		},
	},
};
