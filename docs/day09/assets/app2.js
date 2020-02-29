import Person from './person-v2.js';

const name = document.getElementById('name');
const avatar = document.getElementById('avatar');
const birthYear = document.getElementById('birth-year');
const birthMonth = document.getElementById('birth-month');
const age = document.getElementById('age');
const portrait = document.getElementById('portrait');

function updatePerson(person) {
  name.value = person.name;
  const {year, month} = person.birthday;
  birthYear.value = `${year}年`;
  birthMonth.value = `${month}月`;
  age.value = `${person.age}岁`;
  portrait.value = person.portrait;
  avatar.innerHTML = person.name;
}

let p = new Person({name: '张三', birthday: '1999-12'});

function watch(obj, onchange) {
  /*
    这个代理对象表示拦截persion对象的属性赋值操作，在属性赋值操作后，都执行一次onchange方法。这样就无需派发消息的中间人，但又实现了数据驱动UI的效果。
  */
  return new Proxy(obj, {
    set(target, name, value) {
      Reflect.set(target, name, value); // 调用person对象的原始操作(即，属性赋值操作)
      onchange(target, {[name]: value});
      return true; // 表示成功
    },
  });
}

p = watch(p, (subject) => {
  updatePerson(subject);
});
updatePerson(p);

name.addEventListener('change', (e) => {
  p.name = e.target.value;
});

birthYear.addEventListener('change', (e) => {
  p.birthday = {year: parseInt(e.target.value, 10)};
});

birthMonth.addEventListener('change', (e) => {
  p.birthday = {month: parseInt(e.target.value, 10)};
});