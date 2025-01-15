import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
import glsl from 'vite-plugin-glsl';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const pathSrc = path.resolve(__dirname, './src');

  return {
    plugins: [
      vue(),
      glsl()
    ],
    resolve: {
      alias: {
        '@': pathSrc,
        '~': pathSrc,
        'assets': path.resolve(pathSrc, 'assets'),
        'components': path.resolve(pathSrc, 'components'),
        'pages': path.resolve(pathSrc, 'pages')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:math";
            @use "@/assets/scss/constants/animation" as *;
            @use "@/assets/scss/constants/break-points" as *;
            @use "@/assets/scss/constants/color" as *;
            @use "@/assets/scss/constants/font" as *;
            @use "@/assets/scss/functions/function" as *;
            @use "@/assets/scss/functions/mixins" as *;
          `,
          sassOptions: {
            includePaths: [
              path.resolve(pathSrc, 'assets/scss'),
              path.resolve(pathSrc, 'assets/scss/constants'),
              path.resolve(pathSrc, 'assets/scss/functions'),
              path.resolve(pathSrc, 'assets/scss/global'),
              path.resolve(pathSrc, 'assets/scss/reset'),
              path.resolve(pathSrc, 'assets/scss/utility')
            ]
          }
        }
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: '_nuxt',
      rollupOptions: {
        input: {
          main: './index.html'
        },
        output: {
          manualChunks: {
            'vendor': [
              'vue',
              'vue-router',
              'vuex',
              'gsap',
              'three',
              '@ashthornton/asscroll'
            ]
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      sourcemap: mode !== 'production'
    },
    optimizeDeps: {
      include: ['three', 'gsap', '@ashthornton/asscroll']
    },
    define: {
      'process.env': env
    }
  };
}); 