import Paper, {
  PointText,
  Point,
  Item,
  Shape,
  Size,
  Path,
  Layer,
  Color,
} from 'paper';
import { usePSStore } from '../stores/PSstore';
import { getTextPoints, makeAutoAlign } from './coords';

import {
  mdiMessage,
  mdiFileDocumentArrowRightOutline,
  mdiMessageQuestion,
  mdiMulticast,
} from '@quasar/extras/mdi-v7';
import { createShell } from './shell';
import { PaperPoint, PaperSize } from '../stores/PSmodels';
import { keysOfAdd } from './models/additional';
import { useAddict } from './platform';

export const setting: any = {
  1: { title: 'Сообщение', icon: mdiMessage },
  2: { title: 'Сообщение\nс файлом', icon: mdiFileDocumentArrowRightOutline },
  3: { title: 'Опрос', icon: mdiMessageQuestion },
  4: { title: 'Несколько\nответов', icon: mdiMulticast },
};

let oldDelta = new Point(0, 0);

export function install() {
  const canvas = <HTMLCanvasElement>document.getElementById('feedback-layer');

  const store = usePSStore();

  Paper.setup(canvas);

  store.view = Paper.project.view;
  store.layer = Paper.project.activeLayer;
  store.view.zoom = 0.5;
  // store.view.center = new Point(0, 0);

  for (let i = 0; i < store.feedback.inputs.length; i++) {
    const coords = makeAutoAlign();

    const { shell, platform } = createShell(
      store.feedback.inputs[i],
      coords[i]
    );

    store.feedback.inputs[i] = Object.assign(store.feedback.inputs[i], {
      shell,
      platform,
    });
  }

  store.mountLink();

  store.view.onMouseDrag = (event: any) => {
    if (store.dragging || store.onconnection || store.onmessage) return;

    store.view.translate(event.delta.subtract(oldDelta));
    oldDelta = oldDelta.subtract(event.delta);
  };

  canvas.addEventListener('wheel', (ev: any) => {
    if (ev.wheelDelta > 0 && store.view.zoom < 1.5) store.view.zoom += 0.07;

    if (ev.wheelDelta < 0 && store.view.zoom > 0.25) store.view.zoom -= 0.07;
  });
}

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
  message: any,
  coords: PaperPoint | Array<number>,
  fontSize?: number
) {
  const content = new PointText({
    content: setting[message.type].title,
    fillColor: 'white',
    fontSize: fontSize ?? 16,
  });

  const [x, y] = getTextPoints(coords);

  content.bounds.center.x = x;
  content.bounds.center.y = y;

  content.remove();

  return content;
}

export function createTextDeaf(
  message: string,
  coords: PaperPoint | Array<number>,
  fontSize?: number,
  diff?: number,
  radius?: number
) {
  const content = new PointText({
    content: message,
    fillColor: 'white',
    fontSize: fontSize ?? 16,
  });

  const [x, y] = getTextPoints(coords, radius, diff);

  content.bounds.x = x;
  content.bounds.y = y;

  content.remove();

  return content;
}
