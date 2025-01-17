<template>
  <header v-if="isReady" class="header">
    <div ref="HeaderLogo" class="header-logo is-top">
      <router-link to="/" class="header-logo-link">
        <span class="header-logo-text">HISAMI KURITA</span>
      </router-link>
    </div>
  </header>
</template>
<script>
import { useEventBus } from '@/plugins/eventBus'

export default {
  name: 'BaseHeader',
  
  data() {
    return {
      isReady: false,
      scrollListener: null,
      eventBus: useEventBus()
    }
  },

  computed: {
    hambergerMenuState() {
      return this.$store.state.hambergerMenu.isActive
    },
    indexPickupState() {
      return this.$store.state.indexPickup.isActive
    },
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
    },
    hambergerMenuState(newVal) {
      if (this.scrollListener) {
        if (newVal) {
          this.cleanupScrollListener()
        } else {
          this.initializeScrollListener()
        }
      }
    }
  },

  methods: {
    checkInitialization() {
      if (this.storeInitialized && this.configInitialized) {
        this.initializeComponent()
      }
    },

    async initializeComponent() {
      try {
        // Wait for ASScroll to be ready
        await new Promise(resolve => {
          const checkASScroll = () => {
            const asscroll = this.$getASScroll()
            if (asscroll) {
              resolve()
            } else {
              setTimeout(checkASScroll, 100)
            }
          }
          checkASScroll()
        })

        // Initialize scroll listener
        this.initializeScrollListener()

        // Component is ready
        this.isReady = true
      } catch (error) {
        console.error('Failed to initialize header:', error)
      }
    },

    initializeScrollListener() {
      if (this.scrollListener || !this.$getASScroll()) return

      // Create scroll listener
      this.scrollListener = () => {
        if (this.hambergerMenuState || this.indexPickupState) return
        
        const asscroll = this.$getASScroll()
        if (!asscroll) return
        
        if (asscroll.currentPos <= 0) {
          this.$refs.HeaderLogo.classList.add('is-top')
        } else {
          this.$refs.HeaderLogo.classList.remove('is-top')
        }
      }

      // Add scroll listener
      this.$getASScroll().on('scroll', this.scrollListener)
    },

    cleanupScrollListener() {
      if (this.scrollListener) {
        const asscroll = this.$getASScroll()
        if (asscroll) {
          asscroll.off('scroll', this.scrollListener)
        }
        this.scrollListener = null
      }
    }
  },

  beforeDestroy() {
    // Clean up event listeners
    this.eventBus.off('asscroll:ready')
    this.cleanupScrollListener()
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/constants/animation' as *;

.header-logo-text {
  display: inline-block;
  transition: transform $base-duration $transform-easing;
}
</style>
