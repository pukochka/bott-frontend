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

interface STImplementerIdParam {
  /** */
  implementer_id: number;
}

interface STTextParam {
  /** */
  text: string;
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
  /** Количество тикетов в категории */
  count: STCategoryIdParam;
  /** Изменение статуса тикета */
  'change-status': STTicketIdParam & STImplementerIdParam & STStatusParam;
  /** Получить тикет */
  'get-ticket': STTicketIdParam;
  /** Изменение категории тикета */
  'move-category': STUserIdParam & STCategoryIdParam & STTicketIdParam;
  /** Изменение менеджера тикета */
  'change-manager': STTicketIdParam & STManagerIdParam & STChangeIdParam;
  /** Массовый перенос незакрытых тикетов на выбранного сотрудника */
  'mass-transfer': STImplementerIdParam & STCategoryIdParam & STChangeIdParam;
  /** Предложить закрыть ВСЕ открытые тикеты данной категории */
  'mass-offer': STImplementerIdParam & STCategoryIdParam;
  /** Получить все сообщения тикета */
  'get-messages': STTicketIdParam & STLimitParam;
  /** Написать сообщение от исполнителя */
  'implementer-write': STTextParam & STTicketIdParam & STLimitParam;
  /** Поиск тикетов по пользователю */
  'search-author': STUserIdParam &
    STCategoryIdParam &
    STOffsetParam &
    STLimitParam;
  /** Поиск тикетов по названию */
  'search-title': STTitleParam & STCategoryIdParam;
  /** Удаление тикета */
  delete: STTicketIdParam;
}

/**
 * Общие параметры для всех запросов:
 * - bot_id
 * */
declare interface SupportImplementerQueries {
  /** Получить всех исполнителей выбранной категории */
  index: STCategoryIdParam & STOffsetParam & STLimitParam;
  /** Количество исполнителей в категории */
  count: STCategoryIdParam;
  /** Добавление исполнителя в категорию */
  create: STCategoryIdParam & STUserIdParam;
  /** Изменить статус принятия новых тикетов исполнителем */
  'change-status': STImplementerIdParam;
  /** Удаление исполнителя */
  delete: STImplementerIdParam & STCategoryIdParam;
}

declare type SupportCategoryParams<Q extends keyof SupportCategoryQueries> =
  SupportCategoryQueries[Q];

declare type SupportTicketParams<Q extends keyof SupportTicketQueries> =
  SupportTicketQueries[Q];

declare type SupportImplementerParams<
  Q extends keyof SupportImplementerQueries
> = SupportImplementerQueries[Q];
