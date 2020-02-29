export function shuffle(items) {
  items = [...items];
  const ret = [];
  while(items.length) {
    const idx = Math.floor(Math.random() * items.length);
    const item = items.splice(idx, 1)[0];
    ret.push(item);
  }
  return ret;
}
