<template>
  <div id="app">
    <template v-if="isAppReady">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </template>
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
      initializationError: null
    }
  },
  computed: {
    storeInitialized() {
      return this.$store.getters.isInitialized
    },
    configInitialized() {
      return this.$SITECONFIG.isInitialized
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
      } catch (error) {
        console.error('Failed to initialize app:', error)
        this.initializationError = error
      }
    }
  },
  created() {
    this.initializeApp()
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
</style> 