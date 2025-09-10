const btn = document.getElementById('ddbtn');
const content = document.getElementById('ddct');


btn.addEventListener('click', function(event) {
  event.stopPropagation(); // Prevent click event from bubbling up
  content.classList.toggle('show');
  //lockScroll();
  console.log(content.classList.contains('show'));
});



document.addEventListener('click', function() {
  if (content.classList.contains('show')) {
    content.classList.remove('show');
    //unlockScroll();
    console.log(content.classList.contains('show'));
  }
});

/*
let scrollPosition = 0;

function lockScroll() {
scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
document.body.style.position = 'fixed';
document.body.style.top = `-${scrollPosition}px;`
document.body.style.left = '0';
document.body.style.right = '0';
document.body.style.width = '100%';
}

function unlockScroll() {
document.body.style.position = '';
document.body.style.top = '';
document.body.style.left = '';
document.body.style.right = '';
document.body.style.width = '';
window.scrollTo(0, scrollPosition);
}*/

import { animate, text, stagger, onScroll} from 'animejs';

//NAVBAR ANIMARION
animate("nav", {
  scale: [0.8, 1],
  //translateY: ["-200%", "0%"],
  opacity: [0, 1],
  ease: "linear",
  autoplay: onScroll({
    target: "#about",
    enter: "bottom top",
    leave: "top top",
    debug: false,
    sync: true
  })
});



//Some text animation
const nodes = document.querySelectorAll('.text');
nodes.forEach((el, i) => {
  
  animate(el, {
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 500,
    autoplay: onScroll()
  });
});



animate(".animation", {
  scale: [0.6, 1],
  duration: 600,
  translateX: ['100%', '0%'],
  autoplay: onScroll()
})


//Text animation
const texts = document.querySelectorAll('.text');
texts.forEach((el, i) => {

  const { chars } = text.split(el, {
    chars: { wrap: 'clip' },
  });

  animate(chars, {
    y: [
      { to: ['100%', '0%'] },
    ],
    duration: 150,
    ease: 'out(3)',
    delay: stagger(5),
    autoplay: onScroll()
  });
});



/*
const sections = document.querySelectorAll('section');
sections.forEach((el, i) => {
  animate(el, {
    scale: [0.6, 1],
    duration: 600,
    translateY: ["0%", "100%"],
    autoplay: onScroll({
      enter: 'bottom max',
      leave: "top min",
      debug: true,
      sync: true
    })
  });
});
*/


//THE SECTIONS ANIMATION WHILE SCROLLING

// First to second section animation
animate(".home", {
  translateY: "100vh",
  ease: "linear",
  autoplay: onScroll({
    enter: 'top top',
    leave: "top bottom",
    debug: false,
    sync: true
    })
})

// Second to third section animation
animate("#about", {
  translateY: "100vh",
  ease: "linear",
  autoplay: onScroll({
    enter: 'top top',
    leave: "top bottom",
    debug: false,
    sync: .5
    })
})

// Third to fourth section animation
animate("#work", {
  translateY: "100vh",  
  ease: "linear",
  autoplay: onScroll({
    enter: 'top top',
    leave: "top bottom",
    debug: false,
    sync: .5
    })
})

// Fourth to fifth section animation
animate("#contact", {
  translateY: "100vh",
  ease: "linear",
  autoplay: onScroll({
    enter: 'top top',
    leave: "top bottom",
    debug: false,
    sync: .5
    })
})