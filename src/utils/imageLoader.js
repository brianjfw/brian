import ImagesLoaded from 'imagesloaded'

export const imageLoader = {
  /**
   * Get the full URL for an image
   * @param {string} url - The image URL or path
   * @returns {string} The full URL for the image
   */
  getImageUrl(url) {
    if (!url) return ''
    return url.startsWith('/') ? url : `/images/${url}`
  },

  /**
   * Get the full URL for a video
   * @param {string} url - The video URL or path
   * @returns {string} The full URL for the video
   */
  getVideoUrl(url) {
    if (!url) return ''
    return url.startsWith('/') ? url : `/movie/${url}`
  },

  /**
   * Load all images within a container
   * @param {string} containerSelector - The CSS selector for the container
   * @returns {Promise} A promise that resolves when all images are loaded
   */
  loadImages(containerSelector) {
    return new Promise((resolve, reject) => {
      const container = document.querySelector(containerSelector)
      if (!container) {
        reject(new Error(`Container not found: ${containerSelector}`))
        return
      }

      const images = container.querySelectorAll('img')
      if (images.length === 0) {
        resolve([])
        return
      }

      const imgLoad = new ImagesLoaded(container)

      imgLoad.on('always', (instance) => {
        resolve(instance.images)
      })

      imgLoad.on('fail', (instance) => {
        console.warn('Some images failed to load:', instance.images)
        resolve(instance.images)
      })
    })
  },

  /**
   * Preload a single image
   * @param {string} src - The image source URL
   * @returns {Promise} A promise that resolves when the image is loaded
   */
  preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
      img.src = this.getImageUrl(src)
    })
  },

  /**
   * Preload multiple images
   * @param {Array<string>} sources - Array of image source URLs
   * @returns {Promise} A promise that resolves when all images are loaded
   */
  preloadImages(sources) {
    const promises = sources.map(src => this.preloadImage(src))
    return Promise.all(promises)
  }
} 