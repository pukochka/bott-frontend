// import {
//   colors,
//   PaperGroup,
//   PaperItem,
//   PaperPathLine,
//   PaperPoint,
// } from '../stores/PSmodels';
// import { usePSStore } from '../stores/PSstore';
// import { Color, Group, Path, Point, Size } from 'paper';
// import { mdiPlus } from '@quasar/extras/mdi-v7';
// import gsap from 'gsap';
// import { circle, createIcon, dashLine } from './create';
//
// const { blue, alfaBlue, noColor } = colors;
//
// export function mountConnection(message: any, nextMessage: any) {
//   const condition = nextMessage === void 0;
//
//   message.nextMessage = nextMessage;
//   if (!message.connection) message.connection = new Connection(message.shell);
//
//   if (!condition) {
//     nextMessage.prevMessage = message;
//
//     if (!nextMessage.connection)
//       nextMessage.connection = new Connection(nextMessage.shell);
//   }
//
//   const [start, end] = condition
//     ? createCanConnection(message)
//     : createConnection(message, nextMessage);
//
//   message.shell.insertChild(0, start);
//
//   if (!condition) {
//     nextMessage.shell.insertChild(0, end);
//   }
//
//   message.platform.onMouseDrag = (ev: any) => change(message, ev);
// }
//
// export function createConnection(message: any, nextMessage: any) {
//   const startBounds = message.platform.bounds;
//   const endBounds = nextMessage.platform.bounds;
//
//   const startCoords = new Point(
//     startBounds.rightCenter.x,
//     startBounds.center.y
//   );
//   const endCoords = new Point(endBounds.leftCenter.x, endBounds.center.y);
//   const { startCircle, endCircle } = circlesConnect(startCoords, endCoords);
//
//   message.connection.mountStart(startCircle);
//   nextMessage.connection.mountEnd(endCircle);
//
//   change(message, { delta: { x: 0, y: 0 } });
//
//   return [startCircle, endCircle];
// }
//
// function circlesConnect(point1: PaperPoint, point2: PaperPoint) {
//   return {
//     startCircle: circle(point1, 30, blue),
//     endCircle: circle(point2, 30, blue),
//   };
// }
//
// const change = (message: any, ev?: any) => {
//   message.shell.position.x += ev.delta.x;
//   message.shell.position.y += ev.delta.y;
//
//   if (message.prevMessage !== void 0) {
//     const rotateTo = message.platform.bounds.center;
//     const rotateFrom = message.prevMessage.platform.bounds.center;
//
//     const { start, end } = rotateCircle(rotateFrom, rotateTo, 80);
//
//     message.prevMessage.connection.applyStart(start);
//     message.connection.applyEnd(end);
//
//     const group = message.connection.group;
//     const from = message.prevMessage.connection.start;
//     const to = message.connection.end;
//
//     connections(from, to, group, 50, 50, 30);
//   }
//
//   if (message.nextMessage !== void 0) {
//     const rotateFrom = message.platform.bounds.center;
//     const rotateTo = message.nextMessage.platform.bounds.center;
//
//     const { start, end } = rotateCircle(rotateFrom, rotateTo, 80);
//
//     message.nextMessage.connection.applyEnd(end);
//     message.connection.applyStart(start);
//
//     const group = message.nextMessage.connection.group;
//     const from = message.connection.start;
//     const to = message.nextMessage.connection.end;
//
//     connections(from, to, group, 50, 50, 30);
//   }
// };
//
// export function createCanConnection(message: any) {
//   const store = usePSStore();
//
//   const group = new Group();
//   const line = new Group();
//
//   store.layer?.insertChild(0, line);
//
//   const bounds = message.platform.bounds;
//
//   const coords = new Point(bounds.rightCenter.x - 10, bounds.center.y);
//
//   const mainCircle = circle(coords, 30, blue);
//   const frontCircle = circle(coords, 30, 'rgba(0,180,255,0.01)');
//   const icon = createIcon(mdiPlus, coords, new Size(30, 30));
//
//   group.addChildren([mainCircle, icon, frontCircle]);
//
//   const returnCircle = () => {
//     line.children = [];
//
//     gsap.to(group.bounds.center, {
//       x: message.platform.bounds.rightCenter.x - 10,
//       y: message.platform.bounds.center.y,
//       duration: 0.15,
//     });
//   };
//
//   group.onMouseDown = () => {
//     store.connecting = true;
//   };
//
//   group.onMouseUp = () => {
//     store.connecting = false;
//
//     returnCircle();
//   };
//
//   group.onMouseEnter = () => {
//     if (store.connecting) return;
//
//     store.onconnection = true;
//
//     gsap.to(group.bounds.center, {
//       x: message.platform.bounds.rightCenter.x + 15,
//       duration: 0.15,
//     });
//   };
//
//   group.onMouseLeave = () => {
//     if (store.connecting) return;
//
//     store.onconnection = false;
//
//     returnCircle();
//   };
//
//   group.onMouseDrag = (event: any) => {
//     group.position.x += event.delta.x;
//     group.position.y += event.delta.y;
//
//     const from = message.platform.bounds.center;
//     const to = group.bounds.center;
//
//     connections(from, to, line, 90, 40, 30);
//   };
//
//   group.remove();
//
//   return [group];
// }
//
// export function rotateCircle(
//   from: PaperPoint,
//   to: PaperPoint,
//   r1?: number,
//   r2?: number
// ) {
//   if (!r2) r2 = r1;
//
//   const start = to.subtract(from).normalize(r1).add(from);
//   const end = from.subtract(to).normalize(r2).add(to);
//   const vector = end.subtract(start);
//   const middle = vector.normalize(vector.length / 2).add(start);
//
//   return { start, end, middle };
// }
//
// export function connections(
//   from: PaperPoint,
//   to: PaperPoint,
//   group: PaperGroup,
//   r1?: number,
//   r2?: number,
//   opposite?: number
// ) {
//   const { start, end } = rotateCircle(from, to, r1, r2);
//
//   const vector = end.subtract(start);
//   const current = vector.normalize(vector.length / 2).add(start);
//
//   group.removeChildren();
//
//   const lineStart = dashLine(
//     current,
//     start,
//     'hsla(198, 100%, 50%, 1)',
//     opposite
//   );
//   const lineEnd = dashLine(current, end, 'hsla(198, 100%, 50%, 1)', opposite);
//
//   // const con = to.subtract(from).normalize(30).add(to);
//   // const conF = from.subtract(to).normalize(30).add(from);
//   //
//   // const lineFront = new Path.Line({
//   //   to: con,
//   //   from: conF,
//   //   strokeColor: noColor,
//   //   strokeWidth: 60,
//   // });
//   //
//   // const line = new Path.Line({
//   //   to: con,
//   //   from: conF,
//   //   strokeColor: 'rgba(13,27,42,0.5)',
//   //   strokeWidth: 60,
//   //   strokeCap: 'round',
//   // });
//   //
//   // const width = line.bounds.width;
//   //
//   // lineFront.onMouseEnter = () => {
//   //   line.tween({ 'firstCurve.segment1.point': con }, 300);
//   // };
//   // lineFront.onMouseLeave = () => {
//   //   line.tween({ 'firstCurve.segment1.point': conF }, 300);
//   // };
//
//   // group.addChildren([lineStart, lineEnd]);
// }
//
// class Connection {
//   group: PaperGroup = new Group();
//   _start: PaperItem | null = null;
//   _end: PaperItem | null = null;
//   line: PaperPathLine | null = null;
//
//   private point0: PaperPoint = new Point(0, 0);
//
//   constructor(shell: PaperGroup) {
//     const store = usePSStore();
//
//     shell.insertChild(0, this.group);
//   }
//
//   get start() {
//     return this._start?.bounds.center ?? this.point0;
//   }
//   get end() {
//     return this._end?.bounds.center ?? this.point0;
//   }
//
//   applyEnd(point: PaperPoint) {
//     if (this._end?.bounds.center) {
//       this._end.bounds.center = point;
//     }
//
//     if (!this.line) {
//       this.mountLine();
//     }
//   }
//   applyStart(point: PaperPoint) {
//     if (this._start?.bounds.center) {
//       this._start.bounds.center = point;
//     }
//
//     if (!this.line) {
//       this.mountLine();
//     }
//   }
//   mountStart(item: PaperItem) {
//     this._start = item;
//   }
//
//   mountLine() {
//     this.line = new Path.Line({ strokeColor: '#ffffff', strokeWidth: 60 });
//     this.line.name = 'line-' + this.group.id;
//     this.group.addChild(this.line);
//   }
//
//   mountEnd(item: PaperItem) {
//     this._end = item;
//   }
// }
