<template>
  <div v-if="isReady" class="openning">
    <div class="openning-bg">
      <div class="openning-bg-circle">
        <span class="openning-bg-circle-01"></span>
        <span class="openning-bg-circle-02"></span>
        <span class="openning-bg-circle-03"></span>
      </div>
      <div class="openning-bg-text">
        <span v-for="(text, index) in name" :key="index" class="openning-bg-text-wrapper">
          {{ text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { useEventBus } from '@/plugins/eventBus'

export default {
  name: 'BaseOpenning',
  
  data() {
    return {
      index: 0,
      name: ['H', 'I', 'S', 'A', 'M', 'I', 'K', 'U', 'R', 'I', 'T', 'A'],
      isReady: false,
      eventBus: useEventBus()
    }
  },

  computed: {
    ...mapState({
      firstAccess: state => state.app.firstAccess,
      projectData: state => state.projectData || []
    }),
    storeInitialized() {
      return this.$store.getters.isInitialized
    },
    configInitialized() {
      return this.$SITECONFIG.isInitialized
    }
  },

  watch: {
    storeInitialized: {
      handler(newVal) {
        if (newVal) this.checkInitialization()
      },
      immediate: true
    },
    configInitialized: {
      handler(newVal) {
        if (newVal) this.checkInitialization()
      },
      immediate: true
    }
  },

  methods: {
    checkInitialization() {
      if (this.storeInitialized && this.configInitialized) {
        this.initializeComponent()
      }
    },

    async initializeComponent() {
      try {
        // Wait for ASScroll to be ready
        await new Promise(resolve => {
          this.eventBus.once('asscroll:ready', resolve)
        })

        // Handle touch devices
        if (this.$SITECONFIG.isTouch) {
          window.scrollTo({ top: 0 })
          this.$preDefaultEvent(false)
        }

        // Get project index for direct access
        let index = 0
        try {
          if (this.$route.params.slug) {
            index = this.projectData.findIndex(content => content.id === this.$route.params.slug)
            if (index === -1) index = 0
          }
        } catch (error) {
          console.error('Error accessing project data:', error)
          index = 0
        }

        // Component is ready
        this.isReady = true

        // Start animation if this is first access
        if (this.firstAccess) {
          this.startAnimation()
        } else {
          this.skipAnimation()
        }
      } catch (error) {
        console.error('Failed to initialize opening:', error)
      }
    },

    startAnimation() {
      // Your existing animation code here
    },

    skipAnimation() {
      // Your existing skip animation code here
    }
  },

  beforeDestroy() {
    // Clean up event listeners
    this.eventBus.off('asscroll:ready')
  }
}
</script>

<style lang="scss" scoped>
.openning {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $white;
  color: $black;
  font-size: 72px;
  font-family: $sixcaps;
  z-index: 2;
  overflow: hidden;
}

.openning-num {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 63px;
  height: 72px;
  text-align: right;
  opacity: 0;
  overflow: hidden;
}

.openning-num-first {
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
}

.openning-num-second {
  position: absolute;
  top: 0;
  left: 14px;
  width: 14px;
}

.openning-num-third {
  position: absolute;
  top: 0;
  left: 29px;
  width: 14px;
}

.openning-num-forth {
  position: absolute;
  top: 0;
  left: 14px;
  width: 14px;
  opacity: 0;
}

.openning-num-five {
  position: absolute;
  top: 0;
  left: 29px;
  width: 14px;
  opacity: 0;
}

.openning-percent {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 32px;
}

.openning-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  color: $black;
  font-size: 60px;
  font-family: $sixcaps;
  backface-visibility: hidden;
  overflow: hidden;
  opacity: 0;
}

.openning-name-block {
  display: inline-block;
  transform: translateY(100%);
}

.openning-portfolio {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0) scaleX(0.1);
  color: $black;
  font-size: 60px;
  font-family: $sixcaps;
  backface-visibility: hidden;
  opacity: 0;
}

.openning-circle-line-01 {
  position: absolute;
  top: -86px;
  right: 20px;
  left: 0;
  width: 14px;
  height: 86px;
  margin: 0 auto;
  border-radius: 8px;
  transform-origin: bottom;
  line-height: 0.84;
  background: linear-gradient(
    to bottom,
    transparent,
    $black 25%,
    $black 75%,
    transparent
  );
}

.openning-circle-line-02 {
  position: absolute;
  bottom: -86px;
  right: -12px;
  left: 0;
  width: 14px;
  height: 86px;
  margin: 0 auto;
  border-radius: 8px;
  transform-origin: top;
  line-height: 0.84;
  background: linear-gradient(
    to bottom,
    transparent,
    $black 25%,
    $black 75%,
    transparent
  );
}

.openning-circle-line-01-block,
.openning-circle-line-02-block {
  display: inline-block;
}

.openning-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0) scale(0);
  width: 900px;
  height: 900px;
  border-radius: 50%;
  border: solid 1px $black;
}

.openning-bg-circle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.openning-bg-circle-color-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.openning-bg-circle-color-01 {
  position: absolute;
  top: -607px;
  left: 146px;
  width: 597px;
  height: 597px;
  background-color: $lightBlue;
  border-radius: 50%;
}

.openning-bg-circle-color-02 {
  position: absolute;
  top: -346px;
  left: 86px;
  width: 296px;
  height: 296px;
  background-color: $thinPink;
  border-radius: 50%;
}

.openning-bg-circle-color-03 {
  position: absolute;
  bottom: -381px;
  left: 406px;
  width: 311px;
  height: 311px;
  background-color: $yellow;
  border-radius: 50%;
}

.openning-bg-circle-color-04 {
  position: absolute;
  bottom: -452px;
  left: 276px;
  width: 402px;
  height: 402px;
  background-color: $thinPink;
  border-radius: 50%;
}

.openning-bg-circle-color-05 {
  position: absolute;
  bottom: -300px;
  left: 122px;
  width: 296px;
  height: 296px;
  background-color: $lightBlue;
  border-radius: 50%;
}

.openning-bg-circle-color-06 {
  position: absolute;
  bottom: -660px;
  right: 440px;
  width: 331px;
  height: 331px;
  background-color: $thinPink;
  border-radius: 50%;
}

.openning-bg-circle-color-07 {
  position: absolute;
  bottom: -647px;
  right: 186px;
  width: 597px;
  height: 597px;
  background-color: $yellow;
  border-radius: 50%;
}

.openning-bg-circle-color-08 {
  position: absolute;
  bottom: -547px;
  right: 210px;
  width: 296px;
  height: 296px;
  background-color: $blue;
  border-radius: 50%;
}

.openning-bg-circle-color-09 {
  position: absolute;
  bottom: -270px;
  right: 6px;
  width: 241px;
  height: 241px;
  background-color: $thinPink;
  border-radius: 50%;
}

.openning-bg-circle {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 142vmax;
  height: 142vmax;
  pointer-events: none;

  @include tab() {
    width: 150vmax;
    height: 150vmax;
  }

  @include sp() {
    left: 50%;
    width: 140vmax;
    height: 140vmax;
  }
}

.openning-bg-circle-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: scale(1);
  background-color: $skinColor;
}
</style>
