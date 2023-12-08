interface SCRouteIdParam {
  /**
   * Уникальный идентификатор от маршрута
   * */
  route_id: number;
}

interface SCColumnIdParam {
  /**
   * Уникальный идентификатор колонны
   * */
  column_id: number;
}

interface SCMessageIdParam {
  /**
   * Уникальный идентификатор сообщения
   * */
  message_id: number;
}

interface SCColorIdParam {
  /**
   * Уникальный идентификатор цвета
   * */
  color_id: number | null;
}

interface SCTypeParam {
  /**
   * Тип сообщения
   * */
  type: number;
}

interface SCTypeMessageParam {
  /**
   * Тип сообщения
   * */
  message_type: number;
}

interface SCMessageTypeParam {
  /**
   * Тип сообщения
   * */
  message_type: number;
}

interface SCSortParam {
  /**
   * Новое положение
   * */
  sort: number;
}

interface SCMessageParam {
  /**
   * Новый текст маршрута
   * */
  message: string;
}

interface SCRouteParam {
  /**
   * Новый маршрут
   * */
  route: string;
}

interface SCTextParam {
  /**
   * Новый маршрут
   * */
  text: string;
}

interface SCTitleParam {
  /**
   * Новый маршрут
   * */
  title: string;
}

interface SCUserIdParam {
  /** */
  user_id: number;
}

/**
 * Запросы для колонн
 * */

declare interface SCColumnQueries {
  /**
   * Создать колонну
   * */
  create: SCRouteIdParam & SCTypeMessageParam;

  /**
   * Добавить сообщение в колонну
   * */
  'add-message-in-column': SCRouteIdParam &
    SCColumnIdParam &
    SCTypeMessageParam;

  /**
   * Переместить сообщение между колоннами/внутри колонны
   * */
  'change-sort-and-column': SCRouteIdParam &
    SCColumnIdParam &
    SCSortParam &
    SCMessageIdParam;

  /**
   * Удалить колонну
   * */
  delete: SCRouteIdParam & SCColumnIdParam;
}

/**
 * Запросы для команд
 * */
declare interface SCCommandQueries {
  /**
   * Получение всех маршрутов
   * */
  index: undefined;

  /**
   * Получение маршрута
   * */
  view: SCRouteIdParam;

  /**
   * Обновить label у маршрута
   * */
  'update-message': SCRouteIdParam & SCMessageParam;

  /**
   * Обновление пути у маршрута
   * */
  'update-route': SCRouteIdParam & SCRouteParam & SCMessageParam;

  /**
   * Удаление маршрута
   * */
  delete: SCRouteIdParam;

  /**
   * Создание обычного маршрута, без колонн
   * */
  create: SCRouteParam & SCMessageParam;

  /**
   * Создание маршрута, с колоннами
   * */
  'create-with-column': SCMessageParam & SCMessageTypeParam;

  /**
   * Делает сообщение активным
   * */
  'set-active': SCMessageIdParam & SCRouteIdParam;
}

/**
 * Запросы для свободных сообщений
 * - URL - /v1/bot/message/message/
 * */
declare interface SCMessageQueries {
  /**
   * Получить свободные сообщения
   * */
  index: undefined;

  /**
   * Получить свободное сообщение
   * */
  get: SCMessageIdParam;

  /**
   * Получить доступные цвета
   * */
  colors: undefined;

  /**
   * Получить доступные типы сообщений
   * */
  types: undefined;

  /**
   * Отправялет тестовое сообщение пользователю user_id
   * */
  test: SCMessageIdParam & SCUserIdParam;

  /**
   * Изменить текст сообщения
   * */
  'update-text': SCTextParam & SCMessageIdParam;

  /**
   * Изменить название сообщения
   * */
  'update-title': SCMessageIdParam & SCTitleParam;

  /**
   * Добавление меню
   * */
  'add-inline-menu': SCMessageIdParam;

  /**
   * Удаление меню
   * */
  'delete-inline-menu': SCMessageIdParam;

  /**
   * Дублировать сообщение
   * */
  duplicate: SCMessageIdParam;

  /**
   * Изменить тип сообщения
   * */
  'update-type': SCMessageIdParam & SCTypeParam;

  /**
   * Удаляет сообщение
   * */
  delete: SCMessageIdParam;

  /**
   * Задать цвет для названия сообщения
   * */
  'set-color': SCMessageIdParam & SCColorIdParam;
}

declare type SCMessageParams<Q extends keyof SCMessageQueries> =
  SCMessageQueries[Q];

declare type SCCommandParams<Q extends keyof SCCommandQueries> =
  SCCommandQueries[Q];

declare type SCColumnParams<Q extends keyof SCColumnQueries> =
  SCColumnQueries[Q];
