import { useRequiredParam } from './redirect';
import { RouteLocationNormalized } from 'vue-router';

const BOT_ID = 'bot_id';
const ID = 'id';
const ROUTE_ID = 'route_id';
const CATEGORY_ID = 'category_id';

const beforeConfig: BOTTBeforeConfig = {
  '/control': [useRequiredParam.bind([BOT_ID])],
};

export default beforeConfig;

type BOTTBeforeConfig = Record<
  string,
  ((this: string[], to: RouteLocationNormalized) => void)[]
>;
