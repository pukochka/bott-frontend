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
            <q-input
              outlined
              autogrow
              counter
              class="bott-input--rounded"
              label="Общий текст уведомления"
              :maxlength="1024"
              v-model="setting.template_answer"
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

              <q-btn
                flat
                size="13px"
                padding="2px"
                color="warning"
                icon="refresh"
                class="rounded absolute-top-right q-ma-xs"
                @click="refresh"
              >
                <q-tooltip
                  class="bott-tooltip text-center"
                  anchor="top middle"
                  self="bottom middle"
                >
                  Сбросить настройки
                </q-tooltip>
              </q-btn>

              <notify-edit-item
                v-for="(item, index) of spam"
                :key="index"
                :item="item"
                @update="updateItem"
              ></notify-edit-item>
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
            :loading="loading"
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

import ConstantsSection from '../../../inline/components/settings/ConstantsSection.vue';
import FaqSection from '../../../inline/components/settings/FaqSection.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import NotifyEditItem from './notification/LimitItem.vue';

const store = useFeedbackStore();

const loading = ref(false);
const setting = ref<MessageFeedbackSetting>(defaultFeedbackSetting);

const updateItem = (item: any, text: any) => {
  setting.value[<'is_notice'>item.prop] = text;

  updateSettings();
};

const refresh = () => {
  useDialog(
    'Вы уверены, что хотите сбросить настройки защиты от спама?',
    true
  ).onOk(() => {
    spam.value
      .map((item) => item.prop)
      .forEach((key) => {
        setting.value[<SpamPropName>key] = 0;
      });

    updateSettings();
  });
};

const updateSettings = () => {
  loading.value = true;

  fetchFeedback('update-setting', setting.value).then(
    () => (loading.value = false)
  );
};

const updateShow = () => {
  setting.value = store.feedback.setting;
};

const spam = computed(
  (): Array<Setting<SpamPropName>> => [
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
type SpamPropName =
  | 'limit_in_period'
  | 'user_limit'
  | 'period'
  | 'time_notice'
  | 'time_cancel';
type ReminderPropName = 'time_notice' | 'time_cancel';
</script>

<style scoped lang="scss"></style>
