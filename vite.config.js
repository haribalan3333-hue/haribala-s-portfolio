import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Plugin to ensure /videos/video-XX.mp4 and /videos/video-XX.mp4.mp4 both resolve cleanly
function videoPathFixPlugin() {
  return {
    name: 'video-path-fix',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/videos/video-') && req.url.endsWith('.mp4') && !req.url.endsWith('.mp4.mp4')) {
          req.url = req.url + '.mp4';
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/videos/video-') && req.url.endsWith('.mp4') && !req.url.endsWith('.mp4.mp4')) {
          req.url = req.url + '.mp4';
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), videoPathFixPlugin()],
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    open: false
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
