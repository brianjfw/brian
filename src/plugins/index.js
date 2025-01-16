import { reload } from '../assets/js/reload'
import { preEvent } from '../assets/js/preEvent'

// Site configuration
const SITECONFIG = {
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
}

// Device detection
const checkDevice = {
  isAndroid: navigator.userAgent.toLowerCase().includes('android'),
  isWindows: navigator.userAgent.toLowerCase().includes('windows'),
  isSafari: navigator.userAgent.toLowerCase().includes('safari') && !navigator.userAgent.toLowerCase().includes('chrome')
}

// Initialize configuration
function initConfig() {
  // PC detection
  if (window.innerWidth >= SITECONFIG.breakPoint) {
    SITECONFIG.isPc = true
  }
  // Mobile detection
  if (window.innerWidth <= SITECONFIG.breakPoint) {
    SITECONFIG.isMobile = true
  }
  // Tablet detection
  if (window.innerWidth <= 1280 && window.innerWidth >= SITECONFIG.breakPoint) {
    SITECONFIG.isTab = true
  }

  // Touch event detection
  if ('ontouchstart' in document.documentElement) {
    SITECONFIG.isTouch = true
  } else {
    SITECONFIG.isNoTouch = true
  }

  // Handle non-touch device wheel events
  if (SITECONFIG.isNoTouch) {
    window.addEventListener('wheel', preEvent, { passive: false })
  }

  // Handle breakpoint changes
  const mediaQuery = window.matchMedia('(max-width: 767px)')
  mediaQuery.addEventListener('change', reload)

  // First visit detection
  if (sessionStorage.getItem('visited')) {
    SITECONFIG.firstAccess = false
  } else {
    SITECONFIG.firstAccess = true
    sessionStorage.setItem('visited', 0)
  }
}

export function setupPlugins(app) {
  // Initialize config
  initConfig()

  // Add global properties
  app.config.globalProperties.$SITECONFIG = SITECONFIG
  app.config.globalProperties.$checkDevice = checkDevice

  // Add backface scroll control
  app.config.globalProperties.$backfaceScroll = function(enable) {
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
} 