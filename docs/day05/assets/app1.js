const text = `If you already have experience making drawings with computers, you know that in that process you draw a circle, then a rectangle, a line, some triangles until you compose the image you want. That process is very similar to writing a letter or a book by hand - it is a set of instructions that do one task after another.

Shaders are also a set of instructions, but the instructions are executed all at once for every single pixel on the screen. That means the code you write has to behave differently depending on the position of the pixel on the screen. Like a type press, your program will work as a function that receives a position and returns a color, and when it's compiled it will run extraordinarily fast. 

Why are shaders fast? To answer this, I present the wonders of parallel processing.

Imagine the CPU of your computer as a big industrial pipe, and every task as something that passes through it - like a factory line. Some tasks are bigger than others, which means they require more time and energy to deal with. We say they require more processing power. Because of the architecture of computers the jobs are forced to run in a series; each job has to be finished one at a time. Modern computers usually have groups of four processors that work like these pipes, completing tasks one after another to keeping things running smoothly. Each pipe is also known as a thread.`;

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function starting(el, count = 3) {
  el.innerText = count;
  while(count--) {
    await wait(1000);
    el.innerText = count;
  }
  el.innerText = '';
}

function* typings(text) {
  for(let i = 0; i < text.length; i++) {
    const char = text[i];
    yield new Promise((resolve) => {
      document.addEventListener('keydown', function f({key}) {
        if(key === char) {
          document.removeEventListener('keydown', f);
          resolve(key);
        }
      });
    });
  }
}

async function countDown(el, sec) {
  while(sec--) {
    const minute = Math.floor(sec / 60);
    const second = sec % 60;
    const time = `${minute > 10 ? minute : `0${minute}`}:${second > 10 ? second : `0${second}`}`;
    el.innerText = time;
    await wait(1000);
  }
}

const typedEl = document.getElementById('typed');
const startingEl = document.getElementById('starting');
const countdownEl = document.getElementById('countdown');

const panel = document.getElementById('panel');
panel.addEventListener('click', start);

async function start() {
  panel.innerText = text;
  await starting(startingEl);
  const countDownPromise = countDown(countdownEl, 10);
  typedEl.innerText = '_';
  for(const typing of typings(text)) {
    const key = await Promise.race([countDownPromise, typing]);
    if(key) {
      typedEl.innerText = `${typedEl.innerText.slice(0, -1)}${key}_`;
    } else {
      break;
    }
  }
  console.log('结束');
}