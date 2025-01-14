import { 
  defaultProjectData,
  defaultContactData, 
  defaultPickupData,
  defaultAwardData,
  defaultAwardDataLength
} from '../data/siteData'

export const state = () => ({
  projectData: defaultProjectData,
  contactData: defaultContactData,
  pickupData: defaultPickupData,
  awardData: defaultAwardData,
  awardDataLength: defaultAwardDataLength
})

// Default values for consistent data structure
const defaultProjectFields = {
  pickup: {
    pickupFlag: false,
    title: [{ text00: '' }],
    text: [{ text00: '' }]
  },
  siteColor: {
    allTextColor: '#000000',
    bodyContentsColor: '#ffffff',
    mvTextColor: '#000000'
  },
  title: {
    full: ''
  },
  client: '',
  freeArea: '',
  contentsImg: [],
  detailsMainTextPc: { text00: '' },
  detailsMainDescPc: { text00: '' },
  detailsMainTextSp: { text00: '' }
};

const defaultContactFields = {
  mainTitle: {
    title: ''
  },
  list01: {
    link: '#',
    text: ''
  },
  list02: {
    link: '#',
    text: ''
  },
  list03: {
    link: '#',
    text: ''
  }
};

export const mutations = {
  setProjectData(state, data) {
    state.projectData = data
  },
  setContactData(state, data) {
    state.contactData = data
  },
  setPickupData(state, data) {
    state.pickupData = data
  },
  setAwardData(state, data) {
    state.awardData = data
  },
  setAwardDataLength(state, data) {
    state.awardDataLength = data
  },
}

export const getters = {
  projectData: (state) => state.projectData,
  contactData: (state) => state.contactData,
  pickupData: (state) => state.pickupData,
  awardData: (state) => state.awardData,
  awardDataLength: (state) => state.awardDataLength,
}
