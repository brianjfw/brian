<template>
  <div class="index">
    <div class="hero-and-about">
      <MainVisualSection />
      <AboutSection />
    </div>
    <SelectProjectPickupSection :pickup-data="getPickupData" />
    <SelectProjectCardSection :project-data="getProjectData" :pickup-end-data="getPickupEndData" />
    <ContactSection :project-data="getProjectData" :contact-data="getContactData" />
  </div>
</template>

<script>
import ImagesLoaded from 'imagesloaded'
import MainVisualSection from '@/components/index/MainVisualSection.vue'
import AboutSection from '@/components/index/AboutSection.vue'
import SelectProjectPickupSection from '@/components/index/SelectProjectPickupSection.vue'
import SelectProjectCardSection from '@/components/index/SelectProjectCardSection.vue'
import ContactSection from '@/components/index/ContactSection.vue'

export default {
  name: 'Index',

  components: {
    MainVisualSection,
    AboutSection,
    SelectProjectPickupSection,
    SelectProjectCardSection,
    ContactSection
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
    getPickupEndData() {
      // Provide a default object if the third pickup item doesn't exist
      return this.getPickupData[2] || {
        siteColor: {
          bodyContentsColor: '#ffffff'
        }
      }
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

  beforeDestroy() {
    // リセット
    this.$preDefaultEvent(false)
    this.$asscroll.disable()
    this.$store.commit('imageLoaded/init')
  },
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/constants/animation" as *;

.index {
  overflow: hidden;
}

.hero-and-about {
  position: relative;
  overflow: hidden;
}
</style>
