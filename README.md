# Astro + Preact Example

```sh
npm create astro@latest -- --template framework-preact
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/framework-preact)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/framework-preact)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/framework-preact/devcontainer.json)

This example showcases Astro working with [Preact](https://preactjs.com).

Write your Preact components as `.jsx` or `.tsx` files in your project.

## WebSpatial Notes

Manifest: `public/manifest.webmanifest` with required fields (name, display, start_url, scope, icons).
SDK + Builder: @webspatial/core-sdk, @webspatial/react-sdk, @webspatial/builder, @webspatial/platform-visionos, and the Vite plugin.
Vite/Astro integration: astro.config.mjs include webSpatial() in vite.plugins.
HTML wiring: src/layouts/Layout.astro links the manifest, sets theme-color, and adds an Apple touch icon.

To start
`npm run dev`
in another terminal run the WebSpatial app shell pointing at deve server
`XR_DEV_SERVER=http://localhost:4321/ npm run run:avp`
