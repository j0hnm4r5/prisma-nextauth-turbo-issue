// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
if (!process.env.SKIP_ENV_VALIDATION) {
	await import("./src/env/server.mjs");
}

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	swcMinify: true,
	transpilePackages: ["database"],
	async redirects() {
		return [{ source: "/", destination: "/api/auth/signin", permanent: false }];
	},
};
export default config;
