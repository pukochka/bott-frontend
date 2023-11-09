import shop from './shop';
import digital from './digital';
import access from './access';
import free from './free';
import review from './review';
import support from './support';

export const commonButtons: Record<string, BOTTViewButtons[]> = {
  /**
   * Бот приема за
   * */
  9: access,
  /**
   * Тип бота 2
   * */
  2: digital,
  /**
   * Тип бота 3
   * */
  10: free,
  /**
   * Тип бота 4
   * */
  7: shop,
  /**
   * Тип бота 5
   * */
  5: support,
  /**
   * Тип бота 6
   * */
  11: review,
};
