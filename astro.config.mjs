// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import webSpatial from "@webspatial/vite-plugin";


// https://astro.build/config
export default defineConfig({
	// Enable Preact to support Preact JSX components.
	integrations: [preact()],
	vite: {
		plugins: [
			webSpatial(),
		],
	}
});
