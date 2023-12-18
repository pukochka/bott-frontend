export interface MenuStore {
  routes: Array<RoutesMenu>;
  options: Array<OptionsMenu>;

  selectedMain: RoutesMenu | null;
  selectedOption: OptionsMenu | null;

  search: Array<RoutesMenu | OptionsMenu>;
  all: Array<RoutesMenu | OptionsMenu>;
}
