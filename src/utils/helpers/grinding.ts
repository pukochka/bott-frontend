const grindingTags = 'iframe|script|noframes|frame|frameset|source';

export function grinding(text: string): string {
  const el = document.createElement('div');
  el.innerHTML = text;

  if (text.match(grindingTags) !== null) {
    return el.textContent ?? '';
  }

  return text;
}
