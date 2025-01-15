import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_2724e65c from 'nuxt_plugin_plugin_2724e65c' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_image_d114403a from 'nuxt_plugin_image_d114403a' // Source: ./image.js (mode: 'all')
import nuxt_plugin_webfontloader_a89a7e30 from 'nuxt_plugin_webfontloader_a89a7e30' // Source: ./webfontloader.js (mode: 'client')
import nuxt_plugin_viewportclient_dea6660c from 'nuxt_plugin_viewportclient_dea6660c' // Source: ../plugins/viewport.client.js (mode: 'client')
import nuxt_plugin_backfacefixedclient_564f49bf from 'nuxt_plugin_backfacefixedclient_564f49bf' // Source: ../plugins/backface-fixed.client.js (mode: 'client')
import nuxt_plugin_configclient_ffa26bd4 from 'nuxt_plugin_configclient_ffa26bd4' // Source: ../plugins/config.client.js (mode: 'client')
import nuxt_plugin_asscrollandgsapclient_575b22c7 from 'nuxt_plugin_asscrollandgsapclient_575b22c7' // Source: ../plugins/asscroll-and-gsap.client.js (mode: 'client')
import nuxt_plugin_constants_5d260cbe from 'nuxt_plugin_constants_5d260cbe' // Source: ../plugins/constants.js (mode: 'all')
import nuxt_plugin_checkdeviceclient_3f9f0462 from 'nuxt_plugin_checkdeviceclient_3f9f0462' // Source: ../plugins/check-device.client.js (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root ? this.$root.$options.$nuxt : null
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const store = createStore(ssrContext)
  const router = await createRouter(ssrContext, config, { store })

  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Hisami Kurita Portfolio","htmlAttrs":{"lang":"en"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"format-detection","content":"telephone=no"},{"hid":"description","name":"description","content":"Folio of Hisami Kurita 19\u002FAug.1996 (based in Tokyo and Kawasaki) frontend developer at LIG inc"},{"hid":"og:site_name","property":"og:site_name","content":"Hisami Kurita Portfolio"},{"hid":"og:type","property":"og:type","content":"website"},{"hid":"og:url","property":"og:url","content":"https:\u002F\u002Fhsmkrt1996.com\u002F"},{"hid":"og:title","property":"og:title","content":"Hisami Kurita Portfolio"},{"hid":"og:description","property":"og:description","content":"Folio of Hisami Kurita 19\u002FAug.1996 (based in Tokyo and Kawasaki) frontend developer at LIG inc"},{"hid":"og:image","property":"og:image","content":"https:\u002F\u002Fhsmkrt1996.com\u002Fimages\u002Fogp.webp"},{"name":"twitter:card","content":"summary_large_image"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"hid":"apple-touch-icon","rel":"apple-touch-icon","sizes":"180x180","href":"\u002Fapple-touch-icon.png"}],"bodyAttrs":{"oncontextmenu":"return false"},"script":[{"hid":"GAsrc","src":"https:\u002F\u002Fwww.googletagmanager.com\u002Fgtag\u002Fjs?id=undefined"},{"hid":"GAcode","innerHTML":"window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'undefined');"}],"__dangerouslyDisableSanitizersByTagID":{"GAsrc":["innerHTML"],"GAcode":["innerHTML"]},"style":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      errPageReady: false,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        nuxt.errPageReady = false
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    beforeSerializeFns: ssrContext ? ssrContext.beforeSerializeFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_2724e65c === 'function') {
    await nuxt_plugin_plugin_2724e65c(app.context, inject)
  }

  if (typeof nuxt_plugin_image_d114403a === 'function') {
    await nuxt_plugin_image_d114403a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_webfontloader_a89a7e30 === 'function') {
    await nuxt_plugin_webfontloader_a89a7e30(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_viewportclient_dea6660c === 'function') {
    await nuxt_plugin_viewportclient_dea6660c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_backfacefixedclient_564f49bf === 'function') {
    await nuxt_plugin_backfacefixedclient_564f49bf(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_configclient_ffa26bd4 === 'function') {
    await nuxt_plugin_configclient_ffa26bd4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_asscrollandgsapclient_575b22c7 === 'function') {
    await nuxt_plugin_asscrollandgsapclient_575b22c7(app.context, inject)
  }

  if (typeof nuxt_plugin_constants_5d260cbe === 'function') {
    await nuxt_plugin_constants_5d260cbe(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_checkdeviceclient_3f9f0462 === 'function') {
    await nuxt_plugin_checkdeviceclient_3f9f0462(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
