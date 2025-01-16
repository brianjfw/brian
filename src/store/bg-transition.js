export default {
  namespaced: true,
  
  state: {
    isTransition: false,
    color: '#f0efeb',
  },

  getters: {
    state: state => state.isTransition,
    color: state => state.color,
  },

  mutations: {
    start(state, color) {
      state.isTransition = true;
      state.color = color;
    },
    end(state) {
      state.isTransition = false;
    },
  },
}