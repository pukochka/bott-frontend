import { Line } from './vector/model';

import { useVectorStore } from './vector/vectorStore';

export class Dragging {
  x: number;
  y: number;
  el: MessageFree | null;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.el = null;
  }

  applyDrag(event: MouseEvent) {
    const vector = useVectorStore();

    this.x =
      event.clientX -
      (vector.parentEl?.left ?? 0) +
      vector.scroll.horizontal +
      20;
    this.y =
      event.clientY - (vector.parentEl?.top ?? 0) + vector.scroll.vertical + 20;
  }
}

export class Connection {
  button_id: number;
  message_id: number;

  line: Line;

  constructor(
    message_id: number,
    button_id: number,
    handler?: ProxyHandler<any>,
    line?: any
  ) {
    this.button_id = button_id;
    this.message_id = message_id;

    this.line = new Proxy(line ?? {}, handler ?? {});
  }

  applyLine(line: any) {
    for (const [key, value] of Object.entries(line)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.line[key] = value;
    }
  }
}
