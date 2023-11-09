import { usePSStore } from '../stores/PSstore';
import { Group } from 'paper';
import gsap from 'gsap';
import { circle, createIcon, setting } from './create';
import { colors } from '../stores/PSmodels';

const { blue } = colors;

export function createPlatform(message: any, coords: Array<number>) {
  const store = usePSStore();

  const circleGroup = new Group();

  const frontCircle = circle(coords, 80, 'rgba(0,180,255,0.01)');
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

  circleGroup.remove();

  return circleGroup;
}
