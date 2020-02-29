function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const traffic = document.querySelector('.traffic');

(async function () {
  while(1) {
    await wait(5000);
    traffic.className = 'traffic wait';
    await wait(1500);
    traffic.className = 'traffic stop';
    await wait(3500);
    traffic.className = 'traffic pass';
  }
}());