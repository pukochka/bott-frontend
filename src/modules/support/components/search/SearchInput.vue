<template>
  <div class="q-py-xs q-px-sm">
    <q-input
      dense
      outlined
      class="bott-input--rounded"
      :debounce="300"
      v-model="support.search.value"
      :placeholder="selected.tooltip + '...'"
      @update:model-value="updateSearch"
    >
      <template #append>
        <q-btn
          dense
          round
          flat
          size="md"
          color="primary"
          :icon="selected.icon"
          @click="changeMethod"
        >
          <q-tooltip
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            {{ selected.tooltip }}
          </q-tooltip>
        </q-btn>

        <q-btn
          dense
          round
          flat
          size="md"
          color="primary"
          icon="close"
          v-if="support.search.value !== ''"
          @click="support.clearSearch"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { config } from '../../config';
import { computed } from 'vue';

import { useSupportStore } from '../../stores/supportStore';
import { fetchUserSearch } from 'src/components/search/query';
import { fetchSupportTicket } from '../../api/queries';

import { mdiAccount, mdiFormatTitle } from '@quasar/extras/mdi-v7';

const support = useSupportStore();

const selected = computed(() => searches[support.search.name]);

const changeMethod = () => {
  support.search.foundingTickets = [];
  support.search.name = support.search.name === 'title' ? 'user' : 'title';

  updateSearch('');
};

const updateSearch = (value: string) => {
  support.search.tickets = false;
  support.search.foundingUsers = [];
  support.search.foundingTickets = [];

  if (support.search.value.length === 0) return;

  if (support.search.name === 'user' && support.search.value.length < 3) return;

  support.search.loading = true;

  if (support.search.name === 'user') {
    fetchUserSearch(
      config.host,
      {
        bot_id: config.bot.id,
        token: config.bot.token,
        q: value,
      },
      (results) => {
        support.search.foundingUsers = results.filter((item) => item.id !== '');
      }
    ).then(() => (support.search.loading = false));

    return;
  }

  fetchSupportTicket('search-title', {
    category_id: support.selectedCategory?.id ?? 0,
    title: value,
  }).then(() => (support.search.loading = false));
};

const searches: Record<SearchNames, SearchSetting> = {
  user: {
    icon: mdiAccount,
    tooltip: 'Поиск по пользователю',
    method: 'search-user',
  },
  title: {
    icon: mdiFormatTitle,
    tooltip: 'Поиск по названию',
    method: 'search-title',
  },
};

type SearchNames = 'user' | 'title';

interface SearchSetting {
  icon: string;
  tooltip: string;
  method: string;
}
</script>

<style scoped lang="scss"></style>
