export default {
  namespaced: true,
  
  state: {
    isOpen: false,
    isPickupOpen: false,
  },

  getters: {
    state: state => state.isOpen,
    pickupState: state => state.isPickupOpen,
  },

  mutations: {
    open(state) {
      state.isOpen = true;
    },
    close(state) {
      state.isOpen = false;
    },
    pickupOpen(state) {
      state.isPickupOpen = true;
    },
    pickupClose(state) {
      state.isPickupOpen = false;
    },
  },
}
