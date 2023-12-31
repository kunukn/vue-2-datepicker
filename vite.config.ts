import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2' // Vue 2.6.x

console.debug('process.env.NODE_ENV', process.env.NODE_ENV)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin(/* options */)],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/lib/main.js'),
      name: 'DatePicker',
      // the proper extensions will be added
      fileName: 'date-picker',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'date-picker.css'
          return assetInfo.name
        },
      },
    },
  },
})
