import {continous} from './hof.js';

const setStyle = continous(([key, value], el) => {
  el.style[key] = value;
  return [key, value];
});

const list = document.querySelectorAll('li:nth-child(2n+1)');
setStyle(['color', 'red'], ...list);