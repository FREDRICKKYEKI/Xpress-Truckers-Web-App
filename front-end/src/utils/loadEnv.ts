/**
 * Object containing environment variables.
 * @typedef {Object} Envs
 * @property {string} openCageApiKey - The API key for OpenCage geocoding service.
 * @property {string} geoCodeApi - The API key for the GeoCode service.
 * @property {string} unsplashApiAccessKey - The access key for the Unsplash API.
 * @property {string} unsplashApiSecretKey - The secret key for the Unsplash API.
 * @property {string} db_host - The host for the database.
 */

/**
 * Loads environment variables from import.meta.env.
 * @returns {Envs} Object containing environment variables.
 */
export const envs = {
  openCageApiKey: (import.meta as any).env.VITE_OPEN_CAGE_API_KEY,
  geoCodeApi: (import.meta as any).env.VITE_GEO_CODE_API_KEY,
  unsplashApiAccessKey: (import.meta as any).env.VITE_UNSPLASH_ACCESS_KEY,
  unsplashApiSecretKey: (import.meta as any).env.VITE_UNSPLASH_SECRET_KEY,
  db_host: (import.meta as any).env.VITE_DB_HOST,
  api_url: (import.meta as any).env.VITE_API_URL,
};
