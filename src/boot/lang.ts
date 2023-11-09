import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';

const localLang = localStorage.getItem('lang') ?? 'ru';

const lang = createI18n({
  locale: localLang,
  fallbackLocale: 'ru',
  messages: messages,
});

export function changeLang(l: 'ru' | 'en' | 'es') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (lang.global.locale._value === l) return;

  localStorage.setItem('lang', l);

  window.location.reload();
}

export default boot(({ app }) => {
  app.use(lang);
});

export const { t } = lang.global;
