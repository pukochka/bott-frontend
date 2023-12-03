import {
  colors,
  defaultInput,
  MessageFeedbackItemPreview,
  PaperGroup,
  PaperLine,
} from '../../stores/feedbackModels';
import { Group, Point } from 'paper';
import { createPlus } from '../figures';
import { usePSStore } from '../../stores/feedbackStore';
import { circle, dashLine } from '../common';
import gsap from 'gsap';
import { Link } from './link';
import { overlap } from '../common';
import { fetchFeedback } from '../../api/queries';
const { noColor } = colors;

export class Connection {
  message: MessageFeedbackItemPreview = defaultInput;
  group: PaperGroup = new Group();
  groupConnection: PaperGroup = new Group();
  platform: PaperGroup | null = null;
  line: PaperLine | null = null;
  icon: PaperGroup = createPlus(new Point(0, 0), 3);
  iconConnection: PaperGroup = createPlus(new Point(0, 0), 3);
  front: any | null = null;
  connectCircle: any | null = null;
  frontCircle: any | null = null;

  action = false;
  prev = false;
  drag = false;

  get isNewConnect() {
    return (
      (this.platform?.position.x ?? 0) + 400 < this.front.position.x ||
      (this.platform?.position.x ?? 0) - 200 > this.front.position.x
    );
  }

  get canConnect() {
    const store = usePSStore();
    return store.shells.filter(
      (item) =>
        overlap(this.front, item.children[0]) &&
        /** Фильтрация для начального сообщения */
        this.message.platform?.id !== item.id &&
        /** Фильтрация для предыдущего сообщения */
        (item.data?.next?.id !== this.message.id ||
          item.data?.next?.type !== this.message.type) &&
        /** Фильтрация для предыдущего сообщения с CROSSROAD */
        (item.data.type !== 4 ||
          store.crossroadConnections[this.message.id] !== this.message.type)
    );
  }

  constructor(message: MessageFeedbackItemPreview, platform: PaperGroup) {
    const store = usePSStore();
    this.message = message;
    this.platform = platform;

    if (!this.platform || !this.message) return;

    const coords = new Point(
      this.platform.position.x + 85,
      this.platform.position.y
    );

    this.connectCircle = circle([0, 0], 0, '#adb5bd', 8, '#adb5bd');
    this.frontCircle = circle([0, 0], 80, noColor);

    const back = circle(coords, 30, this.message.setting.color);
    this.front = circle(coords, 30, noColor);
    this.line = dashLine(coords, coords, this.message.setting.color, 30);

    this.icon.visible = false;
    this.icon.position = coords;
    this.icon.scale(2, coords);
    this.iconConnection.scale(6, this.connectCircle.position);

    this.group.addChildren([this.line, back, this.icon, this.front]);
    this.groupConnection.addChildren([
      this.connectCircle,
      this.iconConnection,
      this.frontCircle,
    ]);
    this.groupConnection.opacity = 0;
    this.groupConnection.remove();

    this.group.onMouseDown = () => {
      store.connecting = true;

      this.openConnection();
    };

    this.group.onMouseUp = (event: any) => {
      const child = event.target?.children?.[3];

      if (this.canConnect.length && this.prev) {
        const next = this.canConnect[0];

        if (this.message.type === 4) {
          fetchFeedback('set-crossroad-option-next', {
            input_id: this.message.id,
            option_id: next.data.id,
            next_id: next.data.id ?? null,
            next_type: next.data.type ?? null,
          }).then();

          return;
        }
        fetchFeedback('set-input-next', {
          input_id: this.message.id,
          type: this.message.type,
          next_id: next.data.id ?? null,
          next_type: next.data.type ?? null,
        }).then();
      }

      if (overlap(child, this.connectCircle)) {
        this.createConnect();
        return;
      }

      this.removeConnection();
    };

    this.group.onMouseEnter = () => {
      if (store.connecting) return;

      store.onconnection = true;
      this.icon.visible = true;

      gsap.to(this.group.position, {
        x: this.group.position.x + 25,
        duration: 0.15,
      });
    };

    this.group.onMouseLeave = () => {
      if (store.connecting) return;

      store.onconnection = false;

      this.returnCircle();
    };

    this.group.onMouseDrag = (event: any) => {
      const prev = this.isNewConnect;
      const child = event.target?.children?.[3];
      this.drag = true;
      if (this.line) this.line.visible = true;

      this.group.position.x += event.delta.x;
      this.group.position.y += event.delta.y;

      if (this.isNewConnect && !prev) {
        this.removeConnectCircle();
      }
      if (!this.isNewConnect && prev) {
        this.createConnectCircle();
      }

      if (!this.canConnect.length) this.removePrevLink();

      if (this.canConnect.length && this.platform && !this.prev) {
        const platform = this.canConnect[0];
        this.createPrevLink(
          this.platform,
          platform,
          this.message,
          platform.data
        );
      }

      if (overlap(child, this.connectCircle) && !this.prev) {
        this.createPrevLink();
      }

      if (this.line && this.platform) {
        this.line.firstCurve.point1 = this.platform.position;
        this.line.firstCurve.point2 = this.front.position;
      }
    };
  }

  openConnection() {
    const store = usePSStore();

    store.layer.addChild(this.groupConnection);

    this.groupConnection.position = new Point(
      (this.platform?.position.x ?? 0) + 300,
      this.platform?.position.y ?? 0
    );

    this.createConnectCircle();
  }
  createConnect() {
    this.action = true;
    if (!this.platform) return;
    const store = usePSStore();

    if (!this.prev) this.createPrevLink();

    store.selectedMessage = this.message;

    store.action = () => {
      this.action = false;
      this.removePrevLink();
      this.removeConnection();
    };

    if (this.message.type === 4) {
      store.openDialog('crossroad_option');

      return;
    }

    store.openMenu('create');
  }

  createConnectCircle() {
    gsap.to(this.groupConnection, { opacity: 1, duration: 0.15 });
    gsap.to(this.connectCircle, { radius: 80, duration: 0.15 });
  }
  removeConnectCircle() {
    gsap.to(this.groupConnection, { opacity: 0, duration: 0.15 });
    gsap.to(this.connectCircle, { radius: 1, duration: 0.15 });
  }

  createPrevLink(
    platform?: PaperGroup,
    next?: PaperGroup,
    start?: any,
    end?: any
  ) {
    this.prev = true;
    this.group.opacity = 0.01;

    const store = usePSStore();

    if (!this.platform || !this.message) return;

    const link = new Link(
      platform ?? this.platform,
      next ?? this.groupConnection,
      start ?? this.message,
      end ?? {
        setting: { color: 'rgb(173,181,189)' },
      }
    );
    link.group.sendToBack();

    store.connect.push({
      link: ['new'],
      group: link,
    });
  }
  removePrevLink() {
    this.prev = false;
    if (this.action) return;

    this.group.opacity = 1;
    const store = usePSStore();

    store.connect
      .filter((item) => item.link.includes('new'))
      .forEach((item) => {
        const link = item.group;

        link?.group?.remove();
        link?.arrowEnd?.group?.remove();
        link?.arrowStart?.group?.remove();
      });

    store.connect = store.connect.filter((item) => !item.link.includes('new'));
  }

  returnCircle() {
    this.icon.visible = false;

    if (this.line) this.line.visible = false;

    gsap.to(this.group.position, {
      x: (this.platform?.position.x ?? 0) + 85,
      y: this.platform?.position.y,
      duration: 0.15,
    });
  }

  removeConnection() {
    const store = usePSStore();
    store.connecting = false;
    store.onconnection = false;

    gsap.to(this.groupConnection, { opacity: 0, duration: 0.15 });
    gsap.to(this.connectCircle, { radius: 1, duration: 0.15 }).then(() => {
      this.groupConnection.remove();
      this.drag = false;
    });
    this.returnCircle();
  }
}

export class FirstConnection {
  group: PaperGroup = new Group();
  icon: PaperGroup = createPlus(new Point(0, 0), 3);
  constructor() {
    const store = usePSStore();

    const back = circle([0, 0], 80, '#adb5bd', 8, '#adb5bd');
    const front = circle([0, 0], 80, noColor);
    this.icon.scale(6, this.icon.position);

    front.onMouseEnter = () => {
      store.clickable = true;
    };

    front.onMouseLeave = () => {
      store.clickable = false;
    };

    front.onClick = () => {
      store.openMenu('create');
    };

    this.group.addChildren([back, this.icon, front]);
  }
}
