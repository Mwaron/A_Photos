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

import { animate, text, stagger, onScroll, waapi} from 'animejs';

animate(".text", {
  scale: [0.8, 1],
  opacity: [0, 1],
  duration: 500,
  autoplay: onScroll({
    debug: true
  })
});


//Text animation
const { chars } = text.split('.text', {
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
