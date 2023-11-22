import { usePSStore } from '../stores/PSstore';
import { Color, Group, Path, Point, Size } from 'paper';
import gsap from 'gsap';
import { circle, createIcon, createTextDeaf, setting } from './create';
import { colors, PaperPoint } from '../stores/PSmodels';
import { mdiPlus } from '@quasar/extras/mdi-v7';
import { additional, AdditionalKeys } from './models/additional';

const SPACING = 200;

const { blue, noColor } = colors;

export function createPlatform(
  message: any,
  coords: Array<number> | PaperPoint
) {
  const store = usePSStore();

  const circleGroup = new Group();

  const frontCircle = circle(coords, 80, noColor);
  const mainCircle = circle(coords, 80);
  const backCircle = circle(coords, 80, blue);

  const icon = createIcon(setting[message.type].icon, coords, undefined, blue);

  circleGroup.addChildren([backCircle, mainCircle, icon, frontCircle]);

  frontCircle.onMouseEnter = () => {
    store.onmessage = true;
    gsap.to(backCircle, { radius: 90, duration: 0.15 });
  };

  frontCircle.onMouseLeave = () => {
    store.onmessage = false;
    gsap.to(backCircle, { radius: 80, duration: 0.15 });
  };

  // frontCircle.onMouseDown = () => {
  //   store.onmessage = false;
  //   gsap.to(backCircle, { radius: 80, duration: 0.15 });
  // };

  circleGroup.remove();

  return circleGroup;
}

function createPlus(key: AdditionalKeys, bounds: Bounds) {
  const store = usePSStore();
  const group = new Group();

  const { position, text } = additional[key];

  const point = addictionPoint(position, bounds);

  const expand = circle(point, 30);
  const back = circle(point, 30, blue);
  const icon = createIcon(mdiPlus, point, new Size(30, 30));
  const front = circle(point, 30, noColor);
  const textAdd = createTextDeaf('Добавить \n' + text, point, 18, 0, 50);

  textAdd.fillColor = new Color('transparent');
  textAdd.justification = 'center';

  front.onMouseEnter = () => {
    store.clickable = true;
    expand.tweenTo({ radius: 35 }, 150);
    textAdd.tweenTo({ fillColor: '#ffffff' }, 150);
  };
  front.onMouseLeave = () => {
    store.clickable = false;
    expand.tweenTo({ radius: 30 }, 150);
    textAdd.tweenTo({ fillColor: 'transparent' }, 150);
  };

  group.addChildren([expand, back, icon, textAdd, front]);
  group.remove();

  return group;
}

function createAdd(key: AdditionalKeys, bounds: Bounds) {
  const store = usePSStore();
  const group = new Group();

  const { text, icon, position, action } = additional[key];

  const point = addictionPoint(position, bounds);

  const expand = circle(point, 50);
  const back = circle(point, 50, blue);
  const iconAdd = createIcon(icon, point, new Size(50, 50));
  const front = circle(point, 50, noColor);
  const textAdd = createTextDeaf(text, point, 18, 20, 50);

  textAdd.justification = 'center';

  if (action !== void 0) {
    front.onClick = action;
  }

  front.onMouseLeave = () => {
    store.clickable = false;
    expand.tweenTo({ radius: 50 }, 150);
  };
  front.onMouseEnter = () => {
    store.clickable = true;
    expand.tweenTo({ radius: 55 }, 150);
  };

  group.addChildren([expand, back, iconAdd, front, textAdd]);
  group.remove();

  return group;
}

export function useAddict(key: AdditionalKeys, value: any) {
  const store = usePSStore();

  const bottom = store.view.bounds.top;
  const left = store.view.bounds.left;
  const width = store.view.bounds.width;
  const center = store.view.bounds.center;
  const height = store.view.bounds.height;
  const widthDiff = width / 4;

  const start = new Point(left, bottom);
  const point = center.subtract(start).normalize(SPACING).add(start);

  const position = { height, widthDiff, center, point };

  const el = value ? createAdd(key, position) : createPlus(key, position);

  store.layer.insertChild(0, el);
}

function addictionPoint(position: number, bounds: Bounds) {
  let bottom =
    position > 0
      ? bounds.center.y - (bounds.height - SPACING) / 2
      : bounds.center.y + (bounds.height - SPACING) / 2;
  let left =
    bounds.point.x +
    Math.abs(position > 0 ? position - 1 : position + 1) * bounds.widthDiff;

  if (position === 9) {
    left = bounds.point.x;
    bottom = bounds.center.y;
  }

  return new Point(left, bottom);
}

interface Bounds {
  height: number;
  widthDiff: number;
  center: PaperPoint;
  point: PaperPoint;
}
