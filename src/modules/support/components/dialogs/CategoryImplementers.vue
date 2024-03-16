<template>
  <q-dialog
    persistent
    position="bottom"
    v-model="support.dialogs.category_implementers"
    @before-show="updateShow"
  >
    <q-card bordered flat style="width: 100%" class="dialog-rounded">
      <dialog-header label="Исполнители категории"></dialog-header>

      <q-card-section>
        <div class="row q-pb-md">
          <q-btn
            no-caps
            unelevated
            size="md"
            color="primary"
            icon="add"
            class="rounded col"
            label="Добавить исполнителя"
            :loading="loading.add"
          >
            <user-search
              :bot_id="config.bot.id"
              :token="config.bot.token"
              @select="addImplementer"
            ></user-search>
          </q-btn>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-scroll-area style="height: 350px; width: 100%">
          <q-list separator dense class="overflow-hidden">
            <div
              class="text-center q-pa-sm"
              v-if="!support.implementers.length"
            >
              У категории нет исполнителей...
            </div>

            <implementor-item
              v-for="implementer in support.implementers"
              :key="implementer.id"
              :implementer="implementer"
            ></implementor-item>
          </q-list>
        </q-scroll-area>

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
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { config } from '../../config';
import { ref } from 'vue';
import { useSupportStore } from '../../stores/supportStore';

import { fetchSupportImplementer } from '../../api/queries';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import ImplementorItem from '../items/ImplementorItem.vue';
import UserSearch from 'src/components/search/UserSearch.vue';

const support = useSupportStore();
const loading = ref({
  start: false,
  add: false,
});

const addImplementer = (id: string) => {
  loading.value.add = true;

  fetchSupportImplementer(
    'create',
    {
      category_id: support.selectedCategory?.id ?? -1,
      user_id: Number(id),
    },
    (response) => {
      support.implementers = response;
    }
  ).then(() => (loading.value.add = false));
};

const updateShow = () => {
  loading.value.start = true;

  fetchSupportImplementer('index', {
    category_id: support.selectedCategory?.id ?? -1,
    offset: 0,
    limit: 25,
  }).then(() => {
    loading.value.start = false;
  });
};
</script>

<style scoped lang="scss"></style>
