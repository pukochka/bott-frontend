<template>
  <q-list separator dense v-for="(button, index) of buttons" :key="index">
    <q-item clickable v-close-popup="button.close" @click="button.action">
      <q-item-section avatar>
        <q-icon :name="button.icon" :color="button.color" size="22px" />
      </q-item-section>

      <q-item-section>{{ button.label }}</q-item-section>

      <q-inner-loading :showing="button.loading">
        <q-spinner size="20px" color="primary" />
      </q-inner-loading>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { fetchMessage } from '../../../api';
import { useDataStore } from '../../../stores/data/dataStore';
import { useVectorStore } from '../../../stores/vector/vectorStore';
import { defaultMessage } from 'src/utils/helpers/defaults';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const data = useDataStore();
const vector = useVectorStore();

const loading = ref(false);

const editCombine = (ev: MouseEvent) => {
  if (data.selectedMessage === null) return;

  const line = vector.combineLines.find(
    (item) => item.id === data.selectedMessage?.id
  );

  vector.editCombine = line ? [line.id, line.endId ?? ''] : null;

  if (vector.editCombine)
    vector.startCombine(ev, data.selectedMessage?.id || 0);
};

const deleteCombine = () => {
  loading.value = true;
  const message = data.selectedMessage || defaultMessage;

  fetchMessage(
    'drop-next-message',
    {
      message_id: data.selectedMessage?.id || 0,
    },
    () => {
      message.nextMessage = null;
      vector.combineLines = vector.combineLines.filter(
        (item) => item.id !== message.id
      );
    }
  ).then(() => {
    emit('close');
    loading.value = false;
  });
};

const buttons = computed(() => [
  {
    label: 'Изменить\nсовместимость',
    color: 'primary',
    icon: 'edit',
    loading: false,
    close: true,
    action: editCombine,
  },
  {
    label: 'Удалить',
    color: 'red',
    icon: 'delete',
    loading: loading.value,
    close: false,
    action: deleteCombine,
  },
]);
</script>

<style scoped lang="scss"></style>
