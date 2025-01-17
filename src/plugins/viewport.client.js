import { updateViewportValues } from '../constants/site-config';

// Initial viewport update
updateViewportValues();

// Debounce function to limit update frequency
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced viewport update function
const debouncedUpdateViewport = debounce(updateViewportValues, 100);

// Add resize listener
window.addEventListener('resize', debouncedUpdateViewport);

// Add orientation change listener for mobile devices
window.addEventListener('orientationchange', () => {
  // Small delay to ensure new dimensions are available
  setTimeout(updateViewportValues, 100);
});