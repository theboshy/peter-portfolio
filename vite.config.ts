import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      "#components": path.resolve(__dirname, "./src/components"),
      "#hooks": path.resolve(__dirname, "./src/hooks"),
      "#commons": path.resolve(__dirname, "./src/commons"),
      "#styles": path.resolve(__dirname, "./src/styles"),
      "#utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
