/**
 * Сущность элемента Routes
 * */
declare interface RoutesMenu {
  /**
   * Текст действия
   */
  text: string;
  /**
   * Полный путь действия с параметрами
   */
  route: string | null;
  /**
   * Описание действия
   */
  description: string | null | '';
  /**
   * Ссылка на управление
   * */
  link: string | null;
  /**
   * Текст выводимый в  случае пустого options
   * */
  text_not_found: string | null;
  /**
   * Подпись поля, для значения type=CATALOG||CATEGORY
   * */
  text_value: string;
  /**
   * Для типа категории, выводятся подкатегории, для типа каталог, выводятся эллементы
   * */
  options: OptionsMenu[] | null;

  type_value: number;
}

/**
 * Элемент доп.маршрута
 * */
declare interface OptionsMenu {
  /**
   * Текст действия
   * */
  text: string;
  /**
   *  Описание действия
   *  */
  description: string | null;
  /**
   *  Ссылка на управление
   *  */
  link: string | null;
  /**
   * Полный путь действия с параметрами
   * */
  route: string;
  /**
   *
   * */
  type_value: number;
}
