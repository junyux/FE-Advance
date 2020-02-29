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

const logo = document.getElementById('logo');

animate({
  target: logo,
  prop: 'webkitMask',
  duration: 1000,
  start: 0,
  end: 100,
  interpolate(start, end, p) {
    const v = start * (1 - p) + end * p;
    return `linear-gradient(to right, #000 ${v}%, transparent 0) 0/20px`;
  },
});