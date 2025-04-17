import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase from default 500kb to 1000kb
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React dependencies into their own chunk
          "react-vendor": ["react", "react-dom", "react/jsx-runtime"],

          // Split other dependencies if needed
          utils: [
            "./src/utils/disableRightClick.ts",
            "./src/utils/downloadURI.ts",
            "./src/utils/handleCopy.ts",
            "./src/utils/handleDownload.ts",
          ],

          // Group components by feature
          "background-components": [
            "./src/components/background/BackgroundDropdown.tsx",
            "./src/components/background/BackgroundEditor.tsx",
            "./src/components/background/BackgroundRenderer.tsx",
            "./src/components/background/FullBackground.tsx",
          ],

          "layout-components": [
            "./src/components/layout/LayoutDropdown.tsx",
            "./src/components/layout/LayoutSection.tsx",
            "./src/components/layout/LayoutSelector.tsx",
          ],

          "text-components": [
            "./src/components/text/TextDropdown.tsx",
            "./src/components/text/TextTypeSelector.tsx",
            "./src/components/text/TitleEditor.tsx",
          ],
        },
      },
    },
  },
});
