const btn = document.getElementById('ddbtn');
const content = document.getElementById('ddct');


btn.addEventListener('click', function(event) {
  event.stopPropagation(); // Prevent click event from bubbling up
  content.classList.toggle('show');
  console.log(content.classList.contains('show'));
});

document.addEventListener('click', function() {
  if (content.classList.contains('show')) {
    content.classList.remove('show');
    console.log(content.classList.contains('show'));
  }
});