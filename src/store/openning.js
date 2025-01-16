export default {
  namespaced: true,
  
  state: {
    isOpenningEnd: false,
  },

  getters: {
    state: state => state.isOpenningEnd,
  },

  mutations: {
    end(state) {
      state.isOpenningEnd = true;
    },
  },
}