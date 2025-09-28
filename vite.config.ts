import { defineConfig, loadEnv } from "vite";
import preact from "@preact/preset-vite";
import webSpatial from "@webspatial/vite-plugin";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const xrEnv = env.XR_ENV || "web";
  const basePath = xrEnv === "avp" ? "/webspatial/avp" : "";
  const normalizedBase = basePath ? `${basePath}/` : "/";

  return {
    plugins: [preact(), webSpatial()],
    base: normalizedBase,
    define: {
      "process.env.XR_ENV": JSON.stringify(xrEnv),
      __BASE_PATH__: JSON.stringify(basePath),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      },
    },
    server: {
      port: 4321,
    },
  };
});
