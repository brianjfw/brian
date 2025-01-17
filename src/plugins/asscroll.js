import ASScroll from '@ashthornton/asscroll'
import { useEventBus } from './eventBus'

let asscrollInstance = null
const eventBus = useEventBus()

export function initASScroll() {
  if (typeof window === 'undefined') return null
  
  try {
    // Create ASScroll instance
    asscrollInstance = new ASScroll({
      disableRaf: true,
      touchScrollType: 'transform'
    })

    // Initialize
    asscrollInstance.enable({
      newScrollElements: document.querySelector('.asscroll'),
      reset: true
    })

    // Emit ready event
    eventBus.emit('asscroll:ready', asscrollInstance)

    return asscrollInstance
  } catch (error) {
    console.error('Failed to initialize ASScroll:', error)
    return null
  }
}

export function getASScroll() {
  return asscrollInstance
}

export function setupASScroll(app) {
  // Add global property
  app.config.globalProperties.$asscroll = asscrollInstance

  // Add global method to get instance
  app.config.globalProperties.$getASScroll = getASScroll

  return {
    install(app) {
      app.config.globalProperties.$asscroll = asscrollInstance
      app.config.globalProperties.$getASScroll = getASScroll
    }
  }
}

// Initialize on import
initASScroll() 