export default {
  namespaced: true,
  
  state: {
    isPickup: false,
    isSceneAnimation: false,
    isTransition: false,
    scene: '',
    currentNumber: 1,
    pos: {
      x: 0,
      y: 0,
    },
  },

  getters: {
    state: state => state.isPickup,
    sceneAnimationState: state => state.isSceneAnimation,
    transition: state => state.isTransition,
    scene: state => state.scene,
    currnetNumber: state => state.currentNumber,
    pos: state => state.pos,
  },

  mutations: {
    open(state) {
      state.isPickup = true;
    },
    close(state) {
      state.isPickup = false;
    },
    sceneAnimationStart(state) {
      state.isSceneAnimation = true;
    },
    sceneAnimationEnd(state) {
      state.isSceneAnimation = false;
    },
    transitionStart(state) {
      state.isTransition = true;
    },
    transitionEnd(state) {
      state.isTransition = false;
    },
    setScene(state, scene) {
      state.scene = scene;
    },
    setCurrentNumber(state, number) {
      state.currentNumber = number;
    },
    setPos(state, pos) {
      state.pos = pos;
    },
  },
}
