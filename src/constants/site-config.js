export const SITE_CONFIG = {
  // Device detection
  isTouch: typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
  isNoTouch: typeof window !== 'undefined' && !('ontouchstart' in window) && navigator.maxTouchPoints === 0,
  isPc: typeof window !== 'undefined' && window.innerWidth >= 767,
  isMobile: typeof window !== 'undefined' && window.innerWidth <= 767,
  isTab: typeof window !== 'undefined' && window.innerWidth <= 1280 && window.innerWidth >= 767,
  isIpad: typeof window !== 'undefined' && /iPad/i.test(navigator.userAgent),
  
  // Animation durations
  fullDuration: 1.2,
  baseDuration: 0.8,
  shortDuration: 0.4,
  
  // Animation easing
  baseEasing: 'power2.inOut',
  transformEasing: 'power4.inOut',
  colorAndOpacityEasing: 'power2.inOut',
  
  // Site info
  baseTitle: 'Heather Hudson Art',
  baseDescription: 'Portfolio website showcasing the artwork of Heather Hudson',
  
  // State
  firstAccess: true, // This will be managed by the store
  
  // Breakpoints
  breakPoint: 767,
  
  // Page transition
  pageTransitionDuration: 800
} 