import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
      port: 3000, // Port
      proxy: {
        '/backend': {
          target: 'https://ihsan.posindonesia.co.id',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/backend/, '/backend'),
        },
      },
    },
    define: {
      'process.env': {},
    },
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});
