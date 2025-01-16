import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import glsl from 'vite-plugin-glsl'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    glsl()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/constants/break-points.scss" as *;
          @use "@/assets/scss/constants/color.scss" as *;
          @use "@/assets/scss/constants/font.scss" as *;
          @use "@/assets/scss/functions/mixins.scss" as *;
        `
      }
    }
  },
  build: {
    rollupOptions: {
      external: ['three']
    }
  }
}) 