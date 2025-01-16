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

export default createStore({
  state: {
    projectData: {},
    contactData: {},
    pickupData: [],
    awardData: {},
    awardDataLength: 0,
  },
  
  mutations: {
    getProjectData(state, data) {
      state.projectData = data
    },
    getContactData(state, data) {
      state.contactData = data
    },
    getPickupData(state, data) {
      state.pickupData = data
    },
    getAwardData(state, data) {
      state.awardData = data
    },
    getAwardDataLength(state, data) {
      state.awardDataLength = data
    },
  },

  actions: {
    initializeData({ commit }) {
      // Load project data
      const projectData = loadProjectData()
      commit('getProjectData', projectData)

      // Load contact data
      const contactData = loadContactData()
      commit('getContactData', contactData)

      // Load pickup data
      const pickupData = loadPickupData()
      commit('getPickupData', pickupData)

      // Load award data
      const { data: awardData, length: awardLength } = loadAwardData()
      commit('getAwardData', awardData)
      commit('getAwardDataLength', awardLength)
    }
  },

  getters: {
    projectData: state => state.projectData,
    contactData: state => state.contactData,
    pickupData: state => state.pickupData,
    awardData: state => state.awardData,
    awardDataLength: state => state.awardDataLength,
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
