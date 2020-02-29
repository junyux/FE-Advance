import {batch} from './hof.js';

const setStyle = batch((el, key, value) => {
  el.style[key] = value;
});

const items = document.querySelectorAll('li:nth-child(2n+1)');

setStyle([...items], 'color', 'red');