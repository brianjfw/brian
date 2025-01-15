import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Draggable from 'gsap/Draggable'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { TextPlugin } from 'gsap/TextPlugin'
import { EasePack } from 'gsap/EasePack'

// Register all plugins
gsap.registerPlugin(ScrollTrigger, Draggable, CSSPlugin, TextPlugin, EasePack)

export const asscrollAndGsap = (app) => {
  // ASScroll initialization is now handled in App.vue
  app.config.globalProperties.$gsap = gsap
  app.config.globalProperties.$ScrollTrigger = ScrollTrigger
  app.config.globalProperties.$Draggable = Draggable
  app.config.globalProperties.$TextPlugin = TextPlugin
  app.config.globalProperties.$EasePack = EasePack

  return { gsap, ScrollTrigger, Draggable, TextPlugin, EasePack }
}
