import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8857a19e = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _566096e6 = () => interopDefault(import('../pages/archive.vue' /* webpackChunkName: "pages/archive" */))
const _48e7ec14 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _1eae7561 = () => interopDefault(import('../pages/works/_slug.vue' /* webpackChunkName: "pages/works/_slug" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _8857a19e,
    name: "about"
  }, {
    path: "/archive",
    component: _566096e6,
    name: "archive"
  }, {
    path: "/",
    component: _48e7ec14,
    name: "index"
  }, {
    path: "/works/:slug?",
    component: _1eae7561,
    name: "works-slug"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
