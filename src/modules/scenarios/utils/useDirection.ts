import { useVectorStore } from '../messages/stores/vector/vectorStore';

export function useMoveDirection(left: number, position: number) {
  const vector = useVectorStore();

  const horizontal = vector.scroll.horizontal;
  const parentLeft = vector.parentEl?.left ?? 0;

  return position < left - parentLeft + horizontal + 370 / 2;
}

export function useDirection(left: number, position: number) {
  return position < left;
}

export function useConnectDirection(message: number, button: number) {
  const vector = useVectorStore();

  const horizontal = vector.scroll.horizontal;
  const parentLeft = vector.parentEl?.left ?? 0;
  const messageX = message - parentLeft + horizontal + 370 / 2;
  const buttonX = button - parentLeft + horizontal;

  return messageX > buttonX;
}

export function isReverseState(button: number) {
  const vector = useVectorStore();

  return (
    vector.linesValue.find((item) => item.button_id === button)?.line
      ?.reverse ?? false
  );
}
