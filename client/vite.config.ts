// client/vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // тепер білд піде в /app/client/dist
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
