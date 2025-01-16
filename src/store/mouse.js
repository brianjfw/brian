export default {
  namespaced: true,
  
  state: {
    isHover: false,
    isHold: false,
    isLoad: false,
  },

  getters: {
    isHover: state => state.isHover,
    isHold: state => state.isHold,
    isLoad: state => state.isLoad,
  },

  mutations: {
    hover(state) {
      state.isHover = true;
    },
    hoverEnd(state) {
      state.isHover = false;
    },
    hold(state) {
      state.isHold = true;
    },
    holdEnd(state) {
      state.isHold = false;
    },
    loading(state) {
      state.isLoad = true;
    },
    loadend(state) {
      state.isLoad = false;
    },
  },
}
