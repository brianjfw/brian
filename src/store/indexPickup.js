export default {
  namespaced: true,
  state: () => ({
    isAnimation: false,
    isTransition: false,
    currentNumber: 1
  }),
  mutations: {
    animation(state, value) {
      state.isAnimation = value;
    },
    transition(state, value) {
      state.isTransition = value;
    },
    currentNumber(state, value) {
      state.currentNumber = value;
    }
  },
  getters: {
    animation: state => state.isAnimation,
    transition: state => state.isTransition,
    currentNumber: state => state.currentNumber
  }
};
