<template>
  <q-dialog
    v-model="feedback.dialogs.api_edit"
    persistent
    position="bottom"
    @before-show="updateShow"
  >
    <q-card flat bordered class="dialog-rounded" style="width: 100%">
      <dialog-header label="Изменение интеграции"></dialog-header>

      <q-card-section class="q-pt-none q-gutter-y-sm">
        <div class="" v-for="(item, index) of inputs" :key="index">
          <div class="">{{ item.label }}</div>

          <q-input
            dense
            outlined
            placeholder="Введите..."
            class="bott-input--rounded"
            v-model="item.value"
          />
        </div>
      </q-card-section>

      <q-card-section class="row justify-end q-pt-none q-gutter-x-sm">
        <q-btn
          no-caps
          flat
          size="md"
          color="primary"
          label="Закрыть"
          class="rounded"
          v-close-popup
        />

        <q-btn
          no-caps
          flat
          size="md"
          color="primary"
          label="Сохранить"
          class="rounded"
          :loading="loading"
          @click="updateIntegration"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { config } from '../../../config';
import { ref } from 'vue';

import { fetchFeedbackIntegrations } from '../../../api/queries';
import { useFeedbackStore } from '../../../stores/feedbackStore';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const feedback = useFeedbackStore();

const loading = ref(false);

const updateIntegration = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const params: FIPublicPrivateParams = Object.fromEntries(
    inputs.value.map((item) => [item.key, item.value])
  );

  loading.value = true;

  fetchFeedbackIntegrations('update', {
    message_id: config.message_id,
    id: feedback.selectedIntegration?.id ?? -1,
    ...params,
  }).then(() => {
    feedback.updateIntegrations().then(() => (loading.value = false));
  });
};

const inputs = ref([
  {
    label: 'Поле public_key',
    value: '',
    key: 'public_key',
  },
  {
    label: 'Поле private_key',
    value: '',
    key: 'private_key',
  },
  {
    label: 'Поле private_key_2',
    value: '',
    key: 'private_key_2',
  },
]);

const updateShow = () => {
  inputs.value[0].value =
    feedback.selectedIntegration?.setting.public_key ?? '';
  inputs.value[1].value =
    feedback.selectedIntegration?.setting.private_key ?? '';
  inputs.value[2].value =
    feedback.selectedIntegration?.setting.private_key_2 ?? '';
};

interface FIPublicPrivateParams {
  public_key: string;
  private_key: string;
  private_key_2: string;
}
</script>

<style scoped lang="scss"></style>
