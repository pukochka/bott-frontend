import { useVectorStore } from '../messages/stores/vector/vectorStore';

import { getRect } from 'src/utils/helpers/dom';

const RADIUS = 12;

export function useRect(message_id: number, button_id: number) {
  const vector = useVectorStore();

  const button = getRect('button_' + button_id);
  const message = getRect('message_' + message_id);

  const horizontal = vector.scroll.horizontal;
  const vertical = vector.scroll.vertical;

  const parentLeft = vector.parentEl?.left ?? 0;
  const parentTop = vector.parentEl?.top ?? 0;

  return {
    message: {
      x: message.left - parentLeft + horizontal,
      y: message.top - parentTop + vertical,
      width: message.width,
      rect: message,
    },
    button: {
      x: button.left - parentLeft + RADIUS + horizontal,
      y: button.top - parentTop + RADIUS + vertical,
      width: button.width,
      rect: button,
    },
  };
}
