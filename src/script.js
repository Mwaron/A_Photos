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

import { animate, text, stagger, onScroll, createTimeline} from 'animejs';

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


// HOME PAGE ANIMATION
animate(".title", {
  translateY: ["-200%", "0%"],
  ease: "cubicBezier(1, 0, 0, 1)",
  duration: 1500,
})

animate(".subtitle",{
  translateY: ["2200%", "0%"],
  ease: "cubicBezier(1, 0, 0, 1)",
  delay: 250,
  duration: 1500,
})



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


// GIF ANIMATION
animate(".animation", {
  scale: [0.6, 1],
  duration: 600,
  translateX: ['100%', '0%'],
  autoplay: onScroll()
})

//PICTURES ANIMATION
animate(".photos", {
  scale: [0.6, 1],
  duration: 600,
  translateX: ['-100%', '0%'],
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


//CONTENT LINKS ANIMATION
//Facebook link
const { chars } = text.split('#fac', {
  chars: { wrap: 'clip' },
});

const fac = document.getElementById('fac')
fac.addEventListener("mouseenter", hovered);
console.log(chars);
function hovered() {
  animate(chars, {
    opacity: [0, 1],
    duration: 500,
    ease: 'out(100)',
    delay: stagger(30),
  });
};


//Instagram link
const { chars: chars2 } = text.split('#ins', {
  chars: { wrap: 'clip' },
});

const ins = document.getElementById('ins')
ins.addEventListener("mouseenter", hovered2);
console.log(chars2);
function hovered2() {
  animate(chars2, {
    opacity: [0, 1],
    duration: 500,
    ease: 'out(100)',
    delay: stagger(30),
  });
};

//Github link
const { chars: chars3 } = text.split('#git', {
  chars: { wrap: 'clip' },
});

const git = document.getElementById('git')
git.addEventListener("mouseenter", hovered3);
console.log(chars3);
function hovered3() {
  animate(chars3, {
    opacity: [0, 1],
    duration: 500,
    ease: 'out(100)',
    delay: stagger(30),
  });
};



// Cursor animation
const work = document.getElementById('work');
work.addEventListener("mousemove", spawnpic)

function spawnpic(e) {
  console.log('spawn picture')
  animate(".cursor", {
    scale: [0.6, 1],
    opacity: [0, 1, 0],
    duration: 600,
  })
}


//THE SECTIONS ANIMATION WHILE SCROLLING
// First to second section animation
animate(".home", {
  translateY: "100vh",
  ease: "linear",
  autoplay: onScroll({
    enter: 'top top',
    leave: "top bottom",
    debug: false,
    sync: .8
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
    sync: .8
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
    sync: .8
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
    sync: .8
    })
})


// CURSOR ANIMATION
/*
import { createAnimatable, utils } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const $demo = $demos.querySelector('.docs-demo.is-active');
let bounds = $demo.getBoundingClientRect();
const refreshBounds = () => bounds = $demo.getBoundingClientRect();

const circle = createAnimatable(".circle", {
  x: 0,
  y: 0,
  ease: 'outExpo',
});

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const hw = width / 2;
  const hh = height / 2;
  const x = utils.clamp(e.clientX - left - hw, -hw, hw);
  const y = utils.clamp(e.clientY - top - hh, -hh, hh);
}

window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
*/

