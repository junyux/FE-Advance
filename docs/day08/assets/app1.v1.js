const earth = document.getElementById('earth');
const x0 = 256;
const y0 = 256;
const radius = 128;
const T = 5000; // 周期

function update(t) {
  const alpha = 2 * Math.PI * t / T;
  const x = x0 + radius * Math.cos(alpha);
  const y = y0 + radius * Math.sin(alpha);
  earth.style.left = `${x}px`;
  earth.style.top = `${y}px`;
  requestAnimationFrame(update);
}
update(0);