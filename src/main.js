import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupPlugins } from './plugins'
import { setupASScroll, initASScroll } from './plugins/asscroll'
import { useEventBus } from './plugins/eventBus'

async function waitForDOMContentLoaded() {
  if (document.readyState === 'loading') {
    await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve))
  }
}

async function initializeApp() {
  try {
    // Wait for DOM to be ready
    await waitForDOMContentLoaded()
    
    // Create app instance
    const app = createApp(App)
    
    // Set up event bus first
    const eventBus = useEventBus()
    app.config.globalProperties.$eventBus = eventBus
    
    // Set up plugins and wait for them to initialize
    const plugins = await setupPlugins()
    if (!plugins || !plugins.SITECONFIG) {
      throw new Error('Failed to initialize plugins')
    }
    
    // Add global properties
    Object.entries(plugins).forEach(([key, value]) => {
      app.config.globalProperties[`$${key}`] = value
    })
    
    // Add backface scroll control
    app.config.globalProperties.$backfaceScroll = function(enable) {
      if (typeof window === 'undefined' || typeof document === 'undefined') return
      
      if (enable) {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        window.scrollTo(0, parseInt(document.body.style.top || '0') * -1)
      } else {
        const scrollY = window.scrollY
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.left = '0'
        document.body.style.right = '0'
      }
    }
    
    // Initialize store and wait for data
    app.use(store)
    await store.dispatch('initializeData')
    
    // Set up router
    app.use(router)
    
    // Mount app first
    const vm = app.mount('#app')
    
    // Wait a tick for DOM elements to be created
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Initialize ASScroll after DOM is ready
    try {
      // Set up ASScroll plugin
      app.use(setupASScroll)
      
      // Initialize ASScroll
      const asscroll = await initASScroll()
      if (asscroll) {
        app.config.globalProperties.$asscroll = asscroll
        eventBus.emit('asscroll:ready', asscroll)
      }
    } catch (error) {
      console.error('ASScroll initialization failed:', error)
      // Continue app execution even if ASScroll fails
    }
    
    return vm
  } catch (error) {
    console.error('App initialization failed:', error)
    throw error
  }
}

// Start initialization
initializeApp().catch(error => {
  console.error('Failed to initialize app:', error)
}) 