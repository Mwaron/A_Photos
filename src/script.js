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

import { animate } from 'https://cdn.jsdelivr.net/npm/animejs/+esm';

animate('.text', {
    opacity: [0, 0, 1],
    easing: 'easeInOutQuad',
    duration: 1000,
});

//Mouse tracking
const container = document.querySelector('.image-container');
const overlay = container.querySelector('.overlay');

container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left; // x position within container
  const y = e.clientY - rect.top;  // y position within container
  
  overlay.style.clipPath = `circle(80px at ${x}px ${y}px)`;
});

container.addEventListener('mouseleave', () => {
  overlay.style.transition = 'clip-path 0.8s ease';
  overlay.style.clipPath = 'circle(0% at center)';
});

container.addEventListener('mouseenter', () => {
  overlay.style.transition = 'none';
});