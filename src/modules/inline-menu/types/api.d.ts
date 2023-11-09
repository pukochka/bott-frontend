interface IMTextParam {
  /**
   * Текст в кнопке
   * */
  text: string;
}

interface IMActionParam {
  /**
   * действие Для type = CONNECT принимается MESSAGE_ID
   * */
  action: string;
}

interface IMTypeParam {
  /**
   * Тип кнопки
   * */
  type: number;
}

interface IMIdParam {
  /**
   * Уникальный идентификатор кнопки
   * */
  id: number;
}

interface IMSortParam {
  /**
   * Новое положение кнопки
   * */
  sort: number;
}

interface IMLineIdParam {
  /**
   * Уникальный идентификатор линии
   * */
  line_id: number;
}

declare interface IMQueries {
  /**
   * Получает меню
   * */
  view: { menu_id: number };

  /**
   * Добавление кнопки в новую линию
   * */
  'add-button-with-line': IMTextParam & IMActionParam & IMTypeParam;

  /**
   * Добавление кнопки в линию
   * */
  'add-button-in-line': IMTextParam &
    IMActionParam &
    IMTypeParam &
    IMLineIdParam;

  /**
   * Удалить кнопку
   * */
  'delete-button': IMIdParam;
  /**
   * Удалить линию
   * */
  'delete-line': IMLineIdParam;

  /**
   * Переместить кнопку
   * */
  'change-sort-and-line': IMIdParam & IMLineIdParam & IMSortParam;

  /**
   * Обновить тип и данные кнопки
   * */
  'update-data-and-type': IMTextParam & IMActionParam & IMTypeParam & IMIdParam;

  /**
   * Сделать кнопку неактивной
   * */
  'disabled-button': IMIdParam;

  /**
   * Переместить кнопку, в верхнее положение
   * */
  'move-first-line': IMIdParam;

  /**
   * Переместить кнопку,в нижнее положение
   * */
  'move-last-line': IMIdParam;
}

declare type IMParams<Q extends keyof IMQueries> = IMQueries[Q];
