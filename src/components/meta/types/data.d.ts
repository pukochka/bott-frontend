declare interface MessageFreeSettingsItem {
  label: string;
  key: string;
  type: MessageFreeSettingsItemType;
  value: boolean;
}

declare type MessageFreeSettingsItemType =
  | 'checkbox'
  | 'input'
  | 'date'
  | 'date_time';
