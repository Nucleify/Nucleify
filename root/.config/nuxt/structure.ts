import { resolve } from "node:path";

export const structureConfig = {
	alias: {
		nucleify: "~/nucleify",
		modules: resolve(process.cwd(), "../shared_modules"),
		nuc_client: "~/nuc_client",
		nuc_server: "~/server/nuc_server",
	},
	components: [],
	imports: {
		dirs: ["~/composables/**"],
		exclude: [
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
