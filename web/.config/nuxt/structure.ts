import { resolve } from "node:path";

const root = resolve(process.cwd(), "..");
const webSrc = resolve(process.cwd(), "src");

export const structureConfig = {
	alias: {
		"@web": resolve(webSrc, "index.ts"),
		"@admin": resolve(root, "admin/src"),
		"@shared_modules": resolve(root, "shared_modules"),
		"@portable": resolve(root, "portable"),
		nucleify: resolve(root, "shared_modules/index.ts"),
		modules: resolve(root, "shared_modules"),
		"portable/nui": resolve(root, "portable/nui"),
		nuc_client: resolve(
			root,
			"shared_modules/nuc_api/supabase/client.ts",
		),
		nuc_server: resolve(webSrc, "server/nuc_server.ts"),
		"#nuc-compiler/runtime": resolve(root, "compiler/runtime/index.ts"),
	},
	components: [],
	imports: {
		dirs: [],
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
		resolve(root, "shared_modules/nuc_languages/plugins/nuc_translations.ts"),
	],
};
