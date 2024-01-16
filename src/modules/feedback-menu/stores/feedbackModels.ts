import { Color } from 'paper';

export type PaperView = paper.View;
export type PaperLayer = paper.Layer;
export type PaperGroup = paper.Group;
export type PaperSize = paper.Size;
export type PaperItem = paper.Item;
export type PaperPath = paper.Path;
export type PaperLine = paper.Path.Line;
export type PaperPoint = paper.Point;
export type PaperText = paper.PointText;

export interface FeedbackModels {
  view: PaperView;
  layer: PaperLayer;
  first: PaperGroup;

  answers: Array<FeedbackAnswer>;
  answersCount: {
    all: number;
    unfinished: number;
    unread: number;
    visible: number;
  };
  notifications: Array<FeedbackNotification>;

  _message: MessageFree;
  _feedback: MessageFeedback<MessageFeedbackItemPreview>;
  loading: boolean;

  shells: Array<PaperGroup>;
  connect: Array<{ link: Array<number | string>; group: any }>;

  dragging: boolean;
  onmessage: boolean;
  onconnection: boolean;
  connecting: boolean;
  clickable: boolean;
  notopen: boolean;
  linking: boolean;

  mobile: {
    start: boolean;
    setting: boolean;
    end: boolean;
    connect: boolean;
  };

  dialogs: Record<DialogsNames, boolean>;

  countIntegrations: number;
  indexIntegrations: Array<FeedbackIntegrationIndex>;
  accessIntegrations: Array<FeedbackIntegrationAccess>;
  selectedIntegration: FeedbackIntegrationIndex | null;

  selectedType: number;
  selectedMessage: MessageFeedbackItemPreview | null;
  selectedMessageNext: MessageFeedbackItemPreview | null;
  selectedOption: any | null;
  selectedMessageFree: MessageFree | null;
  selectedAnswer: FeedbackAnswer | null;

  menu: Record<MenuNames, boolean>;

  action: null | (() => void);

  cursor: PaperPoint;
}

export type DialogsNames =
  | 'settings'
  | 'answers'
  | 'notify'
  | 'message'
  | 'message_free'
  | 'crossroad'
  | 'crossroad_option'
  | 'administrator_answer'
  | 'api'
  | 'api_edit'
  | 'touch';
export type MenuNames = 'create' | 'link' | 'message' | 'touch';

export interface MessageFeedbackItemPreview extends MessageFeedbackItem {
  platform?: PaperGroup;
  shell?: PaperGroup;
  setting: {
    title: string;
    icon: string;
    color: string;
  };
}

export const statuses: Record<number, { label: string; color: string }> = {
  0: { label: 'В процессе ответа', color: 'warning' },
  1: { label: 'Не прочитан', color: 'red' },
  2: { label: 'Прочитан', color: 'primary' },
  3: { label: 'Отвечен', color: 'positive' },
};

export const colors = {
  noColor: 'rgba(255,255,255,0.001)',
  alfaBlue: 'rgba(0,180,255,0.5)',
  blue: '#00b4ff',
  white: new Color(255, 255, 255),
};

export const defaultFeedbackSetting: MessageFeedbackSetting = {
  is_notice: true,
  user_limit: 0,
  time_notice: 0,
  time_cancel: 0,
  template_answer: '',
  limit_in_period: 0,
  period: 0,
  button_cancel: '',
};

export const defaultAnswer: FeedbackAnswer = {
  data: '',
  id: 0,
  adminAnswer: null,
  created_time: '',
  answer: '',
  items: [],
  notice_time: '',
  status: {
    id: 1,
    title: '',
  },
  user: {
    id: 1,
    type: '',
    first_name: '',
    link: '',
    last_name: '',
    username: '',
    telegram_id: 1,
  },
  deleted_time: '',
};

export const defaultInput: MessageFeedbackItemPreview = {
  id: 0,
  text: '',
  confirm: true,
  sort: 1,
  feedback_id: 1,
  type: 2,
  next: null,
  position: null,
  input: null,
  file: null,
  select: null,
  crossroad: null,
  setting: { title: '', color: '', icon: '' },
};

export const defaultFeedback: MessageFeedback<MessageFeedbackItemPreview> = {
  id: 0,
  hello: null,
  cancel: null,
  notice: null,
  end: null,
  noticeAdmin: null,
  startAdmin: null,
  answerAdmin: null,
  admin: null,
  start: null,
  setting: defaultFeedbackSetting,
  inputs: [],
};

export const defaultNotify: FeedbackNotification = {
  id: 0,
  user: {
    id: 1,
    type: '',
    first_name: '',
    link: '',
    last_name: '',
    username: '',
    telegram_id: 1,
  },
  status: true,
};
