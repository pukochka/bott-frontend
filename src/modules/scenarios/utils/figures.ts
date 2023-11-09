const REVERSE_DIFF = 86;
const CURSOR_CFF_LONG = 120;
const START_CFF_LONG = 160;
const CURSOR_CFF_SHORT = 60;
const START_CFF_SHORT = 100;

export function useBeizerLine(
  start_x: number,
  start_y: number,
  end_x: number,
  end_y: number,
  is_reverse: boolean
) {
  let cursor = end_x - CURSOR_CFF_LONG;
  let start = start_x + START_CFF_LONG;

  if (is_reverse && end_x > start_x - REVERSE_DIFF) {
    cursor = end_x - CURSOR_CFF_SHORT;
    start = start_x - START_CFF_SHORT;
  } else if (!is_reverse && end_x < start_x + REVERSE_DIFF) {
    cursor = end_x + CURSOR_CFF_SHORT;
    start = start_x + START_CFF_SHORT;
  } else if (!is_reverse && end_x > start_x + REVERSE_DIFF) {
    cursor = end_x - CURSOR_CFF_LONG;
    start = start_x + START_CFF_LONG;
  } else if (is_reverse && end_x < start_x - REVERSE_DIFF) {
    cursor = end_x + CURSOR_CFF_LONG;
    start = start_x - START_CFF_LONG;
  }

  return (
    'M' +
    start_x +
    ' ' +
    start_y +
    ' ' +
    'C' +
    start +
    ' ' +
    start_y +
    ',' +
    cursor +
    ' ' +
    end_y +
    ',' +
    end_x +
    ' ' +
    end_y
  );
}

export function usePolygon(
  start_x: number,
  offsetX: number,
  offsetY: number,
  is_reverse: boolean
) {
  const polygon = `${offsetX - 5},${offsetY - 7} ${offsetX + 12},${offsetY} ${
    offsetX - 5
  },${offsetY + 7} ${offsetX},${offsetY}`;

  const reverse_polygon = `${offsetX + 5},${offsetY + 7} ${
    offsetX - 12
  },${offsetY} ${offsetX + 5},${offsetY - 7} ${offsetX},${offsetY}`;

  if (is_reverse && offsetX > start_x - REVERSE_DIFF) return polygon;
  else if (!is_reverse && offsetX < start_x + REVERSE_DIFF)
    return reverse_polygon;
  else if (!is_reverse && offsetX > start_x + REVERSE_DIFF) return polygon;
  else if (is_reverse && offsetX < start_x - REVERSE_DIFF)
    return reverse_polygon;

  return polygon;
}

export function isEnterColumn(message: DOMRect, button: DOMRect) {
  return (
    button.left < message.width + message.left && message.left < button.left
  );
}
