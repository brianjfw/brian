<template>
  <div class="index">
    <div class="hero-and-about">
      <IndexMainVisualSection />
      <IndexAboutSection />
    </div>
    <IndexSelectProjectPickupSection :pickup-data="getPickupData" />
    <IndexSelectProjectCardSection :project-data="getProjectData" :pickup-end-data="getPickupData[2]" />
    <IndexContactSection :project-data="getProjectData" :contact-data="getContactData" />
  </div>
</template>

<script>
import ImagesLoaded from 'imagesloaded'
import IndexMainVisualSection from '@/components/index/MainVisualSection.vue'
import IndexAboutSection from '@/components/index/AboutSection.vue'
import IndexSelectProjectPickupSection from '@/components/index/SelectProjectPickupSection.vue'
import IndexSelectProjectCardSection from '@/components/index/SelectProjectCardSection.vue'
import IndexContactSection from '@/components/index/ContactSection.vue'

export default {
  name: 'HomePage',
  
  components: {
    IndexMainVisualSection,
    IndexAboutSection,
    IndexSelectProjectPickupSection,
    IndexSelectProjectCardSection,
    IndexContactSection
  },

  computed: {
    getProjectData() {
      return this.$store.getters.projectData
    },
    getContactData() {
      return this.$store.getters.contactData
    },
    getPickupData() {
      return this.$store.getters.pickupData
    },
    defaultTransitionState() {
      return this.$store.getters['bg-transition/state']
    },
    imageTransitionState() {
      return this.$store.getters['image-transition/state']
    },
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    imageLoaded() {
      return this.$store.getters['imageLoaded/isLoad']
    },
  },

  watch: {
    openningEnd() {
      setTimeout(() => {
        // スクロール可能にする
        if (this.$SITECONFIG.isTouch) this.$backfaceScroll(true)
        this.$asscroll.enable({ reset: true })
      }, 1200)
    },
    imageLoaded() {
      if (this.imageLoaded) {
        if (!this.openningEnd) return // アクセス時はopenningEndが発火するので、処理を返す

        // スクロール可能にする
        if (this.$SITECONFIG.isTouch) this.$backfaceScroll(true)
        this.$asscroll.enable({ reset: true })
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      const images = document.querySelectorAll('.index img')
      const imagesLoaded = ImagesLoaded(images)

      // 画像の読み込みが全て完了した時
      imagesLoaded.on('always', () => {
        // 遷移のアニメーションを終了させる
        if (this.defaultTransitionState) this.$store.commit('bg-transition/end')
        if (this.imageTransitionState) this.$store.commit('image-transition/end')
        this.$store.commit('mouse/loadend')

        this.$store.commit('imageLoaded/loaded')
      })
    })
  },

  beforeUnmount() {
    // リセット
    this.$preDefaultEvent(false)
    this.$asscroll.disable()
    this.$store.commit('imageLoaded/init')
  },
}
</script>

<style lang="scss" scoped>
.index {
  overflow: hidden;
}

.hero-and-about {
  position: relative;
  overflow: hidden;
}
</style>
