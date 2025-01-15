<template>
  <div ref="root" class="loading">
    <span ref="inner" class="loading-inner">
      <span ref="wrapper" class="loading-wrapper">
        <span ref="block" class="loading-block">
          LOADING
          <span class="loading-dot">.</span>
          <span class="loading-dot">.</span>
          <span class="loading-dot">.</span>
        </span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isInitialized: false,
      isMounted: false,
      refs: {
        inner: null,
        wrapper: null,
        block: null
      },
      animations: {
        inner: null,
        wrapper: null,
        block: null
      }
    }
  },

  beforeMount() {
    console.log('[BaseLoading] Component entering beforeMount');
    this.isMounted = false;
    this.isInitialized = false;
  },

  mounted() {
    console.log('[BaseLoading] Component mounting');
    this.isMounted = true;
    
    try {
      // Initialize refs
      this.refs = {
        inner: this.$refs.inner,
        wrapper: this.$refs.wrapper,
        block: this.$refs.block
      };

      if (!this.refs.inner || !this.refs.wrapper || !this.refs.block) {
        console.warn('[BaseLoading] Required elements not found during mount');
        return;
      }

      this.isInitialized = true;
      console.log('[BaseLoading] Component successfully mounted and initialized');
    } catch (error) {
      console.warn('[BaseLoading] Error during mount:', error);
    }
  },

  beforeUnmount() {
    console.log('[BaseLoading] Component unmounting');
    this.killAllAnimations();
    this.isMounted = false;
    this.isInitialized = false;
  },

  methods: {
    killAllAnimations() {
      console.log('[BaseLoading] Killing all animations');
      try {
        Object.values(this.animations).forEach(animation => {
          if (animation?.kill) {
            animation.kill();
          }
        });
        
        this.animations = {
          inner: null,
          wrapper: null,
          block: null
        };
        console.log('[BaseLoading] All animations killed successfully');
      } catch (error) {
        console.warn('[BaseLoading] Error killing animations:', error);
      }
    },

    getEasing() {
      return this.$EASING?.transform || 'power2.out';
    },

    getDuration(type = 'base') {
      if (type === 'short') {
        return this.$SITECONFIG?.shortDuration || 0.3;
      }
      return this.$SITECONFIG?.baseDuration || 0.6;
    },

    safeGsapAnimation(element, props) {
      if (!this.isMounted || !this.isInitialized) {
        console.warn('BaseLoading: Component not ready for animation');
        return null;
      }

      if (!this.$gsap) {
        console.warn('BaseLoading: GSAP not initialized');
        return null;
      }

      if (!element) {
        console.warn('BaseLoading: Animation target not found');
        return null;
      }

      try {
        return this.$gsap.to(element, {
          ...props,
          ease: props.ease || this.getEasing(),
          duration: props.duration || this.getDuration('short'),
        });
      } catch (error) {
        console.warn('BaseLoading: Animation error:', error);
        return null;
      }
    },

    safeGsapFromTo(element, from, to) {
      if (!this.isMounted || !this.isInitialized) {
        console.warn('BaseLoading: Component not ready for animation');
        return null;
      }

      if (!this.$gsap) {
        console.warn('BaseLoading: GSAP not initialized');
        return null;
      }

      if (!element) {
        console.warn('BaseLoading: Animation target not found');
        return null;
      }

      try {
        return this.$gsap.fromTo(element, from, {
          ...to,
          ease: to.ease || this.getEasing(),
          duration: to.duration || this.getDuration('short'),
        });
      } catch (error) {
        console.warn('BaseLoading: Animation error:', error);
        return null;
      }
    },

    handleLoadingState() {
      if (!this.isMounted || !this.isInitialized) return;

      try {
        if (this.loadingState) {
          this.showLoading();
        } else {
          this.hideLoading();
        }
      } catch (error) {
        console.warn('BaseLoading: Error handling loading state:', error);
      }
    },

    showLoading() {
      if (!this.isMounted || !this.isInitialized) return;

      this.refs.inner.classList.add('is-loading');

      this.animations.inner = this.safeGsapAnimation(this.refs.inner, {
        scale: 1,
      });

      this.animations.wrapper = this.safeGsapFromTo(this.refs.wrapper, 
        { rotate: 8 },
        {
          delay: 0.2,
          rotate: 0,
        }
      );

      this.animations.block = this.safeGsapFromTo(this.refs.block,
        { y: 10 },
        {
          delay: 0.2,
          y: 0,
        }
      );
    },

    hideLoading() {
      if (!this.isMounted || !this.isInitialized) return;

      this.refs.inner.classList.remove('is-loading');

      this.animations.inner = this.safeGsapAnimation(this.refs.inner, {
        scale: 0,
      });
    }
  },

  watch: {
    loadingState() {
      if (!this.isMounted || !this.isInitialized) {
        console.warn('BaseLoading: Component not ready for state change');
        return;
      }

      try {
        this.handleLoadingState();
      } catch (error) {
        console.warn('BaseLoading: Error during state change:', error);
      }
    }
  }
}
</script>

<style scoped lang="scss">
@use "~/assets/scss/constants/color" as *;
@use "~/assets/scss/constants/font" as *;
@use "~/assets/scss/functions/mixins" as *;

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 20px;
  z-index: 100;
  pointer-events: none;
}

.loading-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -18px;
  right: -38px;
  width: 94px;
  height: 16px;
  padding: 1px 0 0 0;
  background-color: $white;
  color: #302c1a;
  font-size: 12px;
  border-radius: 8px;
  transform: scale(0);
}

.loading-wrapper {
  position: relative;
  overflow: hidden;
  transform: rotate(8deg);
}

.loading-block {
  display: inline-block;
  transform: translateY(10px);
}

.is-loading .loading-dot {
  animation: loadingFade $base-duration $colorAndOpacity-easing infinite;
}

.loading-dot:nth-child(1) {
  animation-delay: 0s;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.1s;
}

.loading-dot:nth-child(3) {
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
</style>
