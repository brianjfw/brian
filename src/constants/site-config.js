import { reactive } from 'vue'
import { reload } from "../assets/js/reload"
import { preEvent } from "../assets/js/preEvent"

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

// Create and export the reactive config object
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
  
  // Site colors and styles
  siteColor: '#000000',
  allTextColor: '#000000',
  list01: [],
  url: '',
  isInitialized: false,

  // Initialize the config
  async init() {
    try {
      // Update device detection
      Object.entries(deviceUtils).forEach(([key, getter]) => {
        this[key] = getter;
      });

      // Set up reload and preEvent
      this.reload = reload;
      this.preEvent = preEvent;

      // Set default colors if not already set
      this.siteColor = this.siteColor || '#000000';
      this.allTextColor = this.allTextColor || '#000000';
      this.list01 = this.list01 || [];
      this.url = window.location.origin;

      // Mark as initialized
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize SITE_CONFIG:', error);
      return false;
    }
  }
});

// Export individual configurations for specific use cases
export const BREAKPOINTS = SITE_CONFIG.breakpoints;
export const ANIMATION_CONFIG = {
  fullDuration: SITE_CONFIG.fullDuration,
  baseDuration: SITE_CONFIG.baseDuration,
  shortDuration: SITE_CONFIG.shortDuration,
  baseEasing: SITE_CONFIG.baseEasing,
  transformEasing: SITE_CONFIG.transformEasing,
  colorAndOpacityEasing: SITE_CONFIG.colorAndOpacityEasing,
  pageTransitionDuration: SITE_CONFIG.pageTransitionDuration
};
export const SITE_INFO = {
  baseTitle: SITE_CONFIG.baseTitle,
  baseDescription: SITE_CONFIG.baseDescription,
  url: SITE_CONFIG.url,
  allTextColor: SITE_CONFIG.allTextColor,
  siteColor: { ...SITE_CONFIG.siteColor }
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