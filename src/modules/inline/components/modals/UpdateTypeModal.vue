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
        <update-type-list
          :message="inline.message"
          @select="update"
        ></update-type-list>
      </q-card-section>

      <q-card-section
        class="row justify-end q-gutter-x-sm q-pt-none"
        v-if="visible"
      >
        <q-btn
          class="rounded"
          flat
          no-caps
          size="md"
          color="primary"
          label="Закрыть"
          v-close-popup
        />

        <q-btn
          class="rounded"
          unelevated
          no-caps
          size="md"
          color="primary"
          label="Сохранить"
          :loading="loading"
          @click="updateType"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useInlineStore } from '../../stores/inlineStore';
import { fetchMessage, fetchSettings } from '../../api/queries';
import { historyGo } from 'src/utils/helpers/string';

import UpdateTypeList from 'src/components/meta/UpdateTypeList.vue';

const inline = useInlineStore();

const selected = ref(0);
const loading = ref(false);

const visible = computed(
  () => Object.values(inline.message.support_types || {}).length
);

const closeDialog = () => {
  loading.value = false;
  inline.closeDialog('edit_type_message');
};

const updateType = () => {
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
          `/lk/common/messages/feedback/view?bot_id=${inline.bot_id}&id=${inline.message.id}`
        );

        return;
      }

      Object.assign(inline.message, response);

      fetchSettings('settings', inline.message.id).then(() => closeDialog());
    }
  );
};

const update = (value: number) => (selected.value = value);

const updateShow = () => {
  selected.value = inline.message.type.id;
};
</script>

<style scoped lang="scss"></style>
