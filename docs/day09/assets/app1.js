
import Person from './person.js';

const name = document.getElementById('name');
const avatar = document.getElementById('avatar');
const birthYear = document.getElementById('birth-year');
const birthMonth = document.getElementById('birth-month');
const age = document.getElementById('age');
const portrait = document.getElementById('portrait');

// 根据person模型数据更新UI
function updatePerson(person) {
  name.value = person.name;
  const {year, month} = person.birthday;
  birthYear.value = `${year}年`;
  birthMonth.value = `${month}月`;
  age.value = `${person.age}岁`;
  portrait.value = person.portrait;
  avatar.innerHTML = person.name;
}

const p = new Person({name: '张三', birthday: '1999-12'});
// 注册需要监听的change事件
p.watcher.sub('change', null, ({sender}) => {
  updatePerson(sender); // 更新UI
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