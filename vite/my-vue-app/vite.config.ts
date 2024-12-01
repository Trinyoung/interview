import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from 'path'
import { fileURLToPath } from 'url'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // alias: {
    //   '@': path.resolve(__dirname, 'src'),
    //   '@compoents': path.resolve(__dirname, 'src/components'),
    //   '@utils': path.resolve(__dirname, 'src/utils')
    // }
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url))
    }
  },
})
