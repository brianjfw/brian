export default {
  namespaced: true,
  
  state: {
    isLoaded: false,
  },

  getters: {
    state: state => state.isLoaded,
  },

  mutations: {
    loaded(state) {
      state.isLoaded = true;
    },
  },
}