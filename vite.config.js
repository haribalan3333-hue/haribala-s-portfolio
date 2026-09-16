import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    open: true
  },
  preview: {
    port: 3000,
    strictPort: false,
    host: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false
  }
});
