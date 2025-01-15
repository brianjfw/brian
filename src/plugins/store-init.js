import { defaultProjectData, defaultContactData } from '~/data/siteData'

export default ({ store, isHMR }) => {
  // Skip if hot module replacement
  if (isHMR) return

  console.log('[Store Init] Starting store initialization');

  try {
    console.log('[Store Init] Running initialization');
    
    // Initialize project data
    if (!store.state.projectData || store.state.projectData.length === 0) {
      console.log('[Store Init] Setting default project data');
      store.commit('setProjectData', defaultProjectData)
    }
    
    // Initialize contact data
    if (!store.state.contactData || store.state.contactData.length === 0) {
      console.log('[Store Init] Setting default contact data');
      store.commit('setContactData', defaultContactData)
    }

    // Set initial states only if we're in server/static mode
    if (process.server || process.static) {
      console.log('[Store Init] Setting initial states for server/static mode');
      store.commit('openning/end')
      store.commit('imageLoaded/loaded')
      store.commit('mouse/loadend')
      store.commit('bg-transition/end')
      store.commit('image-transition/end')
      store.commit('indexPickup/transition', false)
      store.commit('indexPickup/sceneAnimationState', false)
      store.commit('hambergerMenu/close')
    }
    
    console.log('[Store Init] Store initialization completed');
  } catch (err) {
    console.error('[Store Init] Error initializing store:', err)
  }
} 