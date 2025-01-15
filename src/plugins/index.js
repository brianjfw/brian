import { SITECONFIG } from './config.client';
import { backfaceScroll } from './backface-fixed.client';
import { checkDevice } from './check-device.client';
import { viewport } from './viewport.client';
import { asscrollAndGsap } from './asscroll-and-gsap.client';
import { CONSTANTS } from './constants';
import { preDefaultEvent } from './prevent-default.client';

export function setupPlugins(app) {
  // Add global properties (similar to Vue.prototype in Vue 2)
  app.config.globalProperties.$SITECONFIG = SITECONFIG;
  app.config.globalProperties.$backfaceScroll = backfaceScroll;
  app.config.globalProperties.$checkDevice = checkDevice;
  app.config.globalProperties.$viewport = viewport;
  app.config.globalProperties.$CONSTANTS = CONSTANTS;
  app.config.globalProperties.$preDefaultEvent = preDefaultEvent;

  // Initialize GSAP and ASScroll
  if (typeof window !== 'undefined') {
    asscrollAndGsap(app);
  }

  // Add any other plugin initialization here
} 