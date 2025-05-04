export const environment = {
  production: true,
  apiUrl: '/api', // Relative path will be used in production environment
  apiKey: '${API_KEY}', // Will be replaced during deployment via environment variables
};
