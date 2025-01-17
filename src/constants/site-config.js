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

// Site information and styling
const siteInfo = {
  baseTitle: 'Heather Hudson Art',
  baseDescription: 'Portfolio website showcasing the artwork of Heather Hudson',
  url: typeof window !== 'undefined' ? window.location.origin : '',
  allTextColor: '#333333',
  siteColor: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#666666'
  }
};

// Content lists
const contentLists = {
  list01: [],  // Will be populated by store
  list02: [],  // Will be populated by store
  list03: []   // Will be populated by store
};

// Breakpoints
const breakpoints = {
  mobile: 767,
  tablet: 1280
};

// Create the SITE_CONFIG object with getters and state
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
  ...contentLists,
  breakPoint: breakpoints.mobile,
  
  // State
  firstAccess: true,
  isInitialized: false,

  // Initialize method (for compatibility with existing code)
  async init() {
    if (typeof window === 'undefined') return this;
    
    // Wait for window to be ready
    if (document.readyState === 'loading') {
      await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
    }

    this.isInitialized = true;
    return this;
  }
};

// Export individual configurations for specific use cases
export const BREAKPOINTS = breakpoints;
export const ANIMATION_CONFIG = animationConfig;
export const SITE_INFO = siteInfo;

// Export a function to update viewport values
export function updateViewportValues() {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  root.style.setProperty('--viewportWidth', `${width}px`);
  root.style.setProperty('--viewportHeight', `${height}px`);
  root.style.setProperty('--viewportSpHeight', `${height}px`);
} 