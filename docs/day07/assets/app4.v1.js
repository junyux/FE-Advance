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

// 三部分 UI 耦合在一起的 update 方法
function update(src, dest, hint) {
  const scrollRange = src.scrollHeight - src.clientHeight,
    p = src.scrollTop / scrollRange;

  dest.scrollTop = p * (dest.scrollHeight - dest.clientHeight);
  hint.innerHTML = `${Math.round(100 * p)}%`;
}

update(editor, preview, hintbar);

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
editor.addEventListener('scroll', (evt) => {
  if(!scrollingTarget) scrollingTarget = editor;
  if(scrollingTarget === editor) update(editor, preview, hintbar);
});

editor.addEventListener('scroll', debounce((evt) => {
  scrollingTarget = null;
}));

preview.addEventListener('scroll', (evt) => {
  if(!scrollingTarget) scrollingTarget = preview;
  if(scrollingTarget === preview) update(preview, editor, hintbar);
});