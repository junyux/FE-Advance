const traffic = document.querySelector('.traffic');

function signalLoop(subject, signals = [], onSignal) {
  const signalCount = signals.length;
  function updateState(i) {
    const {signal, duration} = signals[i % signalCount];
    onSignal(subject, signal);
    setTimeout(updateState.bind(null, i + 1), duration);
  }
  updateState(0);
}

const signals = [
  {signal: 'pass', duration: 5000},
  {signal: 'wait', duration: 3500},
  {signal: 'stop', duration: 1500},
];
signalLoop(traffic, signals, (subject, signal) => {
  subject.className = `traffic ${signal}`;
});