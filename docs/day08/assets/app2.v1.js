const sphere = document.getElementById('sphere');

/*
  @target 目标动画元素
  @duration 动画经历的时间
  @progress 动画执行回调函数
*/
function animate(target, duration, progress) {
  const startTime = Date.now();
  return new Promise((resolve) => {
    function update() {
      const t = Date.now() - startTime;
      const p = Math.min(t / duration, 1);
      progress(target, p);
      if(p < 1) {
        requestAnimationFrame(update);
      } else {
        resolve(p);
      }
    }
    update();
  });
}

(async function () {
  let height = 400;
  let duration = 1000;

  while(1) {
    await animate(sphere, duration, (target, p) => {
      const top = (400 - height) + height * p ** 2;
      target.style.top = `${top}px`;
    });

    // 能量损耗后的动画执行高度和时间
    height *= 0.7;
    duration *= Math.sqrt(0.7);

    await animate(sphere, duration, (target, p) => {
      // 起点是400，反向运动，所以要用400减
      const top = 400 - height * p * (2 - p);
      target.style.top = `${top}px`;
    });
  }
}());