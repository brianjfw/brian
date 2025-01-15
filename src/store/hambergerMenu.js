export default {
  namespaced: true,
  state: () => ({
    isOpen: false
  }),
  mutations: {
    open(state) {
      state.isOpen = true;
    },
    close(state) {
      state.isOpen = false;
    }
  },
  getters: {
    state: state => state.isOpen
  }
};
