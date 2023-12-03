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
  const text = createText(message.setting.title, coords, 18, 0, 100);

  if (!message.next && !message.crossroad?.options.length) {
    const connection = new Connection(message, platform);
    shell.addChild(connection.group);
  }

  shell.addChildren([platform, text]);

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

  platform.onClick = () => {
    if (store.notopen) return;
    store.selectedMessage = message;

    store.openMenu('message');
  };

  platform.data = message;

  store.shells.push(platform);

  return { shell, platform };
}
