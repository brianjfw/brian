<template>
  <div class="works">
    <!-- ページによって色を変更する -->
    <div
      class="works-bg"
      :style="`
      background-color:${currentProject.siteColor.bodyContentsColor};
      color:${currentProject.siteColor.allTextColor};
      stroke:${currentProject.siteColor.mvTextColor};
      `"
    >
      <WorksMainVisualSection :current-project="currentProject" />
      <WorksProjectVideoSection :current-project="currentProject" />
      <WorksProjectContentsSection :current-project="currentProject" />
      <WorksNextProjectSection :current-project="currentProject" :next-project="nextProject" />
    </div>
  </div>
</template>

<script>
import { imageLoader } from '@/utils/imageLoader'

export default {
  name: 'WorksPage',
  data() {
    return {
      imagesLoaded: false,
      loadError: false
    }
  },
  computed: {
    /**
     * 現在のプロジェクトを取得
     */
    currentProject() {
      const projectResponse = this.$store.getters.projectData
      const index = projectResponse.findIndex((content) => content.id === this.$router.history.current.params.slug)
      const currentProject = projectResponse[index]
      currentProject.index = index + 1

      return currentProject
    },

    /**
     * 次のプロジェクトを取得
     */
    nextProject() {
      const projectResponse = this.$store.getters.projectData
      const index = projectResponse.findIndex((content) => content.id === this.$router.history.current.params.slug)
      let nextProject = null

      if (index === projectResponse.length - 1) {
        nextProject = projectResponse[0]
      } else {
        nextProject = projectResponse[index + 1]
      }

      return nextProject
    },

    indexPickupIsAnimation() {
      return this.$store.state.indexPickup.isAnimating
    },
    defaultTransitionState() {
      return this.$store.state['bg-transition'].isActive
    },
    imageTransitionState() {
      return this.$store.state['image-transition'].isActive
    },
    pickupTransitionState() {
      return this.$store.state.indexPickup.isTransitioning
    },
    openningEnd() {
      return this.$store.state.openning.isComplete
    }
  },
  watch: {
    openningEnd() {
      setTimeout(() => {
        if (this.$SITECONFIG.isTouch) {
          this.$backfaceScroll(true)
        }
        if (this.$asscroll) {
          this.$asscroll.enable({ reset: true })
        }
      }, 1200)
    },
    imagesLoaded(newVal) {
      if (newVal && !this.openningEnd) {
        if (this.$SITECONFIG.isTouch) {
          this.$backfaceScroll(true)
        }
        if (this.$asscroll) {
          this.$asscroll.enable({ reset: true })
        }
      }
    }
  },
  async mounted() {
    try {
      // Load all images in the works page
      await imageLoader.loadImages('.works')
      
      // Update state once images are loaded
      this.imagesLoaded = true
      
      // Small delay to prevent scroll issues
      setTimeout(() => {
        // Handle transitions
        if (this.defaultTransitionState) {
          this.$store.commit('bg-transition/end')
        }
        if (this.imageTransitionState) {
          this.$store.commit('image-transition/end')
        }
        if (this.pickupTransitionState) {
          this.$store.commit('indexPickup/transition', false)
        }
        
        this.$store.commit('mouse/loadend')
        this.$store.commit('imageLoaded/loaded')
      }, 100)
      
      // Remove particle with delay
      setTimeout(() => {
        if (this.indexPickupIsAnimation) {
          this.$store.commit('indexPickup/sceneAnimationState', false)
        }
      }, 1200)
    } catch (error) {
      console.error('Failed to load images:', error)
      this.loadError = true
      
      // Still end transitions even if some images failed
      if (this.defaultTransitionState) {
        this.$store.commit('bg-transition/end')
      }
      if (this.imageTransitionState) {
        this.$store.commit('image-transition/end')
      }
      if (this.pickupTransitionState) {
        this.$store.commit('indexPickup/transition', false)
      }
      this.$store.commit('mouse/loadend')
    }
  },
  beforeDestroy() {
    this.$preDefaultEvent(false)
    if (this.$asscroll) {
      this.$asscroll.disable()
    }
    this.$store.commit('indexPickup/setScene', 'init')
    this.$store.commit('imageLoaded/init')
  }
}
</script>

<style lang="scss" scoped>
.works {
  overflow: hidden;
}
</style>
