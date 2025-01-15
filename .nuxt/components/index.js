export { default as AppBounceLine } from '../../components/AppBounceLine.vue'
export { default as AppCard } from '../../components/AppCard.vue'
export { default as AppCircleBg } from '../../components/AppCircleBg.vue'
export { default as AppLoopText } from '../../components/AppLoopText.vue'
export { default as AppPageTransitionBg } from '../../components/AppPageTransitionBg.vue'
export { default as AppPageTransitionImage } from '../../components/AppPageTransitionImage.vue'
export { default as AppReadTitle } from '../../components/AppReadTitle.vue'
export { default as AppTextAnimation } from '../../components/AppTextAnimation.vue'
export { default as BaseHambergerMenu } from '../../components/BaseHambergerMenu.vue'
export { default as BaseHeader } from '../../components/BaseHeader.vue'
export { default as BaseLoading } from '../../components/BaseLoading.vue'
export { default as BaseMouse } from '../../components/BaseMouse.vue'
export { default as BaseOpenning } from '../../components/BaseOpenning.vue'
export { default as CardAward } from '../../components/CardAward.vue'
export { default as CardCompany } from '../../components/CardCompany.vue'
export { default as CardContact } from '../../components/CardContact.vue'
export { default as CardMv } from '../../components/CardMv.vue'
export { default as CardProject } from '../../components/CardProject.vue'
export { default as CardWorks } from '../../components/CardWorks.vue'
export { default as AboutAwardSection } from '../../components/about/AwardSection.vue'
export { default as AboutIntroSection } from '../../components/about/IntroSection.vue'
export { default as AboutMainVisualSection } from '../../components/about/MainVisualSection.vue'
export { default as AboutSelectProjectSideScrollSection } from '../../components/about/SelectProjectSideScrollSection.vue'
export { default as IndexAboutSection } from '../../components/index/AboutSection.vue'
export { default as IndexContactSection } from '../../components/index/ContactSection.vue'
export { default as IndexMainVisualSection } from '../../components/index/MainVisualSection.vue'
export { default as IndexSelectProjectCardSection } from '../../components/index/SelectProjectCardSection.vue'
export { default as IndexSelectProjectPickupSection } from '../../components/index/SelectProjectPickupSection.vue'
export { default as WorksContentsLoopSection } from '../../components/works/ContentsLoopSection.vue'
export { default as WorksMainVisualSection } from '../../components/works/MainVisualSection.vue'
export { default as WorksNextProjectSection } from '../../components/works/NextProjectSection.vue'
export { default as WorksProjectContentsSection } from '../../components/works/ProjectContentsSection.vue'
export { default as WorksProjectVideoSection } from '../../components/works/ProjectVideoSection.vue'
export { default as CanvasStage } from '../../components/canvas/stage.js'
export { default as CanvasArchiveGlElements } from '../../components/canvas/archive/gl-elements.js'
export { default as CanvasArchiveMesh } from '../../components/canvas/archive/mesh.js'
export { default as CanvasAboutIntroMesh } from '../../components/canvas/about/intro/mesh.js'
export { default as CanvasAboutMainvisualMetaball } from '../../components/canvas/about/mainvisual/metaball.js'
export { default as CanvasAboutSidescrollParticle } from '../../components/canvas/about/sidescroll/particle.js'
export { default as CanvasIndexPickupMetaball } from '../../components/canvas/index/pickup/metaball.js'
export { default as CanvasIndexPickupParticle } from '../../components/canvas/index/pickup/particle.js'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
