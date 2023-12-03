import { usePSStore } from '../stores/PSstore';
import { PaperPoint } from '../stores/FeedbackModels';
import { Point } from 'paper';

export function makeAutoAlign() {
  const store = usePSStore();

  const coords = <Array<Array<number>>>Array.from({
    length: store.alignCount,
  }).fill([0, 0]);

  const width = store.view.viewSize.width;
  const height = store.view.viewSize.height;

  const ratioW = width / store.alignCount;

  return coords.map((_, index) => {
    const circleX = ratioW * index + ratioW / 2;
    const circleY = height / 2;

    return [circleX, circleY];
  });
}

export function setCenter() {
  const store = usePSStore();
  const x = <number[]>(
    store.feedback.inputs.map((item) => item.position?.x).filter((item) => item)
  );
  const y = <number[]>(
    store.feedback.inputs.map((item) => item.position?.y).filter((item) => item)
  );

  if (!x.length || !y.length) return new Point(0, 0);

  const maxX = Math.max(...x);
  const maxY = Math.max(...y);
  const minX = Math.min(...x);
  const minY = Math.min(...y);

  if (Math.abs(maxX - minX) > store.view.viewSize.width) {
    store.view.zoom = 0.25;
  }

  if (Math.abs(maxY - minY) > store.view.viewSize.height) {
    store.view.zoom = 0.25;
  }

  const max = new Point(maxX, maxY);
  const min = new Point(minX, minY);

  const vector = max.subtract(min);

  return vector.normalize(vector.length / 2).add(min);
}

export function getTextPoints(
  coords: PaperPoint | Array<number>,
  radius?: number,
  diff?: number
) {
  if (Array.isArray(coords)) {
    const [x, y] = coords;

    return [x, y + (diff ?? 20) + (radius ?? 80)];
  }

  const { x, y } = coords;

  return [x, y + (diff ?? 20) + (radius ?? 80)];
}
