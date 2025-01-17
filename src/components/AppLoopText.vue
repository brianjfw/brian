<template>
  <span ref="root" class="app-loop-text">
    <span ref="wrapper" class="app-loop-text-wrapper">
      <span ref="rotate" class="app-loop-text-rotate">
        <span ref="translate" class="app-loop-text-translate">
          <span ref="block" class="app-loop-text-block">
            {{ text }}
          </span>
        </span>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'AppLoopText',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      startPos: 0,
      scrollDirection: { value: 1 },
      tweenPosition: { value: 0 },
      scrollDirectionFlag: false,
      scrollListener: null,
      isEnabled: false
    }
  },
  computed: {
    hambergerMenuState() {
      return this.$store.state.hambergerMenu.isOpen
    }
  },
  mounted() {
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
      
      // Initialize scroll position
      this.startPos = asscroll.currentPos
      this.tweenPosition.value = asscroll.currentPos
      
      // Create scroll listener
      this.scrollListener = () => {
        if (this.hambergerMenuState) return
        this.handleScroll(asscroll)
      }
      
      // Add scroll listener
      asscroll.on('scroll', this.scrollListener)
      this.isEnabled = true
    },
    
    cleanupScrollListener() {
      if (this.$asscroll && this.scrollListener) {
        this.$asscroll.off('scroll', this.scrollListener)
        this.scrollListener = null
      }
      this.isEnabled = false
    },
    
    handleScroll(asscroll) {
      if (!this.isEnabled || !asscroll) return
      
      const currentPos = asscroll.currentPos
      
      // Update scroll direction
      if (currentPos > this.startPos) {
        this.updateScrollDirection(-1)
      } else {
        this.updateScrollDirection(1)
      }
      
      this.startPos = currentPos
      
      // Update tween position
      this.updateTweenPosition(currentPos)
    },
    
    updateScrollDirection(direction) {
      if (this.scrollDirectionFlag) return
      
      this.$gsap.to(this.scrollDirection, {
        duration: this.$SITECONFIG.shortDuration,
        ease: 'none',
        value: direction
      })
      
      // Set flag to prevent rapid direction changes
      this.scrollDirectionFlag = true
      setTimeout(() => {
        this.scrollDirectionFlag = false
      }, 600)
    },
    
    updateTweenPosition(currentPos) {
      this.$gsap.to(this.tweenPosition, {
        duration: this.$SITECONFIG.baseDuration,
        ease: 'none',
        value: currentPos
      })
    },
    
    render() {
      if (!this.isEnabled || this.hambergerMenuState) return
      
      // Add your render logic here
      // This method should be called in your animation frame or gsap ticker
    }
  }
}
</script>

<style scoped lang="scss">
.app-loop-text {
  display: block;
  width: max-content;
  overflow: hidden;
}

.app-loop-text-wrapper {
  display: block;
  will-change: transform;
}

.app-loop-text-translate {
  display: flex;
  position: relative;
}
</style>

<!-- クローンを動的に生成するクラスはscopedから外す -->
<style lang="scss">
.app-loop-text-block {
  padding: 0 vw(6);
}
</style>
