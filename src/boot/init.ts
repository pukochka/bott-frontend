import { boot } from 'quasar/wrappers';
import { useStyleStore } from 'stores/style/styleStore';
import { Dark } from 'quasar';
import vClickable from '../utils/directives/v-clickable';

export default boot(({ app }) => {
  const style = useStyleStore();

  app.directive('clickable', vClickable);

  Dark.set(style.dark);
});
