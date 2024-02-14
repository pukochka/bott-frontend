import {
  colors,
  defaultInput,
  MessageFeedbackItemPreview,
  PaperGroup,
  PaperItem,
  PaperLine,
  PaperText,
} from '../../stores/feedbackModels';
import { Group, Point } from 'paper';
import { createPlus } from '../figures';
import { useFeedbackStore } from '../../stores/feedbackStore';
import {
  circle,
  createText,
  dashLine,
  overlap,
  textNewMessage,
} from '../common';
import gsap from 'gsap';
import { Link } from './link';
import { fetchFeedback } from '../../api/queries';
import { update } from '../create';

const { noColor } = colors;

export class Connection {
  message: MessageFeedbackItemPreview = defaultInput;
  group: PaperGroup = new Group();
  groupConnection: PaperGroup = new Group();
  platform: PaperGroup | null = null;
  line: PaperLine | null = null;
  icon: PaperGroup = createPlus(new Point(0, 0), 3);
  iconConnection: PaperGroup = createPlus(new Point(0, 0), 3);
  front: PaperItem | null = null;
  connectCircle: PaperItem | null = null;
  frontCircle: PaperItem | null = null;
  text: PaperText | null = null;

  action = false;
  prev = false;
  drag = false;

  get canCreateConnectCircle() {
    const feedback = useFeedbackStore();
    return feedback.shells.filter((shell) =>
      overlap(this.connectCircle, shell.children[0])
    ).length;
  }
  get isNewConnect() {
    return (
      (this.platform?.position.x ?? 0) + 400 < (this.front?.position.x ?? 0) ||
      (this.platform?.position.x ?? 0) - 200 > (this.front?.position.x ?? 0)
    );
  }

  get canConnect() {
    const feedback = useFeedbackStore();
    return feedback.shells.filter(
      (item) =>
        overlap(this.front, item.children[0]) &&
        /** Фильтрация для начального сообщения */
        this.message.platform?.id !== item.id &&
        /** Фильтрация для предыдущего сообщения */
        (item.data?.next?.id !== this.message.id ||
          item.data?.next?.type !== this.message.type) &&
        /** Фильтрация для предыдущего сообщения с CROSSROAD */
        (item.data.type !== 4 ||
          feedback.crossroadConnections[this.message.id] !== this.message.type)
    );
  }

  constructor(message: MessageFeedbackItemPreview, platform: PaperGroup) {
    const feedback = useFeedbackStore();
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

    if (feedback.isMobile) {
      this.group.onClick = () => {
        feedback.selectedMessage = this.message;

        feedback.connecting = true;

        feedback.openMenu(
          'touch',
          () => {
            feedback.onconnection = false;
          },
          true
        );
      };
    }

    this.group.onMouseDown = () => {
      feedback.connecting = true;

      this.openConnection();
    };

    this.group.onMouseUp = (event: any) => {
      const child = event.target?.children?.[3];

      if (this.canConnect.length && this.prev) {
        const next = this.canConnect[0];

        const removeLink = this.removePrevLink.bind(this);
        const removeConnection = this.removeConnection.bind(this);

        function remove(response: any, original: any) {
          if (!original.data.result) {
            removeLink();
            removeConnection();

            return;
          }

          feedback._feedback = response.feedback;
          feedback.selectedMessage = null;

          update();
        }

        if (this.message.type === 4) {
          fetchFeedback(
            'set-crossroad-option-next',
            {
              input_id: this.message.id,
              option_id: next.data.id,
              next_id: next.data.id ?? null,
              next_type: next.data.type ?? null,
            },
            remove
          ).then();

          return;
        }

        fetchFeedback(
          'set-input-next',
          {
            input_id: this.message.id,
            type: this.message.type,
            next_id: next.data.id ?? null,
            next_type: next.data.type ?? null,
          },
          remove
        ).then();
      }

      if (overlap(child, this.connectCircle)) {
        this.createConnect(event);
        return;
      }

      this.removeConnection();
    };

    this.group.onMouseEnter = () => {
      if (feedback.connecting) return;

      feedback.onconnection = true;
      this.icon.visible = true;

      gsap.to(this.group.position, {
        x: (this.platform?.position.x ?? 0) + 100,
        duration: 0.15,
      });
    };

    this.group.onMouseLeave = () => {
      if (feedback.connecting) return;

      feedback.onconnection = false;

      this.returnCircle();
    };

    this.group.onMouseDrag = (event: any) => {
      this.drag = true;

      const prev = this.isNewConnect;
      const child = event.target?.children?.[3];

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
        this.line.firstCurve.point2 = this.front?.position ?? new Point(0, 0);
      }
    };
  }

  openConnection() {
    const feedback = useFeedbackStore();

    feedback.layer.addChild(this.groupConnection);

    this.groupConnection.position = new Point(
      (this.platform?.position.x ?? 0) + 300,
      this.platform?.position.y ?? 0
    );

    this.createConnectCircle();
  }
  createConnect(event: any) {
    this.action = true;
    if (!this.platform) return;
    const feedback = useFeedbackStore();

    if (!this.prev) this.createPrevLink();

    feedback.selectedMessage = this.message;

    feedback.action = () => {
      feedback.onconnection = false;
      this.action = false;
      this.removePrevLink();
      this.removeConnection();
    };

    if (this.message.type === 4) {
      feedback.openDialog('crossroad_option');

      return;
    }

    const touch = !!event.event?.changedTouches?.[0] || feedback.isMobile;

    feedback.openMenu('create', undefined, touch);
  }

  createConnectCircle() {
    if (this.canCreateConnectCircle) return;

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

    const feedback = useFeedbackStore();

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

    feedback.connect.push({
      link: ['new'],
      group: link,
    });
  }
  removePrevLink() {
    this.prev = false;
    if (this.action) return;

    this.group.opacity = 1;
    const feedback = useFeedbackStore();

    feedback.connect
      .filter((item) => item.link.includes('new'))
      .forEach((item) => {
        const link = item.group;

        link?.group?.remove();
        link?.arrowEnd?.group?.remove();
        link?.arrowStart?.group?.remove();
      });

    feedback.connect = feedback.connect.filter(
      (item) => !item.link.includes('new')
    );
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
    const feedback = useFeedbackStore();
    feedback.connecting = false;
    feedback.onconnection = false;

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
    const feedback = useFeedbackStore();

    const back = circle([0, 0], 80, '#adb5bd', 8, '#adb5bd');
    const front = circle([0, 0], 80, noColor);
    this.icon.scale(6, this.icon.position);

    front.onMouseEnter = () => {
      feedback.clickable = true;
    };

    front.onMouseLeave = () => {
      feedback.clickable = false;
    };

    front.onClick = (event: any) => {
      const touch = !!event.event?.changedTouches?.[0] || feedback.isMobile;

      feedback.openMenu(
        'create',
        () => {
          feedback.onconnection = false;
        },
        touch
      );
    };

    this.group.addChildren([back, this.icon, front]);
  }
}
