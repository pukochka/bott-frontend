import {
  useConnectDirection,
  isReverseState,
  useDirection,
} from './useDirection';

import { isEnterColumn, useBeizerLine, usePolygon } from './figures';

import { useRect } from './useRect';
import { usePosition } from './usePosition';

const COUNT_OFFSET = 18;
const POLYGON_OFFSET = 13;
const REVERSE_BUTTON = 290;

export function useConnect(message_id: number, button_id: number) {
  const { message, button } = useRect(message_id, button_id);

  const in_column = isEnterColumn(message.rect, button.rect);

  const reverse = in_column
    ? useConnectDirection(message.x, button.x)
    : useDirection(button.x, message.x);

  const position = usePosition(message_id, button_id);

  message.y += position * COUNT_OFFSET;

  if (in_column) {
    if (reverse) {
      message.x -= POLYGON_OFFSET;
    } else {
      message.x += POLYGON_OFFSET + message.width;
    }
  } else {
    if (reverse) {
      message.x += POLYGON_OFFSET + message.width;
    } else {
      message.x -= POLYGON_OFFSET;
    }
  }

  if (isReverseState(button_id) !== reverse && reverse) {
    button.x -= REVERSE_BUTTON;
  }

  if (isReverseState(button_id) !== reverse && !reverse) {
    button.x += REVERSE_BUTTON;
  }

  const path = useBeizerLine(button.x, button.y, message.x, message.y, reverse);
  const polygon = usePolygon(button.x, message.x, message.y, reverse);

  return {
    start_x: button.x,
    start_y: button.y,
    end_x: message.x,
    end_y: message.y,
    reverse: reverse,
    path: path,
    polygon: polygon,
  };
}
