import {useBehavior} from './behavior.js';

const preview = useBehavior({
  type: 'preview',

  /*
    @subject: <ul>元素
    @target: 选中的图片元素
  */
  getDetail(subject, target) {
    const imgs = Array.from(subject.querySelectorAll('img'));
    const selected = imgs.indexOf(target); // 获取选中图片在图片集合中的索引号
    let mask = document.getElementById('mask');

    // 如果mask不存在，创建一个mask元素
    if(!mask) {
      mask = document.createElement('div');
      mask.id = 'mask';
      mask.innerHTML = `
        <a class="previous" href="###">&lt;</a>
        <img src="${imgs[selected].src}">
        <a class="next" href="###">&gt;</a>    
      `;
      // 给 #mask 元素设置样式：
      Object.assign(mask.style, {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'space-between',
      });

      // 给 #mask 元素左右两边的<a>元素设置样式：
      mask.querySelectorAll('a').forEach((a) => {
        Object.assign(a.style, {
          width: '30px',
          textAlign: 'center',
          fontSize: '2rem',
          color: '#fff',
          textDecoration: 'none',
        });
      });
      document.body.appendChild(mask);

      // 给#mask元素添加点击事件处理函数：
      let idx = selected;
      mask.addEventListener('click', (evt) => {
        const target = evt.target;
        if(target === mask) { // 如果点击的对象是mask元素，则隐藏mask元素
          mask.style.display = 'none';
        } else if(target.className === 'previous') { // 显示上一张图片
          update(--idx);
        } else if(target.className === 'next') { // 显示下一张图片
          update(++idx);
        }
      });
    }

    // 设置img元素的src属性指向指定图片
    function update(idx) {
      const [previous, next] = [...mask.querySelectorAll('a')];
      previous.style.visibility = idx ? 'visible' : 'hidden';
      next.style.visibility = idx < imgs.length - 1 ? 'visible' : 'hidden';
      const img = mask.querySelector('img');
      img.src = imgs[idx].src;
    }

    return {
      showMask() { // 显示选中图片的预览
        mask.style.display = 'flex';
        update(selected);
      },
    };
  },
});

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
    if(evt.altKey) {
      select(list, target);
    } else {
      preview(list, target);
    }
  }
});

list.addEventListener('preview', ({detail}) => {
  const {showMask} = detail;
  showMask();
});