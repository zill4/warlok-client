// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import webSpatial from "@webspatial/vite-plugin";

const xrEnv = process.env.XR_ENV || 'web';
const isAvp = xrEnv === 'avp';
const astroBase = isAvp ? '/webspatial/avp/' : '/';
const basePath = isAvp ? '/webspatial/avp' : '';

// https://astro.build/config
export default defineConfig({
	// Enable Preact to support Preact JSX components.
	integrations: [preact()],
	base: astroBase,
	output: 'static',
	vite: {
		plugins: [
			webSpatial(),
		],
		resolve: {
			alias: {
				react: 'preact/compat',
				'react-dom': 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
			},
		},
		define: {
			'process.env.XR_ENV': JSON.stringify(xrEnv),
			__BASE_PATH__: JSON.stringify(basePath),
		},
	}
});
