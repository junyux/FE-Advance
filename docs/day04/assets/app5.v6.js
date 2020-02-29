import {pipe, spread, reverse, fold, continous} from './hof.js';

const batch = pipe(continous, fold, reverse, spread);
const setStyle = batch(([key, value], el) => {
  el.style[key] = value;
  return [key, value];
});

const list = document.querySelectorAll('li:nth-child(2n+1)');

setStyle(list, 'color', 'red');