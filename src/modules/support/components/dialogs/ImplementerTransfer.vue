<template>
  <q-dialog
    persistent
    position="bottom"
    v-model="support.dialogs.implementor_transfer"
    @before-show="updateShow"
  >
    <q-card flat bordered style="width: 100%" class="dialog-rounded">
      <dialog-header label="Выбор другого исполнителя"></dialog-header>

      <q-card-section class="q-pt-none" style="min-height: 200px">
        <q-list separator bordered class="rounded overflow-hidden">
          <q-item
            clickable
            tag="label"
            v-for="implementer of support.implementers"
            :key="implementer.id"
          >
            <q-item-section class="text-body1">
              <div v-html="implementer.user.link"></div>
            </q-item-section>

            <q-item-section side>
              <q-radio
                v-model="selected"
                :val="implementer.user.id"
                @update:model-value="selected = implementer.user.id"
                color="primary"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <q-inner-loading :showing="loading.start">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading>
      </q-card-section>

      <q-card-section class="row justify-end q-gutter-x-sm q-pt-none">
        <q-btn
          no-caps
          flat
          size="md"
          class="rounded"
          color="primary"
          label="Закрыть"
          v-close-popup
        />

        <q-btn
          no-caps
          unelevated
          size="md"
          class="rounded"
          color="primary"
          label="Передать"
          :loading="loading.transfer"
          :disable="selected === 0"
          @click="transferTicket"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { config } from '../../config';
import { ref } from 'vue';
import { useSupportStore } from '../../stores/supportStore';

import { fetchSupportImplementer, fetchSupportTicket } from '../../api/queries';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const support = useSupportStore();

const loading = ref({
  start: false,
  transfer: false,
});
const selected = ref(0);

const transferTicket = () => {
  loading.value.transfer = true;
  fetchSupportTicket('change-manager', {
    changing_id: config.user_id,
    ticket_id: support.selectedTicket?.id ?? -1,
    manager_id: selected.value,
  }).then(() => {
    support.updateCategory(support.selectedCategory?.id ?? -1).then(() => {
      loading.value.transfer = false;
      support.closeDialog('implementor_transfer');
    });
  });
};

const updateShow = () => {
  selected.value = 0;
  loading.value.start = true;

  fetchSupportImplementer('index', {
    category_id: support.selectedCategory?.id ?? -1,
    limit: 25,
    offset: 0,
  }).then(() => (loading.value.start = false));
};
</script>

<style scoped lang="scss"></style>
