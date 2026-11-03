import { ignoreNucTsxPlugin } from "./ignore-nuc-tsx";

export const viteConfig = {
	plugins: [ignoreNucTsxPlugin()],
	vue: {
		template: {
			compilerOptions: {
				isCustomElement: (tag: string) => tag.startsWith("nui-"),
			},
		},
	},
	build: {
		chunkSizeWarningLimit: 1600,
		minify: "terser",
		cssCodeSplit: false,
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		rollupOptions: {
			maxParallelFileOps: 2,
			output: {
				manualChunks(id: string) {
					const chunks: [string, string[]][] = [
						["vue", ["vue", "vue-router", "vue-i18n"]],
						["nucleify-ui", ["lit", "lit-html", "lit-element"]],
						["iconify", ["@iconify/vue", "@iconify/utils", "@iconify/types"]],
						["animejs", ["animejs"]],
					];
					for (const [chunk, pkgs] of chunks) {
						if (
							pkgs.some(
								(name) =>
									id.includes(`/node_modules/${name}/`) ||
									id.includes(`\\node_modules\\${name}\\`),
							)
						)
							return chunk;
					}
				},
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "~/assets/index";`,
				silenceDeprecations: [
					"mixed-decls",
					"import",
					"color-functions",
					"global-builtin",
				],
			},
		},
	},
	optimizeDeps: {
		include: ["vue", "vue-router", "lit", "animejs"],
	},
};
