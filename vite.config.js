import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  return defineConfig({
    base: '/',
    plugins: [svelte()],
    build: {
      target: 'esnext' //browsers can handle the latest ES features
    },
  })

}
