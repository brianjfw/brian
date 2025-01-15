export default {
  namespaced: true,
  state: () => ({
    isLoad: false,
    isHover: false,
    isDown: false,
    isLoading: false
  }),
  mutations: {
    loadend(state) {
      console.log('[Mouse] Load ended');
      state.isLoad = true;
    },
    init(state) {
      console.log('[Mouse] State reset');
      state.isLoad = false;
    },
    mouseenter(state) {
      state.isHover = true;
    },
    mouseleave(state) {
      state.isHover = false;
    },
    mousedown(state) {
      state.isDown = true;
    },
    mouseup(state) {
      state.isDown = false;
    },
    loading(state) {
      console.log('[Mouse] Loading state activated');
      state.isLoading = true;
    },
    loadingEnd(state) {
      console.log('[Mouse] Loading state deactivated');
      state.isLoading = false;
    }
  },
  getters: {
    isLoad: state => state.isLoad,
    isHover: state => state.isHover,
    isDown: state => state.isDown,
    isLoading: state => state.isLoading
  }
};
