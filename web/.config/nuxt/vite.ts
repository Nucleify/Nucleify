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
		cssCodeSplit: true,
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		rollupOptions: {
			maxParallelFileOps: 2,
			output: {
				manualChunks: {
					vue: ["vue", "vue-router", "vue-i18n"],
					"nucleify-ui": ["lit"],
					iconify: ["@iconify/vue", "@iconify/utils", "@iconify/types"],
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
