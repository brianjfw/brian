import { defaultProjectData, defaultContactData } from '~/data/siteData'

export default ({ store, isHMR }) => {
  // Skip if hot module replacement
  if (isHMR) return

  // Initialize store with default data during static generation or SSR
  if (process.server || process.static) {
    try {
      // Initialize project data
      if (!store.state.projectData) {
        store.commit('setProjectData', defaultProjectData)
      }
      
      // Initialize contact data
      if (!store.state.contactData) {
        store.commit('setContactData', defaultContactData)
      }

      // Set initial states
      store.commit('openning/end')
      store.commit('imageLoaded/loaded')
      store.commit('mouse/loadend')
      store.commit('bg-transition/end')
      store.commit('image-transition/end')
      store.commit('indexPickup/transition', false)
      store.commit('indexPickup/sceneAnimationState', false)
      store.commit('hambergerMenu/close')
    } catch (err) {
      console.error('Error initializing store:', err)
    }
  }
} 