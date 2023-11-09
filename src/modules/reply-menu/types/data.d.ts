declare interface RMMenu {
  /**
   * Уникальный идентификатор бота
   */
  bot_id: number;
  /**
   * Уникальный идентификатор
   */
  id: number;
  /**
   * Линии в меню
   */
  lines: RMLine[];
  /**
   * Фоновый текст у клавиатуры
   */
  input_field_placeholder: string;
  /**
   * Исчезновение клавиатуры по клику
   */
  one_time_keyboard: boolean;
  /**
   * Изменить размер клавиатуры
   */
  resize_keyboard: boolean;
  /**
   * TODO
   */
  selective: boolean;
  /**
   * Название
   */
  title: string;
}

declare interface RMLine {
  /**
   * Кнопки
   */
  buttons: RMButton[];
  /**
   * Уникальный идентификатор сообщения
   */
  id: number;
  /**
   * К какому меню принадлежит
   */
  keyboard_id: number;
  /**
   * Положение линии (min = 0, max = кол-во линий - 1)
   */
  sort: number;
}

declare interface RMButton {
  /**
   * Текст кнопки
   */
  text: string;
  /**
   * Путь кнопки (Действие)
   */
  action: string;
  /**
   * Уникальный идентификатор сообщения
   */
  id: number;
  /**
   * Линии в меню
   */
  line_id: number;
  /**
   * Положение
   */
  sort: number;
  /**
   * Тип кнопки
   */
  type: number;
}
