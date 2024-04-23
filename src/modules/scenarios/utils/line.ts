import { getRect } from 'src/utils/helpers/dom';
import { useBezierLine, usePolygon } from './figures';

type Point = [number, number];

export class Line {
  _start = '';
  _end = '';
  path = '';
  polygon = '';
  parent: DOMRect | null = null;
  parentElement: Element | null = null;
  element: Element | null = null;
  offset = {
    horizontal: 0,
    vertical: 0,
  };

  get startId() {
    return Number(this._start.slice(this._start.lastIndexOf('_') + 1)) || 0;
  }

  get endId() {
    return Number(this._end.slice(this._end.lastIndexOf('_') + 1)) || 0;
  }

  get boundStart(): Point {
    const rect = getRect(this._start);
    const [x, y] = this.getBound(rect);

    return [x, y];
  }

  get boundEnd(): Point {
    const rect = getRect(this._end);
    const [x, y] = this.getBound(rect);

    return [x, y];
  }

  get horizontal() {
    return this.offset.horizontal;
  }

  get vertical() {
    return this.offset.vertical;
  }

  constructor(
    ev: MouseEvent,
    start: string,
    el: Element,
    offset: { horizontal: number; vertical: number }
  ) {
    this._start = start;
    this.offset = offset;
    this.parentElement = el;
    this.parent = el.getBoundingClientRect();

    this.create(ev);
  }

  create(ev: MouseEvent) {
    if (this.boundStart) {
      this.draw(ev);

      document.addEventListener('mousemove', this.move.bind(this), true);
    }
  }

  move(ev: MouseEvent) {
    this.draw(ev);
  }

  complete(id: string) {
    document.removeEventListener('mousemove', this.move.bind(this), true);

    this._end = id;

    if (this.boundEnd) {
      const end = this.boundEnd;

      this.draw(end);
    }
  }

  update() {
    console.log(1);
  }

  draw(position: DOMRect | MouseEvent | Point) {
    if (this.boundStart) {
      const [startX, startY] = this.boundStart;
      const [endX, endY] = !Array.isArray(position)
        ? this.getBound(position)
        : position;

      this.path = useBezierLine(startX, startY, endX, endY, startX > endX);
      this.polygon = usePolygon(startX, endX, endY, false);
    }
  }

  getBound(position: DOMRect | MouseEvent): Point {
    if (!position || !this.parent) return [0, 0];

    const [elLeft, elTop] =
      position instanceof DOMRect
        ? [position.left, position.top]
        : [position.clientX, position.clientY];

    const { left, top } = this.parent;

    const x = elLeft - left + this.horizontal;
    const y = elTop - top + this.vertical;

    return [x, y];
  }
}
