import {throttle} from './hof.js';

const panel = document.getElementById('panel');
panel.addEventListener('mousemove', throttle((e) => {
  const {x, y} = e;
  e.target.style.background = `linear-gradient(${y}deg, 
    hsl(0, 50%, 50%),
    hsl(${0.5 * x}, 50%, 50%))`;
}));