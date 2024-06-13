declare interface MessageFreeSettingsItem {
  label: string;
  key: string;
  type: MessageFreeSettingsItemType;
  value: string | boolean;
}

declare type MessageFreeSettingsItemType =
  | 'checkbox'
  | 'input'
  | 'date'
  | 'date_time';
