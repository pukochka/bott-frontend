<template>
  <q-dialog
    persistent
    full-width
    position="bottom"
    @before-show="update"
    v-model="states.dialogs.edit_text_message"
  >
    <div class="row justify-center">
      <q-card flat bordered class="dialog-rounded bott-dialog__responsive">
        <dialog-header :label="t('edit-message-text')"></dialog-header>

        <q-card-section class="q-pt-none">
          <editor-content
            :id="config.bot.id"
            :message_id="data.selectedMessage?.id ?? 0"
            :content="text"
            :max-value="max_value"
            @update="updateText"
          ></editor-content>
        </q-card-section>

        <q-card-section class="q-pt-none row justify-end q-gutter-sm">
          <q-btn
            flat
            no-caps
            class="rounded"
            size="md"
            :label="t('button-close')"
            color="primary"
            v-close-popup
          />
          <q-btn
            no-caps
            unelevated
            class="rounded"
            size="md"
            :label="t('button-save')"
            color="primary"
            :loading="loading"
            @click="saveText"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>
<script lang="ts" setup>
import config from '../../../../config';

import { ref } from 'vue';

import { t } from 'src/boot/lang';
import { fetchMessage } from '../../../api';

import { useStatesStore } from '../../../stores/states/statesStore';
import { useDataStore } from '../../../stores/data/dataStore';

import EditorContent from 'src/components/editor/EditorContent.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import { encodeText } from '../../../../../inline-menu/stores/helpers';

const states = useStatesStore();
const data = useDataStore();
const loading = ref(false);
const max_value = ref(1024);

const text = ref('');

const updateText = (value: string) => {
  text.value = value;
};

const saveText = () => {
  loading.value = true;
  let message = data.selectedMessage;

  fetchMessage(
    'update-text',
    {
      message_id: data.selectedMessage?.id ?? 0,
      text: encodeText(text.value),
    },
    () => {
      message!.text.content = text.value;
    }
  ).then(() => {
    loading.value = false;
    states.closeDialog('edit_text_message');
  });
};

const update = () => {
  text.value = data.selectedMessage?.text?.content ?? '';
  max_value.value = data.selectedMessage?.text?.length ?? 0;
};
</script>
