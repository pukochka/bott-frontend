import { useFeedbackStore } from '../stores/feedbackStore';
import { PaperPoint } from '../stores/feedbackModels';
import { Point } from 'paper';

export function makeAutoAlign() {
  const store = useFeedbackStore();

  const coords = <Array<Array<number>>>Array.from({
    length: store.alignCount,
  }).fill([0, 0]);

  const { width, height } = document
    .getElementById('feedback-layer')
    ?.getBoundingClientRect() ?? { width: 1000, height: 600 };

  console.log(width, height);

  const ratioW = width / store.alignCount;

  return coords.map((_, index) => {
    const circleX = index * 300;
    const circleY = 0;

    return [circleX, circleY];
  });
}

export function setCenter() {
  const store = useFeedbackStore();
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
    store.view.zoom = 0.4;
  }

  if (Math.abs(maxY - minY) > store.view.viewSize.height) {
    store.view.zoom = 0.4;
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
