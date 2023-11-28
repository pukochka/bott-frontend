import { usePSStore } from '../../stores/PSstore';
import { Group, Point } from 'paper';
import gsap from 'gsap';
import { circle, createIcon } from '../common';
import {
  colors,
  MessageFeedbackItemPreview,
  PaperPoint,
} from '../../stores/FeedbackModels';
import { createPlus } from '../figures';

const { noColor } = colors;

export function createPlatform(
  message: MessageFeedbackItemPreview,
  coords: Array<number> | PaperPoint
) {
  const store = usePSStore();

  const circleGroup = new Group();

  const frontCircle = circle(coords, 80, noColor);
  const mainCircle = circle(coords, 80, message.setting.color);
  const backCircle = circle(coords, 80, message.setting.color);
  const backCircle1 = circle(coords, 90, '#fafafa');

  circleGroup.addChildren([backCircle1, backCircle, mainCircle, frontCircle]);

  const point = new Point(coords);

  const icon =
    message.type === 4
      ? createPlus(point, 4, message.setting.color)
      : createIcon(message.setting.icon, coords);

  if (message.type === 4) {
    icon.scale(2);
    icon.opacity = 0;

    const router = circle(coords, 30, 'white');
    circleGroup.insertChildren(3, [router, icon]);
  } else {
    circleGroup.insertChild(3, icon);
  }

  frontCircle.onMouseEnter = () => {
    if (message.type === 4) {
      icon.tweenTo({ opacity: 1 }, 150);
    }
    store.clickable = true;
    gsap.to(backCircle, { radius: 90, duration: 0.15 });
  };

  frontCircle.onMouseLeave = () => {
    if (message.type === 4) {
      icon.tweenTo({ opacity: 0 }, 150);
    }
    store.clickable = false;
    gsap.to(backCircle, { radius: 80, duration: 0.15 });
  };

  circleGroup.remove();

  return circleGroup;
}
