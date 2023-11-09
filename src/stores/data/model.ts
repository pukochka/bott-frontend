import { defaultBot } from 'stores/defaults/bot';
import { defaultUser } from 'stores/defaults';

export interface DataStore {
  userData: BOTUser;

  botData: BOTBot;
  userBots: BOTBot[];

  breadcrumbs: Record<string, string>;
}

export type BOTBot = typeof defaultBot;
type BOTUser = typeof defaultUser;
