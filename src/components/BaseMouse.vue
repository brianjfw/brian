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
    <img ref="MouseImgClick" src="/images/mouse-click.webp" width="88" height="143" alt="" class="mouse-img-click" />
    <img ref="MouseImgHold" src="/images/mouse-hold.webp" width="200" height="170" alt="" class="mouse-img-hold" />
    <img ref="MouseImg" src="/images/mouse.webp" width="191" height="234" alt="" class="mouse-img" />
  </div>
</template>

<script>
export default {
  computed: {
    mouseHover() {
      return this.$store?.getters?.['mouse/isHover'] ?? false
    },
    mouseDown() {
      return this.$store?.getters?.['mouse/isDown'] ?? false
    },
    mouseLoad() {
      return this.$store?.getters?.['mouse/isLoad'] ?? false
    },
    imageLoaded() {
      return this.$store?.getters?.['imageLoaded/isLoad'] ?? false
    },
    shortDuration() {
      return this.$SITECONFIG?.shortDuration ?? 0.4
    },
    baseDuration() {
      return this.$SITECONFIG?.baseDuration ?? 0.8
    },
    isNoTouch() {
      return this.$SITECONFIG?.isNoTouch ?? false
    },
    isSp() {
      return this.$SITECONFIG?.isSp ?? false
    }
  },
  watch: {
    mouseHover() {
      if (!this.mouseAction) return
      
      if (this.mouseHover) {
        this.$gsap?.to(this.mouseAction, {
          duration: this.shortDuration,
          ease: this.$EASING?.transform ?? 'power4.inOut',
          scale: 1,
        })
        if (this.mouseActionWrapper && this.mouseActionBlock) {
          this.$gsap?.fromTo(
            this.mouseActionWrapper,
            { rotate: 8 },
            {
              duration: this.shortDuration,
              delay: 0.2,
              ease: this.$EASING?.transform ?? 'power4.inOut',
              rotate: 0,
            }
          )
          this.$gsap?.fromTo(
            this.mouseActionBlock,
            { y: 10 },
            {
              duration: this.shortDuration,
              delay: 0.2,
              ease: this.$EASING?.transform ?? 'power4.inOut',
              y: 0,
            }
          )
        }
      } else {
        this.$gsap?.to(this.mouseAction, {
          duration: this.shortDuration,
          ease: this.$EASING?.transform ?? 'power4.inOut',
          scale: 0,
        })
      }
    },
    mouseDown() {
      if (!this.mouseAction) return
      
      if (this.mouseDown) {
        this.$gsap?.to(this.mouseAction, {
          duration: this.shortDuration,
          ease: this.$EASING?.transform ?? 'power4.inOut',
          scale: 0,
        })
      }
    },
    mouseLoad() {
      if (this.isSp || !this.mouseLoading) return

      if (this.mouseLoad) {
        this.mouseLoading.classList?.add('is-loading')

        this.$gsap?.to(this.mouseLoading, {
          duration: this.shortDuration,
          ease: this.$EASING?.transform ?? 'power4.inOut',
          scale: 1,
        })
        
        if (this.mouseLoadingWrapper && this.mouseLoadingBlock) {
          this.$gsap?.fromTo(
            this.mouseLoadingWrapper,
            { rotate: 8 },
            {
              duration: this.shortDuration,
              delay: 0.2,
              ease: this.$EASING?.transform ?? 'power4.inOut',
              rotate: 0,
            }
          )
          this.$gsap?.fromTo(
            this.mouseLoadingBlock,
            { y: 10 },
            {
              duration: this.shortDuration,
              delay: 0.2,
              ease: this.$EASING?.transform ?? 'power4.inOut',
              y: 0,
            }
          )
        }
      } else {
        this.mouseLoading.classList?.remove('is-loading')

        this.$gsap?.to(this.mouseLoading, {
          duration: this.shortDuration,
          ease: this.$EASING?.transform ?? 'power4.inOut',
          scale: 0,
        })
      }
    },
    imageLoaded() {
      if (!this.isNoTouch) return
      
      try {
        // Get click and hold targets
        this.mouseClickTarget = document.querySelectorAll('.js-click-target') ?? []
        this.mouseHoldTarget = document.querySelectorAll('.js-hold-target') ?? []

        // Initialize mouse area if it exists
        if (this.$refs.MouseArea) {
          setTimeout(() => {
            this.$gsap?.set(this.$refs.MouseArea, {
              opacity: 1,
            })
            this.$gsap?.to(this.$refs.MouseArea, {
              duration: this.baseDuration,
              ease: this.$EASING?.transform ?? 'power4.inOut',
              scale: 1,
            })
          }, 200)
        }

        // Add event listeners
        this.addEventListeners()
      } catch (error) {
        console.error('Error initializing mouse targets:', error)
      }
    },
  },
  methods: {
    addEventListeners() {
      if (!this.mouseClickTarget || !this.mouseHoldTarget) return
      
      this.mouseClickTarget.forEach(target => {
        target.addEventListener('mousedown', this.onMouseDown)
        target.addEventListener('mouseup', this.onMouseUp)
      })

      this.mouseHoldTarget.forEach(target => {
        target.addEventListener('mousedown', this.onMouseHoldDown)
        target.addEventListener('mouseup', this.onMouseHoldUp)
      })

      if (this.isNoTouch) {
        window.addEventListener('mousemove', this.onMouseMove)
      }
    },
    removeEventListeners() {
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

      window.removeEventListener('mousemove', this.onMouseMove)
    },
    onMouseDown() {
      if (!this.mouseClick || !this.mouseDefault) return
      
      this.$gsap?.to(this.mouseClick, {
        duration: 0.2,
        ease: this.$EASING?.transform ?? 'power4.inOut',
        scale: 1,
      })
      this.$gsap?.to(this.mouseDefault, {
        duration: 0.2,
        ease: this.$EASING?.transform ?? 'power4.inOut',
        rotate: 15,
      })
    },
    onMouseUp() {
      if (!this.mouseClick || !this.mouseDefault) return
      
      this.$gsap?.to(this.mouseClick, {
        duration: 0.2,
        ease: this.$EASING?.transform ?? 'power4.inOut',
        scale: 0,
      })
      this.$gsap?.to(this.mouseDefault, {
        duration: 0.2,
        ease: this.$EASING?.transform ?? 'power4.inOut',
        rotate: 0,
      })
    },
    onMouseHoldDown() {
      if (!this.mouseDefault || !this.mouseHold) return
      
      this.$gsap?.set(this.mouseDefault, {
        opacity: 0,
      })
      this.$gsap?.set(this.mouseHold, {
        opacity: 1,
      })
    },
    onMouseHoldUp() {
      if (!this.mouseDefault || !this.mouseHold) return
      
      this.$gsap?.set(this.mouseDefault, {
        opacity: 1,
      })
      this.$gsap?.set(this.mouseHold, {
        opacity: 0,
      })
    },
    onMouseMove(e) {
      if (!this.mouseArea || typeof this.mouseHalfWidth === 'undefined' || typeof this.mouseHalfHeight === 'undefined') return
      
      const posX = e.clientX - this.mouseHalfWidth
      const posY = e.clientY - this.mouseHalfHeight

      this.$gsap?.set(this.mouseArea, {
        x: posX,
        y: posY,
      })
    },
  },
  mounted() {
    try {
      // Cache refs
      this.mouseDefault = this.$refs.MouseImg
      this.mouseClick = this.$refs.MouseImgClick
      this.mouseHold = this.$refs.MouseImgHold
      this.mouseAction = this.$refs.MouseAction
      this.mouseActionWrapper = this.$refs.MouseActionWrapper
      this.mouseActionBlock = this.$refs.MouseActionBlock
      this.mouseLoading = this.$refs.MouseLoading
      this.mouseLoadingWrapper = this.$refs.MouseLoadingWrapper
      this.mouseLoadingBlock = this.$refs.MouseLoadingBlock
      this.mouseArea = this.$refs.MouseArea

      // Only set dimensions if mouseArea exists
      if (this.mouseArea) {
        this.mouseHalfWidth = this.mouseArea.clientWidth / 2
        this.mouseHalfHeight = this.mouseArea.clientHeight / 2
      }

      // Add event listeners if needed
      if (this.isNoTouch) {
        this.addEventListeners()
      }
    } catch (error) {
      console.error('Error in mounted hook:', error)
    }
  },
  beforeUnmount() {
    this.removeEventListeners()
  }
}
</script>

<style lang="scss">
@use '@/assets/scss/constants/animation' as *;

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
