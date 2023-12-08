<template>
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

      <q-inner-loading :showing="loading.delete" v-if="button.icon === 'close'">
        <q-spinner size="16px" color="primary" />
      </q-inner-loading>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { useFeedbackStore } from '../../stores/feedbackStore';
import { computed, ref } from 'vue';

import { fetchFeedback } from '../../api/queries';
import { useDialog } from '../../../file-manager/stores/useDialog';

const store = useFeedbackStore();

const loading = ref({
  delete: false,
  start: false,
  between: false,
});

const start = computed(
  () =>
    store.feedback.start?.type === store.selectedMessage?.type &&
    store.feedback.start?.id === store.selectedMessage?.id
);

const withoutCrossroad = computed(() => store.selectedMessage?.type !== 4);

const openSetting = () => {
  store.menu.message = false;

  store.closeDialog('touch');

  if (withoutCrossroad.value) {
    store.openDialog('message');

    return;
  }
  store.openDialog('crossroad');
};

const deleteMessage = () => {
  useDialog('Вы уверены, что хотите удалить вопрос?', true).onOk(() => {
    loading.value.delete = true;
    fetchFeedback('delete-input', {
      input_id: store.selectedMessage?.id ?? 0,
      type: store.selectedMessage?.type ?? 1,
    }).then(() => {
      store.menu.message = false;
      loading.value.delete = false;
      store.closeDialog('touch');
    });
  });
};

const setStart = () => {
  useDialog(
    'Вопрос станет начальным, всё, что будет до него не будет учитываться. Вы уверены, что хотите сделать вопрос начальным?',
    true
  ).onOk(() => {
    loading.value.start = true;
    fetchFeedback('set-start-input', {
      start_id: store.selectedMessage?.id ?? 0,
      start_type: store.selectedMessage?.type ?? 0,
    }).then(() => {
      store.menu.message = false;
      loading.value.start = false;
      store.closeDialog('touch');
    });
  });
};

const addMessage = () => {
  store.closeDialog('touch');

  store.action = () => {
    store.menu.message = false;
  };
  store.openDialog('crossroad_option');
};

const buttons = computed(() => [
  {
    label: 'Добавить ответ',
    action: addMessage,
    icon: 'add',
    color: 'primary',
    condition: !withoutCrossroad.value,
  },
  {
    label: 'Сделать стартовым',
    action: setStart,
    icon: 'flag',
    color: 'positive',
    condition: !start.value,
  },
  {
    label: 'Изменить',
    action: openSetting,
    icon: 'edit',
    color: 'warning',
    condition: true,
  },
  {
    label: 'Удалить',
    action: deleteMessage,
    icon: 'close',
    color: 'red',
    condition: true,
  },
]);
</script>

<style scoped lang="scss"></style>
