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
  messages: MessageFree[];
  /**
   * Расположение колонны
   */
  sort: number;
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
