import {
	cpSync,
	existsSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from "node:fs";
import { join } from "node:path";

const PLACEHOLDER = "__NUC_FONT_PRELOADS_JSON__";

function collectFontHrefs(cssDir: string): string[] {
	const urls = new Set<string>();
	if (!existsSync(cssDir)) return [];

	const fontUrlRe = /url\(\s*['"]?([^'")\s]+\.woff2)['"]?\s*\)/gi;

	for (const name of readdirSync(cssDir)) {
		if (!name.endsWith(".css")) continue;
		const css = readFileSync(join(cssDir, name), "utf-8");
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
			/Instrument_Sans|JetBrains_Mono/i.test(u) &&
			/(400|600|700|650)/.test(u),
	);
	return (preferred.length ? preferred : [...urls]).slice(0, 4);
}

function fontPreloadTags(hrefs: string[]): string {
	return hrefs
		.map(
			(href) =>
				`<link rel="preload" as="font" type="font/woff2" href="${href}" crossorigin>`,
		)
		.join("");
}

function injectFontPreloadsIntoHtml(dir: string, hrefs: string[]): void {
	const preloads = fontPreloadTags(hrefs);
	if (!preloads) return;

	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			injectFontPreloadsIntoHtml(fullPath, hrefs);
			continue;
		}
		if (!entry.name.endsWith(".html")) continue;
		let html = readFileSync(fullPath, "utf-8");
		if (html.includes('rel="preload" as="font"')) continue;
		html = html.replace("</head>", `${preloads}</head>`);
		writeFileSync(fullPath, html);
	}
}

/** Splice the tiny font-href JSON into the minify-safe placeholder. */
function injectFontPreloadsIntoServerBundle(
	serverDir: string,
	hrefs: string[],
): number {
	if (!existsSync(serverDir)) return 0;

	const payload = JSON.stringify(JSON.stringify(hrefs));
	let patched = 0;

	const visit = (dir: string) => {
		for (const entry of readdirSync(dir, { withFileTypes: true })) {
			const fullPath = join(dir, entry.name);
			if (entry.isDirectory()) {
				visit(fullPath);
				continue;
			}
			if (!/\.(mjs|js)$/.test(entry.name)) continue;
			const source = readFileSync(fullPath, "utf-8");
			if (!source.includes(PLACEHOLDER)) continue;

			const next = source
				.replaceAll(`"${PLACEHOLDER}"`, payload)
				.replaceAll(`'${PLACEHOLDER}'`, payload);
			if (next === source) continue;
			writeFileSync(fullPath, next);
			patched += 1;
		}
	};

	visit(serverDir);
	return patched;
}

/** Runs after worker emit — public-assets is too early on Cloudflare. */
export function injectFontPreloadsFromOutput(nitro: {
	options: { output: { publicDir: string; serverDir: string } };
}): void {
	const hrefs = collectFontHrefs(join(nitro.options.output.publicDir, "_nuxt"));
	const patched = injectFontPreloadsIntoServerBundle(
		nitro.options.output.serverDir,
		hrefs,
	);
	if (hrefs.length > 0 && patched === 0) {
		console.warn(
			"[nuc-font-preload] font list ready but placeholder not found in server bundle",
		);
	} else if (patched > 0) {
		console.info(
			`[nuc-font-preload] injected ${hrefs.length} font preload(s) into ${patched} server chunk(s)`,
		);
	}
}

export const hooksConfig = {
	hooks: {
		"nitro:build:public-assets": (nitro: {
			options: {
				rootDir: string;
				output: { publicDir: string; serverDir: string };
			};
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

			const hrefs = collectFontHrefs(join(outputDir, "_nuxt"));
			injectFontPreloadsIntoHtml(outputDir, hrefs);
		},

		"nitro:compiled": injectFontPreloadsFromOutput,
	},
} as const;
