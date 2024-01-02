<template>
  <q-item-section>
    <div class="row items-center justify-center q-gutter-x-xs">
      <q-item-label>Пользователь</q-item-label>

      <q-btn
        flat
        size="md"
        color="primary"
        icon="search"
        class="rounded"
        padding="4px"
        :loading="loading"
      >
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          Искать по пользователю
        </q-tooltip>

        <user-search
          :token="config.bot.token"
          :bot_id="config.bot.id"
          @select="filterByUser"
        ></user-search>
      </q-btn>
    </div>
  </q-item-section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { config } from '../../../../config';

import { fetchFeedbackAnswer } from '../../../../api/queries';

import UserSearch from '../../notification/UserSearch.vue';

const emit = defineEmits<{
  (e: 'filter'): void;
}>();

const loading = ref(false);

const filterByUser = (id: string) => {
  emit('filter');
  loading.value = true;

  fetchFeedbackAnswer('index', {
    user_id: id,
  }).then(() => (loading.value = false));
};
</script>

<style scoped lang="scss"></style>
