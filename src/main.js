import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupPlugins } from './plugins'
import { setupASScroll, initASScroll } from './plugins/asscroll'
import { useEventBus } from './plugins/eventBus'
import { SITE_CONFIG } from './constants/site-config'

// Create a loading screen
const loadingScreen = document.createElement('div')
loadingScreen.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`
loadingScreen.innerHTML = '<h1>Loading...</h1>'
document.body.appendChild(loadingScreen)

// Phase 1: Initialize core dependencies
async function initializeDependencies() {
  try {
    // Wait for DOM
    if (document.readyState === 'loading') {
      await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve))
    }

    // Initialize SITE_CONFIG first
    await SITE_CONFIG.init()
    if (!SITE_CONFIG.isInitialized) {
      throw new Error('Failed to initialize SITE_CONFIG')
    }

    // Initialize plugins
    const plugins = await setupPlugins()
    if (!plugins) {
      throw new Error('Failed to initialize plugins')
    }

    // Initialize store
    await store.dispatch('initializeData')
    if (!store.getters.isInitialized) {
      throw new Error('Failed to initialize store')
    }

    return { plugins }
  } catch (error) {
    console.error('Failed to initialize dependencies:', error)
    throw error
  }
}

// Phase 2: Create and mount app
async function mountApplication(dependencies) {
  try {
    const { plugins } = dependencies
    
    // Create app
    const app = createApp(App)

    // Add SITE_CONFIG as global property
    app.config.globalProperties.$SITECONFIG = SITE_CONFIG

    // Set up event bus
    const eventBus = useEventBus()
    app.config.globalProperties.$eventBus = eventBus

    // Add plugin global properties
    Object.entries(plugins).forEach(([key, value]) => {
      app.config.globalProperties[`$${key}`] = value
    })

    // Use plugins
    app.use(store)
    app.use(router)
    app.use(setupASScroll)

    // Mount app
    const vm = app.mount('#app')

    // Initialize ASScroll
    try {
      const asscroll = await initASScroll()
      if (asscroll) {
        app.config.globalProperties.$asscroll = asscroll
        eventBus.emit('asscroll:ready', asscroll)
      }
    } catch (error) {
      console.warn('ASScroll initialization failed:', error)
    }

    // Remove loading screen
    document.body.removeChild(loadingScreen)

    return vm
  } catch (error) {
    console.error('Failed to mount application:', error)
    throw error
  }
}

// Start initialization
initializeDependencies()
  .then(mountApplication)
  .catch(error => {
    console.error('Application failed to start:', error)
    loadingScreen.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h1>Failed to initialize application</h1>
        <p>Please refresh the page. If the problem persists, contact support.</p>
        <pre style="text-align: left; margin-top: 20px; max-width: 800px; overflow: auto;">${error.stack}</pre>
      </div>
    `
  }) 