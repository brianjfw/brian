import { reactive } from 'vue'

// Utility function to safely get window-based values
function getWindowValue(key, defaultValue) {
  if (typeof window === 'undefined') return defaultValue
  return window[key] || defaultValue
}

// Create reactive SITE_CONFIG object with all required properties
export const SITE_CONFIG = reactive({
  // Device detection
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isTouch: false,
  isIpad: false,
  isNoTouch: true,
  isPc: true,
  
  // Breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    right: 1280,
    left: 0
  },

  // Animation durations
  fullDuration: 1.2,
  baseDuration: 0.8,
  shortDuration: 0.4,
  pageTransitionDuration: 0.6,

  // Easing functions
  baseEasing: 'power2.inOut',
  transformEasing: 'power2.out',
  colorAndOpacityEasing: 'power2.inOut',

  // Site information
  baseTitle: 'Heather Hudson Art',
  baseDescription: 'Portfolio of Heather Hudson',
  url: 'https://heatherhudsonart.com',
  allTextColor: '#333333',
  siteColor: '#ffffff',

  // Lists
  list01: [],
  list02: [],

  // State
  isInitialized: false,
  isInitializing: false,
  firstAccess: true,

  // Initialize method
  async init() {
    if (this.isInitialized || this.isInitializing) {
      return
    }

    this.isInitializing = true

    try {
      // Update device detection
      const ua = navigator.userAgent.toLowerCase()
      this.isMobile = /mobile|android|iphone|ipod|phone/.test(ua)
      this.isTablet = /ipad|tablet/.test(ua)
      this.isDesktop = !this.isMobile && !this.isTablet
      this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      this.isNoTouch = !this.isTouch
      this.isIpad = /ipad/.test(ua)
      this.isPc = window.innerWidth >= this.breakpoints.mobile

      // Set up window resize listener
      const handleResize = () => {
        const width = window.innerWidth
        this.isMobile = width <= this.breakpoints.mobile
        this.isTablet = width > this.breakpoints.mobile && width <= this.breakpoints.tablet
        this.isDesktop = width > this.breakpoints.tablet
        this.isPc = width >= this.breakpoints.mobile
      }

      window.addEventListener('resize', handleResize)
      handleResize() // Initial check

      // Check first access using sessionStorage
      if (sessionStorage.getItem('visited')) {
        this.firstAccess = false
      } else {
        this.firstAccess = true
        sessionStorage.setItem('visited', '0')
      }

      // Set URL
      this.url = window.location.origin

      // Mark as initialized
      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize SITE_CONFIG:', error)
      // Set safe defaults
      this.isMobile = false
      this.isTablet = false
      this.isDesktop = true
      this.isTouch = false
      this.isIpad = false
      this.isNoTouch = true
      this.isPc = true
      this.firstAccess = false
      this.isInitialized = true // Mark as initialized even if there's an error
    } finally {
      this.isInitializing = false
    }
  }
})

// Export breakpoint utilities
export const breakpoints = {
  mobile: SITE_CONFIG.breakpoints.mobile,
  tablet: SITE_CONFIG.breakpoints.tablet
}

// Export animation utilities
export const animation = {
  fullDuration: SITE_CONFIG.fullDuration,
  baseDuration: SITE_CONFIG.baseDuration,
  shortDuration: SITE_CONFIG.shortDuration,
  baseEasing: SITE_CONFIG.baseEasing,
  transformEasing: SITE_CONFIG.transformEasing,
  colorAndOpacityEasing: SITE_CONFIG.colorAndOpacityEasing,
  pageTransitionDuration: SITE_CONFIG.pageTransitionDuration
}

// Export site information
export const siteInfo = {
  baseTitle: SITE_CONFIG.baseTitle,
  baseDescription: SITE_CONFIG.baseDescription,
  url: SITE_CONFIG.url,
  allTextColor: SITE_CONFIG.allTextColor,
  siteColor: SITE_CONFIG.siteColor
} 