import { Notify } from 'quasar';

export function useNotify(message?: string, callback?: () => void) {
  return Notify.create({
    message: message ?? '',
  });
}
