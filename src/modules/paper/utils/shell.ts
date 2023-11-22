import { Group, Point } from 'paper';
import { createTextDeaf, setting } from './create';
import { createPlatform } from './platform';
import { usePSStore } from '../stores/PSstore';
import { Connection, Crossroad } from './links';
import { PaperPoint } from '../stores/PSmodels';

export function createShell(message: any, coords: Array<number> | PaperPoint) {
  const store = usePSStore();
  const shell = new Group();

  if (message.position) {
    coords = new Point(message.position.x, message.position.y);
  }

  const platform = createPlatform(message, coords);
  const text = createTextDeaf(setting[message.type].title, coords, 18, 0, 80);
  text.justification = 'center';

  if (!message.next) {
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
