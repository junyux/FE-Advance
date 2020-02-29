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

function lerp(start, end, p) {
  return start * (1 - p) + end * p;
}

const sphere = document.getElementById('sphere');

animate({
  target: sphere,
  prop: 'background',
  duration: 100000,
  start: [0, 170, 255],
  end: [255, 170, 0],
  easing(p) {
    return 100 * p % 1;
  },
  interpolate(start, end, p) {
    const color = start.map((s, i) => {
      return lerp(s, end[i], p);
    });
    return `rgb(${color})`;
  },
});

animate({
  target: sphere,
  prop: 'top',
  duration: 100000,
  start: 250,
  end: 100,
  easing(p) {
    return Math.sin(100 * Math.PI * p);
  },
  interpolate(start, end, p) {
    return `${start * (1 - p) + end * p}px`;
  },
});