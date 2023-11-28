import { Color } from 'paper';

export type PaperView = paper.View;
export type PaperLayer = paper.Layer;
export type PaperGroup = paper.Group;
export type PaperSize = paper.Size;
export type PaperItem = paper.Item;
export type PaperPath = paper.Path;
export type PaperLine = paper.Path.Line;
export type PaperCircle = paper.Path.Circle;
export type PaperPoint = paper.Point;
export type PaperText = paper.PointText;

export interface FeedbackModels {
  view: PaperView;
  layer: PaperLayer;

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

  dialogs: Record<DialogsNames, boolean>;

  selectedMessage: MessageFeedbackItemPreview;

  menu: {
    create: boolean;
    link: boolean;
  };

  action: null | (() => void);
}

export type DialogsNames = 'settings' | 'answers' | 'notify' | 'message';
export type MenuNames = 'create' | 'link';

export interface MessageFeedbackItemPreview extends MessageFeedbackItem {
  platform?: PaperGroup;
  shell?: PaperGroup;
  setting: {
    title: string;
    icon: string;
    color: string;
  };
}

export const colors = {
  noColor: 'rgba(255,255,255,0.001)',
  alfaBlue: 'rgba(0,180,255,0.5)',
  blue: '#00b4ff',
  white: new Color(255, 255, 255),
};

const defaultFeedbackSetting: MessageFeedbackSetting = {
  is_notice: true,
  user_limit: 0,
  time_notice: 0,
  time_cancel: 0,
  template_answer: 0,
  limit_in_period: 0,
  period: 0,
};

const o = [
  {
    x: -391.2558139534885,
    y: -3.4883720930231448,
  },
  {
    x: 89.64297244049774,
    y: -6.123546511627936,
  },
  {
    x: -798.4927325581398,
    y: -1.1613372093024168,
  },
  {
    x: -390.3558248717116,
    y: 454.88634130363585,
  },
  {
    x: 103.9069512225743,
    y: 448.2994186046509,
  },
];

const inputs: MessageFeedbackItem[] = [
  {
    id: 1,
    text: 'Как дела',
    confirm: false,
    sort: 0,
    feedback_id: 123,
    type: 4,
    position: {
      x: -391.2558139534885,
      y: -3.4883720930231448,
    },
    next: null,
    input: null,
    file: null,
    select: null,
    crossroad: {
      options: [
        {
          text: 'Выбрать сообщение',
          next: {
            id: 12,
            type: 1,
          },
          sort: 1,
          id: 122,
        },
        {
          text: 'Выбрать файл',
          next: {
            id: 1221222222223,
            type: 2,
          },
          sort: 3,
          id: 12,
        },
      ],
    },
  },
  {
    id: 1221222222223,
    text: 'Как дела',
    confirm: false,
    sort: 0,
    feedback_id: 123,
    type: 2,
    position: {
      x: 89.64297244049774,
      y: -6.123546511627936,
    },
    next: null,
    input: null,
    file: null,
    select: null,
    crossroad: null,
  },
  {
    id: 123,
    text: 'Как дела',
    confirm: false,
    sort: 0,
    feedback_id: 123,
    type: 2,
    position: { x: -1884.856368921776, y: -823.8886099365751 },
    next: {
      id: 1,
      type: 4,
    },
    input: null,
    file: null,
    select: null,
    crossroad: null,
  },
  {
    id: 12,
    text: 'Как дела',
    confirm: false,
    sort: 0,
    feedback_id: 123,
    type: 1,
    position: {
      x: -390.3558248717116,
      y: 454.88634130363585,
    },
    next: {
      id: 126565,
      type: 3,
    },
    input: null,
    file: null,
    select: null,
    crossroad: null,
  },
  {
    id: 126565,
    text: 'Как дела',
    confirm: false,
    sort: 0,
    feedback_id: 123,
    type: 3,
    position: {
      x: 103.9069512225743,
      y: 448.2994186046509,
    },
    next: null,
    input: null,
    file: null,
    select: null,
    crossroad: null,
  },
];

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

const message = {
  id: 1,
  bot_id: 886,
  title: 'Самолет ВВС РК KAI',
  text: 'Разработан южнокорейской фирмой аэрокосмической промышленности (Корейская аэрокосмическая компания — KAI) совместно с американской компанией <b>Lockheed Martin</b> (программа финансировалась на 17% фирмой KAI, на 13% <b>Lockheed Martin</b>, а 70% выделило правительство Южной Кореи). Завод окончательной сборки находится в г. Сачхон.\n\nПроектирование началось в конце 1990-х годов. Название <b>T-50 Golden Eagle</b> официально присвоено в феврале 2000 года. Первый полет Т-50 совершил 20 августа 2002 года. Во многом он основан на самолете <b>Samsung KTX-2</b>, с большим привлечением опыта и технологии корпорации Lockheed Martin. Способен достигать скорости <em>1,4</em> Маха.',
  text_length: 1024,
  photos: {
    id: 343211,
    code: null,
    host: 'joelfilipeqwonahbmllounsplash.jpg',
    abs_path:
      'https://storage.yandexcloud.net/bottstorage/bot/886/photos/joelfilipeqwonahbmllounsplash.jpg',
    is_disable_notification: null,
    is_protect_content: false,
    is_spoiler: false,
  },
  files: null,
  videos: null,
  feedback: null,
  animations: null,
  type: {
    id: 1,
    type: 1,
    label: 'Сообщение с картинкой',
    description: 'Сообщение содержащее одну картинку',
    path: 'photos',
  },
  color: null,
  specType: {
    id: 1,
  },
  sort: null,
  column_id: null,
  active: false,
  menu: {
    id: 1478,
    lines: [],
  },
  is_generate_default: false,
  is_copy: true,
  is_support_menu: true,
  is_duplicate: true,
  is_test: true,
  support_types: {
    '0': {
      id: 0,
      type: 0,
      label: 'Текстовое сообщение',
      description: 'Сообщение содержащее только текст',
      path: 'texts',
    },
    '1': {
      id: 1,
      type: 1,
      label: 'Сообщение с картинкой',
      description: 'Сообщение содержащее одну картинку',
      path: 'photos',
    },
    '2': {
      id: 2,
      type: 2,
      label: 'Обратная связь',
      description:
        'Форма для сбора данных от клиентов путем ответов на вопросы',
      path: null,
    },
    '3': {
      id: 3,
      type: 3,
      label: 'Сообщение-файл',
      description: 'Документ с описанием(Отправка файла)',
      path: 'files',
    },
    '4': {
      id: 4,
      type: 4,
      label: 'Сообщение c видео',
      description: 'Сообщение содержащее видео',
      path: 'videos',
    },
    '5': {
      id: 5,
      type: 5,
      label: 'Сообщение c анимацией(gif)',
      description: 'Сообщение содержащее анимацию(GIF)',
      path: 'animations',
    },
  },
  constants: {
    FIRST_NAME: 'Строго имя пользователя',
    SECOND_NAME: 'Строго фамилия пользователя',
    USER_TELEGRAM_ID: 'Telegram id',
    USERNAME: 'Ник пользователя',
    NAME: 'Имя-ссылка/ник пользователя',
    USER_ID: 'ID пользователя в боте',
    BALANCE: 'Баланс пользователя',
    BALANCE_WITHOUT_CURRENCY: 'Баланс пользователя без значка валюты',
    BOT_USER_CREATED_DATETIME: 'Дата и время регистрации пользователя в боте',
    MESSAGE_TITLE: 'Название сообщения',
    MESSAGE_TYPE: 'Тип сообщения',
  },
  constantAnswers: {
    TITLE: 'Название сообщения',
    ANSWERS: 'Вопросы и ответы',
    TIME_ANSWER: 'Время ответа на вопрос',
    BOT_ID: 'Уникальный идентификатор бота',
    BOT_NAME: 'Ссылка на бота',
    BOT_TITLE: 'Имя бота',
    FIRST_NAME: 'Строго имя пользователя',
    SECOND_NAME: 'Строго фамилия пользователя',
    USER_TELEGRAM_ID: 'Telegram id',
    USERNAME: 'Ник пользователя',
    NAME: 'Имя-ссылка/ник пользователя',
  },
  faq: {
    video: '',
    text: '',
    links: [],
  },
  frontendMenu: [],
};

// export const defaultFeedback: MessageFeedback<MessageFeedbackItemPreview> = {
//   id: 0,
//   hello: null,
//   cancel: null,
//   notice: null,
//   end: null,
//   noticeAdmin: message,
//   startAdmin: message,
//   answerAdmin: null,
//   admin: null,
//   setting: defaultFeedbackSetting,
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   inputs: inputs,
// };

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
  setting: defaultFeedbackSetting,
  inputs: [],
};
