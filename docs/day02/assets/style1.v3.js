const tree = document.querySelector('.tree');

tree.addEventListener('click', (evt) => {
  if(evt.target.tagName === 'LI') {
    if(evt.target.className === 'expand') {
      evt.target.className = '';
    } else {
      evt.target.className = 'expand';
    }
  }
});