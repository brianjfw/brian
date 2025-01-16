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
      eventBus: useEventBus()
    }
  },
  mounted() {
    // Initialize data
    this.$store.dispatch('initializeData')

    // Add device detection logic here
    if (navigator.userAgent.toLowerCase().includes('android')) {
      this.isAndroid = 'is-android'
    }
    if (navigator.userAgent.toLowerCase().includes('windows')) {
      this.isWindows = 'is-windows'
    }
    if (navigator.userAgent.toLowerCase().includes('safari') && !navigator.userAgent.toLowerCase().includes('chrome')) {
      this.isSafari = 'is-safari'
    }

    // Initialize ASScroll
    this.initASScroll()
  },
  methods: {
    initASScroll() {
      this.$nextTick(() => {
        const container = document.querySelector('.asscroll-container')
        const scrollElement = document.querySelector('.asscroll')
        
        if (!container || !scrollElement) {
          console.warn('ASScroll container or scroll element not found')
          return
        }

        try {
          const asscroll = new this.$ASScroll({
            containerElement: container,
            scrollElements: scrollElement,
            ease: 0.075
          })
          
          // Store ASScroll instance
          this.$asscroll = asscroll
          
          // Start ASScroll
          asscroll.enable()
          
          // Emit event when ASScroll is ready using event bus
          this.eventBus.emit('asscroll:ready', asscroll)
        } catch (error) {
          console.error('Failed to initialize ASScroll:', error)
        }
      })
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