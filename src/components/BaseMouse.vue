<template>
  <div ref="MouseArea" class="mouse">
    <span ref="MouseAction" class="mouse-action"
      ><span ref="MouseActionWrapper" class="mouse-action-wrapper"><span ref="MouseActionBlock" class="mouse-action-block">ACTION</span></span></span
    >
    <span ref="MouseLoading" class="mouse-loading"
      ><span ref="MouseLoadingWrapper" class="mouse-loading-wrapper"
        ><span ref="MouseLoadingBlock" class="mouse-loading-block"
          >LOADING<span class="mouse-loading-dot">.</span><span class="mouse-loading-dot">.</span><span class="mouse-loading-dot">.</span></span
        ></span
      ></span
    >
    <img ref="MouseImgClick" src="/src/static/images/mouse-click.webp" width="88" height="143" alt="" class="mouse-img-click" />
    <img ref="MouseImgHold" src="/src/static/images/mouse-hold.webp" width="200" height="170" alt="" class="mouse-img-hold" />
    <img ref="MouseImg" src="/src/static/images/mouse.webp" width="191" height="234" alt="" class="mouse-img" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isInitialized: false,
      refs: {
        mouseDefault: null,
        mouseClick: null,
        mouseHold: null,
        mouseAction: null,
        mouseActionWrapper: null,
        mouseActionBlock: null,
        mouseLoading: null,
        mouseLoadingWrapper: null,
        mouseLoadingBlock: null,
        mouseArea: null,
      },
      dimensions: {
        mouseHalfWidth: 0,
        mouseHalfHeight: 0,
      }
    }
  },

  computed: {
    mouseHover() {
      return this.$store.getters['mouse/isHover']
    },
    mouseDown() {
      return this.$store.getters['mouse/isDown']
    },
    mouseLoad() {
      return this.$store.getters['mouse/isLoad']
    },
    imageLoaded() {
      return this.$store.getters['imageLoaded/isLoad']
    },
  },

  watch: {
    mouseHover() {
      if (!this.isInitialized) return;
      
      if (this.mouseHover) {
        this.safeGsapAnimation(this.refs.mouseAction, 'to', {
          duration: this.$SITECONFIG?.shortDuration || 0.3,
          ease: this.getEasing(),
          scale: 1,
        })
        this.safeGsapAnimation(this.refs.mouseActionWrapper, 'fromTo', {
          from: { rotate: 8 },
          to: {
            duration: this.$SITECONFIG?.shortDuration || 0.3,
            delay: 0.2,
            ease: this.getEasing(),
            rotate: 0,
          }
        })
        this.safeGsapAnimation(this.refs.mouseActionBlock, 'fromTo', {
          from: { y: 10 },
          to: {
            duration: this.$SITECONFIG?.shortDuration || 0.3,
            delay: 0.2,
            ease: this.getEasing(),
            y: 0,
          }
        })
      } else {
        this.safeGsapAnimation(this.refs.mouseAction, 'to', {
          duration: this.$SITECONFIG?.shortDuration || 0.3,
          ease: this.getEasing(),
          scale: 0,
        })
      }
    },

    mouseDown() {
      if (!this.isInitialized) return;
      
      if (this.mouseDown) {
        this.safeGsapAnimation(this.refs.mouseAction, 'to', {
          duration: this.$SITECONFIG?.shortDuration || 0.3,
          ease: this.getEasing(),
          scale: 0,
        })
      }
    },

    mouseLoad() {
      if (!this.isInitialized) return;
      if (this.$SITECONFIG?.isSp) return;

      const { mouseLoading, mouseLoadingWrapper, mouseLoadingBlock } = this.refs;
      
      if (!mouseLoading || !mouseLoadingWrapper || !mouseLoadingBlock) {
        console.warn('BaseMouse: Required elements not found');
        return;
      }

      if (this.mouseLoad) {
        mouseLoading.classList.add('is-loading');

        this.safeGsapAnimation(mouseLoading, 'to', {
          duration: this.$SITECONFIG?.shortDuration || 0.3,
          ease: this.getEasing(),
          scale: 1,
        })
        
        this.safeGsapAnimation(mouseLoadingWrapper, 'fromTo', {
          from: { rotate: 8 },
          to: {
            duration: this.$SITECONFIG?.shortDuration || 0.3,
            delay: 0.2,
            ease: this.getEasing(),
            rotate: 0,
          }
        })
        
        this.safeGsapAnimation(mouseLoadingBlock, 'fromTo', {
          from: { y: 10 },
          to: {
            duration: this.$SITECONFIG?.shortDuration || 0.3,
            delay: 0.2,
            ease: this.getEasing(),
            y: 0,
          }
        })
      } else {
        mouseLoading.classList.remove('is-loading');

        this.safeGsapAnimation(mouseLoading, 'to', {
          duration: this.$SITECONFIG?.shortDuration || 0.3,
          ease: this.getEasing(),
          scale: 0,
        })
      }
    },

    imageLoaded() {
      if (!this.isInitialized) return;
      if (!this.$SITECONFIG?.isNoTouch) return;

      try {
        // クリックできる要素を全てのコンポーネントから取得
        this.mouseClickTarget = document.querySelectorAll('.js-click-target')
        // ホールドできる要素を全てのコンポーネントから取得
        this.mouseHoldTarget = document.querySelectorAll('.js-hold-target')

        // イベント付与
        setTimeout(() => {
          if (!this.refs.mouseArea) return;
          
          this.safeGsapAnimation(this.refs.mouseArea, 'set', { opacity: 1 })
          this.safeGsapAnimation(this.refs.mouseArea, 'to', {
            duration: this.$SITECONFIG?.baseDuration || 0.6,
            ease: this.getEasing(),
            scale: 1,
          })
        }, 200)

        this.mouseClickTarget.forEach(target => {
          target.addEventListener('mousedown', this.onMouseDown)
          target.addEventListener('mouseup', this.onMouseUp)
        })

        this.mouseHoldTarget.forEach(target => {
          target.addEventListener('mousedown', this.onMouseHoldDown)
          target.addEventListener('mouseup', this.onMouseHoldUp)
        })
      } catch (error) {
        console.warn('BaseMouse: Error during imageLoaded setup:', error);
      }
    },
  },

  mounted() {
    // Initialize refs after nextTick to ensure DOM is ready
    this.$nextTick(() => {
      try {
        // Initialize all refs
        this.refs = {
          mouseDefault: this.$refs.MouseImg,
          mouseClick: this.$refs.MouseImgClick,
          mouseHold: this.$refs.MouseImgHold,
          mouseAction: this.$refs.MouseAction,
          mouseActionWrapper: this.$refs.MouseActionWrapper,
          mouseActionBlock: this.$refs.MouseActionBlock,
          mouseLoading: this.$refs.MouseLoading,
          mouseLoadingWrapper: this.$refs.MouseLoadingWrapper,
          mouseLoadingBlock: this.$refs.MouseLoadingBlock,
          mouseArea: this.$refs.MouseArea,
        }

        if (!this.refs.mouseArea) {
          console.warn('BaseMouse: MouseArea not found');
          return;
        }

        // Initialize dimensions
        this.dimensions = {
          mouseHalfWidth: this.refs.mouseArea.clientWidth / 2,
          mouseHalfHeight: this.refs.mouseArea.clientHeight / 2,
        }

        // タッチイベントではない時、マウス追従
        if (this.$SITECONFIG.isNoTouch) {
          window.addEventListener('mousemove', this.onMouseMove)
        }

        // Mark component as initialized
        this.isInitialized = true;
      } catch (error) {
        console.warn('BaseMouse: Error during initialization:', error);
      }
    })
  },

  beforeDestroy() {
    // Remove event listeners
    if (this.$SITECONFIG.isNoTouch) {
      window.removeEventListener('mousemove', this.onMouseMove)
      
      if (this.mouseClickTarget) {
        this.mouseClickTarget.forEach(target => {
          target.removeEventListener('mousedown', this.onMouseDown)
          target.removeEventListener('mouseup', this.onMouseUp)
        })
      }
      
      if (this.mouseHoldTarget) {
        this.mouseHoldTarget.forEach(target => {
          target.removeEventListener('mousedown', this.onMouseHoldDown)
          target.removeEventListener('mouseup', this.onMouseHoldUp)
        })
      }
    }
  },

  methods: {
    safeGsapAnimation(element, animation, options) {
      if (!element) {
        console.warn('BaseMouse: Element not found for animation');
        return;
      }

      // Ensure we have access to easing
      if (options.ease === this.$EASING?.transform) {
        options = {
          ...options,
          ease: 'power2.out' // Fallback easing if $EASING is not available
        };
      }

      try {
        if (animation === 'to') {
          this.$gsap.to(element, options);
        } else if (animation === 'fromTo') {
          const { from, to } = options;
          // Apply easing fallback to 'to' options if needed
          if (to.ease === this.$EASING?.transform) {
            to.ease = 'power2.out';
          }
          this.$gsap.fromTo(element, from, to);
        } else if (animation === 'set') {
          this.$gsap.set(element, options);
        }
      } catch (error) {
        console.warn('BaseMouse: Animation error:', error);
      }
    },

    getEasing() {
      return this.$EASING?.transform || 'power2.out';
    },

    onMouseDown() {
      if (!this.isInitialized) return;
      this.safeGsapAnimation(this.refs.mouseClick, 'to', {
        duration: 0.2,
        ease: this.getEasing(),
        scale: 1,
      })
      this.safeGsapAnimation(this.refs.mouseDefault, 'to', {
        duration: 0.2,
        ease: this.getEasing(),
        rotate: 15,
      })
    },

    onMouseUp() {
      if (!this.isInitialized) return;
      this.safeGsapAnimation(this.refs.mouseClick, 'to', {
        duration: 0.2,
        ease: this.getEasing(),
        scale: 0,
      })
      this.safeGsapAnimation(this.refs.mouseDefault, 'to', {
        duration: 0.2,
        ease: this.getEasing(),
        rotate: 0,
      })
    },

    onMouseHoldDown() {
      if (!this.isInitialized) return;
      this.safeGsapAnimation(this.refs.mouseDefault, 'set', { opacity: 0 })
      this.safeGsapAnimation(this.refs.mouseHold, 'set', { opacity: 1 })
    },

    onMouseHoldUp() {
      if (!this.isInitialized) return;
      this.safeGsapAnimation(this.refs.mouseDefault, 'set', { opacity: 1 })
      this.safeGsapAnimation(this.refs.mouseHold, 'set', { opacity: 0 })
    },

    onMouseMove(e) {
      if (!this.isInitialized) return;
      if (!this.refs.mouseArea || !this.dimensions.mouseHalfWidth || !this.dimensions.mouseHalfHeight) {
        return;
      }
      const posX = e.clientX - this.dimensions.mouseHalfWidth
      const posY = e.clientY - this.dimensions.mouseHalfHeight

      this.safeGsapAnimation(this.refs.mouseArea, 'set', {
        x: posX,
        y: posY,
      })
    },
  },
}
</script>

<style scoped lang="scss">
@use "@/assets/scss/constants/animation" as *;
@use "@/assets/scss/constants/color" as *;
@use "@/assets/scss/constants/font" as *;
@use "@/assets/scss/functions/mixins" as *;

:root {
  --viewportHeight: 100vh;
}

.mouse {
  position: fixed;
  top: 9px;
  left: 6px;
  width: 20px;
  z-index: 100;
  pointer-events: none;
  opacity: 0;
  transform: translate(40px, calc(var(--viewportHeight) - 80px)) scale(0);
}

@media (hover: hover) and (pointer: fine) {
  .mouse-action {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -18px;
    right: -38px;
    width: 44px;
    height: 14px;
    padding: 1px 0 0 0;
    background-color: $white;
    color: $black;
    font-size: 10px;
    border-radius: 8px;
    transform: scale(0);
  }
}

.mouse-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -18px;
  right: -38px;
  width: 64px;
  height: 14px;
  padding: 1px 0 0 0;
  background-color: $white;
  color: $black;
  font-size: 10px;
  border-radius: 8px;
  transform: scale(0);
}

.mouse-action-wrapper,
.mouse-loading-wrapper {
  position: relative;
  overflow: hidden;
  transform: rotate(8deg);
}

.mouse-action-block,
.mouse-loading-block {
  display: inline-block;
  transform: translateY(10px);
}

.is-loading .mouse-loading-dot {
  animation: loadingFade $base-duration $colorAndOpacity-easing infinite;
}

.mouse-loading-dot:nth-child(1) {
  animation-delay: 0s;
}

.mouse-loading-dot:nth-child(2) {
  animation-delay: 0.1s;
}

.mouse-loading-dot:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes loadingFade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.mouse-img-click {
  position: absolute;
  top: -26px;
  left: -14px;
  width: 44px;
  transform: scale(0);
}

.mouse-img-hold {
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(1.3);
  opacity: 0;
}
</style>
