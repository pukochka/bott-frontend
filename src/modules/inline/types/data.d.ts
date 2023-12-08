declare interface IMMenu {
  /**
   *  Уникальный идентификатор сообщения
   */
  id: number;
  /**
   * Линии в меню
   */
  lines: IMLine[];
}

declare interface IMLine {
  /**
   * Кнопки
   */
  buttons: IMButton[];
  /**
   *  Уникальный идентификатор сообщения
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

declare interface IMButton {
  /**
   * Текст кнопки
   */
  text: string;
  /**
   * Действие кнопки
   */
  action: string;
  /**
   * Уникальный идентификатор сообщения
   */
  id: number;
  /**
   * Если кнопка имеет тип CONNECT, то уникальный идентификатор сообщения, на которое ведет
   */
  line: number | null;
  /**
   * Линии в меню
   */
  line_id: number;
  /**
   * Ссылка на сайте, где можно управлять данным разделом null - означает, что ссылки нет
   */
  link: string | null;
  /**
   * Местоположение кнопки
   */
  sort: number;
  /**
   *  Тип кнопки
   */
  type: number;
}
