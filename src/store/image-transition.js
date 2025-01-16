export default {
  namespaced: true,
  
  state: {
    isTransition: false,
    index: 0,
  },

  getters: {
    state: state => state.isTransition,
    index: state => state.index,
  },

  mutations: {
    start(state, index) {
      state.isTransition = true;
      state.index = index;
    },
    end(state) {
      state.isTransition = false;
    },
  },
}