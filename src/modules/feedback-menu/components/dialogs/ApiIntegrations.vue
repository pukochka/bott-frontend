<template>
  <q-dialog
    v-model="feedback.dialogs.api"
    persistent
    position="bottom"
    @before-show="updateShow"
  >
    <q-card flat bordered class="dialog-rounded" style="width: 100%">
      <dialog-header
        :label="'Интеграции ' + feedback.countIntegrations"
      ></dialog-header>

      <q-card-section
        class="q-pt-none relative-position"
        style="min-height: 200px"
      >
        <div class="">
          <div class="text-subtitle1 q-py-sm">Настроенные интеграции</div>

          <q-list
            bordered
            separator
            class="rounded overflow-hidden"
            v-if="feedback.indexIntegrations.length"
          >
            <integration-index-item
              v-for="item of feedback.indexIntegrations"
              :key="item.id"
              :item="item"
            ></integration-index-item>
          </q-list>

          <div class="text-center q-py-md" v-else>
            Пока нет настроенных интеграций...
          </div>
        </div>

        <div class="">
          <div class="text-subtitle1 q-py-sm">
            Доступные интеграции для добавления
          </div>

          <q-list
            bordered
            separator
            class="rounded overflow-hidden"
            v-if="feedback.accessIntegrations.length"
          >
            <integration-access-item
              v-for="item of feedback.accessIntegrations"
              :key="item.id"
              :item="item"
            ></integration-access-item>
          </q-list>

          <div class="text-center q-py-md" v-else>
            Нет интеграций для добавления
          </div>
        </div>

        <q-inner-loading :showing="loading" class="bg-white">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading>
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
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useFeedbackStore } from '../../stores/feedbackStore';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import IntegrationAccessItem from './integrations/IntegrationAccessItem.vue';
import IntegrationIndexItem from './integrations/IntegrationIndexItem.vue';

const feedback = useFeedbackStore();

const loading = ref(true);

const updateShow = () => {
  loading.value = true;

  feedback.updateIntegrations().then(() => {
    loading.value = false;
  });
};
</script>

<style scoped lang="scss"></style>
