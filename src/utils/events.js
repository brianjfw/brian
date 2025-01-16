export const preDefaultEvent = (enable) => {
  const preEvent = (e) => {
    e.preventDefault()
  }

  if (enable) {
    window.addEventListener('wheel', preEvent, { passive: false })
    window.addEventListener('touchmove', preEvent, { passive: false })
  } else {
    window.removeEventListener('wheel', preEvent, { passive: false })
    window.removeEventListener('touchmove', preEvent, { passive: false })
  }
} 