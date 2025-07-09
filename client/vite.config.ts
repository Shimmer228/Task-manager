import { defineConfig, loadEnv } from 'vite';
import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default defineConfig(({ mode }: { mode: string }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env': env,
    },
  };
});

//
// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';
// import { dirname, resolve } from 'path';
// import { fileURLToPath } from 'url';
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
//
// export default defineConfig({
// const env = loadEnv(mode, process.cwd(), '');
//   plugins: [react()],
//   build: {
//     outDir: "dist",
//     emptyOutDir: true,
//   },
//   resolve: {
//     alias: {
//       "@": resolve(__dirname, "./src"),
//     },
//   },
// });
