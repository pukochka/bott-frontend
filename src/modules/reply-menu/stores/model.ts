export interface MainStore {
  menuValue: RMMenu | null;

  selectedButton: RMButton | null;
  selectedLine: RMLine | null;

  dialogs: Record<DialogsNames, boolean>;
}

export type DialogsNames = 'drag' | 'add_button' | 'main' | 'button_settings';
