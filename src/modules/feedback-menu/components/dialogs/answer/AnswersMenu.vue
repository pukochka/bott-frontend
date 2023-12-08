<template>
  <q-menu class="bott-portal-menu">
    <q-list dense>
      <q-item
        clickable
        v-for="(button, index) of actions"
        :key="index"
        @click="button.action"
      >
        <q-item-section avatar>
          <q-icon :name="button.icon" :color="button.color" size="22px" />
        </q-item-section>

        <q-item-section>{{ button.label }}</q-item-section>
      </q-item>

      <q-inner-loading :showing="loading">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </q-list>
  </q-menu>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { fetchFeedbackAnswer } from '../../../api/queries';
import { useDialog } from '../../../../file-manager/stores/useDialog';

const loading = ref(false);

const readAllAnswers = () => {
  loading.value = true;

  fetchFeedbackAnswer('read-all').then(() => {
    loading.value = false;
  });
};

const deleteAllUnfinished = () => {
  useDialog(
    'Вы уверены, что хотите удалить все незавершенные ответы?',
    true
  ).onOk(() => {
    loading.value = true;

    fetchFeedbackAnswer('delete-by-status', { status: 1 }).then(() => {
      loading.value = false;
    });
  });
};

const deleteAllAnswers = () => {
  useDialog('Вы уверены, что хотите удалить все ответы?', true).onOk(() => {
    loading.value = true;

    fetchFeedbackAnswer('delete-by-status').then(() => {
      loading.value = false;
    });
  });
};

const actions = computed(() => [
  {
    label: 'Отметить все прочитанными',
    icon: 'done_all',
    color: 'positive',
    action: readAllAnswers,
  },
  {
    label: 'Удалить все незавершенные',
    icon: 'playlist_remove',
    color: 'warning',
    action: deleteAllUnfinished,
  },
  {
    label: 'Удалить все ответы',
    icon: 'remove_done',
    color: 'red',
    action: deleteAllAnswers,
  },
]);
</script>

<style scoped lang="scss"></style>
