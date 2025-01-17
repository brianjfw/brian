// Utility function to safely check window properties
const checkWindow = (check) => {
  return typeof window !== 'undefined' && check();
};

// Device detection utilities
const deviceUtils = {
  get isTouch() {
    return checkWindow(() => 'ontouchstart' in window || navigator.maxTouchPoints > 0);
  },
  get isNoTouch() {
    return checkWindow(() => !('ontouchstart' in window) && navigator.maxTouchPoints === 0);
  },
  get isPc() {
    return checkWindow(() => window.innerWidth >= 767);
  },
  get isMobile() {
    return checkWindow(() => window.innerWidth <= 767);
  },
  get isTab() {
    return checkWindow(() => window.innerWidth <= 1280 && window.innerWidth >= 767);
  },
  get isIpad() {
    return checkWindow(() => /iPad/i.test(navigator.userAgent));
  },
  get isAndroid() {
    return checkWindow(() => /android/i.test(navigator.userAgent));
  },
  get isWindows() {
    return checkWindow(() => /windows/i.test(navigator.userAgent));
  },
  get isSafari() {
    return checkWindow(() => /^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }
};

// Animation configurations
const animationConfig = {
  fullDuration: 1.2,
  baseDuration: 0.8,
  shortDuration: 0.4,
  baseEasing: 'power2.inOut',
  transformEasing: 'power4.inOut',
  colorAndOpacityEasing: 'power2.inOut',
  pageTransitionDuration: 800
};

// Site information
const siteInfo = {
  baseTitle: 'Heather Hudson Art',
  baseDescription: 'Portfolio website showcasing the artwork of Heather Hudson'
};

// Breakpoints
const breakpoints = {
  mobile: 767,
  tablet: 1280
};

// Create the SITE_CONFIG object with getters
export const SITE_CONFIG = {
  // Device detection (computed on demand)
  get isTouch() { return deviceUtils.isTouch; },
  get isNoTouch() { return deviceUtils.isNoTouch; },
  get isPc() { return deviceUtils.isPc; },
  get isMobile() { return deviceUtils.isMobile; },
  get isTab() { return deviceUtils.isTab; },
  get isIpad() { return deviceUtils.isIpad; },
  get isAndroid() { return deviceUtils.isAndroid; },
  get isWindows() { return deviceUtils.isWindows; },
  get isSafari() { return deviceUtils.isSafari; },

  // Static configurations
  ...animationConfig,
  ...siteInfo,
  breakPoint: breakpoints.mobile,
  
  // State (managed by store)
  firstAccess: true
};

// Export individual configurations for specific use cases
export const BREAKPOINTS = breakpoints;
export const ANIMATION_CONFIG = animationConfig;
export const SITE_INFO = siteInfo;

// Export a function to update viewport-specific values
export function updateViewportValues() {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  root.style.setProperty('--viewportWidth', `${width}px`);
  root.style.setProperty('--viewportHeight', `${height}px`);
  root.style.setProperty('--viewportSpHeight', `${height}px`);
} 