## WebSpatial Notes

Manifest: `public/manifest.webmanifest` with required fields (name, display, start_url, scope, icons).
SDK + Builder: @webspatial/core-sdk, @webspatial/react-sdk, @webspatial/builder, @webspatial/platform-visionos, and the Vite plugin.
Vite/Astro integration: astro.config.mjs include webSpatial() in vite.plugins.
HTML wiring: src/layouts/Layout.astro links the manifest, sets theme-color, and adds an Apple touch icon.

To start
`npm run dev:avp`
in another terminal run the WebSpatial app shell pointing at deve server
`XR_DEV_SERVER=http://localhost:4321/webspatial/avp/ npm run run:avp npm run run:avp`
