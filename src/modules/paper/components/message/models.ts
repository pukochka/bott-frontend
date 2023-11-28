export const patterns = [
  {
    label: 'Шаблон для проверки номера телефона',
    description: 'Формат ввода +79998887766',
    value: '/\\+\\d{11}/',
    id: 0,
  },
  {
    label: 'Шаблон для проверки почты',
    description: 'Формат ввода example.ex@mail.com',
    value:
      '/^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/',
    id: 1,
  },
  {
    label: 'Шаблон для проверки ссылки',
    description: 'Формат ввода https://bot-t.com',
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
