<template>
  <div id="app">
    <div v-if="isAppReady" class="asscroll-container">
      <div class="asscroll">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
        <BaseOpenning v-if="firstAccess" />
        <BaseMouse v-if="!isMobile" />
        <BaseLoading />
        <BaseHeader />
        <BaseHambergerMenu />
      </div>
    </div>
    <template v-else-if="initializationError">
      <div class="initialization-error">
        Failed to initialize application. Please refresh the page.
      </div>
    </template>
    <template v-else>
      <div class="loading">
        Loading...
      </div>
    </template>
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
      isAppReady: false,
      initializationError: null,
      eventBus: useEventBus()
    }
  },
  computed: {
    storeInitialized() {
      return this.$store?.getters?.isInitialized ?? false
    },
    configInitialized() {
      return this.$SITECONFIG?.isInitialized ?? false
    },
    isMobile() {
      return this.$SITECONFIG?.isMobile ?? false
    },
    firstAccess() {
      return this.$store?.getters?.['app/firstAccess'] ?? false
    }
  },
  watch: {
    storeInitialized: {
      handler(newVal) {
        if (newVal) this.checkInitialization()
      },
      immediate: true
    },
    configInitialized: {
      handler(newVal) {
        if (newVal) this.checkInitialization()
      },
      immediate: true
    }
  },
  methods: {
    checkInitialization() {
      if (this.storeInitialized && this.configInitialized) {
        this.isAppReady = true
        // Emit event to notify ASScroll that container is ready
        this.$nextTick(() => {
          this.eventBus.emit('app:ready')
        })
      }
    },
    async initializeApp() {
      try {
        // Wait for store and config initialization
        await Promise.all([
          new Promise(resolve => {
            if (this.storeInitialized) resolve()
            this.$watch('storeInitialized', newVal => {
              if (newVal) resolve()
            })
          }),
          new Promise(resolve => {
            if (this.configInitialized) resolve()
            this.$watch('configInitialized', newVal => {
              if (newVal) resolve()
            })
          })
        ])

        // App is ready
        this.isAppReady = true
        
        // Notify ASScroll after DOM update
        this.$nextTick(() => {
          this.eventBus.emit('app:ready')
        })
      } catch (error) {
        console.error('Failed to initialize app:', error)
        this.initializationError = error
      }
    }
  },
  created() {
    this.initializeApp()
  },
  beforeUnmount() {
    this.eventBus.off('app:ready')
  }
}
</script>

<style lang="scss">
.initialization-error {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ff0000;
  font-size: 16px;
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.asscroll-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.asscroll {
  position: relative;
  z-index: 1;
}
</style> 