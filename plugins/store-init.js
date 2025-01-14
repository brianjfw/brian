import { defaultProjectData, defaultContactData } from '~/data/siteData'

export default ({ store }) => {
  // Initialize store with default data during static generation
  if (process.static) {
    store.commit('setProjectData', defaultProjectData)
    store.commit('setContactData', defaultContactData)
    store.commit('openning/end')
    store.commit('imageLoaded/loaded')
    store.commit('mouse/loadend')
  }
} 