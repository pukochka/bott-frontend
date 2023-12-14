<template>
  <q-dialog
    v-model="store.dialogs.notify"
    position="bottom"
    @before-show="updateShow"
  >
    <q-card flat bordered class="dialog-rounded" style="width: 100%">
      <dialog-header label="Настройки уведомлений"></dialog-header>

      <q-card-section class="q-py-none q-gutter-y-sm">
        <radio-item
          label="Отправка уведомлений"
          desc="Отправлять ли уведомления об ответах администраторам/ресурсам"
          :model="notice"
          @update="updateNotify"
        ></radio-item>

        <div class="">
          Администраторы/ресурсы которым отправляются уведомления
        </div>

        <div class="">
          <q-item v-if="!store.notifications.length">
            <q-item-section class="text-center">
              Пока нет администраторов/ресурсов
            </q-item-section>
          </q-item>

          <q-list
            dense
            bordered
            separator
            class="rounded overflow-hidden"
            v-else
          >
            <notify-item
              v-for="notify of store.notifications"
              :key="notify.id"
              :item="notify"
            ></notify-item>
          </q-list>

          <div class="row q-pt-sm">
            <q-btn
              no-caps
              flat
              dense
              size="md"
              color="primary"
              class="rounded col"
              label="Добавить администратора/ресурс"
            >
              <user-search
                :token="config.bot.token"
                :bot_id="config.bot.id"
                @select="addUser"
              ></user-search>
            </q-btn>
          </div>

          <q-inner-loading :showing="loading.add">
            <q-spinner size="30px" color="primary" />
          </q-inner-loading>
        </div>

        <div class="text-caption">
          Если вы не определите куда отправлять уведомления от обратной связи,
          то по умолчанию будет отправляться создателю и всем менеджерам.
        </div>

        <div class="text-caption">
          Если вы зададите хотя бы один ресурс, то будет отправляться только
          тому, кого вы определили.
        </div>

        <q-inner-loading :showing="loading.show" class="bg-white">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading>
      </q-card-section>

      <q-card-section class="row justify-end q-pt-none">
        <q-btn
          no-caps
          flat
          size="md"
          color="primary"
          label="Закрыть"
          class="rounded"
          :loading="loading.notify"
          v-close-popup
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { config } from '../../config';
import { ref } from 'vue';

import { useFeedbackStore } from '../../stores/feedbackStore';
import { fetchFeedback, fetchFeedbackNotify } from '../../api/queries';

import UserSearch from './notification/UserSearch.vue';
import RadioItem from '../views/RadioItem.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import NotifyItem from './notification/NotifyItem.vue';

const store = useFeedbackStore();

const notice = ref(false);
const loading = ref({
  show: false,
  add: false,
  notify: false,
});

const addUser = (id: any) => {
  loading.value.add = true;

  fetchFeedbackNotify('create', { user_id: Number(id) }, (response) => {
    store.notifications.push(response);
  }).then(() => (loading.value.add = false));
};

const updateNotify = (val: boolean) => {
  notice.value = val;
  store._feedback.setting.is_notice = val;

  loading.value.notify = true;

  fetchFeedback('update-setting', store.feedback.setting).then(() => {
    loading.value.notify = false;
  });
};

const updateShow = () => {
  notice.value = store.feedback.setting.is_notice;

  loading.value.show = true;
  fetchFeedbackNotify('index').then(() => (loading.value.show = false));
};
</script>

<style scoped lang="scss"></style>
