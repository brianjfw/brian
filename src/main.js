import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupPlugins } from './plugins'
import { setupASScroll, getASScroll } from './plugins/asscroll'

async function initializeApp() {
  const app = createApp(App)
  
  // Set up plugins first
  const plugins = await setupPlugins()
  app.config.globalProperties.$SITECONFIG = plugins.SITECONFIG
  
  // Initialize store and wait for data
  app.use(store)
  await store.dispatch('initializeData')
  
  // Set up router
  app.use(router)
  
  // Mount app
  const vm = app.mount('#app')
  
  // Initialize ASScroll after app is mounted
  const asscroll = await setupASScroll(app)
  if (asscroll) {
    app.config.globalProperties.$asscroll = asscroll
  }
  
  return vm
}

initializeApp().catch(error => {
  console.error('Failed to initialize app:', error)
}) 