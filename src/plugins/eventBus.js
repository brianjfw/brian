import mitt from 'mitt'

const emitter = mitt()

export const useEventBus = () => emitter

export default {
  install: (app) => {
    app.config.globalProperties.$eventBus = emitter
  }
} 