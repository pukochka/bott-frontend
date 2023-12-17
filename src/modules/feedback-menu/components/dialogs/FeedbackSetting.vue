<template>
  <q-dialog
    full-width
    persistent
    position="bottom"
    v-model="store.dialogs.settings"
    @before-show="updateShow"
  >
    <div class="row justify-center">
      <q-card class="dialog-rounded bott-dialog__responsive">
        <dialog-header label="Настройки обратной связи"></dialog-header>

        <q-card-section class="q-pt-none row q-col-gutter-sm">
          <div class="col-12 col-md-7 q-gutter-y-sm">
            <div class="">
              <div class="row q-col-gutter-sm">
                <div
                  class="col-12 col-sm-6 relative-position"
                  v-for="(card, index) of cards"
                  :key="index"
                >
                  <message-card
                    class="rounded bordered fit q-pa-sm"
                    :message="card"
                    :open="true"
                  ></message-card>

                  <q-inner-loading
                    :showing="
                      !store.feedback.setting.is_notice &&
                      card.method === 'notice-admin'
                    "
                  >
                    <div class="text-center text-weight-bold q-pa-md">
                      Уведомления и напоминания отключены
                    </div>

                    <q-btn
                      no-caps
                      flat
                      color="primary"
                      padding="4px"
                      label="Включить"
                      class="rounded"
                      @click="store.openDialog('notify')"
                    />
                  </q-inner-loading>
                </div>
              </div>
            </div>

            <q-input
              outlined
              autogrow
              counter
              class="bott-input--rounded"
              label="Общий текст уведомления"
              :maxlength="1024"
              v-model="setting.template_answer"
            />

            <q-input
              outlined
              autogrow
              counter
              class="bott-input--rounded"
              label="Текст в кнопке отмены ответа"
              :maxlength="64"
              v-model="setting.button_cancel"
            />

            <q-list
              dense
              bordered
              separator
              class="rounded overflow-hidden relative-position"
            >
              <div class="text-center text-body1 text-primary q-py-xs q-px-md">
                Натройки лимитов
              </div>

              <notify-edit-item
                v-for="(item, index) of spam"
                :key="index"
                :item="item"
                @update="updateItem"
              ></notify-edit-item>

              <q-item>
                <q-item-section>
                  <q-item-label caption>
                    Значение 0 - настройка отключена
                  </q-item-label>
                </q-item-section>

                <q-btn
                  flat
                  square
                  color="warning"
                  icon="refresh"
                  class="absolute-right"
                  padding="0 14px"
                  @click="refresh"
                >
                  <q-tooltip
                    class="bott-tooltip text-center"
                    anchor="top middle"
                    self="bottom middle"
                  >
                    Отключить настройки
                  </q-tooltip>
                </q-btn>
              </q-item>
            </q-list>
          </div>

          <div class="col-12 col-md-5 q-gutter-y-sm">
            <faq-section :faq="store.message.faq"></faq-section>

            <constants-section
              :constants="store.message.constants"
            ></constants-section>
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
            unelevated
            size="md"
            color="primary"
            class="rounded"
            label="Сохранить"
            :loading="loading.update"
            @click="updateSettings"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFeedbackStore } from '../../stores/feedbackStore';
import { fetchFeedback } from '../../api/queries';
import { useDialog } from '../../../file-manager/stores/useDialog';
import { defaultFeedbackSetting } from '../../stores/feedbackModels';
import { defaultMessageFree } from '../../../inline/stores/inlineModels';

import ConstantsSection from '../../../inline/components/settings/ConstantsSection.vue';
import FaqSection from '../../../inline/components/settings/FaqSection.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import NotifyEditItem from './notification/LimitItem.vue';
import MessageCard from '../views/MessageCard.vue';

const store = useFeedbackStore();

const loading = ref({
  notice: false,
  update: false,
  'notice-admin': false,
});
const setting = ref<MessageFeedbackSetting>(defaultFeedbackSetting);

const notice = computed(() => store.feedback.notice ?? defaultMessageFree);
const noticeAdmin = computed(
  () => store.feedback.noticeAdmin ?? defaultMessageFree
);

const cards = computed((): any => [
  {
    label: 'Напоминание для пользователя',
    data: notice.value,
    condition: store.feedback.notice !== null,
    desc: 'Уведолмение для пользователя, которое отправляется через установленное время.',
    method: 'notice',
  },
  {
    label: 'Напоминание для администратора',
    data: noticeAdmin.value,
    condition: store.feedback.noticeAdmin !== null,
    desc: 'Уведолмение для администраторов, которое отправляется через установленное время.',
    method: 'notice-admin',
  },
]);

const updateItem = (item: any, text: any) => {
  setting.value[<'is_notice'>item.prop] = text;

  updateSettings();
};

const refresh = () => {
  useDialog('Вы уверены, что хотите отключить настройки?', true).onOk(() => {
    spam.value
      .map((item) => item.prop)
      .forEach((key) => {
        setting.value[<PropName>key] = 0;
      });

    updateSettings();
  });
};

const updateSettings = () => {
  loading.value.update = true;

  fetchFeedback('update-setting', setting.value).then(
    () => (loading.value.update = false)
  );
};

const updateShow = () => {
  setting.value = store.feedback.setting;
};

const spam = computed(
  (): Array<Setting<PropName>> => [
    {
      label: 'Сколько раз клиент может ответить на форму, всего',
      value: setting.value.user_limit,
      prop: 'user_limit',
    },
    {
      label: 'Период в минутах, между ответами',
      value: setting.value.limit_in_period,
      prop: 'limit_in_period',
    },
    {
      label: 'Сколько раз можно ответить за период',
      value: setting.value.period,
      prop: 'period',
    },
    {
      label: 'Время в минутах до автоудаления неотвеченной заявки',
      value: setting.value.time_cancel,
      prop: 'time_cancel',
    },
    {
      label: 'Время в минутах до отправки напоминания',
      value: setting.value.time_notice,
      prop: 'time_notice',
    },
  ]
);

interface Setting<P> {
  label: string;
  value: any;
  prop: P;
}
type PropName =
  | 'limit_in_period'
  | 'user_limit'
  | 'period'
  | 'time_notice'
  | 'time_cancel';
</script>

<style scoped lang="scss"></style>
