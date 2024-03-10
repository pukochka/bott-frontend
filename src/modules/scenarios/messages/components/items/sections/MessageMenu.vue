<template>
  <q-btn
    flat
    size="12px"
    padding="2px"
    class="rounded"
    icon="more_vert"
    color="primary"
    @click="data.selectedMessage = props.message"
  >
    <q-tooltip class="rounded" anchor="top middle" self="bottom middle">
      Настройки сообщения
    </q-tooltip>

    <q-menu
      v-model="menu"
      anchor="bottom right"
      self="top right"
      class="bott-portal-menu non-selectable"
      max-width="220px"
    >
      <q-list dense separator>
        <q-item
          clickable
          class="row items-center"
          v-for="(button, index) in menuButtons"
          :key="index"
          v-close-popup="button.close"
          v-show="button.condition"
          @click="button.action"
        >
          <q-item-section avatar>
            <q-icon :name="button.icon" :color="button.color" size="22px" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              {{ button.label }}
            </q-item-label>
          </q-item-section>

          <q-inner-loading :showing="button.loading">
            <q-spinner size="20px" color="primary" />
          </q-inner-loading>

          <q-menu
            v-model="subMenu"
            v-if="button.sub"
            anchor="top end"
            self="top start"
            class="bott-portal-menu non-selectable"
          >
            <q-list dense separator>
              <q-item
                clickable
                v-for="(sub, index) in button.sub"
                :key="index"
                @click="sub.action"
              >
                <q-item-section avatar>
                  <q-icon :name="sub.icon" :color="sub.color" size="22px" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    {{ sub.label }}
                  </q-item-label>
                </q-item-section>

                <q-inner-loading :showing="sub.loading">
                  <q-spinner size="20px" color="primary" />
                </q-inner-loading>
              </q-item>
            </q-list>
          </q-menu>
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
import { useVectorStore } from '../../../stores/vector/vectorStore';

import { defaultMessage } from '../../../stores/defaults';

import { mdiMessagePlus, mdiMessageMinus } from '@quasar/extras/mdi-v7';
import { CombineLine } from '../../../stores/classes';

const props = withDefaults(defineProps<MessageMenuProps>(), {
  message: () => defaultMessage,
});

const data = useDataStore();
const states = useStatesStore();
const vector = useVectorStore();

const menu = ref(false);
const subMenu = ref(false);
const loading = ref({
  delete: false,
  start: false,
  copy: false,
  deleteCombine: false,
});

const editCombineMessage = (ev: MouseEvent) => {
  const line = vector.combineLines.find((item) => item.id === props.message.id);

  vector.editCombine = line ? [line.id, line.endId ?? ''] : null;

  if (vector.editCombine) combineMessage(ev);
};

const combineMessage = (ev: MouseEvent) => {
  menu.value = false;
  subMenu.value = false;
  vector.startCombine(ev, props.message.id);

  data.selectedMessage = props.message;
};

const deleteCombine = () => {
  loading.value.deleteCombine = true;
  const message = props.message;

  fetchMessage('drop-next-message', { message_id: props.message.id }, () => {
    message.nextMessage = null;
    subMenu.value = false;
    menu.value = false;
    loading.value.deleteCombine = false;

    vector.combineLines = vector.combineLines.filter(
      (item) => item.id !== props.message.id
    );
  });
};

const setActive = () => {
  loading.value.start = true;
  const message = props.message;

  fetchCommands(
    'set-active',
    {
      message_id: props.message.id,
      route_id: data.scenarioValue?.id ?? 0,
    },
    () => {
      data.updateActive();

      message.active = true;
    }
  ).then(() => {
    menu.value = false;
    loading.value.start = false;
  });
};

const changeType = () => {
  data.selectedMessage = props.message;
  states.openDialog('change_type');
};

const copyMessage = () => {
  loading.value.copy = true;

  fetchMessage('duplicate', { message_id: props.message.id }).then(() => {
    menu.value = false;
    loading.value.copy = false;
  });
};

const deleteMessage = () => {
  loading.value.delete = true;

  fetchMessage('delete', { message_id: props.message.id }).then(
    () => (loading.value.delete = false)
  );
};

const menuButtons = computed(
  (): Array<MenuItem> => [
    {
      label: 'Совместить сообщение',
      icon: mdiMessagePlus,
      color: 'positive',
      close: true,
      loading: false,
      condition: props.message.nextMessage === null,
      action: combineMessage,
    },
    {
      label: 'Сделать стартовым',
      icon: 'looks_one',
      color: 'primary',
      close: false,
      loading: loading.value.start,
      condition: !props.message.active,
      action: setActive,
    },
    {
      label: 'Дублировать',
      icon: 'content_copy',
      color: 'primary',
      close: false,
      loading: loading.value.copy,
      condition: !props.message.active && props.message.is_duplicate,
      action: copyMessage,
    },

    {
      label: 'Изменить тип',
      icon: 'edit',
      color: 'warning',
      close: true,
      loading: false,
      condition: true,
      action: changeType,
    },
    {
      label: 'Совместимость',
      icon: 'chevron_right',
      color: 'grey',
      close: false,
      loading: false,
      condition: props.message.nextMessage !== null,
      action: '',
      sub: [
        {
          label: 'Изменить',
          icon: 'edit',
          color: 'primary',
          loading: false,
          action: editCombineMessage,
        },
        {
          label: 'Удалить',
          icon: mdiMessageMinus,
          color: 'red',
          loading: loading.value.deleteCombine,
          action: deleteCombine,
        },
      ],
    },

    {
      label: 'Удалить',
      icon: 'delete',
      color: 'red',
      close: false,
      loading: loading.value.delete,
      condition: !props.message.active,
      action: deleteMessage,
    },
  ]
);

interface MessageMenuProps {
  message: MessageFree;
}

interface MenuItem {
  label: string;
  icon: string;
  color: string;
  close: boolean;
  loading: boolean;
  condition: boolean;
  action: ((ev: MouseEvent) => void) | string;
  sub?: Array<any>;
}
</script>
