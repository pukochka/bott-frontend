import { usePSStore } from '../stores/PSstore';

export function makeAutoAlign() {
  const store = usePSStore();

  const coords = <Array<Array<number>>>Array.from({
    length: store.alignCount,
  }).fill([0, 0]);

  // const centerX = store.view.center.x;
  // const centerY = store.view.center.y;
  // const odd = store.alignCount % 2;

  const width = store.view.viewSize.width;
  const height = store.view.viewSize.height;

  const ratioW = width / store.alignCount;
  // const ratioH = height / store.alignCount;

  return coords.map((_, index) => {
    const circleX = ratioW * index + ratioW / 2;
    const circleY = height / 2;

    return [circleX, circleY];
  });
}

export function getTextPoints(coords: Array<number>) {
  const [x, y] = coords;

  return [x, y + 20 + 80];
}
