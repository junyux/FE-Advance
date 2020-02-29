import {debounce} from './hof.js';

const panel = document.getElementById('panel');
const canvas = document.querySelector('canvas');
function resize() {
  canvas.width = panel.clientWidth;
  canvas.height = panel.clientHeight;
}
function draw() {
  const context = canvas.getContext('2d');
  const radius = canvas.width / 2;
  context.save();
  context.translate(radius, radius);
  for(let i = radius; i >= 0; i -= 5) {
    context.fillStyle = `hsl(${i % 360}, 50%, 50%)`;
    context.beginPath();
    context.arc(0, 0, i, i, 0, Math.PI * 2);
    context.fill();
  }
  context.restore();
}

resize();
draw();

window.addEventListener('resize', debounce(() => {
  resize();
  draw();
}, 500));