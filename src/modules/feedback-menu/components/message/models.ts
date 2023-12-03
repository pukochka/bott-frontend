import {
  mdiMessage,
  mdiMessageBulleted,
  mdiSourceFork,
  mdiViewGallery,
} from '@quasar/extras/mdi-v7';

export const patterns = [
  {
    label: 'Для проверки номера телефона',
    description: 'Формат +79998887766',
    value: '/\\+\\d{11}/',
    id: 0,
  },
  {
    label: 'Для проверки почты',
    description: 'Формат example.ex@mail.com',
    value:
      '/^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/',
    id: 1,
  },
  {
    label: 'Для проверки ссылки',
    description: 'Формат https://bot-t.com',
    value: '/^(https?:\\/\\/)?([\\w-]{1,32}\\.[\\w-]{1,32})[^\\s@]*$/',
    id: 2,
  },
];

export const extensions = [
  'txt',
  'doc',
  'docx',
  'pdf',
  'pptx',
  'xls',
  'xlsx',
  'jpg',
  'png',
  'tif',
  'gif',
  'zip',
  'mp3',
  'mp4',
  'avi',
  'html',
  'css',
  'js',
];

export const defaultQuiz: FBQuiz = {
  id: 0,
  sort: 0,
  text: '',
};

export const defaultSimpleQuestion: FBSimpleQuestion = {
  validator: '',
  message: '',
};

export const defaultFileQuestion: FBFileQuestion = {
  extensions: '',
  size: 0,
};

export const defaultQuizQuestion: FBQuizQuestion = {
  is_multiple: false,
  options: [],
};

export const types = {
  1: {
    label: 'Ответ с сообщением',
    description:
      'Пользователю нужно будет ответить на сообщение. Сообщение будет проверено, при выборе вида проверки, в случае ошибки выведет текст который Вы введете.',
    icon: mdiMessage,
    color: '#a3b18a',
  },
  2: {
    label: 'Ответ с файлом',
    description:
      'Пользователю нужно будет прислать файл, установленного расширения и размера.',
    icon: mdiMessageBulleted,
    color: '#ffc971',
  },
  3: {
    label: 'Опрос пользователя',
    description: 'Пользователю нужно будет выбрать подходящий ответ.',
    icon: mdiViewGallery,
    color: '#cd5d67',
  },
  4: {
    label: 'Несколько ответов',
    description: 'Вы можете настроить кнопки по которым...',
    icon: mdiSourceFork,
    color: '#ac9e9e',
  },
};
