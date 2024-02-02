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
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFeedbackStore } from '../../stores/feedbackStore';
import { fetchFeedback } from '../../api/queries';

import { mdiMessagePlus, mdiSourceBranchRemove } from '@quasar/extras/mdi-v7';
import TypesQuestionList from '../views/TypesQuestionList.vue';

const feedback = useFeedbackStore();

const loading = ref({
  delete: false,
  before: false,
});

const addBeforeMessage = (type: number) => {
  loading.value.before = true;

  const pos_x = feedback.selectedMessageNext?.platform?.position.x ?? 0;
  const pos_y = feedback.selectedMessageNext?.platform?.position.y ?? 0;

  fetchFeedback(
    'set-input-position',
    {
      input_id: feedback.selectedMessageNext?.id ?? 0,
      type: feedback.selectedMessageNext?.type ?? 1,
      x: pos_x + 300,
      y: pos_y,
    },
    () => {
      fetchFeedback(
        'create-input-before',
        {
          before_id: feedback.selectedMessageNext?.id ?? 0,
          before_type: feedback.selectedMessageNext?.type ?? 1,
          pos_x,
          pos_y,
          type: type,
        },
        feedback.updateQuestion
      ).then(() => {
        feedback.menu.link = false;
        loading.value.before = false;
        feedback.closeDialog('touch');
      });
    }
  );
};

const deleteNext = () => {
  loading.value.delete = true;

  if (feedback.selectedMessage?.type !== 4) {
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
      feedback.menu.link = false;
      loading.value.delete = false;
      feedback.closeDialog('touch');
    });

    return;
  }

  fetchFeedback('delete-crossroad-option', {
    input_id: feedback.selectedMessage?.id ?? 0,
    option_id: feedback.selectedOption?.id ?? 0,
  }).then(() => {
    feedback.menu.link = false;
    loading.value.delete = false;
    feedback.closeDialog('touch');
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
    condition: feedback.selectedMessage?.type === 4,
    action: () => feedback.openDialog('crossroad'),
  },
  {
    label: 'Удалить связь',
    icon: mdiSourceBranchRemove,
    color: 'red',
    condition: true,
    action: deleteNext,
  },
]);
</script>

<style scoped lang="scss"></style>
