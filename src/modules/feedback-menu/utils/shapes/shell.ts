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
  const feedback = useFeedbackStore();
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
    feedback.dragMessage(message);
    feedback.notopen = true;
    shell.position.x += event.delta.x;
    shell.position.y += event.delta.y;
  };

  platform.onMouseDown = () => {
    feedback.dragging = true;
    feedback.connecting = true;
    shell.bringToFront();
  };

  platform.onMouseUp = () => {
    feedback.dragging = false;
    feedback.connecting = false;

    fetchFeedback('set-input-position', {
      input_id: message.id,
      type: message.type,
      x: platform.position.x,
      y: platform.position.y,
    }).then();
  };

  platform.onMouseLeave = () => {
    feedback.notopen = false;
  };

  platform.onClick = (event: any) => {
    if (feedback.mobile.connect) {
      fetchFeedback(
        'set-input-next',
        {
          input_id: feedback.selectedMessage?.id ?? 0,
          type: feedback.selectedMessage?.type ?? 0,
          next_id: message.id ?? null,
          next_type: message.type ?? null,
        },
        (response) => {
          feedback._feedback = response.feedback;
          feedback.selectedMessage = null;
          feedback.mobile.connect = false;

          update();
        }
      ).then();

      return;
    }

    if (feedback.notopen) return;
    feedback.selectedMessage = message;

    const touch = !!event.event?.changedTouches?.[0] || feedback.isMobile;

    feedback.openMenu('message', undefined, touch);
  };

  platform.data = message;

  feedback.shells.push(platform);

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
