import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupPlugins } from './plugins'
import { setupASScroll, initASScroll } from './plugins/asscroll'
import { useEventBus } from './plugins/eventBus'
import { SITE_CONFIG } from './constants/site-config'

async function waitForDOMContentLoaded() {
  if (document.readyState === 'loading') {
    await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve))
  }
}

async function initializeApp() {
  try {
    // Wait for DOM to be ready
    await waitForDOMContentLoaded()
    
    // Initialize SITE_CONFIG first and wait for it
    await SITE_CONFIG.value.init()
    if (!SITE_CONFIG.value.isInitialized) {
      throw new Error('Failed to initialize SITE_CONFIG')
    }
    
    // Create app instance
    const app = createApp(App)
    
    // Set up event bus
    const eventBus = useEventBus()
    app.config.globalProperties.$eventBus = eventBus
    
    // Add SITE_CONFIG as global property - use the reactive object directly
    app.config.globalProperties.$SITECONFIG = SITE_CONFIG.value
    
    // Add a global mixin to ensure SITE_CONFIG is available in all components
    app.mixin({
      computed: {
        $SITECONFIG() {
          return SITE_CONFIG.value
        }
      }
    })
    
    // Set up plugins and wait for them to initialize
    const plugins = await setupPlugins()
    if (!plugins) {
      throw new Error('Failed to initialize plugins')
    }
    
    // Add plugin global properties
    Object.entries(plugins).forEach(([key, value]) => {
      app.config.globalProperties[`$${key}`] = value
    })
    
    // Initialize store and wait for data
    app.use(store)
    await store.dispatch('initializeData')
    
    // Ensure store is initialized
    if (!store.getters.isInitialized) {
      throw new Error('Failed to initialize store data')
    }
    
    // Set up router
    app.use(router)
    
    // Set up ASScroll plugin before mounting
    app.use(setupASScroll)
    
    // Mount app
    const vm = app.mount('#app')
    
    // Wait for app to signal it's ready
    await new Promise(resolve => {
      if (vm.isAppReady) {
        resolve()
      } else {
        eventBus.once('app:ready', resolve)
      }
    })
    
    // Initialize ASScroll after app is ready
    try {
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

// Start initialization and handle errors
initializeApp().catch(error => {
  console.error('Failed to initialize app:', error)
  // Add error handling UI here if needed
  document.body.innerHTML = `
    <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
      <h1>Failed to initialize application</h1>
      <p>Please refresh the page. If the problem persists, contact support.</p>
      <pre style="text-align: left; margin-top: 20px; max-width: 800px; overflow: auto;">${error.stack}</pre>
    </div>
  `
}) 