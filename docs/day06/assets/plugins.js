import Component from './component.js';

export class SliderController extends Component {
  static name = 'slider__control';

  constructor({container, data, parent: slider}) {
    super({container, data});

    const buttons = container.querySelectorAll('.slider__control-buttons, .slider__control-buttons--selected');
    container.addEventListener('mouseover', (evt) => {
      const idx = Array.from(buttons).indexOf(evt.target);
      if(idx >= 0) {
        slider.slideTo(idx);
        slider.stop();
      }
    });

    container.addEventListener('mouseout', (evt) => {
      slider.start();
    });

    slider.container.addEventListener('slide', (evt) => {
      const idx = evt.detail.index;
      const selected = container.querySelector('.slider__control-buttons--selected');
      if(selected) selected.className = 'slider__control-buttons';
      buttons[idx].className = 'slider__control-buttons--selected';
    });
  }

  render(images) {
    return `
      <div class="slider__control">
        ${images.map((image, i) => `
            <span class="slider__control-buttons${i === 0 ? '--selected' : ''}"></span>
        `).join('')}
      </div>    
    `.trim();
  }
}

export class SliderPrevious extends Component {
  constructor({container, parent: slider}) {
    super({container});
    const previous = container.querySelector('.slider__previous');
    previous.addEventListener('click', (evt) => {
      slider.stop();
      slider.slidePrevious();
      slider.start();
      evt.preventDefault();
    });
  }

  render() {
    return '<a class="slider__previous"></a>';
  }
}

export class SliderNext extends Component {
  constructor({container, parent: slider}) {
    super({container});
    const previous = container.querySelector('.slider__next');
    previous.addEventListener('click', (evt) => {
      slider.stop();
      slider.slideNext();
      slider.start();
      evt.preventDefault();
    });
  }

  render() {
    return '<a class="slider__next"></a>';
  }
}