import { Group, Point } from 'paper';
import { createTextDeaf, setting } from './create';
import { createPlatform } from './platform';
import { usePSStore } from '../stores/PSstore';
import { Connection } from './links';
import {
  MessageFeedbackItemPreview,
  PaperPoint,
} from '../stores/Feedbackmodels';

export function createShell(
  message: MessageFeedbackItemPreview,
  coords: Array<number> | PaperPoint
) {
  const store = usePSStore();
  const shell = new Group();

  if (message.position) {
    coords = new Point(message.position.x, message.position.y);
  }

  const platform = createPlatform(message, coords);
  const text = createTextDeaf(message.setting.title, coords, 18, 0, 87);
  text.justification = 'center';

  if (!message.next && !message.crossroad?.options.length) {
    const connection = new Connection(message, platform);
    shell.addChild(connection.group);
  }

  shell.addChildren([platform, text]);

  platform.onMouseDrag = (event: any) => {
    store.dragMessage(message);

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
  };

  shell.name = 'message-' + message.id;

  return { shell, platform };
}
