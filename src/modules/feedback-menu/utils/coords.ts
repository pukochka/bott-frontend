import { useFeedbackStore } from '../stores/feedbackStore';
import { PaperPoint } from '../stores/feedbackModels';
import { Point } from 'paper';

export function makeAutoAlign() {
  const feedback = useFeedbackStore();

  const coords = <Array<Array<number>>>Array.from({
    length: feedback.alignCount,
  }).fill([0, 0]);

  return coords.map((_, index) => {
    const circleX = index * 300;
    const circleY = 0;

    return [circleX, circleY];
  });
}

export function setCenter() {
  const feedback = useFeedbackStore();
  const x = <number[]>(
    feedback.feedback.inputs
      .map((item) => item.position?.x)
      .filter((item) => item)
  );
  const y = <number[]>(
    feedback.feedback.inputs
      .map((item) => item.position?.y)
      .filter((item) => item)
  );

  if (!x.length || !y.length) return new Point(0, 0);

  const maxX = Math.max(...x);
  const maxY = Math.max(...y);
  const minX = Math.min(...x);
  const minY = Math.min(...y);

  if (Math.abs(maxX - minX) > feedback.view.viewSize.width) {
    feedback.view.zoom = 0.4;
  }

  if (Math.abs(maxY - minY) > feedback.view.viewSize.height) {
    feedback.view.zoom = 0.4;
  }

  const max = new Point(maxX, maxY);
  const min = new Point(minX, minY);

  const vector = max.subtract(min);

  return vector.normalize(vector.length / 2).add(min);
}

export function getTextPoints(
  coords: PaperPoint | Array<number>,
  radius?: number,
  diff?: number,
  vertical?: boolean
) {
  const horizontalDiff = vertical ? 0 : diff ?? 20;
  const verticalDiff = vertical ? diff ?? 20 : 0;

  if (Array.isArray(coords)) {
    const [x, y] = coords;

    return [x + horizontalDiff, y + verticalDiff + (radius ?? 80)];
  }

  const { x, y } = coords;

  return [x + horizontalDiff, y + verticalDiff + (radius ?? 80)];
}
