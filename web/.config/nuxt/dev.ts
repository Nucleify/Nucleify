export const devConfig = {
	devtools: { enabled: process.env.DEV_TOOLS === "true" },
	devServer: {
		port: Number(process.env.WEB_PORT || 7777),
	},
};
