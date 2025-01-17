import ASScroll from '@ashthornton/asscroll'
import { useEventBus } from './eventBus'

let asscrollInstance = null
let initializationAttempts = 0
const MAX_ATTEMPTS = 10
const RETRY_DELAY = 200
const eventBus = useEventBus()

function waitForElements() {
  return new Promise((resolve, reject) => {
    function check() {
      const container = document.querySelector('.asscroll-container')
      const scrollElement = document.querySelector('.asscroll')
      
      if (container && scrollElement) {
        // Reset attempts counter on success
        initializationAttempts = 0
        resolve({ container, scrollElement })
      } else if (initializationAttempts < MAX_ATTEMPTS) {
        initializationAttempts++
        console.log(`Waiting for ASScroll elements... Attempt ${initializationAttempts}/${MAX_ATTEMPTS}`)
        setTimeout(check, RETRY_DELAY)
      } else {
        reject(new Error(`Could not find ASScroll elements after ${MAX_ATTEMPTS} attempts`))
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
    
    // Clean up any existing instance
    if (asscrollInstance) {
      asscrollInstance.disable()
      asscrollInstance = null
    }
    
    // Create ASScroll instance
    asscrollInstance = new ASScroll({
      containerElement: container,
      scrollElements: scrollElement,
      disableRaf: true,
      touchScrollType: 'transform',
      ease: 0.075
    })

    // Initialize
    asscrollInstance.enable({
      newScrollElements: scrollElement,
      reset: true
    })

    // Emit ready event
    eventBus.emit('asscroll:enabled', asscrollInstance)
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

export function destroyASScroll() {
  if (asscrollInstance) {
    try {
      asscrollInstance.disable()
      asscrollInstance = null
      initializationAttempts = 0
    } catch (error) {
      console.error('Error destroying ASScroll:', error)
    }
  }
}

export function setupASScroll(app) {
  // Add global property
  app.config.globalProperties.$asscroll = asscrollInstance
  
  // Add global methods
  app.config.globalProperties.$getASScroll = getASScroll
  app.config.globalProperties.$destroyASScroll = destroyASScroll
  app.config.globalProperties.$initASScroll = initASScroll
  
  return {
    install(app) {
      app.config.globalProperties.$asscroll = asscrollInstance
      app.config.globalProperties.$getASScroll = getASScroll
      app.config.globalProperties.$destroyASScroll = destroyASScroll
      app.config.globalProperties.$initASScroll = initASScroll
    }
  }
}

// Don't initialize on import anymore, let main.js control initialization
// initASScroll() 