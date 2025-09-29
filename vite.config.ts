import { defineConfig, loadEnv } from "vite";
import preact from "@preact/preset-vite";
import react from "@vitejs/plugin-react";
import webSpatial from "@webspatial/vite-plugin";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const xrEnv = env.XR_ENV || "web";
  const basePath = xrEnv === "avp" ? "/webspatial/avp" : "";

  return {
    plugins: [
      // Use React for AVP mode, Preact for web mode
      xrEnv === "avp"
        ? react({ jsxImportSource: "@webspatial/react-sdk" })
        : preact(),
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
        // Only alias React to Preact in web mode
        ...(xrEnv !== "avp" && {
          react: "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
        }),
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
