import { defaultProjectData } from './data/siteData'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: true,

  // Ensure static generation works correctly
  modern: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Hisami Kurita Portfolio',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Folio of Hisami Kurita 19/Aug.1996 (based in Tokyo and Kawasaki) frontend developer at LIG inc',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Hisami Kurita Portfolio',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://hsmkrt1996.com/',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Hisami Kurita Portfolio',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Folio of Hisami Kurita 19/Aug.1996 (based in Tokyo and Kawasaki) frontend developer at LIG inc',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://hsmkrt1996.com/images/ogp.webp',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        hid: 'apple-touch-icon',
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
    ],
    bodyAttrs: {
      oncontextmenu: 'return false'
    },
    script: [
      {
        hid: 'GAsrc',
        src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GAID}`
      },
      {
        hid: 'GAcode',
        innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.GAID}');`
      }
    ],
    __dangerouslyDisableSanitizersByTagID: {
      'GAsrc': ['innerHTML'],
      'GAcode': ['innerHTML']
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/viewport.client.js',
    '~/plugins/backface-fixed.client.js',
    '~/plugins/config.client.js',
    '~/plugins/asscroll-and-gsap.client.js',
    '~/plugins/constants.js',
    '~/plugins/check-device.client.js',
    '~/plugins/store-init.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  loading: false,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-webfontloader',
    '@nuxtjs/style-resources',
    '@nuxt/image'
  ],

  styleResources: {
    scss: [
      '~/assets/scss/single.scss'
    ]
  },

  webfontloader: {
    google: {
      families: ['Six+Caps']
    }
  },

  env: {
    GAID: process.env.GAID || ''
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'three'
    ],
    extend(config) {
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader']
      })
    },
    postcss: {
      preset: {
        autoprefixer: {
          grid: true
        }
      }
    },
    loaders: {
      scss: {
        implementation: require('sass'),
        additionalData: `
          @use "sass:math";
          @use "~/assets/scss/single.scss" as *;
        `,
        sassOptions: {
          fiber: false,
          includePaths: ['./assets/scss']
        }
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 5,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `vendor.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
    hardSource: process.env.NODE_ENV === 'development',
    performance: {
      hints: 'warning',
      maxEntrypointSize: 1024000,
      maxAssetSize: 1024000
    },
  },

  generate: {
    fallback: true,
    crawler: true,
    concurrency: 1,
    cache: false, // Disable cache to ensure fresh generation
    routes() {
      // Explicitly define all routes including root
      const routes = [
        {
          route: '/',
          payload: null
        },
        {
          route: '/archive',
          payload: null
        },
        ...defaultProjectData.map(project => ({
          route: `/works/${project.id}`,
          payload: project
        }))
      ]
      console.log('Routes to be generated:', JSON.stringify(routes, null, 2))
      return routes
    },
    dir: 'dist', // Explicitly set output directory
    subFolders: false, // Generate HTML files in root instead of subfolders
    fallback: '200.html' // Ensure 200.html is generated as fallback
  },

  hooks: {
    generate: {
      before() {
        console.log('Starting static generation...')
      },
      routeCreated(route) {
        console.log('Route created:', route)
      },
      page(page) {
        console.log('Generating page:', page.route)
      },
      routeFailed(route, errors) {
        console.error('Route generation failed:', route, errors)
      },
      extendRoutes(routes) {
        console.log('Extended routes:', routes)
      },
      done(generator) {
        console.log('Static generation completed')
        console.log('Generated files:', generator.generatedRoutes)
        // List contents of dist directory
        const fs = require('fs')
        const path = require('path')
        const distPath = path.join(__dirname, 'dist')
        if (fs.existsSync(distPath)) {
          const files = fs.readdirSync(distPath)
          console.log('Contents of dist directory:', files)
          
          // Ensure index.html exists
          if (!files.includes('index.html')) {
            console.error('Warning: index.html not found in dist directory')
            try {
              // Try to copy from 200.html if it exists
              if (fs.existsSync(path.join(distPath, '200.html'))) {
                fs.copyFileSync(
                  path.join(distPath, '200.html'),
                  path.join(distPath, 'index.html')
                )
                console.log('Successfully copied 200.html to index.html')
              } else {
                // If 200.html doesn't exist, create a basic index.html
                const basicHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Heather Hudson Art</title>
  </head>
  <body>
    <div id="__nuxt"></div>
    <script>window.location.href = "/200.html" + window.location.hash;</script>
  </body>
</html>`
                fs.writeFileSync(path.join(distPath, 'index.html'), basicHtml)
                console.log('Created basic index.html with redirect')
              }
            } catch (err) {
              console.error('Failed to create index.html:', err)
            }
          }
        }
      }
    }
  }
}
