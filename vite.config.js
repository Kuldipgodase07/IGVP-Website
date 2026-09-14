import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        insights: resolve(__dirname, 'insights.html'),
        careers: resolve(__dirname, 'careers.html'),
      },
    },
  },
});
