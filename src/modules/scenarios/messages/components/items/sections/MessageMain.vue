<template>
  <div class="row">
    <q-btn
      flat
      no-caps
      color="primary"
      :href="message?.link"
      :label="messageText.button"
      class="col rounded"
    />
  </div>

  <div
    class="rounded bordered q-pa-sm overflow-hidden"
    v-if="message.type.id !== 2"
    style="max-height: 77px"
  >
    <div class="row items-center q-pb-sm">
      <div class="row items-center">
        <q-icon color="primary" name="text_fields" size="20px" />

        <div class="q-ml-sm bott-title__params">{{ messageText.label }}</div>
      </div>

      <q-space />

      <q-btn
        flat
        dense
        padding="4px"
        class="rounded"
        color="primary"
        icon="edit_note"
        @click="editText"
      >
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          {{ t('edit-text') }}
        </q-tooltip>
      </q-btn>
    </div>

    <div class="ellipsis bott-title__params">
      <div class="editor-text" v-html="message?.text?.content"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { t } from 'src/boot/lang';
import { useStatesStore } from '../../../stores/states/statesStore';
import { useDataStore } from '../../../stores/data/dataStore';

import { defaultMessage } from '../../../stores/deafults';

const props = withDefaults(defineProps<MessageMainProps>(), {
  message: () => defaultMessage,
});

const states = useStatesStore();
const data = useDataStore();

const messageText = computed(() => text[props.message?.type.id ?? 0]);

const editText = () => {
  data.selectedMessage = props.message;

  states.openDialog('edit_text_message');
};

const text: Record<number, { button: string; label: string }> = {
  0: {
    button: t('edit-message-text'),
    label: t('text'),
  },
  1: {
    button: t('edit-image'),
    label: t('text-with-image'),
  },
  2: {
    button: t('edit-feedback'),
    label: t('text-with-feedback'),
  },
  3: {
    button: t('edit-file'),
    label: t('text-with-file'),
  },
  4: {
    button: t('edit-video'),
    label: t('text-with-video'),
  },
  5: {
    button: t('edit-animation'),
    label: t('text-with-animation'),
  },
};

interface MessageMainProps {
  message: SCMessage;
}
</script>

<style lang="scss" scoped></style>
