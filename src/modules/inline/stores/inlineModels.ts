export interface InlineStore {
  settings: Array<InlineSettingsItem>;
  types: Array<any>;

  message: MessageFree;

  selectedButton: IMButton | null;
  selectedLine: number | null;

  bot_id: number;
  host: string;
  token: string;
  scenarios: boolean;

  dialogs: Record<DialogsNames, boolean>;
}

export type DialogsNames =
  | 'drag'
  | 'add_button'
  | 'button_settings'
  | 'editor'
  | 'edit_type_message';

export const defaultSettingItem: InlineSettingsItem = {
  label: '',
  key: '',
  type: 'checkbox',
  value: false,
};

export const defaultMessageMedia: MessageFreeMedia = {
  id: 0,
  code: '',
  host: '',
  abs_path: '',
};

export const defaultMessageFree: MessageFree = {
  id: 0,
  title: '',
  text: '',
  text_length: 0,
  photos: {
    id: 0,
    abs_path: '',
    code: '',
    is_disable_notification: false,
    is_protect_content: false,
    is_spoiler: false,
    host: '',
  },
  breadcrumbs: { crumbs: [] },
  files: null,
  videos: null,
  feedback: null,
  animations: null,
  timer: null,
  sticker: null,
  nextMessage: null,
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

export interface InlineSettingsItem {
  label: string;
  key: string;
  type: InlineSettingsItemType;
  value: boolean;
}

type InlineSettingsItemType = 'checkbox' | 'input' | 'date' | 'date_time';
