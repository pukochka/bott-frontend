<template>
  <q-list separator>
    <q-item
      dense
      clickable
      v-close-popup="button.close"
      class="row items-center"
      v-show="button.condition"
      v-for="(button, index) in buttons"
      :key="index"
      @click="button.action"
    >
      <q-icon :name="button.icon" :color="button.color" size="22px" />

      <div
        class="text-center q-ml-md flex-grow transition"
        :class="[button.loading ? ' text-transparent' : '']"
      >
        {{ button.label }}
      </div>

      <q-inner-loading :showing="button.loading">
        <q-spinner size="20px" color="primary" />
      </q-inner-loading>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { fetchButtons } from '../../../api';
import { update, useVectorStore } from '../../../stores/vector/vectorStore';
import { useStatesStore } from '../../../stores/states/statesStore';
import { useDataStore } from '../../../stores/data/dataStore';

import { defaultMessage, defaultButton } from 'src/utils/helpers/defaults';

const props = withDefaults(defineProps<ButtonMenuListProps>(), {
  button: () => defaultButton,
  message: () => defaultMessage,
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const vector = useVectorStore();
const states = useStatesStore();
const data = useDataStore();

const loading = ref({
  delete: false,
  disable: false,
});

const select = () => {
  data.selectedButton = props.button;
  data.selectedMessage = props.message;
};

const start = (ev: MouseEvent) => {
  select();
  vector.startMove(ev, props.message?.id || 0, props.button?.id || 0);
};

const deleteButton = () => {
  loading.value.delete = true;
  const message = data.selectedMessage || defaultMessage;

  fetchButtons('delete-button', { id: props.button?.id || 0 }, (response) => {
    message.menu = response.data.data;

    vector.deleteConnection('button_id', props.button?.id || 0);
  }).then(() => {
    emit('close');
    loading.value.delete = false;
  });
};

const disableButton = () => {
  loading.value.disable = true;

  fetchButtons(
    'update-data-and-type',
    {
      id: props.button?.id || 0,
      action: 'free',
      type: 6,
      text: props.button?.text || '',
    },
    (response) => {
      data.scenarioValue = response.data.data;

      vector.deleteConnection('button_id', props.button?.id || 0);
    }
  ).then(() => {
    emit('close');
    loading.value.disable = false;
  });
};

const buttons = computed(() => [
  {
    label: 'Изменить кнопку',
    icon: 'edit',
    color: 'primary',
    loading: false,
    close: true,
    condition: true,
    action: () => states.openDialog('edit_button'),
  },
  {
    label: 'Добавить связь',
    icon: 'lan',
    color: 'primary',
    loading: false,
    close: true,
    condition: props.button?.type !== 5,
    action(e: any) {
      start(e);
    },
  },
  {
    label: 'Изменить связь',
    icon: 'lan',
    color: 'primary',
    loading: false,
    close: true,
    condition: props.button?.type === 5,
    action(e: any) {
      const line = vector.linesValue.find(
        (item) => item.button_id === props.button?.id
      );

      vector.editConnection = line ? [line.message_id, line.button_id] : null;

      start(e);
    },
  },
  {
    label: 'Сделать неактивной',
    icon: 'close',
    color: 'orange',
    close: false,
    loading: loading.value.disable,
    condition: props.button?.type !== 6,
    action: disableButton,
  },
  {
    label: 'Удалить',
    icon: 'delete',
    color: 'red',
    close: false,
    loading: loading.value.delete,
    condition: true,
    action: deleteButton,
  },
]);

interface ButtonMenuListProps {
  message: MessageFree | null;
  button: IMButton | null;
}
</script>

<style lang="scss" scoped></style>
