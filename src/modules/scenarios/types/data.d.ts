/**
 * Сущность команды:
 * - односдлжная команда ( действие )
 * - многосложная команда ( сценарий )
 * */
declare interface SCCommand {
  /**
   * Уникальный идентификатор бота
   * */
  bot_id: number;
  /**
   * Уникальный идентификатор действия/сценария
   * */
  id: number;
  /**
   * Название команды
   * */
  label: string;
  /**
   * Путь команды
   * */
  route: string;
  /**
   * Поддерживает ли команда колонны( односдлжная/многосложная команда )
   */
  is_column: boolean;
  /**
   * Принадлежность команды к меню
   * */
  is_menu: boolean;
}

declare interface SCCommandView {
  /**
   * Уникальный идентификатор бота
   */
  bot_id: number;
  /**
   * Массив колонн
   */
  columns: SCColumn[];
  /**
   * Уникальный идентификатор действия/сценария
   */
  id: number;
  /**
   * Название команды
   */
  label: string;
  /**
   * Путь команды
   */
  route: string;
  /**
   * Массив соединений ( для отображения соединительных линий )
   */
  lines: SCConnection[];
}

/**
 * Сущность колонны
 **/
declare interface SCColumn {
  /**
   * Уникальный идентификатор колонны
   */
  id: number;
  /**
   * Уникальный идентификатор действия/сценария
   */
  route_id: number;
  /**
   * Массив сообщений
   */
  messages: SCMessage[];
  /**
   * Расположение колонны
   */
  sort: number;
}

/**
 * Сущность сообщения
 * */
declare interface SCMessage {
  /** */
  active: boolean;
  /** */
  color: SCColor;
  /** Уникальный идентификатор колонны в которой находится сообщение */
  column_id: number;
  /** Вспомогательный уникальный идентификатор связи с типом */
  custom_id: string;
  /** Уникальный идентификатор сообщения */
  id: number;
  /** */
  inline_menu: IMMenu | null;
  /** Ссылка для подробного редактирования */
  link: string;
  /** Сортировка внутри колонны */
  sort: number;
  /** */
  specType: { id: number };
  /** */
  text: { content: string; length: number };
  /** */
  title: string;
  /** Тип сообщения */
  type: { id: number; title: string };
}

/**
 * Соединение кнопки с сообщением
 * */
declare interface SCConnection {
  /** Уникальный идентификатор сообщения  */
  message_id: number;
  /** Уникальный идентификатор кнопки */
  button_id: number;
}

declare interface SCColor {
  /** */
  id: number;
  /** */
  title: string;
  /** */
  color: string;
}

declare interface SCType {
  /** */
  label: string;
  /** */
  description: string;
  /** */
  type: number;
}
