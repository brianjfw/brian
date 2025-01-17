import { SITE_CONFIG } from '../constants/site-config'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from '../vendor/CustomEase'
import { Draggable } from '../vendor/Draggable'
import { InertiaPlugin } from '../vendor/InertiaPlugin'
import { BASEROTATE } from '../constants/rotations'
import { preDefaultEvent } from '../utils/events'

// Create EASING object
const EASING = {
  transform: CustomEase.create('transform', 'M0,0 C0.44,0.05 0.17,1 1,1'),
  transformReverse: CustomEase.create('transformReverse', 'M0,0 C0,0.852 0.87,0.542 1,1'),
  colorAndOpacity: CustomEase.create('colorAndOpacity', 'M0,0 C0.26,0.16 0.1,1 1,1'),
}

// Track initialization state
let isInitialized = false
let isInitializing = false

export async function setupPlugins() {
  // Prevent double initialization
  if (isInitialized) {
    return {
      gsap,
      EASING,
      BASEROTATE,
      preDefaultEvent,
      ScrollTrigger,
      Draggable,
      InertiaPlugin
    }
  }

  if (isInitializing) {
    await new Promise(resolve => {
      const checkInterval = setInterval(() => {
        if (isInitialized) {
          clearInterval(checkInterval)
          resolve()
        }
      }, 100)
    })
    return {
      gsap,
      EASING,
      BASEROTATE,
      preDefaultEvent,
      ScrollTrigger,
      Draggable,
      InertiaPlugin
    }
  }

  try {
    isInitializing = true

    // Register GSAP plugins
    gsap.registerPlugin(CustomEase, Draggable, InertiaPlugin, ScrollTrigger)
    gsap.ticker.fps(60)

    // Wait for SITE_CONFIG to be ready
    if (!SITE_CONFIG.isInitialized) {
      await SITE_CONFIG.init()
    }

    isInitialized = true
    return {
      gsap,
      EASING,
      BASEROTATE,
      preDefaultEvent,
      ScrollTrigger,
      Draggable,
      InertiaPlugin
    }
  } catch (error) {
    console.error('Failed to setup plugins:', error)
    throw error
  } finally {
    isInitializing = false
  }
} 