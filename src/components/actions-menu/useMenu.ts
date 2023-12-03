import { useMenuStore } from './stores/menuStore';

const err = {
  text: 'Возможно путь был удален',
  route: null,
  type_value: 0,
  description: '',
  link: null,
  text_value: '',
  options: [],
  text_not_found: '',
};

export function useState(selected: RoutesMenu) {
  const menu = useMenuStore();

  menu.selectedMain = selected;

  menu.options = selected.options ?? [];
  menu.selectedOption = selected.options?.[0] ?? null;
}

export function useParse(route: string | null) {
  const menu = useMenuStore();
  for (const search of menu.search) {
    let is_end = false;

    if (search.route === route) {
      if (search.type_value === 3) {
        for (const item of menu.routes) {
          let find_item;
          const len = item.options?.length ?? 0;

          if (len > 0)
            find_item =
              item.options?.find((option) => option.route === route) !==
              undefined
                ? item
                : undefined;

          if (find_item !== null && find_item !== undefined) {
            useState(find_item);
            menu.selectedOption = <OptionsMenu>search;
            is_end = true;
            break;
          }
        }
      } else {
        useState(<RoutesMenu>search);
        break;
      }
    }

    if (is_end) break;

    if (menu.selectedMain === null) {
      menu.selectedMain = err;
    }
  }
}

export function useRoutes(data: RoutesMenu[]) {
  let allRoutes: (RoutesMenu | OptionsMenu)[] = [];

  for (const item of data) {
    allRoutes.push(item);

    if (item.options) {
      item.options.map((item) => {
        item.type_value = 3;
        return item;
      });

      for (const option of item.options) allRoutes.push(option);
    }
  }

  allRoutes.sort((a, b) => {
    if (a.text > b.text) return 1;
    else return -1;
  });

  allRoutes = allRoutes.filter((item) => isNaN(Number(item.text)));

  return allRoutes.filter(
    (item) => item.type_value !== 2 && item.type_value !== 1
  );
}

export const defaultState: any = {
  main: {
    items: [],
    item: null,
  },
  options: {
    items: [],
    item: null,
  },
  search: [],
  get is_options() {
    return (this.main.item?.options?.length ?? 0) > 0;
  },
  get is_error() {
    return (
      (this.main.item?.type_value === 1 || this.main.item?.type_value === 2) &&
      !this.is_options
    );
  },
  get error_text() {
    return this.main.item?.text_not_found ?? '';
  },
  get route() {
    if (this.is_error) return null;
    else if (this.options.item !== null) return this.options.item.route;
    else if (this.main.item !== null) return this.main.item.route;
    else return null;
  },
  get default_text() {
    if (this.main.item?.text_value === '') return this.main.item?.text;
    return this.main.item?.text_value ?? 'Выбор вложенного действия';
  },
};

function actionsCheck(value: string | null) {
  const url = new URL('http://bot-t/' + value ?? '');

  return url.pathname.slice(1);
}
