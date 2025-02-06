import db from '../data/db.json';

export const state = () => ({
  projectData: {},
  contactData: {},
  pickupData: {},
  awardData: {},
  awardDataLength: {},
});

export const actions = {
  nuxtServerInit({ commit }, { app }) {
    const projectResponse = db.projects;
    const contactResponse = [];
    const pickupData = projectResponse.filter((v) => v.pickup && v.pickup.pickupFlag);
    const awardResponse = [];
    let awwwwardsLength = 0;
    let cssdesignawardsLength = 0;
    let csswinnerLength = 0;

    const awardDataLength = {
      awwwwardsTotalLength: awwwwardsLength,
      cssdesignawardsTotalLength: cssdesignawardsLength,
      csswinnerTotalLength: csswinnerLength,
    };

    commit('getProjectData', projectResponse);
    commit('getContactData', contactResponse);
    commit('getPickupData', pickupData);
    commit('getAwardData', awardResponse);
    commit('getAwardDataLength', awardDataLength);
  }
}

export const mutations = {
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
}

export const getters = {
  projectData(state) {
    return state.projectData;
  },
  contactData(state) {
    return state.contactData;
  },
  pickupData(state) {
    return state.pickupData;
  },
  awardData(state) {
    return state.awardData;
  },
  awardDataLength(state) {
    return state.awardDataLength;
  },
};
