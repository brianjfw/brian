import { reload } from '../assets/js/reload'
import { preEvent } from '../assets/js/preEvent'

// Site configuration
export const SITECONFIG = {
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
  isInitialized: false
}

// Device detection
export const checkDevice = {
  isAndroid: typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('android'),
  isWindows: typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('windows'),
  isSafari: typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('safari') && !navigator.userAgent.toLowerCase().includes('chrome'),
  isIpad: typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

// Initialize configuration
function initConfig() {
  if (typeof window === 'undefined') return

  // PC detection
  SITECONFIG.isPc = window.innerWidth >= SITECONFIG.breakPoint

  // Mobile detection
  SITECONFIG.isMobile = window.innerWidth <= SITECONFIG.breakPoint

  // Tablet detection
  SITECONFIG.isTab = window.innerWidth <= 1280 && window.innerWidth >= SITECONFIG.breakPoint

  // Touch event detection
  if (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement) {
    SITECONFIG.isTouch = true
  } else {
    SITECONFIG.isNoTouch = true
  }

  // iPad detection
  SITECONFIG.isIpad = checkDevice.isIpad

  // Handle non-touch device wheel events
  if (SITECONFIG.isNoTouch) {
    window.addEventListener('wheel', preEvent, { passive: false })
  }

  // Handle breakpoint changes
  const mediaQuery = window.matchMedia('(max-width: 767px)')
  mediaQuery.addEventListener('change', () => {
    // Update config before reloading
    SITECONFIG.isPc = window.innerWidth >= SITECONFIG.breakPoint
    SITECONFIG.isMobile = window.innerWidth <= SITECONFIG.breakPoint
    SITECONFIG.isTab = window.innerWidth <= 1280 && window.innerWidth >= SITECONFIG.breakPoint
    reload()
  })

  // First visit detection
  if (typeof sessionStorage !== 'undefined') {
    if (sessionStorage.getItem('visited')) {
      SITECONFIG.firstAccess = false
    } else {
      SITECONFIG.firstAccess = true
      sessionStorage.setItem('visited', '0')
    }
  }

  SITECONFIG.isInitialized = true
}

export function setupPlugins(app) {
  // Initialize config
  initConfig()

  // Add global properties
  app.config.globalProperties.$SITECONFIG = SITECONFIG
  app.config.globalProperties.$checkDevice = checkDevice

  // Add backface scroll control
  app.config.globalProperties.$backfaceScroll = function(enable) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    if (enable) {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      window.scrollTo(0, parseInt(document.body.style.top || '0') * -1)
    } else {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
    }
  }

  // Return initialized config
  return SITECONFIG
} 