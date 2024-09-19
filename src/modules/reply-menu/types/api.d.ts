interface RMUpdateParams {
  /**
   *
   * */
  input_field_placeholder: any;
  /**
   *
   * */
  resize_keyboard: any;
  /**
   *
   * */
  one_time_keyboard: any;
}

interface RMIdParam {
  /**
   * Уникальный идентификатор кнопки
   * */
  id: number;
}

interface RMLineIdParam {
  /**
   * Уникальный идентификатор линии
   * */
  line_id: number;
}

interface RMSortParam {
  /**
   * Новое положение кнопки
   * */
  sort: number;
}

interface RMMessageParam {
  /**
   * Текст кнопки
   * */
  message: string;
}

interface RMCommonParams extends RMMessageParam {
  /**
   * Для type = ROUTE Новый путь Для type = CONNECT тип сообщения Для type = WEB_APP Ссылка на веб модуль Для остальных пустая строка
   * */
  route: string;
  /**
   * Тип кнопки
   * */
  type: number;
}

declare interface RMQueries {
  /**
   * Получает меню
   * */
  view: undefined;
  /**
   * Обновляет настройки меню
   * */
  update: RMUpdateParams;
  /**
   * Удалить кнопку
   * */
  'update-message': RMIdParam & RMMessageParam;
  /**
   * Удалить кнопку
   * */
  'delete-button': RMIdParam;
  /**
   * Удалить линию
   * */
  'delete-line': RMLineIdParam;
  /**
   * Переместить кнопку
   * */
  'change-sort-and-line': RMSortParam & RMIdParam & RMLineIdParam;
  /**
   * Обновить данные или тип кнопки
   * */
  'update-data-and-type': RMCommonParams & RMIdParam;
  /**
   * Добавление кнопки в линию
   * */
  'add-button-in-line': RMCommonParams & RMLineIdParam;
  /**
   * Добавление кнопки в новую линию
   * */
  'add-button-with-line': RMCommonParams;
  /**
   * Переместить кнопку, в верхнее положение
   * */
  'move-first-line': RMIdParam;
  /**
   * Переместить кнопку,в нижнее положение
   * */
  'move-last-line': RMIdParam;
}

declare type RMParams<Q extends keyof RMQueries> = RMQueries[Q];
