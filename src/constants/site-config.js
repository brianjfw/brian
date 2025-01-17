import { ref } from 'vue'

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

// Create the initial config object
const initialConfig = {
  // Device detection (with default values)
  isTouch: false,
  isNoTouch: true,
  isPc: true,
  isMobile: false,
  isTab: false,
  isIpad: false,
  isAndroid: false,
  isWindows: false,
  isSafari: false,

  // Animation configurations
  fullDuration: 1.2,
  baseDuration: 0.8,
  shortDuration: 0.4,
  baseEasing: 'power2.inOut',
  transformEasing: 'power4.inOut',
  colorAndOpacityEasing: 'power2.inOut',
  pageTransitionDuration: 800,

  // Site information and styling
  baseTitle: 'Heather Hudson Art',
  baseDescription: 'Portfolio website showcasing the artwork of Heather Hudson',
  url: typeof window !== 'undefined' ? window.location.origin : '',
  allTextColor: '#333333',
  siteColor: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#666666'
  },

  // Content lists
  list01: [],
  list02: [],
  list03: [],

  // Breakpoints
  breakPoint: 767,
  breakpoints: {
    mobile: 767,
    tablet: 1280
  },
  
  // State
  firstAccess: true,
  isInitialized: false
};

// Create a ref for SITE_CONFIG
export const SITE_CONFIG = ref(initialConfig);

// Add the init method
SITE_CONFIG.value.init = async function() {
  if (typeof window === 'undefined') return this;
  
  // Wait for window to be ready
  if (document.readyState === 'loading') {
    await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
  }

  // Update device detection properties
  this.isTouch = deviceUtils.isTouch;
  this.isNoTouch = deviceUtils.isNoTouch;
  this.isPc = deviceUtils.isPc;
  this.isMobile = deviceUtils.isMobile;
  this.isTab = deviceUtils.isTab;
  this.isIpad = deviceUtils.isIpad;
  this.isAndroid = deviceUtils.isAndroid;
  this.isWindows = deviceUtils.isWindows;
  this.isSafari = deviceUtils.isSafari;

  // Update URL if needed
  this.url = window.location.origin;

  this.isInitialized = true;
  return this;
};

// Export individual configurations for specific use cases
export const BREAKPOINTS = initialConfig.breakpoints;
export const ANIMATION_CONFIG = {
  fullDuration: initialConfig.fullDuration,
  baseDuration: initialConfig.baseDuration,
  shortDuration: initialConfig.shortDuration,
  baseEasing: initialConfig.baseEasing,
  transformEasing: initialConfig.transformEasing,
  colorAndOpacityEasing: initialConfig.colorAndOpacityEasing,
  pageTransitionDuration: initialConfig.pageTransitionDuration
};
export const SITE_INFO = {
  baseTitle: initialConfig.baseTitle,
  baseDescription: initialConfig.baseDescription,
  url: initialConfig.url,
  allTextColor: initialConfig.allTextColor,
  siteColor: { ...initialConfig.siteColor }
};

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