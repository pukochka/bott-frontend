<template>
  <div class="q-gutter-y-sm">
    <div class="" v-if="!inline.lines.length && inline.menu">
      <q-item-label header class="text-center q-mb-md">
        Кнопок пока нет
      </q-item-label>

      <div class="row justify-center">
        <q-btn
          no-caps
          unelevated
          class="rounded col-12 col-md-6"
          size="md"
          color="primary"
          label="Добавить кнопку"
          @click="addButton"
        />
      </div>
    </div>

    <div class="row q-col-gutter-sm" v-if="inline.lines.length">
      <div class="col-12 col-md-6">
        <q-btn
          no-caps
          unelevated
          class="rounded fit"
          size="md"
          color="primary"
          label="Добавить кнопку в новую линию"
          @click="addButton"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-btn
          no-caps
          unelevated
          class="rounded fit"
          size="md"
          color="primary"
          label="Расположение кнопок"
          @click="inline.openDialog('drag')"
        />
      </div>
    </div>

    <div class="row flex-center">
      <q-btn
        no-caps
        v-if="!inline.menu"
        unelevated
        class="col-12 col-md-6 rounded"
        size="md"
        color="green-7"
        icon="keyboard"
        label="Создать меню кнопок"
        :loading="loading.create"
        @click="createMenu"
      />

      <q-btn
        v-else
        no-caps
        unelevated
        class="col-12 col-md-6 rounded"
        size="md"
        color="red-7"
        icon="delete"
        label="Удалить меню"
        :loading="loading.delete"
        @click="badAction('delete')"
      />
    </div>

    <div class="row justify-center">
      <div class="col-8" v-if="inline.message.nextMessage">
        <q-card flat bordered class="rounded overflow-hidden">
          <q-banner inline-actions dense class="bg-primary text-white">
            <div class="text-center ellipsis">Совмещенное сообщение</div>
          </q-banner>

          <div class="row items-center no-wrap">
            <div class="text-weight-bold ellipsis q-pa-xs">
              {{ nextMessage.title }}
            </div>

            <q-space />

            <q-btn
              flat
              square
              color="red"
              :icon="mdiMessageMinus"
              :loading="loading.combine"
              @click="badAction('combine')"
            >
              <q-tooltip
                class="bott-tooltip text-center"
                anchor="top middle"
                self="bottom middle"
              >
                Удалить совместимость
              </q-tooltip>
            </q-btn>
          </div>

          <assigned-media scenarios :message="nextMessage"></assigned-media>

          <div
            v-if="nextMessage.type.id === 7"
            class="row justify-center items-center q-gutter-x-sm text-primary text-subtitle1 no-wrap q-pa-sm"
          >
            <q-icon :name="mdiTimerOutline" color="primary" size="28px" />

            <span>
              {{ formatted }}
            </span>
          </div>

          <div
            v-else
            v-html="nextMessageText"
            class="q-pa-xs ellipsis text-caption"
          ></div>
        </q-card>
      </div>

      <q-btn
        v-else
        no-caps
        unelevated
        class="col-12 col-md-6 rounded"
        size="md"
        color="positive"
        :icon="mdiMessagePlus"
        label="Совместить сообщение"
        :loading="loading.delete"
        @click="inline.openDialog('combine')"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useInlineStore } from '../stores/inlineStore';
import { fetchMessage } from '../api/queries';
import { useDialog } from 'src/utils/use/useDialog';
import { replaceUnsolvableTags } from 'src/utils/helpers/replace';
import { getFormattedTime } from 'src/utils/helpers/time';
import { defaultMessage } from 'src/utils/helpers/defaults';

import AssignedMedia from 'src/components/file-manager/AssignedMedia.vue';

import {
  mdiMessageMinus,
  mdiMessagePlus,
  mdiTimerOutline,
} from '@quasar/extras/mdi-v7';

const emit = defineEmits<{
  (e: 'drop-combine', id: number): void;
}>();

const inline = useInlineStore();

const loading = ref({
  delete: false,
  create: false,
  combine: false,
});
const actions = {
  delete: {
    text: 'Вы уверены, что хотите удалить меню?',
    method: 'delete-inline-menu',
  },
  combine: {
    text: 'Вы уверены, что хотите удалить совместимость?',
    method: 'drop-next-message',
  },
};

const nextMessage = computed(
  () => inline.message.nextMessage ?? defaultMessage
);

const nextMessageText = computed(() =>
  replaceUnsolvableTags(nextMessage.value.text)
);

const formatted = computed(() =>
  getFormattedTime(nextMessage.value.text, true, 'triple')
);

const createMenu = () => {
  loading.value.create = true;

  fetchMessage('add-inline-menu', { message_id: inline.message.id }).then(
    () => (loading.value.create = false)
  );
};

const badAction = (name: 'delete' | 'combine') => {
  const { text, method } = actions[name];

  useDialog(text, true).onOk(() => {
    loading.value[name] = true;

    fetchMessage(
      <keyof SCMessageQueries>method,
      {
        message_id: inline.message.id,
      },
      () => {
        if (method === 'drop-next-message')
          emit('drop-combine', inline.message.id);
      }
    ).then(() => (loading.value[name] = false));
  });
};

const addButton = () => {
  inline.selectedLine = null;

  inline.openDialog('add_button');
};
</script>
