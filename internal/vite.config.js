import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'same-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-Robots-Tag': 'noindex, nofollow',
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { sourcemap: false },
  server: {
    port: 5175,
    strictPort: true,
    headers: securityHeaders,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: false,
      },
    },
  },
  preview: {
    port: 4175,
    headers: securityHeaders,
  },
});
