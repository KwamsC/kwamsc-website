import type { Directive } from 'vue'

/**
 * Image fade-in directive
 * Automatically adds fade-in transition when image loads
 * Handles both lazy-loaded and cached images
 *
 * Usage: <img src="..." v-image-fade />
 */
export const vImageFade: Directive<HTMLImageElement> = {
  mounted(el: HTMLImageElement) {
    el.classList.add('image-loading')

    const handleLoad = () => {
      el.classList.remove('image-loading')
      el.classList.add('image-loaded')
    }

    // Check if image is already loaded (cached)
    if (el.complete && el.naturalHeight !== 0) {
      handleLoad()
    } else {
      // Wait for image to load
      el.addEventListener('load', handleLoad, { once: true })
    }
  },

  // Cleanup when element is unmounted
  unmounted(el: HTMLImageElement) {
    el.classList.remove('image-loading', 'image-loaded')
  },
}
