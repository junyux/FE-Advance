const _name = Symbol('name');
const _birthYear = Symbol('birth-year');
const _birthMonth = Symbol('birth-month');

/*
  这个person类的定义中，去掉了中间人的设置
*/
export default class Person {
  constructor({name, birthday}) {
    this[_name] = name;
    const date = new Date(birthday);
    this[_birthYear] = date.getFullYear();
    this[_birthMonth] = date.getMonth() + 1;
  }

  get name() {
    return this[_name];
  }

  set name(value) {
    this[_name] = value;
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
  }

  get age() {
    return new Date().getFullYear() - this[_birthYear];
  }

  get portrait() {
    if(this.age <= 18) return '少年';
    return '成年';
  }
}