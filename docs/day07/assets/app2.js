import {useBehavior} from './behavior.js';

const select = useBehavior({
  type: 'select',
  data: {
    picked: new Set(), // 选中的图片集合
  },
  getDetail(subject, target) {
    const picked = this.data.picked;

    if(picked.has(target)) {
      target.className = '';
      picked.delete(target);
    } else {
      target.className = 'selected';
      picked.add(target);
    }

    return {
      changed: target,
      picked,
    };
  },
});

const list = document.getElementById('list');
list.addEventListener('click', (evt) => {
  const target = evt.target;
  if(target.tagName === 'IMG') {
    select(list, target);
  }
});

list.addEventListener('select', ({detail}) => {
  // do nothing
  console.log(detail.changed, detail.picked);
});