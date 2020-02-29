import Slider from './slider-v3.js';

const pluginController = { // 小圆点插件
  render(images) { // 随着图片数量的增加，小圆点元素也需要增加
    return `
      <div class="slider__control">
        ${images.map((image, i) => `
            <span class="slider__control-buttons${i === 0 ? '--selected' : ''}"></span>
        `).join('')}
      </div>    
    `.trim();
  },

  initialize(slider) {
    const controller = slider.container.querySelector('.slider__control');

    if(controller) {
      const buttons = controller.querySelectorAll('.slider__control-buttons, .slider__control-buttons--selected');
      controller.addEventListener('mouseover', (evt) => {
        const idx = Array.from(buttons).indexOf(evt.target);
        if(idx >= 0) {
          slider.slideTo(idx);
          slider.stop();
        }
      });

      controller.addEventListener('mouseout', (evt) => {
        slider.start();
      });

      slider.container.addEventListener('slide', (evt) => {
        const idx = evt.detail.index;
        const selected = controller.querySelector('.slider__control-buttons--selected');
        if(selected) selected.className = 'slider__control-buttons';
        buttons[idx].className = 'slider__control-buttons--selected';
      });
    }
  },
};

const pluginPrevious = {
  render() {
    return '<a class="slider__previous"></a>';
  },

  initialize(slider) {
    const previous = slider.container.querySelector('.slider__previous');
    if(previous) {
      previous.addEventListener('click', (evt) => {
        slider.stop();
        slider.slidePrevious();
        slider.start();
        evt.preventDefault();
      });
    }
  },
};

const pluginNext = {
  render() {
    return '<a class="slider__next"></a>';
  },

  initialize(slider) {
    const previous = slider.container.querySelector('.slider__next');
    if(previous) {
      previous.addEventListener('click', (evt) => {
        slider.stop();
        slider.slideNext();
        slider.start();
        evt.preventDefault();
      });
    }
  },
};

const images = ['https://p5.ssl.qhimg.com/t0119c74624763dd070.png',
  'https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg',
  'https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg',
  'https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg'];

const container = document.querySelector('.slider');
const slider = new Slider({container, images});
slider.registerPlugins(pluginController, pluginPrevious, pluginNext);
slider.start();