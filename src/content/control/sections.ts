import {
  mdiFinance,
  mdiCash,
  mdiCreditCard,
  mdiCreditCardMultipleOutline,
} from '@quasar/extras/mdi-v7';
import { t } from 'src/boot/lang';

export default [
  {
    label: 'Система транзакций \b (Пополнения/Списания) баланса',
    icon: mdiCreditCardMultipleOutline,
    link: '',
  },
  {
    label: t('payment-methods'),
    icon: mdiCreditCard,
    link: '',
  },
  {
    label: t('ref-system'),
    icon: mdiCash,
    link: '',
  },
  {
    label: 'Отслеживание трафика (UTM ссылки)',
    icon: mdiFinance,
    link: '',
  },
];
