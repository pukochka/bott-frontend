export const defaultMessage: MessageFree = {
  id: 0,
  title: '',
  text: '',
  text_length: 0,
  photos: null,
  files: null,
  videos: null,
  feedback: null,
  animations: null,
  breadcrumbs: { crumbs: [] },
  type: {
    id: 0,
    type: 0,
    label: '',
    description: '',
    path: 'photos',
  },
  color: null,
  specType: {
    id: 0,
  },
  sort: null,
  column_id: null,
  active: false,
  menu: null,
  is_generate_default: false,
  is_copy: false,
  is_support_menu: false,
  is_duplicate: false,
  is_test: false,
  support_types: {},
  constants: {},
  constantAnswers: {},
  faq: {
    video: '',
    text: '',
    links: [],
  },
  frontendMenu: [],
};

export const defaultButton: IMButton = {
  id: 0,
  line_id: 0,
  type: 1,
  sort: 0,
  text: '',
  action: '',
  link: '',
  line: 0,
};

export const defaultCommand: SCCommand = {
  id: 0,
  bot_id: 0,
  route: '',
  label: '',
  is_column: false,
  is_menu: false,
};

export const defaultColumn: SCColumn = {
  route_id: 0,
  messages: [],
  sort: -1,
  id: 0,
};
