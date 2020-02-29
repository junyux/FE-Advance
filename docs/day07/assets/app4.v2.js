import PubSub from './pubsub.js';

/* globals markdown */
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const hintbar = document.getElementById('hintbar');

function Editor(input, preview) {
  this.update = function () {
    preview.innerHTML = markdown.toHTML(input.value);
  };
  input.editor = this;
  this.update();
}

new Editor(editor, preview);

function scrollTo({data: p}) {
  this.scrollTop = p * (this.scrollHeight - this.clientHeight);
}

const mediator = new PubSub();
mediator.sub('scroll', preview, scrollTo);
mediator.sub('scroll', editor, scrollTo);
mediator.sub('scroll', hintbar, function ({data: p}) {
  this.innerHTML = `${Math.round(p * 100)}%`;
});

function debounce(fn, ms = 100) {
  let debounceTimer = null;
  return function (...args) {
    if(debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}

let scrollingTarget = null;
editor.addEventListener('scroll', debounce((evt) => {
  scrollingTarget = null;
}));

function updateScroll(evt) {
  const target = evt.target;
  if(!scrollingTarget) scrollingTarget = target;
  if(scrollingTarget === target) {
    const scrollRange = target.scrollHeight - target.clientHeight,
      p = target.scrollTop / scrollRange;

    // 中间人派发scroll消息
    mediator.pub('scroll', target, p);
  }
}
editor.addEventListener('scroll', updateScroll);
preview.addEventListener('scroll', updateScroll);