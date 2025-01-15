export default {
  namespaced: true,
  state: () => ({
    isLoad: false
  }),
  mutations: {
    loaded(state) {
      console.log('[ImageLoaded] Images loaded successfully');
      state.isLoad = true;
    },
    init(state) {
      console.log('[ImageLoaded] Resetting image loaded state');
      state.isLoad = false;
    }
  },
  getters: {
    isLoad: state => state.isLoad
  }
};