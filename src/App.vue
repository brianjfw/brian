<template>
  <div :class="[bodyClass, isAndroid, isWindows, isSafari]">
    <div class="asscroll-container">
      <div class="asscroll">
        <div class="asscroll-contents">
          <BaseOpenning />
          <BaseMouse />
          <BaseLoading />
          <BaseHeader />
          <BaseHambergerMenu />
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseOpenning from './components/BaseOpenning.vue'
import BaseMouse from './components/BaseMouse.vue'
import BaseLoading from './components/BaseLoading.vue'
import BaseHeader from './components/BaseHeader.vue'
import BaseHambergerMenu from './components/BaseHambergerMenu.vue'
import { useEventBus } from '@/plugins/eventBus'

export default {
  name: 'App',
  components: {
    BaseOpenning,
    BaseMouse,
    BaseLoading,
    BaseHeader,
    BaseHambergerMenu
  },
  data() {
    return {
      bodyClass: '',
      isAndroid: '',
      isWindows: '',
      isSafari: '',
      asscrollInitialized: false,
      eventBus: useEventBus()
    }
  },
  created() {
    // Device detection is now handled by SITE_CONFIG
    if (this.$SITECONFIG.isAndroid) {
      this.isAndroid = 'is-android'
    }
    if (this.$SITECONFIG.isWindows) {
      this.isWindows = 'is-windows'
    }
    if (this.$SITECONFIG.isSafari) {
      this.isSafari = 'is-safari'
    }
  },
  mounted() {
    // Listen for ASScroll ready event
    this.eventBus.on('asscroll:ready', this.onASScrollReady)
  },
  beforeDestroy() {
    // Clean up event listeners
    this.eventBus.off('asscroll:ready', this.onASScrollReady)
    
    // Clean up ASScroll
    if (this.$asscroll) {
      this.$asscroll.destroy()
    }
  },
  methods: {
    onASScrollReady(asscroll) {
      if (!asscroll || this.asscrollInitialized) return
      
      this.asscrollInitialized = true
      
      // Enable ASScroll
      asscroll.enable({
        newScrollElements: document.querySelector('.asscroll')
      })
      
      // Emit event for components that need ASScroll
      this.eventBus.emit('asscroll:enabled', asscroll)
    }
  }
}
</script>

<style lang="scss">
:root {
  --viewportWidth: 100vw;
  --viewportHeight: 100vh;
}

.asscroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.asscroll {
  position: relative;
  width: 100%;
  height: 100%;
}

.asscroll-contents {
  position: relative;
  width: 100%;
  min-height: 100vh;
}
</style> 