import {
  colors,
  defaultInput,
  MessageFeedbackItemPreview,
  PaperGroup,
  PaperItem,
  PaperLine,
} from '../../stores/feedbackModels';
import { Group, Path, Point } from 'paper';
import { circle, dashLine, moveToPoint } from '../common';

import { useFeedbackStore } from '../../stores/feedbackStore';

import { Arrow, CrossroadText } from '../figures';
import { rotateCircle } from '../common';
const { noColor } = colors;

export class Link {
  group: PaperGroup = new Group();

  start: PaperItem | null = null;
  end: PaperItem | null = null;

  startMessage: MessageFeedbackItemPreview = defaultInput;
  endMessage: MessageFeedbackItemPreview = defaultInput;

  lineStart: PaperLine | null = null;
  lineEnd: PaperLine | null = null;
  lineFront: PaperLine | null = null;

  startCircle: PaperItem | null = null;
  endCircle: PaperItem | null = null;

  arrowStart: Arrow | null = null;
  arrowEnd: Arrow | null = null;
  text: CrossroadText | null = null;

  crossroad: MessageFeedbackCrossroadOption | null = null;

  constructor(
    start?: PaperGroup,
    end?: PaperGroup,
    startMessage?: any,
    endMessage?: any,
    crossroad?: MessageFeedbackCrossroadOption
  ) {
    if (start === void 0 || end === void 0) return;

    this.startMessage = startMessage ?? defaultInput;
    this.endMessage = endMessage ?? defaultInput;

    this.start = start;
    this.end = end;

    if (crossroad) this.crossroad = crossroad;

    this.mountLink();
    this.mountLine();
  }

  get from() {
    return this.start?.position ?? new Point(0, 0);
  }
  get to() {
    return this.end?.position ?? new Point(0, 0);
  }

  get points() {
    return rotateCircle(this.from, this.to, 85, 85, 40);
  }

  mountLink() {
    const startColor = this.startMessage.setting.color;
    const endColor = this.endMessage.setting.color;

    this.startCircle = circle(this.points.start, 30, startColor);
    this.endCircle = circle(this.points.end, 30, endColor);

    this.startCircle.opacity = 0.6;
    this.endCircle.opacity = 0.6;

    this.text = new CrossroadText(this.from, this.to, this.crossroad?.text);
    this.group.insertChild(0, this.text.value);

    const start = moveToPoint(this.from, this.to, 40);
    const end = moveToPoint(this.to, this.from, 40);

    this.arrowStart = new Arrow(start, this.points.end);
    this.arrowEnd = new Arrow(end, this.points.end);

    this.startMessage.platform?.insertChild(4, this.arrowStart.group);
    this.endMessage.platform?.insertChild(4, this.arrowEnd.group);

    this.arrowEnd.group.rotate(180);
    this.group.addChildren([this.startCircle, this.endCircle]);
  }

  mountLine() {
    const store = useFeedbackStore();

    this.lineStart = dashLine(
      this.points.middle,
      this.points.startOffset,
      this.startMessage.setting.color,
      30
    );
    this.lineEnd = dashLine(
      this.points.middle,
      this.points.endOffset,
      this.startMessage.setting.color,
      30
    );

    this.lineFront = new Path.Line({
      to: this.points.end,
      from: this.points.start,
      strokeColor: noColor,
      strokeWidth: 60,
    });

    this.lineStart.opacity = 0.6;
    this.lineEnd.opacity = 0.6;

    this.lineFront.onClick = (event: any) => {
      store.selectedMessage = this.startMessage;
      store.selectedMessageNext = this.endMessage;
      store.selectedOption = this.crossroad;

      const touch = !!event.event?.changedTouches?.[0] || store.isMobile;

      store.openMenu('link', undefined, touch);
    };

    this.lineFront.onMouseEnter = () => {
      store.clickable = true;

      this.lineEnd?.tweenTo({ opacity: 0.9 }, 150);
      this.lineStart?.tweenTo({ opacity: 0.9 }, 150);
      this.startCircle?.tweenTo({ opacity: 0.9 }, 150);
      this.endCircle?.tweenTo({ opacity: 0.9 }, 150);
    };
    this.lineFront.onMouseLeave = () => {
      store.clickable = false;

      this.lineEnd?.tweenTo({ opacity: 0.6 }, 150);
      this.lineStart?.tweenTo({ opacity: 0.6 }, 150);
      this.startCircle?.tweenTo({ opacity: 0.6 }, 150);
      this.endCircle?.tweenTo({ opacity: 0.6 }, 150);
    };

    this.group.insertChildren(0, [this.lineStart, this.lineEnd]);

    this.group.addChildren([this.lineFront]);
  }

  move() {
    if (
      this.startCircle &&
      this.endCircle &&
      this.lineStart &&
      this.lineEnd &&
      this.lineFront
    ) {
      this.startCircle.position = this.points.start;
      this.endCircle.position = this.points.end;

      this.lineFront.firstCurve.point1 = this.points.start;
      this.lineFront.firstCurve.point2 = this.points.end;

      this.lineStart.firstCurve.point1 = this.points.middle;
      this.lineStart.firstCurve.point2 = this.points.startOffset;

      this.lineEnd.firstCurve.point1 = this.points.middle;
      this.lineEnd.firstCurve.point2 = this.points.endOffset;

      const start = moveToPoint(this.from, this.to, 40);

      this.arrowStart?.rotate(start, this.points.end);
      this.text?.rotate(this.points.start, this.points.end);

      const end = moveToPoint(this.to, this.from, 40);

      this.arrowEnd?.rotate(end, this.points.end);
      this.arrowEnd?.group?.rotate(180);
    }
  }
}
