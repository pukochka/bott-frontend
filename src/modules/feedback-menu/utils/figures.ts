import {
  PaperGroup,
  PaperPath,
  PaperPoint,
  PaperText,
} from '../stores/feedbackModels';
import { Group, Path, Point, PointText } from 'paper';

export function createPlus(
  position: PaperPoint,
  width?: number,
  color?: string
) {
  const group = new Group();
  const line = new Path({
    segments: [
      [0, 0],
      [10, 0],
    ],
    strokeColor: color ?? 'white',
    strokeWidth: width ?? 3,
    strokeCap: 'round',
  });
  const line1 = new Path({
    segments: [
      [5, -5],
      [5, 5],
    ],
    strokeColor: color ?? 'white',
    strokeWidth: width ?? 3,
    strokeCap: 'round',
  });

  group.addChildren([line, line1]);
  group.position = position;
  group.remove();

  return group;
}

export class Arrow {
  group: PaperGroup = new Group();
  main: PaperPath | null = null;
  arrow: PaperPath | null = null;
  constructor(from: PaperPoint, to: PaperPoint) {
    const end = to.subtract(from).normalize(17).add(from);

    const vector = end.subtract(from);
    const arrowVector = vector.normalize(10);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const angle = (r: number) => end.add(arrowVector.rotate(r));

    this.main = new Path([from, end]);

    this.arrow = new Path([angle(135), end, angle(-135)]);

    this.group.addChildren([this.main, this.arrow]);

    this.group.set({
      strokeColor: 'white',
      strokeWidth: 3,
      strokeCap: 'round',
    });
  }

  rotate(from: PaperPoint, to: PaperPoint) {
    const main = <PaperPath>this.group.children[0];
    const arrow = <PaperPath>this.group.children[1];

    if (main === void 0 || arrow === void 0) return;

    const end = to.subtract(from).normalize(17).add(from);
    const vector = end.subtract(from);
    const arrowVector = vector.normalize(10);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const angle = (r: number) => end.add(arrowVector.rotate(r));

    main.segments[0].point = from;
    main.segments[1].point = end;

    arrow.segments[0].point = angle(135);
    arrow.segments[1].point = end;
    arrow.segments[2].point = angle(-135);
  }
}

export class CrossroadText {
  value: PaperText = new PointText({});
  vector: PaperPoint = new Point(0, 0);
  middle: PaperPoint = new Point(0, 0);
  textAngle = 0;
  size = 10;

  get quadrant() {
    return this.vector.quadrant;
  }
  get sign() {
    return [1, 3].indexOf(this.quadrant) === -1 ? -1 : 1;
  }

  get angle() {
    return this.vector.angle;
  }

  get away() {
    return (this.sign >= 0 ? [1, 4] : [2, 3]).indexOf(this.vector.quadrant) !=
      -1
      ? 36
      : 20;
  }

  constructor(from: PaperPoint, to: PaperPoint, text?: string) {
    this.vector = to.subtract(from);
    this.middle = this.vector.normalize(this.vector.length / 2).add(from);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const awayVector = this.vector.normalize(20).rotate(90 * this.sign);

    this.textAngle =
      Math.abs(this.angle) > 90
        ? (this.textAngle = 180 + this.angle)
        : this.angle;

    this.value = new PointText({
      point: this.middle.add(awayVector.normalize(this.away)),
      content: text,
      justification: 'center',
      fontFamily: 'Yandex Sans Text',
      fontWeight: 600,
      fontSize: 22,
    });

    this.value.rotate(this.textAngle);
  }

  rotate(from: PaperPoint, to: PaperPoint) {
    this.vector = to.subtract(from);
    this.middle = this.vector.normalize(this.vector.length / 2).add(from);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const awayVector = this.vector.normalize(20).rotate(90 * this.sign);

    const point = this.middle.add(awayVector.normalize(this.away));

    const rotation = (this.textAngle =
      Math.abs(this.angle) > 90
        ? (this.textAngle = 180 + this.angle)
        : this.angle);

    this.value.set({ point, rotation });
  }
}
