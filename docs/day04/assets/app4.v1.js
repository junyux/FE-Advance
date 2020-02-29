import {intercept} from './hof.js';

function sum(...list) {
  return list.reduce((a, b) => a + b);
}

const logger = document.getElementById('logger');

sum = intercept(sum, {
  beforeCall(args) {
    logger.innerHTML += `The argument is ${args}\n`;
    console.time('sum'); // 监控性能
  },
  afterCall(ret) {
    logger.innerHTML += `The resulte is ${ret}\n`;
    console.timeEnd('sum');
  },
});

sum(1, 2, 3, 4, 5);