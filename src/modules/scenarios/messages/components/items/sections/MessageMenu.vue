<template>
  <q-btn
    flat
    size="12px"
    padding="2px"
    class="rounded"
    icon="more_vert"
    color="primary"
    @click="data.selectedMessage = props.message">
    <q-tooltip class="rounded" anchor="top middle" self="bottom middle">
      Настройки сообщения
    </q-tooltip>

    <q-menu
      anchor="bottom right"
      self="top right"
      class="rounded bott-portal-menu"
      v-model="menu_state">
      <q-list separator>
        <q-item
          dense
          clickable
          class="row items-center"
          v-for="(button, index) in menuButtons"
          :key="index"
          v-close-popup="button.close"
          v-show="button.condition"
          @click="button.action">
          <q-icon :name="button.icon" :color="button.color" size="22px" />

          <div class="text-center q-ml-md flex-grow">{{ button.label }}</div>

          <transition name="fade">
            <div class="absolute-full flex flex-center" v-if="button.loading">
              <q-spinner color="primary" size="26px" />
            </div>
          </transition>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';

import { fetchMessage, fetchCommands } from '../../../api';

import { useDataStore } from '../../../stores/data/dataStore';
import { useStatesStore } from '../../../stores/states/statesStore';

import { defaultMessage } from '../../../stores/defaults';

const props = withDefaults(defineProps<MessageMenuProps>(), {
  message: () => defaultMessage,
});

const data = useDataStore();
const states = useStatesStore();

const menu_state = ref(false);
const loading = ref({
  delete: false,
  start: false,
  copy: false,
});

const setActive = () => {
  loading.value.start = true;
  let message = props.message;

  fetchCommands(
    'set-active',
    {
      message_id: props.message.id,
      route_id: data.scenarioValue?.id ?? 0,
    },
    () => {
      data.updateActive();

      message!.active = true;
    }
  ).then(() => {
    loading.value.start = false;
    menu_state.value = false;
  });
};

const changeType = () => {
  data.selectedMessage = props.message;
  states.openDialog('change_type');
};

const copyMessage = () => {
  loading.value.copy = true;

  fetchMessage('duplicate', { message_id: props.message.id }).then(() => {
    menu_state.value = false;
    loading.value.copy = false;
  });
};

const deleteMessage = () => {
  loading.value.delete = true;

  fetchMessage('delete', { message_id: props.message.id }).then(
    () => (loading.value.delete = false)
  );
};

const menuButtons = computed(() => [
  {
    label: 'Изменить тип',
    icon: 'edit',
    color: 'primary',
    close: true,
    loading: false,
    condition: true,
    action: () => changeType(),
  },
  {
    label: 'Дублировать',
    icon: 'content_copy',
    color: 'primary',
    close: false,
    loading: loading.value.copy,
    condition: !props.message.active && props.message.is_duplicate,
    action: () => copyMessage(),
  },
  {
    label: 'Сделать начальным',
    icon: 'looks_one',
    color: 'primary',
    close: false,
    loading: loading.value.start,
    condition: !props.message.active,
    action: () => setActive(),
  },
  {
    label: 'Удалить',
    icon: 'delete',
    color: 'red',
    close: false,
    loading: loading.value.delete,
    condition: !props.message.active,
    action: () => deleteMessage(),
  },
]);

interface MessageMenuProps {
  message: MessageFree;
}
</script>
