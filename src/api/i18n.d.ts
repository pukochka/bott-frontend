import 'vue-i18n';

import ru from '../i18n/ru.json';
import en from '../i18n/en.json';
import es from '../i18n/es.json';

type Schema = typeof ru;

declare module 'vue-i18n' {
  interface CustomTypeOptions {
    $t<Key extends keyof typeof ru>(key: Key): Schema[Key];

    defaultNS: 'ru';

    resources: {
      ru: typeof ru;
      en: typeof en;
      es: typeof es;
    };
  }
}
