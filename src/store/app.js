export default {
  namespaced: true,
  
  state: {
    firstAccess: true
  },

  getters: {
    firstAccess: state => state.firstAccess
  },

  mutations: {
    setFirstAccess(state, value) {
      state.firstAccess = value
    }
  }
} 