import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import eventBus from './plugins/eventBus'
import { BASEROTATE } from './constants/rotations'
import { gsap, EASING } from './plugins/gsap'
import { setupASScroll, getASScroll } from './plugins/asscroll'
import { SITE_CONFIG, setupPlugins } from './plugins'
import { preDefaultEvent } from './utils/events'

async function initializeApp() {
  const app = createApp(App)

  // Initialize plugins and config
  const config = setupPlugins(app)

  // Wait for store initialization
  await store.dispatch('initializeData')

  // Add global properties
  app.config.globalProperties.$BASEROTATE = BASEROTATE
  app.config.globalProperties.$gsap = gsap
  app.config.globalProperties.$EASING = EASING
  app.config.globalProperties.$SITECONFIG = config
  app.config.globalProperties.$preDefaultEvent = preDefaultEvent

  // Setup plugins
  app.use(router)
  app.use(store)
  app.use(eventBus)
  app.use(setupASScroll(app))

  // Mount app
  app.mount('#app')

  // Initialize ASScroll after mount
  const asscroll = getASScroll()
  if (asscroll) {
    app.config.globalProperties.$asscroll = asscroll
  }
}

// Initialize app
initializeApp().catch(error => {
  console.error('Failed to initialize app:', error)
}) 