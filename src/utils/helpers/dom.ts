export function getStyle(el: string) {
  return window.getComputedStyle(document.getElementById(el)!, null);
}

export function getRect(el: string): DOMRect {
  return document.getElementById(el)?.getBoundingClientRect();
}

export function isDarkColor(rgb?: string): boolean {
  if (rgb === undefined) return false;
  rgb = rgb.replace(/[\s#]/g, '');
  if (rgb.length == 3) {
    rgb = rgb[0] + rgb[0] + rgb[1] + rgb[1] + rgb[2] + rgb[2];
  }
  const r = parseInt(rgb.substr(0, 2), 16);
  const g = parseInt(rgb.substr(2, 2), 16);
  const b = parseInt(rgb.substr(4, 2), 16);
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  return hsp < 120;
}
