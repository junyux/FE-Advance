function animate({target, prop, duration, start, end, easing, interpolate} = {}) {
  const startTime = Date.now();

  return new Promise((resolve) => {
    function update() {
      const t = Date.now() - startTime;
      const p = Math.min(t / duration, 1);

      target.style[prop] = interpolate(start, end, easing ? easing(p) : p);
      if(p < 1) {
        requestAnimationFrame(update);
      } else {
        resolve(p);
      }
    }
    update();
  });
}

const sphere = document.getElementById('sphere');

/* globals BezierEasing */
animate({
  target: sphere,
  prop: 'top',
  duration: 2000,
  start: 400,
  end: 100,
  easing: BezierEasing(0.68, -0.55, 0.265, 1.55),
  interpolate(start, end, p) {
    return `${start * (1 - p) + end * p}px`;
  },
});