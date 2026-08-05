import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

try {
  const srcAdmin = "C:/Users/afham/.gemini/antigravity-ide/brain/479e12a7-b750-4809-83aa-c926d2e28485/media__1785907602909.png";
  const srcMobile = "C:/Users/afham/.gemini/antigravity-ide/brain/479e12a7-b750-4809-83aa-c926d2e28485/media__1785907640604.jpg";
  const destAdmin = path.resolve(__dirname, "./src/assets/doctime-admin.png");
  const destMobile = path.resolve(__dirname, "./src/assets/doctime-mobile.jpg");
  
  if (fs.existsSync(srcAdmin)) {
    fs.copyFileSync(srcAdmin, destAdmin);
  }
  if (fs.existsSync(srcMobile)) {
    fs.copyFileSync(srcMobile, destMobile);
  }
} catch (err) {
  console.error("Failed to copy assets in vite.config.ts", err);
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://127.0.0.1:5000',
        ws: true,
      },
    },
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
