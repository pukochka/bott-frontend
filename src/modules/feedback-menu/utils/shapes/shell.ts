import { Group, Point } from 'paper';
import { createText } from '../common';
import { createPlatform } from './platform';
import { useFeedbackStore } from '../../stores/feedbackStore';
import { Connection } from '../lines/connection';
import {
  MessageFeedbackItemPreview,
  PaperPoint,
} from '../../stores/feedbackModels';
import { fetchFeedback } from '../../api/queries';
import { update } from '../create';

export function createShell(
  message: MessageFeedbackItemPreview,
  coords: Array<number> | PaperPoint
) {
  const store = useFeedbackStore();
  const shell = new Group();

  if (message.position) {
    coords = new Point(message.position.x, message.position.y);
  }

  const platform = createPlatform(message, coords);
  const text = createText(message.setting.title, coords, 22, 0, 83);
  const answerText = createText(
    sliceAnswerText(message.text),
    coords,
    12,
    0,
    110,
    'grey',
    undefined,
    400
  );

  if (!message.next && !message.crossroad?.options.length) {
    const connection = new Connection(message, platform);
    shell.addChild(connection.group);
  }

  shell.addChildren([platform, text, answerText]);

  platform.onMouseDrag = (event: any) => {
    store.dragMessage(message);
    store.notopen = true;
    shell.position.x += event.delta.x;
    shell.position.y += event.delta.y;
  };

  platform.onMouseDown = () => {
    store.dragging = true;
    store.connecting = true;
    shell.bringToFront();
  };

  platform.onMouseUp = () => {
    store.dragging = false;
    store.connecting = false;

    fetchFeedback('set-input-position', {
      input_id: message.id,
      type: message.type,
      x: platform.position.x,
      y: platform.position.y,
    }).then();
  };

  platform.onMouseLeave = () => {
    store.notopen = false;
  };

  platform.onClick = (event: any) => {
    if (store.mobile.connect) {
      fetchFeedback(
        'set-input-next',
        {
          input_id: store.selectedMessage?.id ?? 0,
          type: store.selectedMessage?.type ?? 0,
          next_id: message.id ?? null,
          next_type: message.type ?? null,
        },
        (response) => {
          store._feedback = response.feedback;
          store.selectedMessage = null;
          store.mobile.connect = false;

          update();
        }
      ).then();

      return;
    }

    if (store.notopen) return;
    store.selectedMessage = message;

    const touch = !!event.event?.changedTouches?.[0] || store.isMobile;

    store.openMenu('message', undefined, touch);
  };

  platform.data = message;

  store.shells.push(platform);

  return { shell, platform };
}

function sliceAnswerText(text: string) {
  return (
    text
      .slice(0, 34)
      .split('')
      .map((char, index) => (index === 15 ? '\n' + char : char))
      .join('') + (text.length > 34 ? '...' : '')
  );
}
