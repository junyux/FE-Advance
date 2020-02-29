const traffic = document.querySelector('.traffic');

function loop() {
  traffic.className = 'traffic pass';
  setTimeout(() => {
    traffic.className = 'traffic wait';
    setTimeout(() => {
      traffic.className = 'traffic stop';
      setTimeout(loop, 3500);
    }, 1500);
  }, 5000);
}

loop();