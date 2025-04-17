import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      // Configure svgr to properly handle SVG imports with ?react query
      svgrOptions: {
        exportType: "named",
        ref: true,
      },
      include: "**/*.svg",
    }),
  ],
});
