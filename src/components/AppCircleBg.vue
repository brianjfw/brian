<template>
  <span class="circle-bg" :class="`circle-bg-${modifier}`"
    ><span
      ref="CircleBgElement"
      class="circle-bg-element"
      :class="`circle-bg-element-${modifier}`"
      :style="`background-color:${color}`"
    ></span
  ></span>
</template>

<script>
export default {
  props: {
    state: {
      type: String,
      default: '',
    },
    modifier: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  },
  watch: {
    state: function () {
      switch (this.state) {
        case 'extend':
          this.toExtend()
          break
        case 'shrink':
          this.toShrink()
          break
      }
    },
  },
  data() {
    return {
      isInitialized: false,
      isMounted: false,
      refs: {
        CircleBgElement: null
      }
    }
  },
  beforeMount() {
    this.isMounted = false;
    this.isInitialized = false;
  },
  mounted() {
    this.isMounted = true;
    this.refs.CircleBgElement = this.$refs.CircleBgElement;
    if (this.refs.CircleBgElement) {
      this.isInitialized = true;
    }
  },
  beforeUnmount() {
    this.isMounted = false;
    this.isInitialized = false;
  },
  methods: {
    getEasing() {
      return this.$EASING?.transform || 'power2.out';
    },
    getDuration() {
      return (this.$SITECONFIG?.baseDuration || 0.6) * 1.2;
    },
    safeGsapAnimation(element, props) {
      if (!this.isMounted || !this.isInitialized) {
        console.warn('AppCircleBg: Component not ready for animation');
        return null;
      }
      if (!this.$gsap) {
        console.warn('AppCircleBg: GSAP not initialized');
        return null;
      }
      if (!element) {
        console.warn('AppCircleBg: Animation target not found');
        return null;
      }
      try {
        return this.$gsap.to(element, {
          ...props,
          ease: props.ease || this.getEasing(),
          duration: props.duration || this.getDuration(),
        });
      } catch (error) {
        console.warn('AppCircleBg: Animation error:', error);
        return null;
      }
    },
    toExtend() {
      if (!this.isMounted || !this.isInitialized) return;
      this.safeGsapAnimation(this.refs.CircleBgElement, {
        scale: 1
      });
    },
    toShrink() {
      if (!this.isMounted || !this.isInitialized) return;
      this.safeGsapAnimation(this.refs.CircleBgElement, {
        scale: 0
      });
    }
  },
}
</script>

<style lang="scss">
@use "~/assets/scss/constants/break-points" as *;
@use "~/assets/scss/constants/color" as *;
@use "~/assets/scss/functions/mixins" as *;

.circle-bg {
  display: block;
  position: absolute;
  top: 50%;
  left: 45%;
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

.circle-bg-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: scale(0);
}

//modifier

.circle-bg-index-contact {
  top: 0;
  width: 160vmax;
  height: 160vmax;
  transform: translate3d(-50%, 0, 0);

  @include tab() {
    width: 180vmax;
    height: 180vmax;
  }

  @include sp() {
    left: 50%;
    width: 195vmax;
    height: 375vmax;
  }
}

.circle-bg-element-index-contact {
  background-color: $thinPink;
}

.circle-bg-element-about-intro {
  background-color: $thinPink;
}

.circle-bg-element-about-project {
  background-color: $skinColor;
}
</style>