<template>
  <q-menu
    touch-position
    v-if="store.menu.link"
    max-width="350px"
    class="bott-portal-menu"
  >
    <q-list>
      <q-item
        dense
        clickable
        v-ripple
        v-for="(button, index) of buttons"
        :key="index"
        v-show="button.condition"
        @click="button.action"
      >
        <q-item-section avatar>
          <q-icon :name="button.icon" :color="button.color" size="22px" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ button.label }}</q-item-label>
        </q-item-section>

        <q-inner-loading
          :showing="loading.delete"
          v-if="button.icon === 'close'"
        >
          <q-spinner size="16px" color="primary" />
        </q-inner-loading>

        <q-menu
          v-if="button.color === 'primary'"
          max-width="350px"
          class="bott-portal-menu"
          cover
        >
          <types-question-list @create="addBeforeMessage"></types-question-list>
        </q-menu>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePSStore } from '../../stores/feedbackStore';
import { fetchFeedback } from '../../api/queries';

import { mdiMessagePlus } from '@quasar/extras/mdi-v7';
import TypesQuestionList from '../views/TypesQuestionList.vue';

const store = usePSStore();

const loading = ref({
  delete: false,
  before: false,
});

const addBeforeMessage = (type: number) => {
  loading.value.before = true;

  const pos_x = store.selectedMessageNext?.platform?.position.x ?? 0;
  const pos_y = store.selectedMessageNext?.platform?.position.y ?? 0;

  fetchFeedback(
    'set-input-position',
    {
      input_id: store.selectedMessageNext?.id ?? 0,
      type: store.selectedMessageNext?.type ?? 1,
      x: pos_x + 300,
      y: pos_y,
    },
    () => {
      fetchFeedback(
        'create-input-before',
        {
          before_id: store.selectedMessageNext?.id ?? 0,
          before_type: store.selectedMessageNext?.type ?? 1,
          pos_x,
          pos_y,
          type: type,
        },
        store.updateQuestion
      ).then(() => {
        store.menu.link = false;
        loading.value.before = false;
      });
    }
  );
};

const deleteLink = () => {
  loading.value.delete = true;

  if (store.selectedMessage?.type !== 4) {
    fetchFeedback('set-input-next', {
      input_id: store.selectedMessage?.id ?? 0,
      type: store.selectedMessage?.type ?? 1,
      next_id: null,
      next_type: null,
    }).then(() => {
      store.menu.link = false;
      loading.value.delete = false;
    });

    return;
  }

  fetchFeedback('delete-crossroad-option', {
    input_id: store.selectedMessage?.id ?? 0,
    option_id: store.selectedOption?.id ?? 0,
  }).then(() => {
    store.menu.link = false;
    loading.value.delete = false;
  });
};

const buttons = computed(() => [
  {
    label: 'Вставить сообщение',
    icon: mdiMessagePlus,
    color: 'primary',
    condition: true,
    action: null,
  },
  {
    label: 'Изменить кнопки',
    icon: 'edit',
    color: 'warning',
    condition: store.selectedMessage?.type === 4,
    action: () => store.openDialog('crossroad'),
  },
  {
    label: 'Удалить связь',
    icon: 'close',
    color: 'red',
    condition: true,
    action: deleteLink,
  },
]);
</script>

<style scoped lang="scss"></style>
