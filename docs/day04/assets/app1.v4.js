import {once} from './hof.js';

const list = document.querySelector('ul');
const buttons = list.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', once((evt) => {
    const target = evt.target;
    target.parentNode.className = 'completed';
    setTimeout(() => {
      list.removeChild(target.parentNode);
    }, 2000);
  }));
});