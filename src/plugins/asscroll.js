import ASScroll from '@ashthornton/asscroll'
import { useEventBus } from './eventBus'

let asscrollInstance = null
let initializationAttempts = 0
const MAX_ATTEMPTS = 5
const RETRY_DELAY = 100
const eventBus = useEventBus()

function waitForElements() {
  return new Promise((resolve, reject) => {
    function check() {
      const container = document.querySelector('.asscroll-container')
      const scrollElement = document.querySelector('.asscroll')
      
      if (container && scrollElement) {
        resolve({ container, scrollElement })
      } else if (initializationAttempts < MAX_ATTEMPTS) {
        initializationAttempts++
        setTimeout(check, RETRY_DELAY)
      } else {
        reject(new Error('Could not find ASScroll elements after maximum attempts'))
      }
    }
    check()
  })
}

export async function initASScroll() {
  if (typeof window === 'undefined') return null
  
  try {
    // Wait for DOM elements
    const { container, scrollElement } = await waitForElements()
    
    // Create ASScroll instance
    asscrollInstance = new ASScroll({
      containerElement: container,
      scrollElements: scrollElement,
      disableRaf: true,
      touchScrollType: 'transform'
    })

    // Initialize
    asscrollInstance.enable({
      newScrollElements: scrollElement,
      reset: true
    })

    // Emit ready event
    eventBus.emit('asscroll:enabled', asscrollInstance)

    return asscrollInstance
  } catch (error) {
    console.error('Failed to initialize ASScroll:', error)
    return null
  }
}

export function getASScroll() {
  return asscrollInstance
}

export function destroyASScroll() {
  if (asscrollInstance) {
    asscrollInstance.disable()
    asscrollInstance = null
  }
}

export function setupASScroll(app) {
  // Add global property
  app.config.globalProperties.$asscroll = asscrollInstance
  
  // Add global method to get instance
  app.config.globalProperties.$getASScroll = getASScroll
  
  // Add global method to destroy instance
  app.config.globalProperties.$destroyASScroll = destroyASScroll
  
  return {
    install(app) {
      app.config.globalProperties.$asscroll = asscrollInstance
      app.config.globalProperties.$getASScroll = getASScroll
      app.config.globalProperties.$destroyASScroll = destroyASScroll
    }
  }
}

// Initialize on import
initASScroll() 