<template>
  <div ref="ContentsLoopTitleWrapper" class="contents-loop-title-wrapper">
    <div ref="ContentsLoopTitle" class="contents-loop-title">
      <span ref="ContentsLoopVideo" class="contents-loop-video">
        <span class="contents-loop-video-shadow" :style="`box-shadow:0 22px 60px 0px ${currentProject.siteColor.shadowColor}`"></span>
        <span class="contents-loop-video-wrapper">
          <video 
            :poster="getPosterUrl(currentProject.id)" 
            :src="getVideoUrl(currentProject.id)" 
            playsinline 
            autoplay 
            loop 
            muted 
            disablePictureInPicture 
            disableRemotePlayback
          ></video>
        </span>
      </span>
      <AppLoopText :loop="isLoopTextState" :text="currentProject.title.short" />
    </div>
    <div class="contents-loop-card">
      <AppCard
        :component-name="'works'"
        :shadow-color="currentProject.siteColor.shadowColor"
        :color="currentProject.siteColor.allTextColor"
        :external-link="currentProject.siteLink"
        :xspeed="0.04"
        :yspeed="0.04"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentProject: {
      type: Object,
      required: true,
    },
  },

  data: () => {
    return {
      isTextSegmentState: 'default',
      isLoopTextState: 'default',
      observe: null,
      iObserverTextSegment: null,
      iObserverLoopText: null,
      iObserverLoopVideo: null,
    }
  },

  computed: {
    hambergerMenuState() {
      return this.$store?.getters?.['hambergerMenu/state'] ?? false
    },
    isPc() {
      return this.$SITECONFIG?.isPc ?? false
    },
    isNoTouch() {
      return this.$SITECONFIG?.isNoTouch ?? false
    },
    fullDuration() {
      return this.$SITECONFIG?.fullDuration ?? 1.2
    }
  },

  watch: {
    hambergerMenuState() {
      if (!this.isPc || !this.isNoTouch) return

      if (this.hambergerMenuState) {
        this.removeVideoObserver()
        this.removeMouseMoveListener()
      } else {
        this.setupVideoObserver()
        this.addMouseMoveListener()
      }
    },
  },

  mounted() {
    this.setupObservers()
  },

  beforeUnmount() {
    this.cleanupObservers()
  },

  methods: {
    setupObservers() {
      try {
        this.setupTextSegmentObserver()
        this.setupLoopTextObserver()
        if (this.isPc && this.isNoTouch) {
          this.setupVideoObserver()
        }
      } catch (error) {
        console.error('Error setting up observers:', error)
      }
    },

    setupTextSegmentObserver() {
      if (!this.$refs.ContentsLoopTitle) return

      try {
        this.observe = this.$refs.ContentsLoopTitle
        this.iObserverTextSegment = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  this.isTextSegmentState = 'center'
                  this.removeTextSegmentObserver()
                }, 300)
              }
            })
          },
          { rootMargin: '0%' }
        )
        this.iObserverTextSegment.observe(this.observe)
      } catch (error) {
        console.error('Error setting up text segment observer:', error)
      }
    },

    setupLoopTextObserver() {
      if (!this.$refs.ContentsLoopTitle) return

      try {
        this.observe = this.$refs.ContentsLoopTitle
        this.iObserverLoopText = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              this.isLoopTextState = entry.isIntersecting ? 'isActive' : 'isNoActive'
            })
          },
          { rootMargin: '0%' }
        )
        this.iObserverLoopText.observe(this.observe)
      } catch (error) {
        console.error('Error setting up loop text observer:', error)
      }
    },

    setupVideoObserver() {
      if (!this.$refs.ContentsLoopVideo) return

      try {
        this.iObserverLoopVideo = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.addMouseMoveListener()
              } else {
                this.removeMouseMoveListener()
              }
            })
          },
          { rootMargin: '0%' }
        )
        this.iObserverLoopVideo.observe(this.$refs.ContentsLoopVideo)
      } catch (error) {
        console.error('Error setting up video observer:', error)
      }
    },

    removeTextSegmentObserver() {
      if (this.iObserverTextSegment && this.observe) {
        try {
          this.iObserverTextSegment.unobserve(this.observe)
        } catch (error) {
          console.error('Error removing text segment observer:', error)
        }
      }
    },

    removeLoopTextObserver() {
      if (this.iObserverLoopText && this.observe) {
        try {
          this.iObserverLoopText.unobserve(this.observe)
        } catch (error) {
          console.error('Error removing loop text observer:', error)
        }
      }
    },

    removeVideoObserver() {
      if (this.iObserverLoopVideo && this.$refs.ContentsLoopVideo) {
        try {
          this.iObserverLoopVideo.unobserve(this.$refs.ContentsLoopVideo)
        } catch (error) {
          console.error('Error removing video observer:', error)
        }
      }
    },

    addMouseMoveListener() {
      window.addEventListener('mousemove', this.onMoseMove)
    },

    removeMouseMoveListener() {
      window.removeEventListener('mousemove', this.onMoseMove)
    },

    cleanupObservers() {
      this.removeTextSegmentObserver()
      this.removeLoopTextObserver()
      this.removeVideoObserver()
      this.removeMouseMoveListener()
      
      this.iObserverTextSegment = null
      this.iObserverLoopText = null
      this.iObserverLoopVideo = null
      this.observe = null
    },

    onMoseMove(e) {
      if (!this.$refs.ContentsLoopVideo) return

      const x = (e.clientX / window.innerWidth - 0.5) * 2.0 * 5
      const y = (e.clientY / window.innerHeight - 0.5) * 2.0 * 5

      this.$gsap?.to(this.$refs.ContentsLoopVideo, {
        duration: this.fullDuration,
        ease: 'power2.out',
        rotateX: y,
        rotateY: -x,
      })
    },
    getPosterUrl(id) {
      return `/images/poster-${id}.webp`
    },
    getVideoUrl(id) {
      return `/movie/${id}.mp4`
    },
  },
}
</script>

<style lang="scss" scoped>
.contents-loop-title-wrapper {
  position: relative;
  padding: vw(286) 0 vw(242);

  @include sp() {
    padding: 194px 0 190px;
  }
}

.contents-loop-title {
  position: relative;
  font-size: vw(140);
  font-family: $sixcaps;
  transform-style: preserve-3d;
  perspective: 1000px;

  @include sp() {
    font-size: vw_sp(160);
  }
}

.contents-loop-video {
  position: absolute;
  top: 8px;
  right: 0;
  bottom: 0;
  left: -120px;
  width: vw(386 * 1.1);
  height: vw(241 * 1.1);
  margin: auto;
  z-index: 10;
  transform: translateZ(200px);

  @include sp() {
    top: 0;
    left: 0;
    width: vw_sp(669);
    height: vw_sp(418);
    transform: none;
  }
}

.contents-loop-video-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  opacity: 0.3;
}

.contents-loop-video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;

  & video {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
    object-position: center;
  }
}

.contents-loop-card {
  position: absolute;
  top: vw(580);
  right: vw(420);
  width: 147px;
  height: 200px;
  z-index: 10;
  transform: rotate(16deg);

  @include sp() {
    top: 520px;
    right: 110px;
  }
}
</style>
