export default class Slider {
  constructor({container, cycle = 3000} = {}) {
    this.container = container;
    this.items = Array.from(container.querySelectorAll('.slider__item, .slider__item--selected'));
    this.cycle = cycle;
  }

  registerPlugins(...plugins) {
    plugins.forEach(plugin => plugin(this));
  }

  /*
    通过选择器`.slider__item--selected`获得被选中的元素
  */
  getSelectedItem() {
    const selected = this.container.querySelector('.slider__item--selected');
    return selected;
  }

  /*
    返回选中的元素在items数组中的位置。
  */
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

  /*
    将下一张图片标记为选中状态
  */
  slideNext() {
    const currentIdx = this.getSelectedItemIndex();
    const nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }

  /*
    将上一张图片标记为选中状态
  */
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