import { Line } from './vector/model';

import { useVectorStore } from './vector/vectorStore';
import { useBezierLine, useMove, usePolygon } from '../../utils';
import { getRect } from '../../../../utils/helpers/dom';
import { applyOffsets } from '../../utils/useMove';

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
    Object.assign(this.line, line);
  }
}

export class CombineLine {
  path: string;
  polygon: string;
  startId: string;
  endId: string | null;
  deleted: boolean;

  _id: string;

  get id() {
    return Number(
      this._id.includes('bottom') ? this._id.slice(14) : this._id.slice(11)
    );
  }

  get start() {
    return getRect(this.startId);
  }

  get end() {
    return getRect(this.endId ?? '');
  }

  constructor(start: string, ev?: MouseEvent) {
    this._id = start;
    this.startId = start;
    this.endId = null;
    this.path = '';
    this.polygon = '';
    this.deleted = false;

    if (ev) this.move(ev);
  }

  move(ev: MouseEvent) {
    if (this.start) {
      const { left, top } = this.start;
      const start = applyOffsets(left, top);
      const end = applyOffsets(ev.clientX, ev.clientY);

      this.draw(start, end);
    }
  }

  combine(endEl?: string, offset?: number) {
    this.endId = endEl ?? this.endId;

    if (this.end && this.start && !this.deleted) {
      const start = applyOffsets(this.start.left, this.start.top);
      const end = applyOffsets(this.end.left, this.end.top);

      end.y = end.y - (offset ?? 0);

      this.draw(start, end);
    } else {
      this.deleted = true;
      this.path = '';
      this.polygon = '';
    }
  }

  draw(start: CartesianSystem, end: CartesianSystem) {
    this.path = useBezierLine(
      start.x,
      start.y,
      end.x,
      end.y,
      start.x > end.x,
      true
    );

    this.polygon = usePolygon(start.x, end.x, end.y, false, true);
  }
}
