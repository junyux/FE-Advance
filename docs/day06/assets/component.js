export default class Component {
  static name = 'component';

  constructor({container, data, parent = null} = {}) {
    this.data = data;
    this.container = container;
    this.container.innerHTML = this.render(this.data);
  }

  registerSubComponents(...Comps) {
    const data = this.data;
    const container = this.container;
    this.children = this.children || [];
    Comps.forEach((Comp) => {
      const subContainer = document.createElement('div');
      const sub = new Comp({container: subContainer, data, parent: this});
      container.appendChild(subContainer);
      this.children.push(sub);
    });
  }

  render(data) {
    /* abstract */
    return '';
  }
}