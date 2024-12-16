import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    cors: true,
  },
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      components: path.resolve("src/components"),
      assets: path.resolve("src/assets"),
      pages: path.resolve("src/pages"),
      services: path.resolve("src/services"),
    },
  },
});
