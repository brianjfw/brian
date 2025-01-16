import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import eventBus from './plugins/eventBus'
import { BASEROTATE } from './constants/rotations'
import { gsap, EASING } from './plugins/gsap'
import ASScroll from '@ashthornton/asscroll'
import { SITE_CONFIG } from './constants/site-config'
import { preDefaultEvent } from './utils/events'

const app = createApp(App)

// Add global properties
app.config.globalProperties.$BASEROTATE = BASEROTATE
app.config.globalProperties.$gsap = gsap
app.config.globalProperties.$EASING = EASING
app.config.globalProperties.$ASScroll = ASScroll
app.config.globalProperties.$SITECONFIG = SITE_CONFIG
app.config.globalProperties.$preDefaultEvent = preDefaultEvent

app.use(router)
app.use(store)
app.use(eventBus)

app.mount('#app') 