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

export const defaultQuiz: MessageFeedbackItemSelectOption = {
  id: 0,
  sort: 0,
  text: '',
};

export const types = {
  1: {
    label: 'Ответ с сообщением',
    description: 'Редактируется и создается только текст.',
    icon: mdiMessage,
    color: '#a3b18a',
  },
  2: {
    label: 'Ответ с файлом',
    description:
      'Когда пользователя обязуют отправить определенный тип файлов для загрузки в вашего бота для последующего просмотра файла.',
    icon: mdiMessageBulleted,
    color: '#ffc971',
  },
  3: {
    label: 'Опрос пользователя',
    description: 'Обычный опрос либо опрос с готовым ответом.',
    icon: mdiViewGallery,
    color: '#cd5d67',
  },
  4: {
    label: 'Несколько ответов',
    description:
      'Когда у пользователя есть вилка вопросов которые он может выбрать',
    icon: mdiSourceFork,
    color: '#ac9e9e',
  },
};
