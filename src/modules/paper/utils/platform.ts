import { usePSStore } from '../stores/PSstore';
import { Group } from 'paper';
import gsap from 'gsap';
import { circle, createIcon, setting } from './create';
import {
  colors,
  MessageFeedbackItemPreview,
  PaperPoint,
} from '../stores/Feedbackmodels';

const { blue, noColor } = colors;

export function createPlatform(
  message: MessageFeedbackItemPreview,
  coords: Array<number> | PaperPoint
) {
  const store = usePSStore();

  const circleGroup = new Group();

  const frontCircle = circle(coords, 80, noColor);
  const mainCircle = circle(coords, 80, message.setting.color);
  const backCircle = circle(coords, 80, message.setting.alfa);

  const icon = createIcon(message.setting.icon, coords);

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
