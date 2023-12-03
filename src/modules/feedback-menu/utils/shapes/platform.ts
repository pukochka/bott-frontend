import { useFeedbackStore } from '../../stores/feedbackStore';
import { Group, Point } from 'paper';
import gsap from 'gsap';
import { circle, createIcon, createText } from '../common';
import {
  colors,
  MessageFeedbackItemPreview,
  PaperPoint,
} from '../../stores/feedbackModels';
import { createPlus } from '../figures';

const { noColor } = colors;

export function createPlatform(
  message: MessageFeedbackItemPreview,
  coords: Array<number> | PaperPoint
) {
  const store = useFeedbackStore();

  const circleGroup = new Group();

  const frontCircle = circle(coords, 80, noColor);
  const mainCircle = circle(coords, 80, message.setting.color);
  const backCircle = circle(coords, 80, message.setting.color);
  const backCircle1 = circle(coords, 90, '#fafafa');

  backCircle.opacity = 0.6;

  circleGroup.addChildren([backCircle1, backCircle, mainCircle, frontCircle]);

  const point = new Point(coords);

  const icon =
    message.type === 4
      ? createPlus(point, 4, message.setting.color)
      : createIcon(message.setting.icon, coords);

  /** Добавление иконки CROSSROAD */
  if (message.type === 4) {
    icon.scale(2);
    icon.opacity = 0;

    const router = circle(coords, 30, 'white');
    circleGroup.insertChildren(3, [router, icon]);
  } else {
    circleGroup.insertChild(3, icon);
  }

  const start = store.feedback.start;

  if (message.id === start?.id && message.type === start?.type) {
    const startText = createText(
      'Стартовое\nсообщение',
      coords,
      10,
      0,
      -60,
      'white'
    );

    circleGroup.insertChild(3, startText);
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
