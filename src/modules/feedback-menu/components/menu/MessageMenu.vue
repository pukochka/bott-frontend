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
import { useDialog } from 'src/utils/use/useDialog';
import { mdiSourceBranchRemove } from '@quasar/extras/mdi-v7';

const feedback = useFeedbackStore();

const loading = ref({
  delete: false,
  start: false,
  between: false,
  next: false,
});

const start = computed(
  () =>
    feedback.feedback.start?.type === feedback.selectedMessage?.type &&
    feedback.feedback.start?.id === feedback.selectedMessage?.id
);

const withoutCrossroad = computed(() => feedback.selectedMessage?.type !== 4);
const withoutNext = computed(() => feedback.selectedMessage?.next);

const openSetting = () => {
  feedback.menu.message = false;

  feedback.closeDialog('touch');

  if (withoutCrossroad.value) {
    feedback.openDialog('message');

    return;
  }
  feedback.openDialog('crossroad');
};

const deleteMessage = () => {
  useDialog('Вы уверены, что хотите удалить вопрос?', true).onOk(() => {
    loading.value.delete = true;
    fetchFeedback('delete-input', {
      input_id: feedback.selectedMessage?.id ?? 0,
      type: feedback.selectedMessage?.type ?? 1,
    }).then(() => {
      feedback.menu.message = false;
      loading.value.delete = false;
      feedback.closeDialog('touch');
    });
  });
};

const deleteNext = () => {
  loading.value.next = true;
  fetchFeedback(
    'set-input-next',
    {
      input_id: feedback.selectedMessage?.id ?? 0,
      type: feedback.selectedMessage?.type ?? 1,
      next_id: null,
      next_type: null,
    },
    feedback.updateFeedback
  ).then(() => {
    feedback.menu.message = false;
    loading.value.next = false;
    feedback.closeDialog('touch');
  });
};

const setStart = () => {
  useDialog(
    'Вопрос станет начальным, всё, что будет до него не будет учитываться. Вы уверены, что хотите сделать вопрос начальным?',
    true
  ).onOk(() => {
    loading.value.start = true;
    fetchFeedback('set-start-input', {
      start_id: feedback.selectedMessage?.id ?? 0,
      start_type: feedback.selectedMessage?.type ?? 0,
    }).then(() => {
      feedback.menu.message = false;
      loading.value.start = false;
      feedback.closeDialog('touch');
    });
  });
};

const addMessage = () => {
  feedback.closeDialog('touch');

  feedback.action = () => {
    feedback.menu.message = false;
  };
  feedback.openDialog('crossroad_option');
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
    label: 'Удалить связь',
    action: deleteNext,
    icon: mdiSourceBranchRemove,
    color: 'red',
    condition: withoutNext.value,
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
