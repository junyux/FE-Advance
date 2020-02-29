const traffic = document.querySelector('.traffic');

function signalLoop(subject, signals = []) {
  const signalCount = signals.length;
  function updateState(i) {
    const {signal, duration} = signals[i % signalCount];
    subject.className = signal;
    setTimeout(updateState.bind(null, i + 1), duration);
  }
  updateState(0);
}

// 数据抽象
const signals = [
  {signal: 'traffic pass', duration: 5000},
  {signal: 'traffic wait', duration: 3500},
  {signal: 'traffic stop', duration: 1500},
];
signalLoop(traffic, signals);