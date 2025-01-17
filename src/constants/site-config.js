import { reactive } from 'vue'

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

// Content lists with default empty arrays
const contentLists = {
  list01: [],
  list02: [],
  list03: []
};

// Breakpoints
const breakpoints = {
  mobile: 767,
  tablet: 1280
};

// Create a reactive SITE_CONFIG object
export const SITE_CONFIG = reactive({
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

  // Static configurations
  ...animationConfig,
  ...siteInfo,
  ...contentLists,
  breakPoint: breakpoints.mobile,
  
  // State
  firstAccess: true,
  isInitialized: false,

  // Initialize method
  async init() {
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
  }
});

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