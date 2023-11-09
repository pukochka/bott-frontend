export const defaultColor: SCColor = {
  title: '',
  id: 0,
  color: '',
};

export const defaultMessage: SCMessage = {
  id: 0,
  inline_menu: null,
  column_id: 0,
  custom_id: '',
  color: { title: '', id: 0, color: '' },
  active: false,
  title: '',
  sort: -1,
  type: { title: '', id: 0 },
  text: { content: '', length: 0 },
  specType: { id: 0 },
  link: '',
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

export const defaultConnection: SCConnection = {
  button_id: 0,
  message_id: 0,
};

export const defaultCommand: SCCommand = {
  id: 0,
  bot_id: 0,
  route: '',
  label: '',
  is_column: false,
  is_menu: false,
};

export const defaultCommandView: SCCommandView = {
  id: 0,
  bot_id: 0,
  route: '',
  label: '',
  columns: [],
  lines: [],
};

export const defaultColumn: SCColumn = {
  route_id: 0,
  messages: [],
  sort: -1,
  id: 0,
};
