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
  /**
   * text : 中身のテキスト
   * start : 数値分アニメーションをdelayさせる
   * loop : 親コンポーネントから監視されているアニメーションの状態管理用のprops
   * direction : テキストが流れる方向、(right,left)
   */
  props: {
    text: {
      type: String,
      required: true,
      validator: function(value) {
        if (value.length > 1000) {
          console.warn('AppLoopText: Text prop is too long, it may cause performance issues');
          return false;
        }
        return true;
      }
    },
    start: {
      type: Number,
      default: 0,
    },
    loop: {
      type: String,
      default: '',
    },
    direction: {
      type: String,
      default: 'right',
    },
  },

  computed: {
    hambergerMenuState: function () {
      return this.$store.getters['hambergerMenu/state']
    },
  },

  watch: {
    /**
     * 親コンポーネントからアニメーションの状態管理をする
     */
    loop() {
      if (!this.isMounted || !this.isInitialized) {
        console.warn('AppLoopText: Component not ready for animation');
        return;
      }

      try {
        if (this.loop === 'isActive') {
          this.tweenPosition.value = this.$asscroll?.currentPos || 0;
          if (this.$asscroll && typeof this.onScroll === 'function') {
            this.$asscroll.on('scroll', this.onScroll);
          }
          if (this.$gsap && typeof this.render === 'function') {
            this.$gsap.ticker.add(this.render);
          }
        } else if (this.loop === 'isNoActive') {
          if (this.$asscroll && typeof this.onScroll === 'function') {
            this.$asscroll.off('scroll', this.onScroll);
          }
          if (this.$gsap && typeof this.render === 'function') {
            this.$gsap.ticker.remove(this.render);
          }
        }
      } catch (error) {
        console.warn('AppLoopText: Error during loop state change:', error);
      }
    }
  },

  data() {
    return {
      isInitialized: false,
      isMounted: false,
      animations: {
        rotate: null,
        translate: null
      },
      refs: {
        root: null,
        wrapper: null,
        rotate: null,
        translate: null,
        block: null
      },
      position: { value: 0 },
      tweenPosition: { value: 0 },
      scrollDirection: { value: 1 },
      initDirection: 1
    }
  },

  beforeMount() {
    this.isMounted = false;
    this.isInitialized = false;
  },

  mounted() {
    this.isMounted = true;
    
    try {
      // Initialize refs
      this.refs = {
        root: this.$refs.root,
        wrapper: this.$refs.wrapper,
        rotate: this.$refs.rotate,
        translate: this.$refs.translate,
        block: this.$refs.block
      };

      if (!Object.values(this.refs).every(ref => ref)) {
        console.warn('AppLoopText: Required elements not found during mount');
        return;
      }

      this.isInitialized = true;
      this.initAnimation();
    } catch (error) {
      console.warn('AppLoopText: Error during mount:', error);
    }
  },

  beforeUnmount() {
    this.killAllAnimations();
    if (this.$asscroll) {
      this.$asscroll.off('scroll', this.onScroll);
    }
    if (this.$gsap) {
      this.$gsap.ticker.remove(this.render);
    }
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
        
        this.animations = {
          rotate: null,
          translate: null
        };
      } catch (error) {
        console.warn('AppLoopText: Error killing animations:', error);
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
        console.warn('AppLoopText: Component not ready for animation');
        return null;
      }

      if (!this.$gsap) {
        console.warn('AppLoopText: GSAP not initialized');
        return null;
      }

      if (!element) {
        console.warn('AppLoopText: Animation target not found');
        return null;
      }

      try {
        return this.$gsap.to(element, {
          ...props,
          ease: props.ease || this.getEasing(),
          duration: props.duration || this.getDuration(),
        });
      } catch (error) {
        console.warn('AppLoopText: Animation error:', error);
        return null;
      }
    },

    initAnimation() {
      if (!this.isMounted || !this.isInitialized) return;

      // Set initial position
      this.position.value = 0;
      this.tweenPosition.value = 0;
      this.scrollDirection.value = 1;
      this.initDirection = this.direction === 'right' ? 1 : -1;

      // Start animation loop
      this.startAnimationLoop();
    },

    startAnimationLoop() {
      if (!this.isMounted || !this.isInitialized) return;

      try {
        requestAnimationFrame(this.animate);
      } catch (error) {
        console.warn('AppLoopText: Error starting animation loop:', error);
      }
    },

    animate() {
      if (!this.isMounted || !this.isInitialized) return;

      try {
        // 基準となるテキストブロックの横幅を取得
        const standard = this.refs.block.getBoundingClientRect().width;
        this.position.value += Math.floor(this.initDirection * (this.scrollSpeed * this.scrollDirection.value - (this.$asscroll?.currentPos - this.tweenPosition.value) * this.tweenScrollSpeed));

        // テキストブロックの横幅分、移動したら中心に戻す
        if (this.position.value < -standard) {
          this.position.value = 0;
        } else if (this.position.value > standard) {
          this.position.value = 0;
        }

        // ルートは常に中心に来るようにする
        this.refs.root.style.transform = `translate3d(${-standard}px, 0, 0)`;
        this.refs.wrapper.style.transform = `translate3d(${this.position.value}px, 0, 0)`;

        requestAnimationFrame(this.animate);
      } catch (error) {
        console.warn('AppLoopText: Error during animation:', error);
      }
    },

    fadeInAnimation() {
      if (!this.isMounted || !this.isInitialized) return;

      this.animations.rotate = this.safeGsapAnimation(this.refs.rotate, {
        duration: this.getDuration('short'),
        delay: this.start,
        ease: this.getEasing(),
        rotate: 0,
      });

      this.animations.translate = this.safeGsapAnimation(this.refs.translate, {
        duration: this.getDuration(),
        delay: this.start,
        ease: this.getEasing(),
        yPercent: 0,
      });
    },

    onScroll() {
      if (!this.isMounted || !this.isInitialized) return;
      if (!this.$asscroll) return;

      try {
        this.scrollDirection.value = this.$asscroll.currentPos > this.tweenPosition.value ? 1 : -1;
        this.tweenPosition.value = this.$asscroll.currentPos;
      } catch (error) {
        console.warn('AppLoopText: Error during scroll:', error);
      }
    },

    render() {
      if (!this.isMounted || !this.isInitialized) return;
      if (!this.refs.block || !this.refs.root || !this.refs.wrapper) return;

      try {
        // 基準となるテキストブロックの横幅を取得
        const standard = this.refs.block.getBoundingClientRect().width;
        this.position.value += Math.floor(this.initDirection * (this.scrollSpeed * this.scrollDirection.value - (this.$asscroll?.currentPos - this.tweenPosition.value) * this.tweenScrollSpeed));

        // テキストブロックの横幅分、移動したら中心に戻す
        if (this.position.value < -standard) {
          this.position.value = 0;
        } else if (this.position.value > standard) {
          this.position.value = 0;
        }

        // ルートは常に中心に来るようにする
        this.refs.root.style.transform = `translate3d(${-standard}px, 0, 0)`;
        this.refs.wrapper.style.transform = `translate3d(${this.position.value}px, 0, 0)`;
      } catch (error) {
        console.warn('AppLoopText: Error during render:', error);
      }
    }
  },
}
</script>

<style scoped lang="scss">
@use "~/assets/scss/constants/break-points" as *;
@use "~/assets/scss/functions/mixins" as *;

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
@use "~/assets/scss/constants/break-points" as *;
@use "~/assets/scss/functions/mixins" as *;

.app-loop-text-block {
  padding: 0 vw(6);
}
</style>

<style lang="scss" scoped>
@use "~/assets/scss/constants/break-points" as *;
@use "~/assets/scss/constants/color" as *;
@use "~/assets/scss/constants/font" as *;
@use "~/assets/scss/functions/mixins" as *;

// Add any existing styles here if needed
</style>
