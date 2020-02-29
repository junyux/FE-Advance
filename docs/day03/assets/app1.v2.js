const traffic = document.querySelector('.traffic');

function loop(subject) {
  subject.className = 'traffic pass';
  setTimeout(() => {
    subject.className = 'traffic wait';
    setTimeout(() => {
      subject.className = 'traffic stop';
      setTimeout(loop.bind(null, subject), 3500);
    }, 1500);
  }, 5000);
}

loop(traffic);