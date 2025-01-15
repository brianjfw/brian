<template>
  <div
    ref="HambergerMenu"
    class="hambergerMenu"
    :class="{
      'hambergerMenu--disable': hambergerMenuDisable,
      'hambergerMenu--open': hambergerMenuState,
    }"
  >
    <div ref="HambergerMenuOverlay01" class="hambergerMenu-overlay-01"></div>
    <div ref="HambergerMenuOverlay02" class="hambergerMenu-overlay-02">
      <div ref="HambergerMenuContents" class="hambergerMenu-contents">
        <div class="hambergerMenu-title">
          <div class="hambergerMenu-title-wrapper-01 js-click-target" @click="hambergerMenuOnClose">
            <AppPageTransitionBg url="/" color="#f0efeb">
              <AppTextAnimation :state="isTextSegmentState" :rotate="$BASEROTATE.right" :text="'HISAMIKURITA'" />
            </AppPageTransitionBg>
          </div>
          <div class="hambergerMenu-title-wrapper-02 js-click-target" @click="hambergerMenuOnClose">
            <AppPageTransitionBg url="/about" color="#f0efeb">
              <AppTextAnimation :state="isTextSegmentState" :start="0.12" :rotate="$BASEROTATE.left" :text="'ABOUT'" />
            </AppPageTransitionBg>
          </div>
        </div>
        <div class="hambergerMenu-section-title">
          <AppReadTitle :state="isTextSegmentState" :start="0.24" :text="['・', 'WORKS']" :modifier="'section'" />
        </div>
        <div>
          <ul class="hambergerMenu-list">
            <li v-for="(data, index) in projectAndArchiveDatas" :key="index" class="hambergerMenu-item">
              <div ref="HambergerMenuItemWrapper" class="hambergerMenu-item-wrapper js-click-target" @click="hambergerMenuOnClose">
                <!--アーカイブページの時-->
                <AppPageTransitionBg v-if="index === projectAndArchiveData.length - 1.0" :url="`/archive`" :color="'#000000'" class="hambergerMenu-item-link">
                  <span class="hambergerMenu-item-img">
                    <picture>
                      <img :src="`/src/static/images/hambergermenu-archive.webp`" :width="`180`" :height="`180`" :alt="`archive`" />
                    </picture>
                  </span>
                  <span>
                    <span class="hambergerMenu-item-title">ARCHIVE</span>
                    <span class="hambergerMenu-item-desc"> I'M PUTTING TOGETHER A DYNAMIC ARCHIVE PAGE OF THE WORK I'M SUBMITTING TO CODEPEN. </span>
                  </span>
                </AppPageTransitionBg>
                <!--アーカイブページ以外の時-->
                <AppPageTransitionImage v-else :url="`/works/${data.id}`" :index="index" class="hambergerMenu-item-link">
                  <span class="hambergerMenu-item-img">
                    <picture>
                      <img :src="`${data.hambergerMenuImg.url}`" :width="`${data.hambergerMenuImg.width}`" :height="`${data.hambergerMenuImg.height}`" :alt="`${data.id}`" />
                    </picture>
                  </span>
                  <span>
                    <span class="hambergerMenu-item-title">
                      {{ data.title.short }}
                    </span>
                    <span class="hambergerMenu-item-desc">{{ data.desc }}</span>
                  </span>
                </AppPageTransitionImage>
              </div>
            </li>
          </ul>
        </div>
        <button ref="HambergerMenuBtn" aria-label="hambergermenu btn" class="hambergerMenu-btn js-click-target" @click="hambergerMenuOnClick">
          <span ref="HambergerMenuBtnHover" class="hambergerMenu-btn-hover">
            <span ref="hambergerMenuOpenarea" class="hambergerMenu-btn-openarea">
              <span ref="hambergerMenuOpenareaLine01" class="hambergerMenu-btn-line hambergerMenu-btn-line--01"></span>
              <span ref="hambergerMenuOpenareaLine02" class="hambergerMenu-btn-line hambergerMenu-btn-line--02"></span>
            </span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { preEvent, preEventTouch } from '../assets/js/preEvent'

export default {
  data() {
    return {
      isInitialized: false,
      isMounted: false,
      refs: {
        HambergerMenuBtn: null,
        HambergerMenuBtnHover: null,
        hambergerMenuOpenareaLine01: null,
        hambergerMenuOpenareaLine02: null,
        hambergerMenuOpenarea: null,
        HambergerMenuOverlay01: null,
        HambergerMenuOverlay02: null,
        HambergerMenuContents: null,
        HambergerMenuItemWrapper: null
      },
      animations: {
        btn: null,
        btnHover: null,
        line01: null,
        line02: null,
        openarea: null,
        overlay01: null,
        overlay02: null,
        itemLink: null
      },
      isTextSegmentState: 'init',
      itemLinkCenter: null,
      itemLinkBottom: null,
      itemLinkCenterArchive: null
    }
  },

  beforeMount() {
    this.isMounted = false;
    this.isInitialized = false;
  },

  mounted() {
    this.isMounted = true;
    
    try {
      // Initialize refs
      this.refs = {
        HambergerMenuBtn: this.$refs.HambergerMenuBtn,
        HambergerMenuBtnHover: this.$refs.HambergerMenuBtnHover,
        hambergerMenuOpenareaLine01: this.$refs.hambergerMenuOpenareaLine01,
        hambergerMenuOpenareaLine02: this.$refs.hambergerMenuOpenareaLine02,
        hambergerMenuOpenarea: this.$refs.hambergerMenuOpenarea,
        HambergerMenuOverlay01: this.$refs.HambergerMenuOverlay01,
        HambergerMenuOverlay02: this.$refs.HambergerMenuOverlay02,
        HambergerMenuContents: this.$refs.HambergerMenuContents,
        HambergerMenuItemWrapper: this.$refs.HambergerMenuItemWrapper
      };

      if (!Object.values(this.refs).every(ref => ref)) {
        console.warn('BaseHambergerMenu: Some required elements not found during mount');
        return;
      }

      this.isInitialized = true;
    } catch (error) {
      console.warn('BaseHambergerMenu: Error during mount:', error);
    }
  },

  beforeUnmount() {
    this.killAllAnimations();
    this.isMounted = false;
    this.isInitialized = false;
  },

  computed: {
    openningEnd() {
      return this.$store.getters['openning/state']
    },
    hambergerMenuState() {
      return this.$store.getters['hambergerMenu/state']
    },
    hambergerMenuDisable() {
      return this.$store.getters['hambergerMenu/disable']
    },
    getProjectData() {
      return this.$store.getters.projectData
    },
    projectAndArchiveDatas() {
      this.directSubstitution()
      return this.projectAndArchiveData
    },
    indexPickupState: function () {
      return this.$store.getters['indexPickup/state']
    },
  },
  watch: {
    openningEnd: function () {
      this.$gsap.to(this.$refs.HambergerMenu, {
        duration: 1.2,
        ease: this.$EASING.transform,
        x: 0,
      })
    },
    hambergerMenuState() {
      if (!this.isMounted || !this.isInitialized) {
        console.warn('BaseHambergerMenu: Component not ready for state change');
        return;
      }

      try {
        this.handleMenuState();
      } catch (error) {
        console.warn('BaseHambergerMenu: Error during state change:', error);
      }
    }
  },
  methods: {
    /**
     * アーカイブページ用に空のオブジェクトを追加してインデックスを一つ増やす
     */
    directSubstitution() {
      this.projectAndArchiveData = Array.from(this.getProjectData)
      this.projectAndArchiveData.push({})
    },
    hambergerMenuOnClick() {
      if (this.isOpen || this.isClose) return

      if (!this.hambergerMenuState) {
        this.$store.commit('hambergerMenu/open')
        this.isOpen = true
        setTimeout(() => {
          this.isOpen = false
        }, 400)
      } else if (this.hambergerMenuState) {
        this.$store.commit('hambergerMenu/close')
        this.isClose = true
        setTimeout(() => {
          this.isClose = false
        }, 400)
      }

      // ハンバガーメニューが開いた時
      if (this.hambergerMenuState) {
        if (this.$SITECONFIG.isTouch) this.$store.commit('hambergerMenu/pickupOpen')
      }
      // ハンバガーメニューが閉じた時
      else if (!this.hambergerMenuState) {
        if (this.$SITECONFIG.isTouch) this.$store.commit('hambergerMenu/pickupClose')
      }
    },
    hambergerMenuOnClose() {
      this.$store.commit('hambergerMenu/close')
    },
    hambergerMenuBtnOnResize() {
      if (!this.isMounted || !this.isInitialized) return;

      try {
        this.safeGsapAnimation(this.$refs.HambergerMenuBtn, {
          duration: 0.2,
          x: -window.innerWidth / 2.0 + 30 + 20,
        });
      } catch (error) {
        console.warn('BaseHambergerMenu: Error during resize:', error);
      }
    },
    getEasing() {
      return this.$EASING?.transform || 'power2.out';
    },
    
    getDuration(type = 'base') {
      if (type === 'short') {
        return this.$SITECONFIG?.shortDuration || 0.3;
      }
      return this.$SITECONFIG?.baseDuration || 0.6;
    },
    
    safeGsapAnimation(element, props) {
      if (!this.$gsap) {
        console.warn('BaseHambergerMenu: GSAP not initialized');
        return null;
      }

      if (!element) {
        console.warn('BaseHambergerMenu: Animation target not found');
        return null;
      }

      try {
        return this.$gsap.to(element, {
          ...props,
          ease: props.ease || this.getEasing(),
          duration: props.duration || this.getDuration(),
        });
      } catch (error) {
        console.warn('BaseHambergerMenu: Animation error:', error);
        return null;
      }
    },
    safeGsapSet(element, props) {
      if (!this.isMounted || !this.isInitialized) {
        console.warn('BaseHambergerMenu: Component not ready for animation');
        return;
      }

      if (!this.$gsap) {
        console.warn('BaseHambergerMenu: GSAP not initialized');
        return;
      }

      if (!element) {
        console.warn('BaseHambergerMenu: Animation target not found');
        return;
      }

      try {
        this.$gsap.set(element, props);
      } catch (error) {
        console.warn('BaseHambergerMenu: Set error:', error);
      }
    },
    onHambergerMenuBtnClick() {
      this.$store.commit('hamberger-menu/toggle')
    },
    handleMenuState() {
      if (!this.isMounted || !this.isInitialized) return;

      try {
        if (this.hambergerMenuState) {
          this.openMenu();
        } else {
          this.closeMenu();
        }
      } catch (error) {
        console.warn('BaseHambergerMenu: Error handling menu state:', error);
      }
    },
    openMenu() {
      if (!this.isMounted || !this.isInitialized) return;

      if (this.$SITECONFIG?.isPc) {
        this.openMenuPc();
      } else if (this.$SITECONFIG?.isMobile) {
        this.openMenuMobile();
      }
    },
    closeMenu() {
      if (!this.isMounted || !this.isInitialized) return;

      if (this.$SITECONFIG?.isPc) {
        this.closeMenuPc();
      } else if (this.$SITECONFIG?.isMobile) {
        this.closeMenuMobile();
      }
    },
    openMenuPc() {
      // ... existing openMenuPc code with safeGsapAnimation ...
    },
    openMenuMobile() {
      // ... existing openMenuMobile code with safeGsapAnimation ...
    },
    closeMenuPc() {
      // ... existing closeMenuPc code with safeGsapAnimation ...
    },
    closeMenuMobile() {
      // ... existing closeMenuMobile code with safeGsapAnimation ...
    },
    killAllAnimations() {
      try {
        Object.values(this.animations).forEach(animation => {
          if (animation?.kill) {
            animation.kill();
          }
        });
        
        this.animations = {
          btn: null,
          btnHover: null,
          line01: null,
          line02: null,
          openarea: null,
          overlay01: null,
          overlay02: null,
          itemLink: null
        };
      } catch (error) {
        console.warn('BaseHambergerMenu: Error killing animations:', error);
      }
    }
  },
}
</script>

<style scoped lang="scss">
@use "~/assets/scss/constants/break-points" as *;
@use "~/assets/scss/constants/color" as *;
@use "~/assets/scss/constants/font" as *;
@use "~/assets/scss/functions/mixins" as *;

:root {
  --viewportWidth: 100vw;
  --viewportHeight: 100vh;
}

.hambergerMenu {
  position: fixed;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 110px;
  height: calc(100% - 20px);
  margin: auto 0;
  transform: translateX(120px);
  z-index: 11;

  @include sp() {
    top: 10px;
    right: 20px;
    bottom: auto;
    width: 60px;
    height: 60px;
  }
}

.hambergerMenu--disable {
  pointer-events: none;
  user-select: none;
}

.hambergerMenu-overlay-01 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #dfded9;
  border-radius: 10px;
  pointer-events: none;
  transform-origin: right;
}

.hambergerMenu-overlay-01::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 2px 35px 16px 5px rgb(24 23 13 / 20%);
  border-radius: 10px;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity $base-duration $colorAndOpacity-easing;
}

.hambergerMenu--open .hambergerMenu-overlay-01::before {
  opacity: 1;
}

.hambergerMenu-overlay-02 {
  position: absolute;
  top: 0;
  right: 0;
  width: 510px;
  height: 100%;
  background-color: #bcbbb4;
  border-radius: 10px;
  pointer-events: none;
  transform-origin: right;
  transform: scaleX(0);
  overflow: hidden;
}

.hambergerMenu-overlay-02::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 35px 60px 50px 20px rgb(24 23 13 / 50%);
  border-radius: 10px;
  pointer-events: none;
  z-index: 1;
}

.hambergerMenu-contents {
  position: absolute;
  top: 0;
  right: 0;
  width: 510px;
  height: 100%;
  padding: 50px 26px 50px 16px;
  overflow-y: scroll;
  opacity: 0;
  pointer-events: none;
}

.hambergerMenu-title {
  position: relative;
  margin: 0 0 36px 0;
  color: #302c1a;
  font-size: 120px;
  font-family: $sixcaps;
  letter-spacing: -0.002em;
  z-index: 2;
}

.hambergerMenu-section-title {
  position: relative;
  margin: 0 0 36px 0;
  z-index: 2;
}

.hambergerMenu-title-wrapper-01 {
  display: block;
  cursor: pointer;
}

.hambergerMenu-title-wrapper-02 {
  display: inline-block;
  cursor: pointer;
}

.hambergerMenu-item {
  position: relative;
  overflow: hidden;
}

.hambergerMenu-item-wrapper {
  transform: translateY(180px);
}

.hambergerMenu-item-link {
  display: flex;
  align-items: center;
}

.hambergerMenu-item-title {
  display: block;
  margin: -12px 0 20px 0;
  color: #302c1a;
  font-size: 56px;
  font-family: $sixcaps;
  text-align: center;
}

.hambergerMenu-item-desc {
  display: block;
  color: #302c1a;
  font-size: 10px;
  line-height: 1.3;
  letter-spacing: 0.02em;
  text-align: center;
}

.hambergerMenu-item-img {
  position: relative;
  flex-shrink: 0;
  width: 180px;
  height: 180px;
  margin: 0 20px 0 0;
  overflow: hidden;
  border-radius: 14px;
}

.hambergerMenu-btn {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 10px;
  cursor: pointer;
}

.is-disable .hambergerMenu-btn {
  pointer-events: none;
  user-select: none;
}

.hambergerMenu-btn-hover {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $white;
  transition: transform $base-duration * 0.25 $transform-easing;
  border-radius: inherit;
}

@media (hover: hover) and (pointer: fine) {
  .hambergerMenu-btn:hover {
    transform: scale(0.9, 0.98);
  }
  
  @include sp() {
    .hambergerMenu-btn:hover {
      transform: scale(1, 1);
    }
  }

  .hambergerMenu--open .hambergerMenu-btn:hover {
    transform: scale(1.1, 1.1);
  }
  
  @include sp() {
    .hambergerMenu--open .hambergerMenu-btn:hover {
      transform: scale(1, 1);
    }
  }
}

.hambergerMenu-btn-openarea {
  position: relative;
  width: 37px;
  height: 13px;
}

.hambergerMenu-btn-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: $black;
  border-radius: 2px;
  cursor: pointer;
}

.hambergerMenu-btn-line--01 {
  top: 0;
}

.hambergerMenu-btn-line--02 {
  bottom: 0;
}

.hambergerMenu-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: $white;
  transition: border-radius $base-duration $transform-easing;
}

.hambergerMenu-btn-hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: $white;
  transition: border-radius $base-duration $transform-easing;
}

.hambergerMenu-btn-openarea::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: $white;
  transition: border-radius $base-duration $transform-easing;
}

.hambergerMenu-contents::-webkit-scrollbar {
  display: none;
}

.hambergerMenu-contents::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.hambergerMenu-item:not(:last-of-type) {
  margin: 0 0 60px 0;
}

.hambergerMenu-item-img img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hamberger-menu-button {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: $darkBlack;
  cursor: pointer;
  transition: background-color $base-duration $colorAndOpacity-easing;
}

.hamberger-menu-button.is-disable {
  pointer-events: none;
}

.hamberger-menu-button::before {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: 20px;
  height: 2px;
  background-color: $white;
  transform: translate(-50%, -50%);
  transition: transform $base-duration $colorAndOpacity-easing;
  content: '';
}

.hamberger-menu-button::after {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: 20px;
  height: 2px;
  background-color: $white;
  transform: translate(-50%, -50%);
  transition: transform $base-duration $colorAndOpacity-easing;
  content: '';
}

.hamberger-menu-button.is-active {
  background-color: $white;
}

.hamberger-menu-button.is-active::before {
  background-color: $darkBlack;
  transform: translate(-50%, -50%) rotate(45deg);
}

.hamberger-menu-button.is-active::after {
  background-color: $darkBlack;
  transform: translate(-50%, -50%) rotate(-45deg);
}

.hamberger-menu-content {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  width: 100%;
  height: 100vh;
  padding: 80px 0 0;
  background-color: $white;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.hamberger-menu-content::-webkit-scrollbar {
  width: 0;
}

.hamberger-menu-content::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.hamberger-menu-content-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 0 0 80px;
}

.hamberger-menu-content-inner-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.hamberger-menu-content-inner-list-item:not(:last-of-type) {
  margin: 0 0 40px;
}

.hamberger-menu-content-inner-list-item-link {
  display: block;
  font-size: 36px;
  font-family: $helvetica;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
}

.hamberger-menu-content-inner-list-item-link .img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hamberger-menu-hover {
  transform: scale(0.9, 0.98);
}

@include sp {
  .hamberger-menu-hover {
    transform: scale(1, 1);
  }
}

.hamberger-menu.is-open .hamberger-menu-hover {
  transform: scale(1.1, 1.1);
}

@include sp {
  .hamberger-menu.is-open .hamberger-menu-hover {
    transform: scale(1, 1);
  }
}
</style>
