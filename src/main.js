import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { SITE_CONFIG } from './constants/site-config'
import { setupPlugins } from './plugins'

// Create a loading screen
const loadingScreen = document.createElement('div')
loadingScreen.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`
loadingScreen.innerHTML = 'Loading...'
document.body.appendChild(loadingScreen)

// Phase 1: Initialize core dependencies
async function initializeDependencies() {
  try {
    // Wait for DOM to be ready
    if (document.readyState !== 'complete') {
      await new Promise(resolve => {
        window.addEventListener('load', resolve)
      })
    }

    // Initialize SITE_CONFIG first and wait for it
    if (!SITE_CONFIG.isInitialized) {
      await SITE_CONFIG.init()
      // Double check initialization
      if (!SITE_CONFIG.isInitialized) {
        throw new Error('SITE_CONFIG failed to initialize')
      }
    }

    // Verify required SITE_CONFIG properties
    const requiredProps = [
      'url',
      'allTextColor',
      'siteColor',
      'list01',
      'isIpad'
    ]
    
    const missingProps = requiredProps.filter(prop => 
      typeof SITE_CONFIG[prop] === 'undefined'
    )

    if (missingProps.length > 0) {
      throw new Error(`Missing required SITE_CONFIG properties: ${missingProps.join(', ')}`)
    }

    // Initialize plugins after SITE_CONFIG
    await setupPlugins()

    // Initialize store data
    await store.dispatch('initializeData')

    return true
  } catch (error) {
    console.error('Failed to initialize dependencies:', error)
    loadingScreen.innerHTML = `Failed to initialize application: ${error.message}. Please refresh the page.`
    return false
  }
}

// Phase 2: Create and mount Vue app
async function mountApplication() {
  const initialized = await initializeDependencies()
  
  if (!initialized) {
    return
  }

  try {
    const app = createApp(App)
    
    // Add SITE_CONFIG as a global property
    app.config.globalProperties.$SITECONFIG = SITE_CONFIG
    
    // Use plugins
    app.use(store)
    app.use(router)
    
    // Mount the app
    await app.mount('#app')
    
    // Remove loading screen after successful mount
    document.body.removeChild(loadingScreen)
  } catch (error) {
    console.error('Failed to mount application:', error)
    loadingScreen.innerHTML = 'Failed to start application. Please refresh the page.'
  }
}

// Start the initialization process
mountApplication() 