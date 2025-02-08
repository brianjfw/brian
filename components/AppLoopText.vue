<style lang="scss" scoped>

.app-loop-text {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.app-loop-text-wrapper {
  display: inline-block;
  padding: 0 100%;
}

.app-loop-text-block {
  display: inline-block;
  font-family: fonts.$helvetica;
  font-weight: bold;
  letter-spacing: 0.08em;
}
</style>

<!-- クローンを動的に生成するクラスはscopedから外す -->
<style >
@use '../assets/scss/functions/function.scss';

.app-loop-text-block {
  padding: 0 vw(6);
}
</style>

<template>
  <div ref="root" class="app-loop-text" :class="`app-loop-text-${direction}`">
    <div ref="wrapper" class="app-loop-text-wrapper">
      <span v-for="(char, index) in text" :key="index" class="app-loop-text-block" v-text="char"></span>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'

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
    loop: function () {
      if (this.loop === 'start') {
        this.toRight()
      } else {
        this.reset()
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      if (!this.animation) return

      this.textWrapper = this.$refs.textWrapper
      this.textWrapperWidth = this.textWrapper.clientWidth

      this.$gsap.set(this.$refs.text01, {
        x: 0,
      })

      this.$gsap.set(this.$refs.text02, {
        x: this.textWrapperWidth,
      })

      this.initText()
      this.createText()
    })
  },

  beforeDestroy() {
    if (this.tl) {
      this.tl.kill()
    }
    this.tl = null
    this.observe = null
    this.textWrapper = null
    this.textWrapperRect = null
  },

  methods: {
    /**
     * テキストを複製して親要素に追加する
     */
    cloneText() {
      this.cloneTextEl = document.createElement('span')
      this.cloneTextEl.className = this.blockEl.className
      this.cloneTextEl.innerHTML = this.blockEl.textContent
      this.translateEl.append(this.cloneTextEl)
    },
    /**
     * テキストをウィンドウの横幅を超えるまで生成する
     */
    createText() {
      this.$nextTick(() => {
        if (!this.$refs.textWrapper) return;
        this.textWrapperRect = this.$refs.textWrapper.getBoundingClientRect()

        this.x = this.speed * this.textWrapperRect.width
        this.tl = gsap.timeline({ repeat: -1 })
        this.tl.to(this.$refs.text01, {
          duration: this.duration,
          x: -this.textWrapperRect.width,
          ease: 'none',
        })
        this.tl.to(
          this.$refs.text02,
          {
            duration: this.duration,
            x: 0,
            ease: 'none',
          },
          '<'
        )
      })
    },
    initText() {
      this.$nextTick(() => {
        if (!this.$refs.textWrapper) return;
        this.createText()
      })
    },
    /**
     * 上下のスクロールでテキストが左右に流れる方向を変更する
     */
    getScrollDirection() {
      if (this.scrollDirectionFlag || this.hambergerMenuState) return

      const currentPos = this.$asscroll.currentPos

      // 下スクロール
      if (currentPos > this.startPos) {
        this.$gsap.to(this.scrollDirection, {
          duration: this.$SITECONFIG.shortDuration,
          ease: 'none',
          value: -1,
        })
      }
      // 上スクロール
      else {
        this.$gsap.to(this.scrollDirection, {
          duration: this.$SITECONFIG.shortDuration,
          ease: 'none',
          value: 1,
        })
      }
      this.startPos = currentPos

      // 急に切り替えずにゆったりと方向を切り替えさせたいので、
      // 発火したらインターバルを作成する
      this.scrollDirectionFlag = true
      setTimeout(() => {
        this.scrollDirectionFlag = false
      }, 600)
    },

    /**
     * 現在のスクロール位置に、補完される値を取得する
     */
    getScrollTweenPosition() {
      if (this.hambergerMenuState) return

      this.$gsap.to(this.tweenPosition, {
        duration: this.$SITECONFIG.baseDuration,
        ease: 'none',
        value: this.$asscroll.currentPos,
      })
    },

    onScroll() {
      this.getScrollDirection()
      this.getScrollTweenPosition()
    },

    render() {
      if (this.hambergerMenuState) return

      // 基準となるテキストブロックの横幅を取得
      const standard = this.blockEl.getBoundingClientRect().width
      this.position.value += Math.floor(this.initDirection * (this.scrollSpeed * this.scrollDirection.value - (this.$asscroll.currentPos - this.tweenPosition.value) * this.tweenScrollSpeed))

      // テキストブロックの横幅分、移動したら中心に戻す
      if (this.position.value < -standard) {
        this.position.value = 0
      } else if (this.position.value > standard) {
        this.position.value = 0
      }

      // ルートは常に中心に来るようにする
      this.rootEl.style.transform = `translate3d(${-standard}px, 0, 0)`
      this.wrapperEl.style.transform = `translate3d(${this.position.value}px, 0, 0)`
    },

    fadeInAnimation() {
      this.$gsap.to(this.rotateEl, {
        duration: this.$SITECONFIG.shortDuration,
        delay: this.start,
        ease: this.$EASING.transform,
        rotate: 0,
      })
      this.$gsap.to(this.translateEl, {
        duration: this.$SITECONFIG.baseDuration,
        delay: this.start,
        ease: this.$EASING.transform,
        yPercent: 0,
      })
    },

    /**
     * 画面内に表示された時に一度だけ発火
     */
    observe() {
      this.observer = this.rootEl
      this.iObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.fadeInAnimation()
              this.iObserver.unobserve(this.observer)
            }
          })
        },
        { rootMargin: '0%' }
      )
      this.iObserver.observe(this.observer)
    },

    toRight() {
      this.$gsap.set(this.$refs.wrapper, {
        x: this.direction === 'right' ? 0 : '-50%',
      })
      this.$gsap.to(this.$refs.wrapper, {
        duration: 16,
        ease: 'none',
        x: this.direction === 'right' ? '-50%' : 0,
        repeat: -1,
      })
    },

    reset() {
      this.$gsap.killTweensOf(this.$refs.wrapper)
    },
  },
}
</script>
