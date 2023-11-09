import { Dialog } from 'quasar';

export default function usePrompt(message?: string) {
  return Dialog.create({
    title: 'Введите название папки',
    class: 'rounded no-shadow bordered',

    prompt: {
      outlined: true,
      dense: true,
      color: 'primary',
      class: 'bott-input--rounded',
      model: '',
      isValid: (val) => val.length > 2,
      type: 'text',
    },
    cancel: {
      unelevated: true,
      noCaps: true,
      label: 'Отмена',
      color: 'red',
      class: 'rounded',
    },
    ok: {
      unelevated: true,
      noCaps: true,
      label: 'Добавить',
      color: 'primary',
      class: 'rounded',
    },
    persistent: true,
  });
}
