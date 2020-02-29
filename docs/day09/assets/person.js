import PubSub from './pubsub.js';

const _name = Symbol('name');
const _birthYear = Symbol('birth-year');
const _birthMonth = Symbol('birth-month');
const _watcher = Symbol('watcher');

export default class Person {
  constructor({name, birthday}) {
    this[_name] = name;
    const date = new Date(birthday);
    this[_birthYear] = date.getFullYear();
    this[_birthMonth] = date.getMonth() + 1;
    this[_watcher] = new PubSub(); // 创建监听对象
  }

  update(props) {
    this[_watcher].pub('change', this, props);
  }

  get watcher() {
    return this[_watcher];
  }

  get name() {
    return this[_name];
  }

  set name(value) {
    this[_name] = value;
    this.update({name: value}); // 派发name更新消息
  }

  get birthday() {
    return {
      year: this[_birthYear],
      month: this[_birthMonth],
    };
  }

  set birthday({year = this[_birthYear], month = this[_birthMonth]}) {
    this[_birthYear] = year;
    this[_birthMonth] = month;
    this.update({birthday: {year, month}}); // 派发birthday更新消息
  }

  get age() {
    return new Date().getFullYear() - this[_birthYear];
  }

  get portrait() {
    if(this.age <= 18) return '少年';
    return '成年';
  }
}