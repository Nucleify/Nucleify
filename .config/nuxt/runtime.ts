export const runtimeConfig = {
  public: {
    appUrl: process.env.APP_URL || 'https://api.nucleify.io',
    apiUrl: process.env.API_URL || 'https://api.nucleify.io/api',
    appEnv: process.env.APP_ENV || 'production',
  },
}
