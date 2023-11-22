import {
  colors,
  PaperCircle,
  PaperGroup,
  PaperItem,
  PaperLine,
  PaperPath,
  PaperPoint,
} from '../stores/PSmodels';
import { Color, Group, Path, Point, Segment, Shape, Size } from 'paper';
import { circle, createIcon, dashLine } from './create';
import { mdiPlus, mdiWrench } from '@quasar/extras/mdi-v7';
import { usePSStore } from '../stores/PSstore';
import gsap from 'gsap';
const { blue, alfaBlue, noColor, white } = colors;

export class Link {
  group: PaperGroup = new Group();

  start: PaperItem | null = null;
  end: PaperItem | null = null;
  lineStart: PaperLine | null = null;
  lineEnd: PaperLine | null = null;
  line: PaperLine | null = null;
  lineFront: PaperLine | null = null;

  startCircle: PaperItem | null = null;
  endCircle: PaperItem | null = null;
  icon: PaperItem = createIcon(mdiWrench, [0, 0], new Size(15, 15), '#ffffff');

  constructor(start: PaperGroup, end: PaperGroup) {
    this.start = start;
    this.end = end;

    this.mountLink();
    this.mountLineGroup();
  }

  get startCenter() {
    return this.start?.bounds.center ?? new Point(0, 0);
  }
  get endCenter() {
    return this.end?.bounds.center ?? new Point(0, 0);
  }

  get circlesPoints() {
    return rotateCircle(this.startCenter, this.endCenter, 80);
  }

  mountLink() {
    this.startCircle = circle(this.circlesPoints.start, 30, blue);
    this.endCircle = circle(this.circlesPoints.end, 30, blue);

    this.group.addChildren([this.startCircle, this.endCircle]);
  }

  mountLineGroup() {
    const store = usePSStore();

    this.lineStart = dashLine(
      this.circlesPoints.middle,
      this.circlesPoints.start,
      '#ffffff',
      30
    );
    this.lineEnd = dashLine(
      this.circlesPoints.middle,
      this.circlesPoints.end,
      '#ffffff',
      30
    );
    this.lineFront = new Path.Line({
      to: this.circlesPoints.end,
      from: this.circlesPoints.start,
      strokeColor: noColor,
      strokeWidth: 60,
    });

    this.lineFront.onMouseEnter = () => {
      store.clickable = true;
      this.icon.tweenTo({ fillColor: blue }, 150);
    };
    this.lineFront.onMouseLeave = () => {
      store.clickable = false;
      this.icon.tweenTo({ fillColor: white }, 150);
    };

    this.icon.set({ position: this.circlesPoints.middle });

    this.group.insertChildren(0, [this.lineStart, this.lineEnd]);

    this.group.addChildren([this.icon, this.lineFront]);
  }

  move() {
    if (
      this.startCircle &&
      this.endCircle &&
      this.lineStart &&
      this.lineEnd &&
      this.lineFront
    ) {
      this.startCircle.bounds.center = this.circlesPoints.start;
      this.endCircle.bounds.center = this.circlesPoints.end;

      this.lineFront.firstCurve.point1 = this.circlesPoints.start;
      this.lineFront.firstCurve.point2 = this.circlesPoints.end;

      this.lineStart.firstCurve.point1 = this.circlesPoints.middle;
      this.lineStart.firstCurve.point2 = this.circlesPoints.start;

      this.lineEnd.firstCurve.point1 = this.circlesPoints.middle;
      this.lineEnd.firstCurve.point2 = this.circlesPoints.end;

      this.icon.set({ position: this.circlesPoints.middle });
    }
  }
}

export class Crossroad {
  group: PaperGroup = new Group();
  lines: PaperGroup = new Group();
  area: PaperGroup = new Group();
  center: any = null;
  line: any = null;
  start: PaperGroup | null = null;

  platforms: Array<any> = [];

  constructor(start: PaperGroup, ...platforms: PaperGroup[]) {
    this.start = start;
    this.platforms = platforms;

    this.platforms.forEach((item, index) => {
      this.lines.addChild(
        new Path.Line({
          from: this.start?.bounds.center,
          to: item.bounds.center,
        })
      );
    });

    this.center = circle(this.lines.bounds.center, 30, blue);

    this.line = dashLine(
      this.lines.bounds.center,
      this.start.position,
      '#ffffff',
      30
    );

    this.platforms.forEach((item) => {
      const line = dashLine(
        this.lines.bounds.center,
        item.position,
        '#ffffff',
        30
      );
      this.area.insertChild(0, line);
    });

    this.group.addChildren([this.line, this.area, this.center]);
  }

  move() {
    this.platforms.forEach((item, index) => {
      const curve = <PaperLine>this.lines.children[index];

      curve.firstCurve.point1 = this.start?.position ?? new Point(0, 0);
      curve.firstCurve.point2 = item.position ?? new Point(0, 0);
    });

    this.center.position = this.lines.bounds.center;

    this.platforms.forEach((item, index) => {
      const curve = <PaperLine>this.area.children[index];

      curve.firstCurve.point1 = this.center?.position ?? new Point(0, 0);
      curve.firstCurve.point2 = item.position ?? new Point(0, 0);
    });

    this.line.firstCurve.point1 = this.start?.position;
    this.line.firstCurve.point2 = this.center.position;
  }
}

export class Connection {
  message: any = null;
  group: PaperGroup = new Group();
  groupConnection: PaperGroup = new Group();
  platform: PaperGroup | null = null;
  line: PaperLine | null = null;
  front: any | null = null;
  icon: PaperItem = createIcon(mdiPlus, [0, 0], new Size(30, 30), '#ffffff');
  connectCircle: any | null = null;
  iconConnection: PaperItem = createIcon(
    mdiPlus,
    [0, 0],
    new Size(100, 100),
    '#ffffff'
  );

  action = false;
  drag = false;

  constructor(message: any, platform: PaperGroup) {
    const store = usePSStore();
    this.message = message;
    this.platform = platform;

    if (!this.platform || !this.message) return;

    this.group.name = 'group';
    this.groupConnection.name = 'groupConnection';

    const coords = new Point(
      this.platform.position.x + 70,
      this.platform.position.y
    );

    this.connectCircle = circle([0, 0], 0, '#8a8a8a', 8, white);
    const frontCircle = circle([0, 0], 80, noColor);

    const back = circle(coords, 30, blue);
    this.front = circle(coords, 30, noColor);
    this.line = dashLine(coords, coords, '#ffffff', 30);

    this.icon.visible = false;
    this.icon.position = coords;

    this.group.addChildren([this.line, back, this.icon, this.front]);
    this.groupConnection.addChildren([
      this.connectCircle,
      this.iconConnection,
      frontCircle,
    ]);
    this.groupConnection.opacity = 0;
    this.groupConnection.remove();

    this.group.onMouseDown = () => {
      store.connecting = true;

      this.openConnection();
    };

    this.group.onClick = () => {
      if (this.drag) return;

      this.action = true;
      this.createPrevConnect();
      store.openMenu(() => {
        this.action = false;
        this.groupConnection.remove();
        this.removePrevConnect();
        this.returnCircle();
      });
    };

    this.group.onMouseUp = (event: any) => {
      if (event.target?.children?.[0]?.intersects(this.connectCircle)) {
        this.createConnect();
        return;
      }

      store.connecting = false;

      gsap.to(this.groupConnection, { opacity: 0, duration: 0.15 });
      gsap.to(this.connectCircle, { radius: 0, duration: 0.15 }).then(() => {
        this.groupConnection.remove();
        this.drag = false;
      });

      this.returnCircle();
    };

    this.group.onMouseEnter = () => {
      if (store.connecting) return;

      store.onconnection = true;
      this.icon.visible = true;

      gsap.to(this.group.position, {
        x: this.group.position.x + 15,
        duration: 0.15,
      });
    };

    this.group.onMouseLeave = () => {
      if (store.connecting) return;

      store.onconnection = false;

      this.returnCircle();
    };

    this.group.onMouseDrag = (event: any) => {
      this.drag = true;
      if (this.line) this.line.visible = true;

      this.group.position.x += event.delta.x;
      this.group.position.y += event.delta.y;

      if (this.line && this.platform) {
        this.line.firstCurve.point1 = this.platform.position;
        this.line.firstCurve.point2 = this.front.position;
      }
    };

    this.groupConnection.onMouseEnter = this.createPrevConnect.bind(this);
    this.groupConnection.onMouseLeave = this.removePrevConnect.bind(this);
  }

  openConnection() {
    const store = usePSStore();

    store.layer.addChild(this.groupConnection);

    this.groupConnection.position = new Point(
      (this.platform?.position.x ?? 0) + 300,
      this.platform?.position.y ?? 0
    );

    gsap.to(this.groupConnection, { opacity: 1, duration: 0.15 });
    gsap.to(this.connectCircle, { radius: 80, duration: 0.15 });
  }
  createConnect() {
    this.action = true;
    if (!this.platform) return;

    const store = usePSStore();

    store.openMenu(() => {
      this.action = false;
      this.groupConnection.remove();
      this.removePrevConnect();
      this.returnCircle();
    });
  }

  createPrevConnect() {
    this.group.opacity = 0.01;

    const store = usePSStore();

    if (!this.platform || !this.message) return;

    const link = new Link(this.platform, this.groupConnection);
    link.group.sendToBack();

    store.connect.push({
      link: [this.message.id],
      group: link,
    });
  }
  removePrevConnect() {
    if (this.action) return;

    this.group.opacity = 1;
    const store = usePSStore();

    store.connect
      .find((item) => item.link.includes(this.message?.id))
      ?.group?.group.remove();
    store.connect = store.connect.filter(
      (item) => !item.link.includes(this.message?.id)
    );
  }

  returnCircle() {
    this.icon.visible = false;

    if (this.line) this.line.visible = false;

    gsap.to(this.group.position, {
      x: (this.platform?.position.x ?? 0) + 70,
      y: this.platform?.position.y,
      duration: 0.15,
    });
  }
}

function rotateCircle(
  from: PaperPoint,
  to: PaperPoint,
  r1?: number,
  r2?: number
) {
  if (!r2) r2 = r1;

  const start = to.subtract(from).normalize(r1).add(from);
  const end = from.subtract(to).normalize(r2).add(to);
  const vector = end.subtract(start);
  const middle = vector.normalize(vector.length / 2).add(start);

  return { start, end, middle };
}
