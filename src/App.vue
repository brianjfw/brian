<template>
  <div class="app" :class="{ 'is-initialized': isInitialized }">
    <BaseHeader />
    <BaseMouse />
    <div asscroll-container>
      <div asscroll>
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import BaseHeader from './components/BaseHeader.vue';
import BaseMouse from './components/BaseMouse.vue';
import ASScroll from '@ashthornton/asscroll';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isInitialized = ref(false);

onMounted(async () => {
  const app = getCurrentInstance();
  
  // Wait a tick for DOM to be ready
  await new Promise(resolve => setTimeout(resolve, 0));
  
  const asscroll = new ASScroll({
    disableRaf: true,
    touchScrollType: 'transform',
    containerElement: document.querySelector('[asscroll-container]'),
    scrollElements: document.querySelector('[asscroll]')
  });

  try {
    await asscroll.enable();
    
    gsap.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        return arguments.length ? asscroll.currentPos = value : asscroll.currentPos;
      },
      getBoundingClientRect() {
        return { 
          top: 0, 
          left: 0, 
          width: window.innerWidth, 
          height: window.innerHeight 
        };
      }
    });

    asscroll.on('update', ScrollTrigger.update);
    ScrollTrigger.addEventListener('refresh', asscroll.resize);

    // Make available through Vue's globalProperties
    app.appContext.app.config.globalProperties.$asscroll = asscroll;
    app.appContext.app.config.globalProperties.$gsap = gsap;
    app.appContext.app.config.globalProperties.$ScrollTrigger = ScrollTrigger;

    isInitialized.value = true;
  } catch (error) {
    console.error('Error initializing ASScroll:', error);
  }
});
</script>

<style lang="scss">
@use '@/assets/scss/reset/sanitize';
@use '@/assets/scss/reset/reset';
@use '@/assets/scss/reset/sanitize-extra';
@use '@/assets/scss/utility/state';
@use '@/assets/scss/global/base';

.app {
  opacity: 0;
  transition: opacity 0.3s ease;
  
  &.is-initialized {
    opacity: 1;
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

[asscroll-container] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

[asscroll] {
  width: 100%;
  height: 100%;
}
</style> 