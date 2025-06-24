import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg}"],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4444",
        changeOrigin: true,
      },
    },
    port: 3000,
  },
  build: {
    outDir: "build",
  },
});
