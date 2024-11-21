import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
    },
    host: true,
    origin: 'http://localhost:3000',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
