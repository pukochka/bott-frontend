<template>
  <div class="col-4">
    <div
      class="row justify-center items-center q-mb-sm relative-position"
      style="min-height: 28px"
    >
      <transition name="q-transition--fade">
        <div class="absolute-left row items-center" v-if="props.open || sm">
          <q-btn
            flat
            size="12px"
            padding="2px"
            color="primary"
            icon="help_center"
            class="rounded"
          >
            <q-menu
              v-model="info"
              @update:model-value="$emit('menu', info)"
              max-width="300px"
              class="bott-portal-menu"
            >
              <div class="q-pa-sm">{{ props.message.desc }}</div>
            </q-menu>
          </q-btn>
        </div>
      </transition>

      <div class="text-body2 text-center" style="max-width: 140px">
        {{ message.label }}
      </div>

      <transition name="q-transition--fade">
        <div
          class="absolute-right row items-center"
          v-if="(message.condition && props.open) || sm"
        >
          <q-btn
            flat
            size="12px"
            padding="2px"
            color="primary"
            icon="more_vert"
            class="rounded"
          >
            <q-menu
              v-model="menu"
              @update:model-value="$emit('menu', menu)"
              class="bott-portal-menu"
            >
              <message-menu
                @drop="messageAction('drop')"
                :message="props.message"
              ></message-menu>
            </q-menu>
          </q-btn>
        </div>
      </transition>
    </div>

    <q-card
      flat
      :bordered="props.bordered"
      class="my-card q-pa-xs rounded"
      v-if="message.condition"
    >
      <div class="ellipsis-3-lines text-caption word-break-all">
        {{ message.data.text }}
      </div>
    </q-card>

    <div class="" v-else>
      <div class="text-caption text-center q-pb-sm">Пока нет...</div>

      <div class="row justify-center">
        <q-btn
          flat
          padding="4px"
          size="11px"
          color="primary"
          icon="add_circle"
          class="rounded col-6"
          :loading="loading.add"
          @click="messageAction('add')"
        >
          <q-tooltip
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            Добавить
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { fetchFeedback } from '../../api/queries';
import { useFeedbackStore } from '../../stores/feedbackStore';
import { useDialog } from '../../../file-manager/stores/useDialog';

import { defaultMessage } from '../../../scenarios/messages/stores/defaults';

import MessageMenu from './MessageMenu.vue';
import { useQuasar } from 'quasar';

const props = withDefaults(defineProps<MessageCardProps>(), {
  open: false,
  bordered: false,
  message: () => {
    return {
      data: defaultMessage,
      label: '',
      condition: false,
      method: 'hello',
      desc: '',
    };
  },
});

const store = useFeedbackStore();
const quasar = useQuasar();

const menu = ref(false);
const info = ref(false);
const loading = ref({
  add: false,
  drop: false,
});

const sm = computed(() => quasar.screen.lt.sm);

const messageAction = (prefix: 'add' | 'drop') => {
  loading.value[prefix] = true;

  const action = () =>
    fetchFeedback(
      `${prefix}-${<'hello'>props.message.method}`,
      undefined,
      (response) => {
        store._feedback = response.feedback;
      }
    ).then(() => {
      loading.value[prefix] = false;
    });

  if (prefix === 'drop') {
    useDialog(
      `Вы уверены, что хотите удалить <b>${props.message.label}</b>?`,
      true
    ).onOk(action);

    return;
  }

  action();
};

interface MessageCardProps {
  open: boolean;
  bordered: boolean;
  message: {
    data: MessageFree;
    label: string;
    condition: boolean;
    method: 'hello';
    desc: string;
  };
}
</script>

<style scoped lang="scss">
.word-break-all {
  word-break: break-all;
}
</style>
