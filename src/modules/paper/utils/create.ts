import Paper, { PointText, Point, Item, Shape, Size, Path } from 'paper';
import { usePSStore } from '../stores/PSstore';
import { getTextPoints, makeAutoAlign } from './coords';

import {
  mdiMessage,
  mdiFileDocumentArrowRightOutline,
  mdiMessageQuestion,
} from '@quasar/extras/mdi-v7';
import { createShell } from './shell';
import { PaperPoint, PaperSize } from '../stores/PSmodels';

export const setting: any = {
  1: { title: 'Сообщение', icon: mdiMessage },
  2: { title: 'Сообщение с файлом', icon: mdiFileDocumentArrowRightOutline },
  3: { title: 'Опрос', icon: mdiMessageQuestion },
};

let oldDelta = new Point(0, 0);

export function install() {
  const canvas = <HTMLCanvasElement>document.getElementById('feedback-layer');

  const store = usePSStore();

  Paper.setup(canvas);

  store.view = Paper.project.view;
  store.layer = Paper.project.activeLayer;

  store.mountLayers();

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

    store.messages.addChild(shell);
  }

  store.mountLink();

  store.layer.onMouseDrag = (event: any) => {
    if (store.dragging || store.onconnection) return;

    store.view.translate(event.delta.subtract(oldDelta));
    oldDelta = oldDelta.subtract(event.delta);
  };

  store.view.zoom = 0.7;

  // store.view.onMouseMove = (e) => {
  //   console.log(e.point.x, e.point.y);
  // };

  canvas.addEventListener('wheel', (ev: any) => {
    if (ev.wheelDelta > 0 && store.view.zoom < 1.5) store.view.zoom += 0.07;

    if (ev.wheelDelta < 0 && store.view.zoom > 0.25) store.view.zoom -= 0.07;
  });
}

export function circle(
  coords: Array<number> | PaperPoint,
  radius: number,
  color?: string
) {
  const circle = new Shape.Circle({
    center: coords,
    radius: radius,
    fillColor: color ?? '#ffffff',
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
  color?: string
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
  coords: Array<number>,
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
