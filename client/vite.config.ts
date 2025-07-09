import { defineConfig, loadEnv } from 'vite';
// import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(">>> ENV:", process.env.VITE_API_URL);

  return {
    plugins: [react()],
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
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
