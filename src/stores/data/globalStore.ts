import { defineStore } from 'pinia';
import { DataStore } from 'stores/data/model';
import { defaultBot, defaultUserBots } from 'stores/defaults/bot';
import { defaultUser } from 'stores/defaults';

export const useGlobalStore = defineStore('global-stores', {
  state: () =>
    ({
      userData: defaultUser,

      notifyData: [],

      botData: defaultBot,
      userBots: defaultUserBots,
      breadcrumbs: {},
    } as DataStore),
  getters: {},
  actions: {},
});
