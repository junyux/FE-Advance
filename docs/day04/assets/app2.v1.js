const panel = document.getElementById('panel');
let throttleTimer = null;
panel.addEventListener('mousemove', (e) => {
  if(!throttleTimer) {
    const {x, y} = e;
    e.target.style.background = `linear-gradient(${y}deg, 
      hsl(0, 50%, 50%),
      hsl(${0.5 * x}, 50%, 50%))`;
    throttleTimer = setTimeout(() => {
      throttleTimer = null;
    }, 100);
  }
});