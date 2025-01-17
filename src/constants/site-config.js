import { reactive } from 'vue'
import { reload } from "../assets/js/reload"
import { preEvent } from "../assets/js/preEvent"

// Initialize all values immediately
const initialValues = {
  // Device detection (with safe defaults)
  isTouch: false,
  isNoTouch: true,
  isPc: true,
  isMobile: false,
  isTab: false,
  isIpad: false,
  isAndroid: false,
  isWindows: false,
  isSafari: false,

  // Site colors and styles
  siteColor: '#000000',
  allTextColor: '#000000',
  list01: [],
  url: '',

  // Animation configurations
  fullDuration: 1.2,
  baseDuration: 0.8,
  shortDuration: 0.4,
  baseEasing: 'power2.inOut',
  transformEasing: 'power4.inOut',
  colorAndOpacityEasing: 'power2.inOut',
  pageTransitionDuration: 800,

  // Site information
  baseTitle: 'Heather Hudson Art',
  baseDescription: 'Portfolio website showcasing the artwork of Heather Hudson',

  // Breakpoints
  breakPoint: 767,
  breakpoints: {
    mobile: 767,
    tablet: 1280
  },

  // State
  firstAccess: true,
  isInitialized: false,

  // Functions
  reload,
  preEvent,
}

// Create and export the reactive config object
export const SITE_CONFIG = reactive({
  ...initialValues,

  // Initialize the config
  async init() {
    try {
      // Update window-dependent values
      if (typeof window !== 'undefined') {
        // Device detection
        this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        this.isNoTouch = !('ontouchstart' in window) && navigator.maxTouchPoints === 0
        this.isPc = window.innerWidth >= 767
        this.isMobile = window.innerWidth <= 767
        this.isTab = window.innerWidth <= 1280 && window.innerWidth >= 767
        this.isIpad = /iPad/i.test(navigator.userAgent)
        this.isAndroid = /android/i.test(navigator.userAgent)
        this.isWindows = /windows/i.test(navigator.userAgent)
        this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        this.url = window.location.origin

        // Set up event listeners
        if (this.isNoTouch) {
          window.addEventListener('wheel', this.preEvent, { passive: false })
        }

        // Set up breakpoint change listener
        const mediaQuery = window.matchMedia('(max-width: 767px)')
        mediaQuery.addEventListener('change', this.reload)

        // Check first access using sessionStorage
        if (sessionStorage.getItem('visited')) {
          this.firstAccess = false
        } else {
          this.firstAccess = true
          sessionStorage.setItem('visited', '0')
        }
      }

      // Mark as initialized
      this.isInitialized = true
      return true
    } catch (error) {
      console.error('Failed to initialize SITE_CONFIG:', error)
      return false
    }
  }
})

// Export individual configurations
export const BREAKPOINTS = {
  mobile: SITE_CONFIG.breakpoints.mobile,
  tablet: SITE_CONFIG.breakpoints.tablet
}

export const ANIMATION_CONFIG = {
  fullDuration: SITE_CONFIG.fullDuration,
  baseDuration: SITE_CONFIG.baseDuration,
  shortDuration: SITE_CONFIG.shortDuration,
  baseEasing: SITE_CONFIG.baseEasing,
  transformEasing: SITE_CONFIG.transformEasing,
  colorAndOpacityEasing: SITE_CONFIG.colorAndOpacityEasing,
  pageTransitionDuration: SITE_CONFIG.pageTransitionDuration
}

export const SITE_INFO = {
  baseTitle: SITE_CONFIG.baseTitle,
  baseDescription: SITE_CONFIG.baseDescription,
  url: SITE_CONFIG.url,
  allTextColor: SITE_CONFIG.allTextColor,
  siteColor: SITE_CONFIG.siteColor
}

// Export viewport update function
export function updateViewportValues() {
  if (typeof window === 'undefined') return
  
  const root = document.documentElement
  const width = window.innerWidth
  const height = window.innerHeight
  
  root.style.setProperty('--viewportWidth', `${width}px`)
  root.style.setProperty('--viewportHeight', `${height}px`)
  root.style.setProperty('--viewportSpHeight', `${height}px`)
} 