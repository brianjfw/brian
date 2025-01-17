<template>
  <div ref="HeaderLogo" class="header-logo is-top is-op">
    <button class="header-link js-click-target" @click="onClickSameUrlReload">
      <span
        v-for="(char, index) of name"
        :key="index"
        ref="HeaderLogoText"
        class="header-logo-text"
        style="transform: translateY(60px)"
        :class="{
          'header-logo-fade-text': index % 2 === 1,
          'header-logo-move-text': index % 2 === 0,
        }"
        >{{ char }}</span
      >
    </button>
  </div>
</template>
<script>
import { useEventBus } from '@/plugins/eventBus'

export default {
  name: 'BaseHeader',
  data() {
    return {
      name: ['H', 'I', 'S', 'A', 'M', 'I', 'K', 'U', 'R', 'I', 'T', 'A'],
      eventBus: useEventBus(),
      scrollListener: null
    }
  },
  computed: {
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    hambergerMenuState() {
      return this.$store.state.hambergerMenu.isOpen
    },
    defaultTransitionState() {
      return this.$store.getters['bg-transition/state']
    },
    pickupTransitionState() {
      return this.$store.getters['indexPickup/transition']
    },
    imageTransitionState() {
      return this.$store.getters['image-transition/state']
    },
    indexPickupState() {
      return this.$store.state.indexPickup.isOpen
    },
  },

  watch: {
    defaultTransitionState() {
      if (!this.$asscroll) return

      if (this.defaultTransitionState) {
        this.$asscroll.off('scroll', this.onScroll)
        this.$refs.HeaderLogo.classList.add('is-top')
      } else {
        this.$asscroll.on('scroll', this.onScroll)
      }
    },
    imageTransitionState() {
      if (!this.$asscroll) return

      if (this.imageTransitionState) {
        this.$asscroll.off('scroll', this.onScroll)
        this.$refs.HeaderLogo.classList.add('is-top')
      } else {
        this.$asscroll.on('scroll', this.onScroll)
      }
    },
    pickupTransitionState() {
      if (!this.$asscroll) return

      if (this.pickupTransitionState) {
        this.$asscroll.off('scroll', this.onScroll)
        this.$refs.HeaderLogo.classList.add('is-top')
      } else {
        this.$asscroll.on('scroll', this.onScroll)
      }
    },
    openningEnd() {
      if (this.$refs.HeaderLogoText) {
        this.$gsap.to(this.$refs.HeaderLogoText, {
          duration: 1.2,
          delay: -0.8,
          ease: 'power3.out',
          stagger: {
            each: 0.04,
          },
          y: 0,
          clearProps: 'all',
          onComplete: () => {
            if (this.$refs.HeaderLogo) {
              this.$refs.HeaderLogo.classList.remove('is-op')
            }
          },
        })
      }
    },
    hambergerMenuState () {
      // ハンバーガーメニューが開いて、PCだった時にロゴを動かす
      if (this.hambergerMenuState && this.$SITECONFIG.isPc) {
        this.$gsap.to(this.$refs.HeaderLogo, {
          delay: 0.16,
          duration: 0.3,
          ease: this.$EASING.transform,
          x: -560,
        })
      } else {
        this.$gsap.to(this.$refs.HeaderLogo, {
          delay: 0,
          duration: 0.3,
          ease: this.$EASING.transform,
          x: 0,
        })
      }
    },
  },

  mounted() {
    // Listen for ASScroll enabled event
    this.eventBus.on('asscroll:enabled', this.initializeScrollListener)
  },

  beforeDestroy() {
    this.cleanupScrollListener()
    this.eventBus.off('asscroll:enabled', this.initializeScrollListener)
  },

  methods: {
    initializeScrollListener(asscroll) {
      if (!asscroll) return
      
      // Clean up existing listener if any
      this.cleanupScrollListener()
      
      // Create new scroll listener
      this.scrollListener = () => {
        // Skip if menu is open or during pickup animation
        if (this.hambergerMenuState || this.indexPickupState) return
        
        try {
          if (asscroll.targetPos < 1.0) {
            this.$refs.HeaderLogo?.classList.add('is-top')
          } else {
            this.$refs.HeaderLogo?.classList.remove('is-top')
          }
        } catch (error) {
          console.warn('Error in scroll listener:', error)
        }
      }
      
      // Add scroll listener
      asscroll.on('scroll', this.scrollListener)
    },
    
    cleanupScrollListener() {
      if (this.$asscroll && this.scrollListener) {
        this.$asscroll.off('scroll', this.scrollListener)
        this.scrollListener = null
      }
    },

    onClickSameUrlReload(e) {
      e.preventDefault()

      if (this.$route.name === 'index') {
        this.$router.go({ path: this.$router.currentRoute.path, force: true })
      } else {
        this.$preDefaultEvent(true)
        if (this.$asscroll) {
          this.$asscroll.disable()
        }
        this.$store.commit('bg-transition/start', '#f0efeb')
        this.$store.commit('mouse/loading')
      }
    },
  },
}
</script>

<style lang="scss">
@use '@/assets/scss/constants/animation' as *;

.header-logo-text {
  display: inline-block;
  transition: transform $base-duration $transform-easing;
}
</style>
