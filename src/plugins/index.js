import { SITE_CONFIG } from './site-config'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from '../vendor/CustomEase'
import { Draggable } from '../vendor/Draggable'
import { InertiaPlugin } from '../vendor/InertiaPlugin'
import { BASEROTATE } from '../constants/rotations'
import { preDefaultEvent } from '../utils/events'

// Register GSAP plugins
gsap.registerPlugin(CustomEase, Draggable, InertiaPlugin, ScrollTrigger)
gsap.ticker.fps(60)

// Create EASING object
const EASING = {
  transform: CustomEase.create('transform', 'M0,0 C0.44,0.05 0.17,1 1,1'),
  transformReverse: CustomEase.create('transformReverse', 'M0,0 C0,0.852 0.87,0.542 1,1'),
  colorAndOpacity: CustomEase.create('colorAndOpacity', 'M0,0 C0.26,0.16 0.1,1 1,1'),
}

export async function setupPlugins() {
  try {
    // Initialize SITE_CONFIG
    await SITE_CONFIG.init()

    return {
      SITECONFIG: SITE_CONFIG,
      BASEROTATE,
      gsap,
      EASING,
      preDefaultEvent,
      ScrollTrigger,
      Draggable,
      InertiaPlugin
    }
  } catch (error) {
    console.error('Failed to setup plugins:', error)
    throw error
  }
} 