/**
 * Prevents default events (like scroll) on the document
 * @param {boolean} shouldPrevent - Whether to prevent default events
 */
export const preventDefault = (shouldPrevent) => {
  const handleTouchMove = (e) => {
    if (shouldPrevent) {
      e.preventDefault();
    }
  };

  if (shouldPrevent) {
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
  } else {
    document.removeEventListener('touchmove', handleTouchMove);
  }
};

export const preDefaultEvent = (shouldPrevent) => {
  if (typeof window === 'undefined') return;
  preventDefault(shouldPrevent);
}; 