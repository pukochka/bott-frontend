<template>
  <q-list separator>
    <q-item
      dense
      clickable
      v-close-popup
      class="row items-center"
      v-show="button.condition"
      v-for="(button, index) in menuButtons"
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

      <transition name="fade">
        <div class="absolute-full flex flex-center" v-if="button.loading">
          <q-spinner color="primary" size="26px" />
        </div>
      </transition>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { fetchButtons } from '../../../api';
import { useVectorStore } from '../../../stores/vector/vectorStore';
import { useStatesStore } from '../../../stores/states/statesStore';
import { useDataStore } from '../../../stores/data/dataStore';

import { defaultButton, defaultMessage } from '../../../stores/deafults';

const props = withDefaults(defineProps<ButtonMenuListProps>(), {
  button: () => defaultButton,
  message: () => defaultMessage,
});

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

const startLine = (e: MouseEvent) => {
  vector.startMove(e, props.message.id, props.button.id);

  select();
};

const deleteButton = () => {
  loading.value.delete = true;
  const message = data.selectedMessage;

  fetchButtons('delete-button', { id: props.button.id }, (response) => {
    message!.menu = response.data.data;

    vector.deleteConnection('button_id', props.button.id);
    setTimeout(vector.updateConnections, 10);
  }).then(() => {
    loading.value.delete = false;
  });
};

const disableButton = () => {
  loading.value.disable = true;

  fetchButtons(
    'update-data-and-type',
    {
      id: props.button.id,
      action: 'free',
      type: 6,
      text: props.button.text,
    },
    (response) => {
      data.scenarioValue = response.data.data;

      vector.deleteConnection('button_id', props.button.id);
      setTimeout(vector.updateConnections, 10);
    }
  ).then(() => {
    loading.value.disable = false;
  });
};

const menuButtons = computed(() => [
  {
    label: 'Изменить кнопку',
    icon: 'edit',
    color: 'primary',
    loading: false,
    condition: true,
    action: () => states.openDialog('edit_button'),
  },
  {
    label: 'Добавить связь',
    icon: 'lan',
    color: 'primary',
    loading: false,
    condition: props.button?.type === 6,
    action(e: any) {
      startLine(e);
    },
  },
  {
    label: 'Изменить связь',
    icon: 'lan',
    color: 'primary',
    loading: false,
    condition: props.button?.type === 5,
    action(e: any) {
      startLine(e);
    },
  },
  {
    label: 'Сделать неактивной',
    icon: 'close',
    color: 'orange',
    loading: loading.value.disable,
    condition: props.button?.type !== 6,
    action: () => disableButton(),
  },
  {
    label: 'Удалить',
    icon: 'delete',
    color: 'red',
    loading: loading.value.delete,
    condition: true,
    action: () => deleteButton(),
  },
]);

interface ButtonMenuListProps {
  message: MessageFree;
  button: IMButton;
}
</script>

<style lang="scss" scoped></style>
