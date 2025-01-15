export const SITECONFIG = {
  isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  isNoTouch: !('ontouchstart' in window) && navigator.maxTouchPoints === 0,
  fullDuration: 1.2,
  baseDuration: 0.8,
  shortDuration: 0.4,
  baseEasing: 'power2.inOut',
  transformEasing: 'power4.inOut',
  colorAndOpacityEasing: 'power2.inOut'
};
