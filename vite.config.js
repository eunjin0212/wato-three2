import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";
import path from "path";

const __dirname = path.resolve();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@/", replacement: path.resolve(__dirname, "./src/") },
      { find: "@/components", replacement: path.resolve(__dirname, "./src/components") },
      { find: "@/ui", replacement: path.resolve(__dirname, "./src/components/ui") },
      { find: "@/images", replacement: path.resolve(__dirname, "./src/images") },
      { find: "@/assets", replacement: path.resolve(__dirname, "./src/assets") },
      { find: "@/api", replacement: path.resolve(__dirname, "./src/api") },
    ],
  },
})
