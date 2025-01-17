import { createStore } from 'vuex'
import mouse from './mouse'
import openning from './openning'
import imageLoaded from './imageLoaded'
import indexPickup from './indexPickup'
import bgTransition from './bg-transition'
import hambergerMenu from './hambergerMenu'
import imageTransition from './image-transition'
import app from './app'
import { loadProjectData, loadContactData, loadPickupData, loadAwardData } from '../utils/loadData'

const store = createStore({
  state: {
    projectData: [],
    contactData: {},
    pickupData: [],
    awardData: {},
    awardDataLength: 0,
    isInitialized: false,
    isInitializing: false
  },
  
  mutations: {
    getProjectData(state, data) {
      state.projectData = data || []
    },
    getContactData(state, data) {
      state.contactData = data || {}
    },
    getPickupData(state, data) {
      state.pickupData = data || []
    },
    getAwardData(state, data) {
      state.awardData = data || {}
    },
    getAwardDataLength(state, data) {
      state.awardDataLength = data || 0
    },
    setInitialized(state, value) {
      state.isInitialized = value
    },
    setInitializing(state, value) {
      state.isInitializing = value
    }
  },

  actions: {
    async initializeData({ commit, state }) {
      // Prevent double initialization
      if (state.isInitialized || state.isInitializing) {
        return
      }

      try {
        commit('setInitializing', true)

        // Load all data in parallel
        const [projectData, contactData, pickupData, awardResult] = await Promise.all([
          loadProjectData(),
          loadContactData(),
          loadPickupData(),
          loadAwardData()
        ])

        // Commit all data
        commit('getProjectData', projectData)
        commit('getContactData', contactData)
        commit('getPickupData', pickupData)
        commit('getAwardData', awardResult.data)
        commit('getAwardDataLength', awardResult.length)
        commit('setInitialized', true)
      } catch (error) {
        console.error('Failed to initialize store data:', error)
        // Set empty defaults
        commit('getProjectData', [])
        commit('getContactData', {})
        commit('getPickupData', [])
        commit('getAwardData', {})
        commit('getAwardDataLength', 0)
        commit('setInitialized', true)
      } finally {
        commit('setInitializing', false)
      }
    }
  },

  getters: {
    projectData: state => state.projectData || [],
    contactData: state => state.contactData || {},
    pickupData: state => state.pickupData || [],
    awardData: state => state.awardData || {},
    awardDataLength: state => state.awardDataLength || 0,
    isInitialized: state => state.isInitialized,
    isInitializing: state => state.isInitializing
  },

  modules: {
    app,
    mouse,
    openning,
    imageLoaded,
    indexPickup,
    'bg-transition': bgTransition,
    hambergerMenu,
    'image-transition': imageTransition
  }
})

export default store
