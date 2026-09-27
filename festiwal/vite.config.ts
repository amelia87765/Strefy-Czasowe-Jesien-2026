import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.GITHUB_PAGES === 'true'
    ? '/Strefy-Czasowe-Jesien-2026/'
    : '/strefyczasowe/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5174,
  },
  preview: {
    port: 4174,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    target: 'es2022',
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        artysci: fileURLToPath(new URL('./artysci/index.html', import.meta.url)),
        'o-festiwalu': fileURLToPath(new URL('./o-festiwalu/index.html', import.meta.url)),
        sklep: fileURLToPath(new URL('./sklep/index.html', import.meta.url)),
        wolontariusze: fileURLToPath(new URL('./wolontariusze/index.html', import.meta.url)),
        faq: fileURLToPath(new URL('./faq/index.html', import.meta.url)),
      },
    },
  },
})
