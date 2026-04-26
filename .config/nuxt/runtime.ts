export const runtimeConfig = {
  public: {
    appUrl: process.env.APP_URL || 'https://api.nucleify.io',
    apiUrl: process.env.API_URL || 'https://api.nucleify.io/api',
    convertDocumentsUrl:
      process.env.NUC_CONVERT_DOCUMENTS_URL ||
      'https://convert-documents-nucleify.koyeb.app',
    appEnv: process.env.APP_ENV || 'production',
  },
}
