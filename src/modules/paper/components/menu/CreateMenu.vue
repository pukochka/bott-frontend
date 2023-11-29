<template>
  <q-menu
    touch-position
    v-if="store.menu.create"
    max-width="350px"
    class="bott-portal-menu"
  >
    <div class="q-pa-xs text-subtitle1 text-center">Выберите тип вопроса</div>

    <q-separator></q-separator>

    <q-list>
      <q-item
        clickable
        v-ripple
        v-for="([type, data], index) of Object.entries(types)"
        :key="index"
        @click="createMessage(type)"
      >
        <q-item-section avatar :style="{ color: data.color }">
          <q-icon :name="data.icon" size="22px" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ data.label }}</q-item-label>

          <q-item-label caption>{{ data.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-inner-loading :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePSStore } from '../../stores/PSstore';
import { fetchFeedback } from '../../api/queries';
import { update } from '../../utils/create';
import { types } from '../message/models';

const store = usePSStore();

const loading = ref(false);
const createMessage = (type: any) => {
  loading.value = true;
  const message = store.selectedMessage;

  fetchFeedback(
    'create-input',
    {
      type: type,
      pos_x: (message?.platform?.bounds.center.x ?? 0) + 300 ?? null,
      pos_y: message?.platform?.bounds.center.y ?? null,
      after_id: message?.id ?? null,
      after_type: message?.type ?? null,
    },
    (response) => {
      store._feedback = response.feedback;

      update();
    }
  ).then(() => {
    loading.value = false;
    store.menu.create = false;
  });
};
</script>

<style scoped lang="scss"></style>
