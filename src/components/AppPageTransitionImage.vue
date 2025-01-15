<template>
  <button @click="onClick"><slot></slot></button>
</template>

<script>
export default {
  props: {
    /**
     * url : 遷移先
     * index : 案件に固有に振り渡している番号
     */
    url: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  methods: {
    onClick(e) {
      e.preventDefault()

      // 同一URLは処理を返す
      if (this.url === this.$route.path) {
        console.log('[PageTransition] Skipping transition - same URL');
        return;
      }

      console.log(`[PageTransition] Starting transition to ${this.url} with index ${this.index}`);

      this.$preDefaultEvent(true)
      this.$asscroll.disable()
      
      try {
        this.$store.commit('image-transition/start', this.index)
        this.$store.commit('mouse/loading')
        
        console.log('[PageTransition] Transition animations started');

        setTimeout(() => {
          console.log('[PageTransition] Navigating to new route');
          this.$router.push(`${this.url}`)
          
          if (this.$SITECONFIG.isNoTouch) {
            console.log('[PageTransition] Ending mouse loading state');
            this.$store.commit('mouse/loadend')
          }
        }, this.$SITECONFIG.pageTransitionDuration)
      } catch (error) {
        console.error('[PageTransition] Error during transition:', error);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use "~/assets/scss/constants/break-points" as *;
@use "~/assets/scss/constants/color" as *;
@use "~/assets/scss/constants/font" as *;
@use "~/assets/scss/functions/mixins" as *;
</style>
