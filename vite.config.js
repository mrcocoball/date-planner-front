import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [svelte()],
  build: {
    target: 'esnext' //browsers can handle the latest ES features
  },
})
