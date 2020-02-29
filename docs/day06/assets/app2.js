import Slider from './slider-v2.js';

/* 小圆点控件 */
function pluginController(slider) {
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
}

function pluginPrevious(slider) {
  const previous = slider.container.querySelector('.slider__previous');
  if(previous) {
    previous.addEventListener('click', (evt) => {
      slider.stop();
      slider.slidePrevious();
      slider.start();
      evt.preventDefault();
    });
  }
}

function pluginNext(slider) {
  const next = slider.container.querySelector('.slider__next');
  if(next) {
    next.addEventListener('click', (evt) => {
      slider.stop();
      slider.slideNext();
      slider.start();
      evt.preventDefault();
    });
  }
}

const container = document.querySelector('.slider');
const slider = new Slider({container});
slider.registerPlugins(pluginController, pluginPrevious, pluginNext);
slider.start();