import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import webSpatial from "@webspatial/vite-plugin";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const xrEnv = env.XR_ENV || "web";
  const basePath = xrEnv === "avp" ? "/webspatial/avp" : "";

  return {
    plugins: [
      // Always use React now (no more Preact)
      react({
        jsxImportSource: xrEnv === "avp" ? "@webspatial/react-sdk" : "react",
      }),
      webSpatial(),
    ],
    base: basePath || "/",
    define: {
      "process.env.XR_ENV": JSON.stringify(xrEnv),
      __BASE_PATH__: JSON.stringify(basePath),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        // No more Preact aliases - pure React now
      },
    },
    server: {
      port: 4321,
      open: true,
    },
    preview: {
      port: 4321,
      open: true,
    },
    build: {
      outDir: "dist",
    },
  };
});
