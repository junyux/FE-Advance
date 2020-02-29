import {spread, reverse, fold, continous} from './hof.js';

const setStyle = spread(reverse(fold(continous(([key, value], el) => {
  el.style[key] = value;
  return [key, value];
}))));

const list = document.querySelectorAll('li:nth-child(2n+1)');

setStyle(list, 'color', 'red');