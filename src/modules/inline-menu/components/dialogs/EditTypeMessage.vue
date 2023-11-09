<template>
  <q-dialog
    persistent
    position="bottom"
    @before-show="updateShow"
    v-model="inline.dialogs.edit_type_message"
  >
    <q-card flat bordered style="width: 100%" class="dialog-rounded">
      <q-toolbar class="q-px-md">
        <q-toolbar-title>Изменение типа сообщения</q-toolbar-title>

        <q-btn
          flat
          round
          dense
          size="md"
          color="primary"
          icon="close"
          v-close-popup
        />
      </q-toolbar>

      <q-card-section
        class="q-pt-none relative-position"
        style="min-height: 200px"
      >
        <edit-type
          v-if="types.length"
          @select="update"
          :types="types"
          :token="config.bot.token"
          :bot_id="config.bot.id"
          :host="config.host"
          :type="selected"
        ></edit-type>

        <div class="text-h6 text-center text-red absolute-center" v-else>
          В данном сообщении нельзя изменить тип
        </div>
      </q-card-section>

      <q-card-section
        class="row justify-end q-gutter-x-sm q-pt-none"
        v-if="types.length"
      >
        <q-btn
          class="rounded"
          flat
          no-caps
          size="md"
          color="red"
          label="Отмена"
          v-close-popup
        />

        <q-btn
          class="rounded"
          unelevated
          no-caps
          size="md"
          color="primary"
          label="Сохранить"
          @click="editTypeMessage"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import config from '../../config';
import { computed, ref } from 'vue';

import { useInlineStore } from '../../stores/inlineStore';
import { fetchMessage, fetchSettings } from '../../api/queries';

import EditType from '../settings/EditType.vue';
import { historyGo } from '../../stores/helpers';

const inline = useInlineStore();

const selected = ref(0);
const loading = ref(false);

const types = computed(() =>
  Object.entries(inline.message.support_types).map(([_, value]) => value)
);

const editTypeMessage = () => {
  loading.value = true;

  fetchMessage(
    'update-type',
    {
      message_id: inline.message.id,
      type: selected.value,
    },
    (response) => {
      if (selected.value === 2) {
        historyGo(
          `/lk/common/messages/feedback/view?bot_id=${config.bot.id}&id=${inline.message.id}`
        );

        return;
      }

      inline.message = response;

      fetchSettings('settings', inline.message.id).then(() => {
        loading.value = false;
        inline.closeDialog('edit_type_message');
      });
    }
  );
};

const update = (value: number) => (selected.value = value);

const updateShow = () => {
  selected.value = inline.message.type.id;
};
</script>

<style scoped lang="scss"></style>
