import {
  colors,
  PaperGroup,
  PaperItem,
  PaperLine,
  PaperPoint,
} from '../stores/PSmodels';
import { Color, Group, Path, Point, Size } from 'paper';
import { circle, createIcon, dashLine } from './create';
import { mdiWrench } from '@quasar/extras/mdi-v7';
import { usePSStore } from '../stores/PSstore';

const { blue, alfaBlue, noColor } = colors;

export class Link {
  group: PaperGroup = new Group();

  start: PaperItem | null = null;
  end: PaperItem | null = null;
  lineStart: PaperLine | null = null;
  lineEnd: PaperLine | null = null;
  line: PaperLine | null = null;
  lineFront: PaperLine | null = null;

  startCircle: PaperItem | null = null;
  endCircle: PaperItem | null = null;
  icon: PaperItem = createIcon(mdiWrench, [0, 0], new Size(15, 15));

  constructor(start: PaperGroup, end: PaperGroup) {
    this.start = start;
    this.end = end;

    this.mountLink();
    this.mountLineGroup();
  }

  get startCenter() {
    return this.start?.bounds.center ?? new Point(0, 0);
  }
  get endCenter() {
    return this.end?.bounds.center ?? new Point(0, 0);
  }

  get circlesPoints() {
    return rotateCircle(this.startCenter, this.endCenter, 80);
  }

  mountLink() {
    this.startCircle = circle(this.circlesPoints.start, 30, blue);
    this.endCircle = circle(this.circlesPoints.end, 30, blue);

    this.group.addChildren([this.startCircle, this.endCircle]);
  }

  mountLineGroup() {
    const store = usePSStore();

    this.lineStart = dashLine(
      this.circlesPoints.middle,
      this.circlesPoints.start,
      '#ffffff',
      30
    );
    this.lineEnd = dashLine(
      this.circlesPoints.middle,
      this.circlesPoints.end,
      '#ffffff',
      30
    );
    this.lineFront = new Path.Line({
      to: this.circlesPoints.end,
      from: this.circlesPoints.start,
      strokeColor: noColor,
      strokeWidth: 60,
    });

    this.lineFront.onMouseEnter = () => {
      store.clickable = true;
      this.icon.tweenTo({ fillColor: blue }, 150);
    };
    this.lineFront.onMouseLeave = () => {
      store.clickable = false;
      this.icon.tweenTo({ fillColor: '#ffffff' }, 150);
    };

    this.icon.set({ position: this.circlesPoints.middle });

    this.group.insertChildren(0, [this.lineStart, this.lineEnd]);

    this.group.addChildren([this.icon, this.lineFront]);
  }

  move() {
    if (
      this.startCircle &&
      this.endCircle &&
      this.lineStart &&
      this.lineEnd &&
      this.lineFront
    ) {
      this.startCircle.bounds.center = this.circlesPoints.start;
      this.endCircle.bounds.center = this.circlesPoints.end;

      this.lineFront.firstCurve.segment1.point = this.circlesPoints.start;
      this.lineFront.firstCurve.segment2.point = this.circlesPoints.end;

      this.lineStart.firstCurve.segment1.point = this.circlesPoints.middle;
      this.lineStart.firstCurve.segment2.point = this.circlesPoints.start;

      this.lineEnd.firstCurve.segment1.point = this.circlesPoints.middle;
      this.lineEnd.firstCurve.segment2.point = this.circlesPoints.end;

      this.icon.set({ position: this.circlesPoints.middle });
    }
  }
}

function rotateCircle(
  from: PaperPoint,
  to: PaperPoint,
  r1?: number,
  r2?: number
) {
  if (!r2) r2 = r1;

  const start = to.subtract(from).normalize(r1).add(from);
  const end = from.subtract(to).normalize(r2).add(to);
  const vector = end.subtract(start);
  const middle = vector.normalize(vector.length / 2).add(start);

  return { start, end, middle };
}
