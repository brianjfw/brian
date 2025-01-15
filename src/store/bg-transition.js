export default {
  namespaced: true,
  state: () => ({
    isActive: false
  }),
  mutations: {
    start(state) {
      state.isActive = true;
    },
    end(state) {
      state.isActive = false;
    }
  },
  getters: {
    state: state => state.isActive
  }
};