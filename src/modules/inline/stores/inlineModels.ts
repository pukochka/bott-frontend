export interface InlineStore {
  combine: {
    messages: Array<MessageFree>;
    count: number;
    page: number;
  };
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
  | 'combine'
  | 'combine_message'
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

export interface InlineSettingsItem {
  label: string;
  key: string;
  type: InlineSettingsItemType;
  value: boolean;
}

type InlineSettingsItemType = 'checkbox' | 'input' | 'date' | 'date_time';
