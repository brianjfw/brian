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
  data: () => {
    return {
      name: ['H', 'I', 'S', 'A', 'M', 'I', 'K', 'U', 'R', 'I', 'T', 'A'],
      eventBus: useEventBus()
    }
  },
  computed: {
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    hambergerMenuState() {
      return this.$store.getters['hambergerMenu/state']
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
      return this.$store.getters['indexPickup/state']
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
    // Use event bus instead of $root
    this.eventBus.on('asscroll:ready', (asscroll) => {
      if (asscroll) {
        asscroll.on('scroll', this.onScroll)
      }
    })
  },

  beforeDestroy() {
    // Clean up event listeners
    if (this.$asscroll) {
      this.$asscroll.off('scroll', this.onScroll)
    }
    this.eventBus.off('asscroll:ready')
  },

  methods: {
    onScroll() {
      // ハンバーガーメニューが開いている時と遷移中は処理を返す
      if (this.hambergerMenuState || this.indexPickupState) return

      if (this.$asscroll.targetPos < 1.0) {
        this.$refs.HeaderLogo.classList.add('is-top')
      } else {
        this.$refs.HeaderLogo.classList.remove('is-top')
      }
    },

    onClickSameUrlReload(e) {
      e.preventDefault()

      if (this.$route.name === 'index') {
        this.$router.go({ path: this.$router.currentRoute.path, force: true })
      } else {
        this.$preDefaultEvent(true)
        this.$asscroll.disable()
        this.$store.commit('bg-transition/start', '#f0efeb')
        this.$store.commit('mouse/loading')

        setTimeout(() => {
          this.$router.push(`/`)
          this.$store.commit('mouse/loadend')
        }, this.$SITECONFIG.pageTransitionDuration)
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
