import { resolve } from "node:path";

export const structureConfig = {
	alias: {
		nucleify: "~/nucleify",
		modules: resolve(process.cwd(), "../shared_modules"),
		"portable/nui": resolve(process.cwd(), "../portable/nui"),
		nuc_client: "~/nuc_client",
		nuc_server: "~/server/nuc_server",
		"#nuc-compiler/runtime": resolve(
			process.cwd(),
			"../compiler/runtime/index.ts",
		),
	},
	components: [],
	imports: {
		dirs: ["~/composables/**"],
		exclude: [
			"**/*.nuc.tsx",
			"../shared_modules/**/*.nuc.tsx",
			"../shared_modules/**/*.tsx",
			"../shared_modules/**/*.react.ts",
			"../shared_modules/**/index.react.ts",
			"../shared_modules/index.react.ts",
			"../shared_modules/**/vitests/**",
			"../shared_modules/**/*.test.ts",
			"../shared_modules/**/*.spec.ts",
			"app/**",
		],
	},
	srcDir: "src",
	serverDir: "src/server",
	dir: {
		modules: "src/modules",
		public: "public",
	},
	publicDir: "public",
	plugins: [
		resolve(
			process.cwd(),
			"../shared_modules/nuc_languages/plugins/nuc_translations.ts",
		),
	],
};
