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
    }
  },

  watch: {
    /**
     * 親コンポーネントからアニメーションの状態管理をする
     */
    state() {
      if (this.state === 'extend') this.fadeInAnimation()
    },
  },

  mounted() {
    /**
     * 参考
     * https://codepen.io/osublake/pen/qaRBmY/613dea251165576962577e898b1a4ce7?editors=1010
     */
    this.svg = this.$refs.svg
    this.amplitude = 0.07
    this.baseLine = 80
    this.mouseMoveBounceAnimation = null
    this.mouseLeaveBounceAnimation = null
    this.isFadeInAnimationActive = false
    this.isMouseLeaveBounceAnimationActive = false

    // アニメーションさせない場合は基準位置にする
    if (!this.pcAnimation && !this.spAnimation) this.path.y = this.baseLine
  },

  methods: {
    onMousemove(e) {
      // SPデバイスかフェードインアニメーション中は処理を返す
      // SVGに触れている時だけ実行
      if ((!this.spAnimation && this.$SITECONFIG.isMobile) || this.isFadeInAnimationActive || !(e.target === this.svg && !this.isMouseLeaveBounceAnimationActive)) return
      if (this.mouseLeaveBounceAnimation) this.mouseLeaveBounceAnimation.kill()
      // Y軸の値をマウスの位置から吸着させてるように動かす
      this.mouseMoveBounceAnimation = this.$gsap.to(this.path, {
        duration: 0.3,
        ease: 'power1.out',
        y: (e.offsetY / this.svg.clientHeight - 0.5) * (this.svg.clientHeight + this.svg.clientWidth) * this.amplitude + this.baseLine,
      })
    },
    onMouseLeave() {
      // SPデバイスかフェードインアニメーション中は処理を返す
      if ((!this.spAnimation && this.$SITECONFIG.isMobile) || this.isFadeInAnimationActive) return
      if (this.mouseMoveBounceAnimation) this.mouseMoveBounceAnimation.kill()
      this.isMouseLeaveBounceAnimationActive = true
      // Y軸の値をバウンスさせて元に戻す
      this.mouseLeaveBounceAnimation = this.$gsap.to(this.path, {
        duration: 1.0,
        ease: 'elastic.out(1, 0.3)',
        y: this.baseLine,
      })
      setTimeout(() => {
        this.isMouseLeaveBounceAnimationActive = false
      }, 100)
    },
    fadeInAnimation() {
      // propsの設定でアニメーションをさせない場合は処理を返す
      if ((!this.spAnimation && this.$SITECONFIG.isMobile) || (!this.pcAnimation && this.$SITECONFIG.isPc)) return

      this.isFadeInAnimationActive = true

      this.$gsap.to(this.path, {
        duration: this.$SITECONFIG.baseDuration,
        ease: this.$EASING.transform,
        delay: this.start,
        y: this.baseLine,
        onComplete: () => {
          this.isFadeInAnimationActive = false
        },
      })
      this.$gsap.to(this.svg, {
        duration: this.$SITECONFIG.baseDuration,
        ease: this.$EASING.transform,
        delay: this.start,
        scaleX: 1,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@use "~/assets/scss/constants/break-points" as *;
@use "~/assets/scss/functions/mixins" as *;

.app-bounce-line {
  // ... existing code ...
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
