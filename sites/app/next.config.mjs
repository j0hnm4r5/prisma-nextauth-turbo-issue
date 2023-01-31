// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
if (!process.env.SKIP_ENV_VALIDATION) {
	await import("./src/env/server.mjs");
}

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	swcMinify: true,
	transpilePackages: ["database"],
	async redirects() {
		return [{ source: "/", destination: "/api/auth/signin", permanent: false }];
	},
	output: 'standalone',
	experimental: {
	  outputFileTracingRoot: path.join(__dirname, '../../'),
	},
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
	  config.externals = [...config.externals, 'database']
  
	  return config
	},
};
export default config;