<style lang="scss">

html {
  scroll-behavior: smooth;
}

body {
  background-color: colors.$black;
  color: colors.$white;
  overflow-x: hidden;
}

::selection {
  background: colors.$darkPink;
  color: colors.$white;
}

::-moz-selection {
  background: colors.$darkPink;
  color: colors.$white;
}

.is-menu-open {
  & .asscroll-container {
    filter: blur(10px);
  }
}

.canvas-fix {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.canavs-fix-contents {
  position: relative;
  width: 100%;
  height: 100%;
}

.webgl {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.asscroll-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.asscroll-contents {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
}

.asscroll-container-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 1;
  pointer-events: none;
}

.is-menu-open {
  & .asscroll-container-cover {
    pointer-events: auto;
  }
}

.transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
}

.layouts-normal-transition-img-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.layouts-normal-transition-img {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.layouts-normal-transition-color-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleY(0);
}
</style>

<template>
  <div :class="[bodyClass,isAndroid, isWindows, isSafari]">
    <BaseOpenning />
    <BaseMouse />
    <BaseLoading />
    <BaseHeader />
    <BaseHambergerMenu />
    <!--transition-->
    <div class="transition">
      <div
        ref="LayoutsNormalTransitionBg"
        class="layouts-normal-transition-img-wrapper"
      >
        <span
          v-for="data in getProjectData"
          :key="data.id"
          ref="LayoutsNormalTransitionImg"
          class="layouts-normal-transition-img"
        >
          <picture v-if="data.heroImg && data.heroImg.sp && data.heroImg.pc">
            <source
              :srcset="data.heroImg.sp.url"
              type="image/webp"
              media="(max-width: 767px)"
            />
            <img
              :src="data.heroImg.pc.url"
              :width="data.heroImg.pc.width"
              :height="data.heroImg.pc.height"
              loading="lazy"
              alt=""
            />
          </picture>
        </span>

        <div
          ref="LayoutsNormalTransitionColor"
          class="layouts-normal-transition-color-bg"
        />
      </div>
    </div>
    <!--/transition-->
    <div ref="AsscrollContainer" class="asscroll-container">
      <div class="asscroll">
        <div ref="AsscrollContents" class="asscroll-contents">
          <nuxt />
        </div>
      </div>
    </div>
    <!--ハンバーガーメニューを閉じるための空dom-->
    <div
      ref="AsscrollContainerCover"
      class="asscroll-container-cover"
      @click="hambergerMenuOnClose"
    >
    </div>
  </div>
</template>

<script>
import Particle from '../components/canvas/index/pickup/particle'
import Mesh from '../components/canvas/index/pickup/metaball'
import Stage from '../components/canvas/stage'
import { preEvent } from '../assets/js/preEvent'
import { metaballSceneList } from '../assets/js/metaball'
import preEventTouch from '~/mixins/preEventTouch'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default {
  data: () => ({
    bodyClass: '',
  }),

  computed: {
    getProjectData() {
      return this.$store.getters.projectData
    },
    hambergerMenuState() {
      return this.$store.getters['hambergerMenu/state']
    },
    isAndroid() {
      return this.$store.getters.ua?.isAndroid ? 'is-android' : ''
    },
    isWindows() {
      return this.$store.getters.ua?.isWindows ? 'is-windows' : ''
    },
    isSafari() {
      return this.$store.getters.ua?.isSafari ? 'is-safari' : ''
    },
  },

  watch: {
    hambergerMenuState: function () {
      // ハンバーガーメニューが開いている時と閉じている時でbodyのclassを切り替える
      if (this.hambergerMenuState) {
        this.bodyClass = 'is-menu-open'
      } else {
        this.bodyClass = ''
      }
    },
  },

  mounted() {
    this.$preDefaultEvent(true)

    if (this.$SITECONFIG) {
      let num = this.$SITECONFIG.isPc ? 60 : 30
      for (let i = 0; i < num; i++) {
        this.particles.push(new Particle(this.$SITECONFIG))
      }
    } else {
      console.warn('$SITECONFIG is not defined.  Particle creation skipped.')
    }

    this.$nextTick(() => {
      if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.refresh();
      }
      if (document.getElementById('webgl-canvas')) {
        this.particle = new Particle()
      }
      this.$ScrollTrigger.refresh();
    })

    this.mesh = new Mesh(this.$refs.Webgl)
    this.stage = new Stage()

    this.stage.add(this.particle)
    this.stage.add(this.mesh)

    this.mesh.init(metaballSceneList[0])
  },

  methods: {
    hambergerMenuOnClose() {
      this.$store.commit('hambergerMenu/close')
    },
  },

  beforeDestroy() {
    this.stage.remove(this.particle)
    this.stage.remove(this.mesh)
    this.particle.destroy()
    this.mesh.destroy()
    this.stage.destroy()
    this.particle = null
    this.mesh = null
    this.stage = null
  },
}
</script>
