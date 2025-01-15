<template>
  <span ref="root" class="app-text-animation">
    <span ref="wrapper" class="app-text-animation-wrapper">
      <span ref="block" class="app-text-animation-block">{{ text }}</span>
    </span>
  </span>
</template>

<script>
export default {
  /**
   * text : 中身のテキスト
   * rotate : テキストを傾ける角度
   * start : 数値分アニメーションをdelayさせる
   * state : 親コンポーネントから監視されているアニメーションの状態管理用のprops
   * pcAnimation : PCでアニメーションさせるか、させないかを決める
   * spAnimation : SPでアニメーションさせるか、させないかを決める
   * */
  props: {
    text: {
      type: String,
      required: true,
    },
    rotate: {
      type: Number,
      default: 0,
    },
    start: {
      type: Number,
      default: 0,
    },
    state: {
      type: String,
      default: '',
    },
    spAnimation: {
      type: Boolean,
      default: true,
    },
    pcAnimation: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      isInitialized: false,
      isMounted: false,
      refs: {
        root: null,
        wrapper: null,
        block: null
      },
      animations: {
        wrapperTop: null,
        wrapperCenter: null,
        wrapperBottom: null,
        blockTop: null,
        blockCenter: null,
        blockBottom: null
      },
      movePercent: 0
    }
  },

  watch: {
    state() {
      if (!this.isMounted || !this.isInitialized) {
        console.warn('AppTextAnimation: Component not ready for animation');
        return;
      }

      if ((!this.spAnimation && this.$SITECONFIG?.isMobile) || (!this.pcAnimation && this.$SITECONFIG?.isPc)) return;

      try {
        switch (this.state) {
          case 'center':
            this.toCenter()
            break
          case 'top':
            this.toTop()
            break
          case 'bottom':
            this.toBottom()
            break
          case 'init':
            this.killAllAnimations()
            this.init()
            break
        }
      } catch (error) {
        console.warn('AppTextAnimation: Error during state change:', error);
      }
    },
  },

  beforeMount() {
    this.isMounted = false;
    this.isInitialized = false;
  },

  mounted() {
    this.isMounted = true;
    
    if ((!this.spAnimation && this.$SITECONFIG?.isMobile) || (!this.pcAnimation && this.$SITECONFIG?.isPc)) return;

    try {
      this.movePercent = this.$SITECONFIG?.isPc ? 105 : 127;
      
      // Initialize refs
      this.refs = {
        root: this.$refs.root,
        wrapper: this.$refs.wrapper,
        block: this.$refs.block
      };

      if (!this.refs.root || !this.refs.wrapper || !this.refs.block) {
        console.warn('AppTextAnimation: Required elements not found during mount');
        return;
      }

      this.isInitialized = true;
      this.init();
    } catch (error) {
      console.warn('AppTextAnimation: Error during mount:', error);
    }
  },

  beforeUnmount() {
    this.killAllAnimations();
    this.isMounted = false;
    this.isInitialized = false;
  },

  methods: {
    killAllAnimations() {
      try {
        Object.values(this.animations).forEach(animation => {
          if (animation?.kill) {
            animation.kill();
          }
        });
        
        // Reset all animations to null
        this.animations = {
          wrapperTop: null,
          wrapperCenter: null,
          wrapperBottom: null,
          blockTop: null,
          blockCenter: null,
          blockBottom: null
        };
      } catch (error) {
        console.warn('AppTextAnimation: Error killing animations:', error);
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
        console.warn('AppTextAnimation: Component not ready for animation');
        return null;
      }

      if (!this.$gsap) {
        console.warn('AppTextAnimation: GSAP not initialized');
        return null;
      }

      if (!element) {
        console.warn('AppTextAnimation: Animation target not found');
        return null;
      }

      try {
        return this.$gsap.to(element, {
          ...props,
          ease: props.ease || this.getEasing(),
          duration: props.duration || this.getDuration(),
        });
      } catch (error) {
        console.warn('AppTextAnimation: Animation error:', error);
        return null;
      }
    },

    init() {
      if (!this.isMounted || !this.isInitialized) return;

      try {
        if (!this.$gsap) {
          console.warn('AppTextAnimation: GSAP not initialized');
          return;
        }

        this.$gsap.set(this.refs.wrapper, {
          rotate: this.rotate,
          transformOrigin: this.rotate > 0 ? 'left' : 'right',
        });

        this.$gsap.set(this.refs.block, {
          opacity: 1.0,
          yPercent: this.movePercent,
        });
      } catch (error) {
        console.warn('AppTextAnimation: Error during initialization:', error);
      }
    },

    setRootPointerEvent() {
      if (!this.isMounted || !this.isInitialized) return;
      
      this.safeGsapAnimation(this.refs.root, 'set', {
        pointerEvents: 'auto',
        userSelect: 'auto',
      });
    },

    toCenter() {
      if (!this.isMounted || !this.isInitialized) return;

      try {
        this.safeGsapAnimation(this.$refs.wrapper, {
          duration: this.getDuration(),
          ease: this.getEasing(),
          y: 0,
        });

        this.safeGsapAnimation(this.$refs.block, {
          duration: this.getDuration(),
          ease: this.getEasing(),
          rotate: this.rotate,
        });
      } catch (error) {
        console.warn('AppTextAnimation: Error during toCenter animation:', error);
      }
    },

    toTop() {
      if (!this.isMounted || !this.isInitialized) return;

      try {
        this.safeGsapAnimation(this.$refs.wrapper, {
          duration: this.getDuration(),
          ease: this.getEasing(),
          y: '-100%',
        });
      } catch (error) {
        console.warn('AppTextAnimation: Error during toTop animation:', error);
      }
    },

    toBottom() {
      if (!this.isMounted || !this.isInitialized) return;

      try {
        this.safeGsapAnimation(this.$refs.wrapper, {
          duration: this.getDuration(),
          ease: this.getEasing(),
          y: '100%',
        });
      } catch (error) {
        console.warn('AppTextAnimation: Error during toBottom animation:', error);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@use "~/assets/scss/constants/break-points" as *;
@use "~/assets/scss/functions/mixins" as *;

.app-text-animation {
  display: block;
  pointer-events: none;
  user-select: none;

  @include sp() {
    position: relative;
    overflow: hidden;
  }
}

.app-text-animation-wrapper {
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.app-text-animation-block {
  display: inline-block;
  opacity: 0;
  white-space: nowrap;
}
</style>
