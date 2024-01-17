interface STCategoryIdParam {
  /** Идентификатор категории */
  category_id: number;
}

interface STTicketIdParam {
  /** Идентификатор тикета */
  ticket_id: number;
}

interface STManagerIdParam {
  /** Идентификатор менеджера */
  manager_id: number;
}

interface STStatusParam {
  /**  */
  status: number;
}

interface STIdParam {
  /**  */
  id: number;
}

interface STUserIdParam {
  /**  */
  user_id: number;
}

interface STChangeIdParam {
  /**  */
  changing_id: number;
}

interface STOffsetParam {
  /** */
  offset: number;
}

interface STLimitParam {
  /** */
  limit: number;
}

interface STTitleParam {
  /** */
  title: string;
}

/**
 * Общие параметры для всех запросов:
 * - bot_id
 * */
declare interface SupportCategoryQueries {
  /** Получить все категории бота */
  index: undefined;
  /** Добавление категории */
  create: STTitleParam;
  /** Изменить статус активности категории */
  'change-status': STCategoryIdParam;
  /** Получение лога категории */
  log: STCategoryIdParam;
  /** Изменение названия категории */
  'update-title': STCategoryIdParam & STTitleParam;
  /** Удаление категории */
  delete: STCategoryIdParam;
}
/**
 * Общие параметры для всех запросов:
 * - bot_id
 * */
declare interface SupportTicketQueries {
  /** Получить все тикеты выбранной категории */
  index: STCategoryIdParam & STOffsetParam & STLimitParam;
  /** Изменение названия тикета */
  'update-title': STTitleParam & STTicketIdParam;
  /** Изменение статуса тикета */
  'change-status': STTicketIdParam & STManagerIdParam & STStatusParam;
  /** Изменение категории тикета */
  'move-category': STUserIdParam & STCategoryIdParam & STTicketIdParam;
  /** Изменение менеджера тикета */
  'change-manager': STTicketIdParam & STManagerIdParam & STChangeIdParam;
  /** Удаление тикета */
  delete: STTicketIdParam;
}

declare type SupportCategoryParams<Q extends keyof SupportCategoryQueries> =
  SupportCategoryQueries[Q];

declare type SupportTicketParams<Q extends keyof SupportTicketQueries> =
  SupportTicketQueries[Q];
