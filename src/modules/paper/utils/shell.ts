import { Group } from 'paper';
import { createText } from './create';
import { createPlatform } from './platform';
import { usePSStore } from '../stores/PSstore';

export function createShell(message: any, coords: Array<number>) {
  const store = usePSStore();
  const shell = new Group();

  const platform = createPlatform(message, coords);

  const text = createText(message, coords);

  shell.addChildren([platform, text]);

  platform.onMouseDrag = (event: any) => {
    store.dragMessage(message);

    shell.position.x += event.delta.x;
    shell.position.y += event.delta.y;
  };

  platform.onMouseDown = () => {
    store.dragging = true;
    shell.bringToFront();
  };

  platform.onMouseUp = () => {
    store.dragging = false;
    shell.sendToBack();
  };

  shell.name = 'message-' + message.id;

  return { shell, platform };
}
