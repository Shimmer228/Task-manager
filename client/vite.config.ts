import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default defineConfig({
  plugins: [react()],

  build: {
    outDir: '../server/client',
    emptyOutDir: true
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
