import { ref, reactive } from 'vue'
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

// Create the initial config object
const initialConfig = reactive({
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
  isInitialized: false,

  // Add the init method
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

    // Set up event listeners
    if (this.isNoTouch) {
      window.addEventListener('wheel', preEvent, { passive: false });
    }

    // Set up breakpoint change listener
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    mediaQuery.addEventListener('change', reload);

    // Check first access using sessionStorage
    if (sessionStorage.getItem('visited')) {
      this.firstAccess = false;
    } else {
      this.firstAccess = true;
      sessionStorage.setItem('visited', '0');
    }

    this.isInitialized = true;
    return this;
  }
});

// Create a ref for the reactive config
const SITE_CONFIG_REF = ref(initialConfig);

// Export the ref
export const SITE_CONFIG = SITE_CONFIG_REF;

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