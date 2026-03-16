export const runtimeConfig = {
  public: {
    appUrl: process.env.APP_URL || 'https://nucleify.netlify.app',
    apiUrl: process.env.API_URL || 'https://nucleify.io/api',
    appEnv: process.env.APP_ENV || 'production',
  },
}
