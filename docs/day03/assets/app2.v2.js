export function shuffle(items) {
  items = [...items];
  for(let i = items.length; i > 0; i--) {
    const idx = Math.floor(Math.random() * i);
    [items[idx], items[i - 1]] = [items[i - 1], items[idx]];
  }
  return items;
}
