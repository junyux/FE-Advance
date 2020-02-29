import Component from './component.js';

export default class Slider extends Component {
  static name = 'slider';

  constructor({container, images = [], cycle = 3000} = {}) {
    super({container, data: images});
    this.items = Array.from(this.container.querySelectorAll('.slider__item, .slider__item--selected'));
    this.cycle = cycle;
    this.slideTo(0);
  }

  render(images) {
    const content = images.map(image => `
      <li class="slider__item">
        <img src="${image}"/>
      </li>    
    `.trim());

    return `<ul>${content.join('')}</ul>`;
  }

  getSelectedItem() {
    const selected = this.container.querySelector('.slider__item--selected');
    return selected;
  }

  getSelectedItemIndex() {
    return this.items.indexOf(this.getSelectedItem());
  }

  slideTo(idx) {
    const selected = this.getSelectedItem();
    if(selected) {
      selected.className = 'slider__item';
    }
    const item = this.items[idx];
    if(item) {
      item.className = 'slider__item--selected';
    }

    const detail = {index: idx};
    const event = new CustomEvent('slide', {bubbles: true, detail});
    this.container.dispatchEvent(event);
  }

  slideNext() {
    const currentIdx = this.getSelectedItemIndex();
    const nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }

  slidePrevious() {
    const currentIdx = this.getSelectedItemIndex();
    const previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
    this.slideTo(previousIdx);
  }

  start() {
    this.stop();
    this._timer = setInterval(() => this.slideNext(), this.cycle);
  }

  stop() {
    clearInterval(this._timer);
  }
}