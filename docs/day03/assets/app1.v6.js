function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const traffic = document.querySelector('.traffic');

async function signalLoop(subject, signals = [], onSignal) {
  const signalCount = signals.length;
  for(let i = 0; ;i++) {
    const {signal, duration} = signals[i % signalCount];
    await onSignal(subject, signal);
    await wait(duration);
  }
}

const signals = [
  {signal: 'pass', duration: 5000},
  {signal: 'wait', duration: 3500},
  {signal: 'stop', duration: 1500},
];
signalLoop(traffic, signals, (subject, signal) => {
  subject.className = `traffic ${signal}`;
});