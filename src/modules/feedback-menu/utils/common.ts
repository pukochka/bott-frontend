import { PaperItem, PaperPoint, PaperSize } from '../stores/FeedbackModels';
import { Color, Item, Path, Point, PointText, Shape, Size } from 'paper';
import { getTextPoints } from './coords';
import { mdiMessage, mdiFile, mdiAnimation } from '@quasar/extras/mdi-v7';

export const setting: Record<
  number,
  { title: string; icon: string; color: string }
> = {
  1: {
    title: 'Сообщение',
    icon: mdiMessage,
    color: '#a3b18a',
  },
  2: {
    title: 'Сообщение\nс файлом',
    icon: mdiFile,
    color: '#ffc971',
  },
  3: {
    title: 'Опрос',
    icon: mdiAnimation,
    color: '#cd5d67',
  },
  4: {
    title: 'Несколько\nответов',
    icon: '',
    color: '#ac9e9e',
  },
};

export function circle(
  center: Array<number> | PaperPoint,
  radius: number,
  fillColor?: string,
  shadowBlur?: any,
  shadowColor?: any
) {
  const circle = new Shape.Circle({
    center,
    radius,
    fillColor: fillColor ?? '#ffffff',
    shadowBlur,
    shadowColor,
  });

  circle.remove();

  return circle;
}

export function dashLine(
  from: Array<number> | PaperPoint,
  to: Array<number> | PaperPoint,
  color?: string,
  opposite?: number
) {
  const line = new Path.Line({
    from: from,
    to: to,
    strokeWidth: 20,
    strokeColor: color ?? '#ffffff',
    strokeCap: 'round',
  });

  line.dashArray = [1, opposite ?? 1];

  line.remove();

  return line;
}

export function createIcon(
  name: string,
  coords: Array<number> | PaperPoint,
  size?: PaperSize,
  color?: any
) {
  const svg = `<svg viewBox="0 0 24 24" ><path fill="${
    color ?? '#ffffff'
  }" d="${name}"></path></svg>`;

  const icon = new Item().importSVG(svg);

  icon.bounds.size = size ?? new Size(70, 70);

  icon.position = new Point(coords);

  return icon;
}

export function createText(
  message: string,
  coords: PaperPoint | Array<number>,
  fontSize?: number,
  diff?: number,
  radius?: number,
  color?: string,
  justification?: string
) {
  const content = new PointText({
    content: message,
    fillColor: 'black',
    fontWeight: 600,
    fontSize: fontSize ?? 30,
    fontFamily: 'Yandex Sans Text',
  });

  const [x, y] = getTextPoints(coords, radius, diff);

  content.bounds.x = x;
  content.bounds.y = y;
  content.justification = justification ?? 'center';
  content.fillColor = new Color(color ?? 'black');

  content.remove();

  return content;
}

export function moveToPoint(
  start?: PaperPoint,
  end?: PaperPoint,
  length?: number
) {
  const from = start ?? new Point(0, 0);
  const to = end ?? new Point(0, 0);

  return to.subtract(from).normalize(length).add(from);
}
export function overlap(target: PaperItem, item: PaperItem) {
  return target?.intersects(item) || target?.isInside(item.bounds);
}

export function rotateCircle(
  from: PaperPoint,
  to: PaperPoint,
  r1?: number,
  r2?: number,
  offset?: number
) {
  if (!r2) r2 = r1;

  const start = to.subtract(from).normalize(r1).add(from);
  const end = from.subtract(to).normalize(r2).add(to);
  const vector = end.subtract(start);
  const middle = vector.normalize(vector.length / 2).add(start);
  const startOffset = to
    .subtract(from)
    .normalize((r1 ?? 0) + (offset ?? 0))
    .add(from);
  const endOffset = from
    .subtract(to)
    .normalize((r2 ?? 0) + (offset ?? 0))
    .add(to);

  return { start, end, middle, startOffset, endOffset, vector };
}
