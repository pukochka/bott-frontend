/**
 * Сущность элемента web модуля
 * */
declare interface WebModule {
  /**
   * Уникальный идентификатор web модуля
   * */
  id: number;
  /**
   * Название web модуля
   * */
  text: string;
  /**
   * Ссылка на web модуль
   * */
  value: string;
  /**
   * Тип web модуля
   * */
  type: string;
}

/**
 * Сущность выбранных элементов
 * */
declare interface StateActionsMenu {
  /**
   * Объект со всеми маршрутами и выбранным маршрутом
   * */
  main: {
    /**
     * Массив со всеми маршрутами
     * */
    items: RoutesMenu[];
    /**
     * Выбранный маршрут
     * */
    item: RoutesMenu | null;
  };
  /**
   * Объект со всеми доп. маршрутами и выбранной категорией/каталогом
   * */
  options: {
    /**
     * Массив со всеми доп. маршрутами
     * */
    items: OptionsMenu[];
    /**
     * Выбранная категория/каталог
     * */
    item: OptionsMenu | null;
  };
  /**
   * Массив со всеми доступными маршрутами и доп. маршрутами
   * */
  search: (OptionsMenu | RoutesMenu)[];
  /**
   * Есть ли доп. маршруты
   * */
  readonly is_options: boolean;
  /**
   * Есть ли доп. ошибки
   * */
  readonly is_error: boolean;
  /**
   * Текст ошибки
   * */
  readonly error_text: string;
  /**
   * Конечный маршрут (для запросов)
   * */
  readonly route: string | null;
  /**
   * Дефолтный текст
   * */
  readonly default_text: string;
}

/**
 *
 * */
declare interface Currency {
  /** */
  id: number;
  /** */
  letter: string;
  /** */
  code: string;
}

/**
 *
 * */
declare interface Simple {
  /** */
  id: number;
  /** */
  title: string;
}

/**
 * Сущность бота в системе BOTT
 * */
declare interface Bot {
  /**
   * Дата созвания бота в гг.мм.дд
   */
  created_date: string;
  /**
   * Валюта бота
   */
  currency: Currency;
  /**
   * Уникальный идентификатор бота
   */
  id: number;
  /**
   * Язык бота
   */
  language: Simple;
  /**
   * Имя бота в telegram
   */
  name: string;
  /**
   * Секретный ключ бота (Нужен везде)
   */
  secret_key: string;
  /**
   * Название бота в системе
   */
  title: string;
  /**
   * Тип бота (Корзина/Цифроваые товары)
   */
  type: Simple;
  /**
   * Сущность пользователя в системе BOTT
   * */
  user: BOTTUser;
}

/**
 * Сущность пользователя, общая для всех ботов.
 * */
declare interface BOTTUser {
  id: number;
  /** уникальный идентификатор телеграм */
  telegram_id: number;
  /** Ник пользвателя null - не существует */
  username: string | null;
  /** Имя пользвателя */
  first_name: string;
  /** Фамилия пользвателя */
  last_name: string;
  /** Пряма ссылка на пользователя с HTML тегами или сразу ник @BOTTRU (Если есть) */
  link: string;
  /** Тип аккаунта: private group supergroup channel */
  type: string;
}
