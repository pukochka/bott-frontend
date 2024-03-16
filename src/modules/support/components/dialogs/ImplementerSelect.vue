<template>
  <q-dialog
    persistent
    position="bottom"
    v-model="support.dialogs.select_implementer"
    @before-show="updateShow"
  >
    <q-card flat bordered class="dialog-rounded" style="width: 100%">
      <dialog-header
        label="Выберите исполнителя для переноса тикетов"
      ></dialog-header>

      <q-card-section class="q-pt-none" style="min-height: 200px">
        <div class="text-center" v-if="!implementers.length && !loading.start">
          У категории нет подходящих исполнителей...
        </div>

        <q-list separator bordered class="rounded overflow-hidden" v-else>
          <q-item
            clickable
            tag="label"
            v-for="implementer of implementers"
            :key="implementer.id"
          >
            <q-item-section>
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

        <q-inner-loading :showing="loading.start" transition-show="none">
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
          :loading="loading.confirm"
          @click="confirmOffer"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { config } from '../../config';
import { computed, ref } from 'vue';

import { useSupportStore } from '../../stores/supportStore';
import { fetchSupportImplementer, fetchSupportTicket } from '../../api/queries';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const support = useSupportStore();

const loading = ref({
  start: false,
  confirm: false,
});
const selected = ref(0);

const implementers = computed(() =>
  support.implementers.filter((item) => item.status !== 0)
);

const confirmOffer = () => {
  loading.value.confirm = true;

  fetchSupportTicket('mass-transfer', {
    implementer_id: selected.value,
    category_id: support.selectedCategory?.id ?? -1,
    changing_id: config.user_id,
  }).then(() => {
    loading.value.confirm = false;
    support.closeDialog('select_implementer');
  });
};

const updateShow = () => {
  loading.value.start = true;
  selected.value = 0;

  fetchSupportImplementer('index', {
    category_id: support.selectedCategory?.id ?? -1,
    offset: 0,
    limit: 25,
  }).then(() => (loading.value.start = false));
};
</script>

<style scoped lang="scss"></style>
