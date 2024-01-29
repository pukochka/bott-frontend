/**
 * DTO Категории
 * */
declare interface SupportCategory {
  /** ID категории */
  id: number;
  /** Название категории */
  title: string;
  /** Статус категории 1 - активна 0 - не активна */
  status: number;
  /** Дефолтная категория 1 - да 0 - нет */
  default: number;
  /** */
  view_category_id: number;
}
/**
 * DTO Тикета
 * */
declare interface SupportTicket {
  /** ID тикета */
  id: number;
  /** ID категории */
  category_id: number;
  /** Пользователь создавший тикет */
  user: BOTTUser;
  /** Пользователь работающий над тикетом */
  manager: BOTTUser | null;
  /** Название тикета */
  title: string;
  /** Статус тикета 1 - закрыт 2 - открыт 3 - ожидает закрытия 4 - повторно открыт 5 - ожидает менеджера */
  status: number;
  /** */
  last_message: SupportTicketMessage;
  /** Дата и время создания тикета (2023-10-13 20:47:35) */
  created_at: string;
  /** Дата и время принятия в работу (2023-10-13 20:47:35) */
  accepted_at: string | null;
  /** Дата и время закрытия (выполнения) (2023-10-13 20:47:35) */
  closed_at: string | null;
  /** Дата и время автоудаления (2023-10-13 20:47:35) */
  deleted_at: string | null;
  /** Дата и время поступления предложения о закрытии (2023-10-13 20:47:35) */
  offered_at: string | null;
}

declare interface SupportImplementer {
  /** ID исполнителя */
  id: number;
  /** Исполнитель категории */
  user: BOTTUser;
  /** ID категории */
  category_id: number | null;
  /** Статус получения новых тикетов 1 - получает 0 - не получает */
  status: number;
}

declare interface SupportTicketMessage {
  /** ID сообщения тикета */
  id: number;
  /** ID тикета */
  ticket_id: number;
  /** Чьё сообщение: Исполнитель категории - 'implementer' Пользователь создавший запрос - 'user' */
  author: 'implementer' | 'user';
  /** Пользователь чьё сообщение: Исполнитель категории Пользователь создавший запрос */
  user: BOTTUser;
  /** Контент сообщения */
  message: MessageFree;
  /** Дата и время создания сообщения (2023-10-13 20:47:35) */
  created_at: string;
}
