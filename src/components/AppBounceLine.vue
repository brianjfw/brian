<template>
  <svg
    ref="svg"
    :style="`transform-origin:${origin};`"
    class="app-bounce-line"
    :class="`app-bounce-line--${modifier}`"
    :viewBox="`0 0 ${width} 160`"
    @mousemove="onMousemove"
    @mouseleave="onMouseLeave"
  >
    <path fill="none" stroke-width="1" :d="`M000,80 Q ${width / 2} ${path.y}, ${width},80`" />
  </svg>
</template>

<script>
export default {
  props: {
    /**
     * origin : transform-originの値を変更する、（right,left）
     * start : 数値分アニメーションをdelayさせる
     * width : ラインの横幅
     * state : 親コンポーネントから監視されているアニメーションの状態管理用のprops
     * modifier : 見た目を変更するクラス
     * pcAnimation : PCでアニメーションさせるか、させないかを決める
     * spAnimation : SPでアニメーションさせるか、させないかを決める
     */
    origin: {
      type: String,
      default: 'right',
    },
    start: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      require: true,
      default: 0,
    },
    state: {
      type: String,
      default: '',
    },
    modifier: {
      type: String,
      default: '',
    },
    pcAnimation: {
      type: Boolean,
      default: true,
    },
    spAnimation: {
      type: Boolean,
      default: true,
    },
  },

  data: () => {
    return {
      path: { y: 200 },
      isInitialized: false,
      isMounted: false,
      animations: {
        mouseMove: null,
        mouseLeave: null,
        fadeIn: null
      }
    }
  },

  watch: {
    /**
     * 親コンポーネントからアニメーションの状態管理をする
     */
    state() {
      if (!this.isMounted || !this.isInitialized) {
        console.warn('AppBounceLine: Component not ready for animation');
        return;
      }

      try {
        if (this.state === 'extend') {
          this.fadeInAnimation();
        }
      } catch (error) {
        console.warn('AppBounceLine: Error during state change:', error);
      }
    },
  },

  beforeMount() {
    this.isMounted = false;
    this.isInitialized = false;
  },

  mounted() {
    this.isMounted = true;
    
    try {
      this.svg = this.$refs.svg;
      if (!this.svg) {
        console.warn('AppBounceLine: SVG element not found');
        return;
      }

      this.amplitude = 0.07;
      this.baseLine = 80;
      this.isFadeInAnimationActive = false;
      this.isMouseLeaveBounceAnimationActive = false;

      // アニメーションさせない場合は基準位置にする
      if (!this.pcAnimation && !this.spAnimation) {
        this.path.y = this.baseLine;
      }

      this.isInitialized = true;
    } catch (error) {
      console.warn('AppBounceLine: Error during initialization:', error);
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
        
        this.animations = {
          mouseMove: null,
          mouseLeave: null,
          fadeIn: null
        };
      } catch (error) {
        console.warn('AppBounceLine: Error killing animations:', error);
      }
    },

    getEasing() {
      return this.$EASING?.transform || 'power1.out';
    },

    getDuration() {
      return this.$SITECONFIG?.baseDuration || 0.3;
    },

    safeGsapAnimation(target, props) {
      if (!this.isMounted || !this.isInitialized) {
        console.warn('AppBounceLine: Component not ready for animation');
        return null;
      }

      if (!this.$gsap) {
        console.warn('AppBounceLine: GSAP not initialized');
        return null;
      }

      if (!target) {
        console.warn('AppBounceLine: Animation target not found');
        return null;
      }

      try {
        return this.$gsap.to(target, {
          ...props,
          ease: props.ease || this.getEasing(),
          duration: props.duration || this.getDuration(),
        });
      } catch (error) {
        console.warn('AppBounceLine: Animation error:', error);
        return null;
      }
    },

    onMousemove(e) {
      if (!this.isMounted || !this.isInitialized) return;
      if ((!this.spAnimation && this.$SITECONFIG?.isMobile) || 
          this.isFadeInAnimationActive || 
          !(e.target === this.svg && !this.isMouseLeaveBounceAnimationActive)) return;

      if (this.animations.mouseLeave?.kill) {
        this.animations.mouseLeave.kill();
      }
      
      this.animations.mouseMove = this.safeGsapAnimation(this.path, {
        duration: 0.3,
        ease: 'power1.out',
        y: (e.offsetY / this.svg.clientHeight - 0.5) * (this.svg.clientHeight + this.svg.clientWidth) * this.amplitude + this.baseLine,
      });
    },

    onMouseLeave() {
      if (!this.isMounted || !this.isInitialized) return;
      if ((!this.spAnimation && this.$SITECONFIG?.isMobile) || this.isFadeInAnimationActive) return;

      if (this.animations.mouseMove?.kill) {
        this.animations.mouseMove.kill();
      }

      this.isMouseLeaveBounceAnimationActive = true;
      
      this.animations.mouseLeave = this.safeGsapAnimation(this.path, {
        duration: 1.0,
        ease: 'elastic.out(1, 0.3)',
        y: this.baseLine,
      });
      
      setTimeout(() => {
        this.isMouseLeaveBounceAnimationActive = false;
      }, 100);
    },

    fadeInAnimation() {
      if (!this.isMounted || !this.isInitialized) return;
      if ((!this.spAnimation && this.$SITECONFIG?.isMobile) || (!this.pcAnimation && this.$SITECONFIG?.isPc)) return;

      this.isFadeInAnimationActive = true;

      this.animations.fadeIn = this.safeGsapAnimation(this.path, {
        duration: this.getDuration(),
        ease: this.getEasing(),
        delay: this.start,
        y: this.baseLine,
        onComplete: () => {
          this.isFadeInAnimationActive = false;
        },
      });

      this.safeGsapAnimation(this.svg, {
        duration: this.getDuration(),
        ease: this.getEasing(),
        delay: this.start,
        scaleX: 1,
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@use "~/assets/scss/constants/break-points" as *;
@use "~/assets/scss/functions/mixins" as *;

.app-bounce-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (hover: hover) and (pointer: fine) {
  .bounce-line:hover {
    cursor: pointer;
  }
}

.bounce-line-path {
  fill: none;
  stroke: $black;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}
</style>
