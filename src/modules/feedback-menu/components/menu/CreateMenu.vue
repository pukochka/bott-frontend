<template>
  <q-menu
    touch-position
    v-if="store.menu.create"
    max-width="350px"
    class="bott-portal-menu"
  >
    <div class="q-pa-xs text-subtitle1 text-center">Выберите тип вопроса</div>

    <q-separator></q-separator>

    <types-question-list @create="createMessage"></types-question-list>

    <q-inner-loading :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePSStore } from '../../stores/PSstore';
import { fetchFeedback } from '../../api/queries';

import TypesQuestionList from '../views/TypesQuestionList.vue';

const store = usePSStore();

const loading = ref(false);
const createMessage = (type: any) => {
  const message = store.selectedMessage;

  if (message?.type !== 4) {
    loading.value = true;
    fetchFeedback('create-input', {
      type: type,
      pos_x: (message?.platform?.position.x ?? 0) + 300,
      pos_y: message?.platform?.position.y ?? 0,
      after_id: message?.id ?? null,
      after_type: message?.type ?? null,
    }).then(() => {
      loading.value = false;
      store.menu.create = false;
    });

    return;
  }

  store.openDialog('crossroad_option');
};
</script>

<style scoped lang="scss"></style>
