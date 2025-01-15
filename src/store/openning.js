export default {
  namespaced: true,
  state: () => ({
    isEnd: false
  }),
  mutations: {
    end(state) {
      console.log('[Opening] Opening animation ended');
      state.isEnd = true;
    }
  },
  getters: {
    state: state => state.isEnd
  }
};