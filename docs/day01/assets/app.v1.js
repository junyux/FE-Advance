const btn = document.getElementById('modeBtn');

btn.addEventListener('click', (e) => {
  const body = document.body;
  if(e.target.innerHTML === '🌞') {
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
    e.target.innerHTML = '🌜';
  } else {
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
    e.target.innerHTML = '🌞';
  }
});
