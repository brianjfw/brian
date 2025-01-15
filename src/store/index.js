import { createStore } from 'vuex';
import { 
  defaultProjectData,
  defaultContactData, 
  defaultPickupData,
  defaultAwardData,
  defaultAwardDataLength
} from '../data/siteData.js';

// Import store modules
import mouse from './mouse';
import openning from './openning';
import indexPickup from './indexPickup';
import imageTransition from './image-transition';
import imageLoaded from './imageLoaded';
import bgTransition from './bg-transition';
import hambergerMenu from './hambergerMenu';

export default createStore({
  state: {
    projectData: defaultProjectData,
    contactData: defaultContactData,
    pickupData: defaultPickupData,
    awardData: defaultAwardData,
    awardDataLength: defaultAwardDataLength
  },
  mutations: {
    setProjectData(state, data) {
      state.projectData = data;
    },
    setContactData(state, data) {
      state.contactData = data;
    },
    setPickupData(state, data) {
      state.pickupData = data;
    },
    setAwardData(state, data) {
      state.awardData = data;
    },
    setAwardDataLength(state, data) {
      state.awardDataLength = data;
    }
  },
  getters: {
    projectData: state => state.projectData,
    contactData: state => state.contactData,
    pickupData: state => state.pickupData,
    awardData: state => state.awardData,
    awardDataLength: state => state.awardDataLength
  },
  modules: {
    mouse,
    openning,
    indexPickup,
    'image-transition': imageTransition,
    imageLoaded,
    'bg-transition': bgTransition,
    hambergerMenu
  }
});
