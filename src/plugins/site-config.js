import { reload } from '../assets/js/reload'
import { preEvent } from '../assets/js/preEvent'

export const SITE_CONFIG = {
  breakPoint: 767,
  isPc: false,
  isMobile: false,
  isTab: false,
  isTouch: false,
  isIpad: false,
  isNoTouch: false,
  fullDuration: 2.0,
  baseDuration: 1.0,
  shortDuration: 0.5,
  halfBaseDuration: 0.5,
  pageTransitionDuration: 800,
  firstAccess: false,
  isInitialized: false,

  // Device detection
  checkDevice: {
    get isAndroid() {
      return typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('android')
    },
    get isWindows() {
      return typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('windows')
    },
    get isSafari() {
      return typeof navigator !== 'undefined' && 
        navigator.userAgent.toLowerCase().includes('safari') && 
        !navigator.userAgent.toLowerCase().includes('chrome')
    },
    get isIpad() {
      return typeof navigator !== 'undefined' && 
        (/iPad|iPhone|iPod/.test(navigator.platform) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))
    }
  },

  async init() {
    if (typeof window === 'undefined') return this

    // Wait for window to be ready
    if (document.readyState === 'loading') {
      await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve))
    }

    try {
      // PC detection
      this.isPc = window.innerWidth >= this.breakPoint

      // Mobile detection
      this.isMobile = window.innerWidth <= this.breakPoint

      // Tablet detection
      this.isTab = window.innerWidth <= 1280 && window.innerWidth >= this.breakPoint

      // Touch event detection
      if (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement) {
        this.isTouch = true
      } else {
        this.isNoTouch = true
      }

      // iPad detection
      this.isIpad = this.checkDevice.isIpad

      // Handle non-touch device wheel events
      if (this.isNoTouch) {
        window.addEventListener('wheel', preEvent, { passive: false })
      }

      // Handle breakpoint changes
      const mediaQuery = window.matchMedia('(max-width: 767px)')
      mediaQuery.addEventListener('change', () => {
        // Update config before reloading
        this.isPc = window.innerWidth >= this.breakPoint
        this.isMobile = window.innerWidth <= this.breakPoint
        this.isTab = window.innerWidth <= 1280 && window.innerWidth >= this.breakPoint
        reload()
      })

      // First visit detection
      if (typeof sessionStorage !== 'undefined') {
        if (sessionStorage.getItem('visited')) {
          this.firstAccess = false
        } else {
          this.firstAccess = true
          sessionStorage.setItem('visited', '0')
        }
      }

      this.isInitialized = true
      return this
    } catch (error) {
      console.error('Failed to initialize SITE_CONFIG:', error)
      throw error
    }
  }
} 