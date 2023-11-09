import { useBeizerLine, usePolygon, useMoveDirection } from './index';
import { useVectorStore } from '../messages/stores/vector/vectorStore';

const RADIUS = 16;

export function useMove(event: MouseEvent) {
  const vector = useVectorStore();

  const { clientX, clientY } = event;

  const left = vector.parentEl?.left ?? 0;
  const top = vector.parentEl?.top ?? 0;
  const button = vector.buttonEl;
  const message = vector.messageEl;

  const horizontal = vector.scroll.horizontal;
  const vertical = vector.scroll.vertical;

  const start_x = (button?.left ?? 0) - left + RADIUS + horizontal;
  const start_y = (button?.top ?? 0) - top + RADIUS + vertical;
  const end_x = clientX - left + horizontal;
  const end_y = clientY - top + vertical;

  const reverse = useMoveDirection(message?.left ?? 0, end_x);

  const path = useBeizerLine(start_x, start_y, end_x, end_y, reverse);
  const polygon = usePolygon(start_x, end_x, end_y, reverse);

  return {
    start_x: start_x,
    start_y: start_y,
    end_x: end_x,
    end_y: end_y,
    reverse: reverse,
    path: path,
    polygon: polygon,
  };
}
