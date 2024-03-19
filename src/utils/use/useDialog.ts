import { Dialog } from 'quasar';
import { replaceUnsolvableTags } from 'src/utils/helpers/replace';

export function useDialog(message?: string, cancel?: boolean, title?: string) {
  const grindingMessage = replaceUnsolvableTags(message);

  return Dialog.create({
    title: title || 'Уведомление',
    message: grindingMessage,
    class: 'rounded no-shadow bordered',
    html: true,
    ok: {
      unelevated: true,
      noCaps: true,
      class: 'rounded',
      color: 'primary',
    },
    cancel: cancel
      ? {
          unelevated: true,
          noCaps: true,
          label: 'Отмена',
          color: 'red',
          class: 'rounded',
        }
      : undefined,
  });
}
