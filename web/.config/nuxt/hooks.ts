import {
	cpSync,
	existsSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from "node:fs";
import { join } from "node:path";

const STYLESHEET_LINK_RE =
	/<link\b(?=[^>]*\brel=["']stylesheet["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/gi;

const INLINE_MAX_BYTES = 20_480;

function collectCssMap(cssDir: string): Record<string, string> {
	const map: Record<string, string> = {};
	if (!existsSync(cssDir)) return map;

	for (const name of readdirSync(cssDir)) {
		if (!name.endsWith(".css")) continue;
		const css = readFileSync(join(cssDir, name), "utf-8");
		if (css.length > INLINE_MAX_BYTES) continue;
		map[`/_nuxt/${name}`] = css;
	}
	return map;
}

function resolveClientCssDir(rootDir: string): string {
	const candidates = [
		join(rootDir, ".nuxt/dist/client/_nuxt"),
		join(rootDir, ".output/public/_nuxt"),
	];
	return candidates.find((dir) => existsSync(dir)) ?? candidates[0]!;
}

function inlineStylesheetsInHtml(
	html: string,
	map: Record<string, string>,
): string {
	return html.replace(STYLESHEET_LINK_RE, (full, href: string) => {
		const css = map[href];
		if (!css) return full;
		return `<style data-inline-css="${href}">${css}</style>`;
	});
}

function walkHtml(dir: string, map: Record<string, string>): void {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			walkHtml(fullPath, map);
			continue;
		}
		if (!entry.name.endsWith(".html")) continue;
		const contents = readFileSync(fullPath, "utf-8");
		writeFileSync(fullPath, inlineStylesheetsInHtml(contents, map));
	}
}

function fontPreloadTags(map: Record<string, string>): string[] {
	const urls = new Set<string>();
	const fontUrlRe = /url\(\s*['"]?([^'")\s]+\.woff2)['"]?\s*\)/gi;

	for (const css of Object.values(map)) {
		for (const match of css.matchAll(fontUrlRe)) {
			const raw = match[1];
			if (!raw) continue;
			const href = raw.startsWith("/")
				? raw
				: `/_nuxt/${raw.replace(/^\.\//, "")}`;
			urls.add(href);
		}
	}

	const preferred = [...urls].filter(
		(u) =>
			u.includes("JetBrains_Mono-normal-650") ||
			u.includes("JetBrains_Mono-normal-600") ||
			u.includes("Instrument_Sans-normal-400") ||
			u.includes("Instrument_Sans-normal-600"),
	);
	const list = (preferred.length ? preferred : [...urls]).slice(0, 4);

	return list.map(
		(href) =>
			`<link rel="preload" as="font" type="font/woff2" href="${href}" crossorigin>`,
	);
}

function injectFontPreloads(dir: string, map: Record<string, string>): void {
	const preloads = fontPreloadTags(map).join("");
	if (!preloads) return;

	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			injectFontPreloads(fullPath, map);
			continue;
		}
		if (!entry.name.endsWith(".html")) continue;
		let html = readFileSync(fullPath, "utf-8");
		if (html.includes('rel="preload" as="font"')) continue;
		html = html.replace("</head>", `${preloads}</head>`);
		writeFileSync(fullPath, html);
	}
}

export const hooksConfig = {
	hooks: {
		"nitro:config": (nitroConfig: {
			rootDir?: string;
			virtual?: Record<string, string | (() => string)>;
		}) => {
			nitroConfig.virtual ??= {};
			// Lazily evaluate after Vite client CSS exists (nitro rollup resolves this).
			nitroConfig.virtual["#nuc-inline-css"] = () => {
				const root = nitroConfig.rootDir ?? process.cwd();
				const map = collectCssMap(resolveClientCssDir(root));
				return `export const INLINE_CSS_MAP = ${JSON.stringify(map)}`;
			};
		},

		"nitro:build:public-assets": (nitro: {
			options: { rootDir: string; output: { publicDir: string } };
		}) => {
			const publicDir = join(nitro.options.rootDir, "public");
			const outputDir = nitro.options.output.publicDir;
			if (existsSync(publicDir)) {
				for (const entry of readdirSync(publicDir, { withFileTypes: true })) {
					if (entry.name.startsWith(".")) continue;
					cpSync(join(publicDir, entry.name), join(outputDir, entry.name), {
						recursive: true,
					});
				}
			}

			const map = collectCssMap(join(outputDir, "_nuxt"));
			walkHtml(outputDir, map);
			injectFontPreloads(outputDir, map);
		},
	},
} as const;
