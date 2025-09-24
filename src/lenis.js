import Lenis from 'lenis'
import Snap from 'lenis/snap'

const lenis = new Lenis({
autoRaf: true,
smooth: true,
snap: true,
anchors: true, // allow Lenis to handle anchor links properly
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
requestAnimationFrame(raf);

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
console.log(e);
});

const snap = new Snap(lenis, {})

let viewportHeight = window.innerHeight;
console.log(viewportHeight);

snap.add(0);
snap.add(viewportHeight);
snap.add(viewportHeight * 2);
snap.add(viewportHeight * 3);





const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Optionally add an offset for fixed headers if required
      const navHeight = document.querySelector('nav').offsetHeight || 0;
      lenis.scrollTo(targetElement, { offset: -navHeight });
    }
  });
});
