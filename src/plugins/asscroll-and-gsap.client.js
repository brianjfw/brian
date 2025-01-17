import ASScroll from '@ashthornton/asscroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from '../vendor/CustomEase'
import { Draggable } from '../vendor/Draggable'
import { InertiaPlugin } from '../vendor/InertiaPlugin'

gsap.registerPlugin(CustomEase, Draggable, InertiaPlugin, ScrollTrigger);
gsap.ticker.fps(60);

let asscrollInstance = null;

function initASScroll() {
  return new Promise((resolve) => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initialize);
    } else {
      initialize();
    }

    function initialize() {
      const asscrollContainerEl = document.querySelector('.asscroll-container');
      const asscrollScrollEl = document.querySelector('.asscroll');

      if (!asscrollContainerEl || !asscrollScrollEl) {
        console.warn('ASScroll elements not found, retrying in 100ms');
        setTimeout(initialize, 100);
        return;
      }

      const ua = navigator.userAgent.toLowerCase();
      const ios = ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod");
      const pinType = ios ? 'fixed' : 'transform';

      asscrollInstance = new ASScroll({
        containerElement: asscrollContainerEl,
        touchScrollType: 'scrollTop',
        scrollElements: asscrollScrollEl,
        ease: 0.09,
        customScrollbar: false,
      });

      // Set up ScrollTrigger integration
      ScrollTrigger.defaults({
        scroller: asscrollInstance.containerElement
      });

      ScrollTrigger.scrollerProxy(asscrollInstance.containerElement, {
        scrollTop(value) {
          if (arguments.length) {
            asscrollInstance.currentPos = value;
            return;
          }
          return asscrollInstance.currentPos;
        },
        getBoundingClientRect() {
          return { 
            top: 0, 
            left: 0, 
            width: window.innerWidth, 
            height: window.innerHeight 
          };
        },
      });

      ScrollTrigger.addEventListener("refresh", () => {
        if (asscrollInstance) {
          asscrollInstance.resize();
        }
      });

      resolve(asscrollInstance);
    }
  });
}

const EASING = {
  transform: CustomEase.create('transform', 'M0,0 C0.44,0.05 0.17,1 1,1'),
  transformReverse: CustomEase.create('transformReverse', 'M0,0 C0,0.852 0.87,0.542 1,1'),
  colorAndOpacity: CustomEase.create('colorAndOpacity', 'M0,0 C0.26,0.16 0.1,1 1,1 '),
};

const fixSection = (trigger, device, height) => {
  return gsap.to(trigger, {
    ease: 'none',
    scrollTrigger: {
      pin: true,
      pinType: device ? 'fixed' : 'transform',
      trigger,
      start: 'start end',
      end: () => `+=${height - window.innerHeight}px`,
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
};

export default async (context, inject) => {
  const asscroll = await initASScroll();
  
  inject('asscroll', asscroll);
  inject('gsap', gsap);
  inject('ScrollTrigger', ScrollTrigger);
  inject('Draggable', Draggable);
  inject('EASING', EASING);
  inject('fixSection', fixSection);
  
  // Emit global event when ASScroll is ready
  if (context.app && context.app.config && context.app.config.globalProperties) {
    context.app.config.globalProperties.eventBus.emit('asscroll:ready', asscroll);
  }
}
