import Lenis from 'lenis'
import Snap from 'lenis/snap'

const lenis = new Lenis({
autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
console.log(e);
});

const snap = new Snap(lenis, {})

let viewportHeight = window.innerHeight;
console.log(viewportHeight);


snap.add(viewportHeight);
snap.add(viewportHeight * 2);
snap.add(viewportHeight * 3);