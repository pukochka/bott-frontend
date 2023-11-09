import { Link } from '../utils/links';

export type PaperView = paper.View;
export type PaperLayer = paper.Layer;
export type PaperGroup = paper.Group;
export type PaperSize = paper.Size;
export type PaperItem = paper.Item;
export type PaperLine = paper.Path.Line;
export type PaperPathLine = paper.Path.Line;
export type PaperPoint = paper.Point;

export interface PSStoreModel {
  view: PaperView;
  layer: PaperLayer;

  links: PaperGroup;
  messages: PaperGroup;

  feedback: MessageFeedback;
  connect: Array<{ link: Array<number>; group: Link }>;

  dragging: boolean;
  onmessage: boolean;
  onconnection: boolean;
  connecting: boolean;
  clickable: boolean;
}

export const colors = {
  noColor: 'rgba(255,255,255,0.001)',
  alfaBlue: 'rgba(0,180,255,0.5)',
  blue: '#00b4ff',
};

const inputs = [
  {
    id: 1,
    text: 'sadfds',
    confirm: true,
    sort: 1,
    feedback_id: 1,
    type: 1,
    input: null,
    file: null,
    select: null,
  },
  {
    id: 2,
    text: 'sadf2321ds',
    confirm: true,
    sort: 1,
    feedback_id: 1,
    type: 2,
    input: null,
    file: null,
    select: null,
  },
  {
    id: 23,
    text: 'sadf2321ds',
    confirm: true,
    sort: 1,
    feedback_id: 1,
    type: 2,
    input: null,
    file: null,
    select: null,
  },
];

const flow: MessageFeedbackFlow[] = [
  {
    id: 1,
    link: [1, 2],
    design: null,
  },
  {
    id: 1,
    link: [2, 23],
    design: null,
  },
];

export const defaultFeedback = {
  id: 0,
  hello: null,
  cancel: null,
  notice: null,
  end: null,
  noticeAdmin: null,
  startAdmin: null,
  answerAdmin: null,
  admin: null,
  inputs: inputs,
  flow: flow,
};

export const defaultInput = {
  id: 0,
  text: '',
  confirm: true,
  sort: 1,
  feedback_id: 1,
  type: 2,
  input: null,
  file: null,
  select: null,
};
