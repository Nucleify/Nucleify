export const runtimeConfig = {
	supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
	authEmailResendKey: process.env.AUTH_EMAIL_RESEND_KEY || "",
	authEmailFrom: process.env.AUTH_EMAIL_FROM || "business@nucleify.io",
	contactFormRecipient:
		process.env.CONTACT_FORM_EMAIL || "business@nucleify.io",
	public: {
		appUrl: process.env.NUXT_PUBLIC_APP_URL || "https://nucleify.io",
		apiUrl: process.env.NUXT_PUBLIC_API_URL || "/api",
		supabaseEdgeBase:
			process.env.SUPABASE_EDGE_BASE ||
			`${process.env.SUPABASE_URL || ""}/functions/v1`,
		supabaseUrl: process.env.SUPABASE_URL || "",
		supabaseKey: process.env.SUPABASE_KEY || "",
		appEnv: process.env.APP_ENV || "production",
	},
};
