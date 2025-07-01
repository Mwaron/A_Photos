window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const zoomElement = document.querySelector('.camera');
    // Scale between 1 and 2 based on scroll amount (adjust divisor for speed)
    const scale = 1 + scrollTop / 500;
    zoomElement.style.transform = `scale(${scale})`;
  });
  