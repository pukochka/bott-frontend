<template>
  <q-dialog
    full-width
    persistent
    position="bottom"
    v-model="feedback.dialogs.settings"
    @before-show="updateShow"
  >
    <div class="row justify-center">
      <q-card class="dialog-rounded bott-dialog__responsive" bordered flat>
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
                      !feedback.feedback.setting.is_notice &&
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
                      @click="feedback.openDialog('notify')"
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
              label="Название обратной связи"
              :maxlength="64"
              v-model="title"
            >
              <template #append>
                <q-btn
                  flat
                  dense
                  color="primary"
                  icon="check"
                  class="rounded"
                  :loading="loading.title"
                  @click="updateTitle"
                >
                  <q-tooltip
                    class="bott-tooltip text-center"
                    anchor="top middle"
                    self="bottom middle"
                  >
                    Изменить
                  </q-tooltip>
                </q-btn>
              </template>
            </q-input>

            <q-input
              outlined
              autogrow
              counter
              class="bott-input--rounded"
              label="Текст в кнопке отмены заявки"
              :maxlength="64"
              v-model="setting.button_cancel"
            />

            <feedback-templates
              @update="updateLocalSettings"
            ></feedback-templates>

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
            <message-free-settings
              no-settings
              :message="feedback.message"
              :host="config.host"
              :bot-name="config.bot.name"
              :token="config.bot.token"
              :bot-id="config.bot.id"
              @update-type="updateType"
              @refresh="refreshMessage"
              @test="testMessage"
            ></message-free-settings>

            <faq-section :faq="feedback.message.faq"></faq-section>

            <constants-section
              :constants="feedback.message.constants"
            ></constants-section>

            <div class="row" v-if="feedback.message.is_generate_default">
              <q-btn
                flat
                no-caps
                size="md"
                color="warning"
                class="rounded col"
                label="Сбросить обратную связь"
                @click="resetFeedback"
              />
            </div>
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
import { fetchFeedback, fetchMessage } from '../../api/queries';
import { useDialog } from 'src/utils/use/useDialog';

import { defaultFeedbackSetting } from '../../stores/feedbackModels';
import { defaultMessage } from 'src/utils/helpers/defaults';

import MessageFreeSettings from 'src/components/meta/MessageFreeSettings.vue';
import ConstantsSection from 'src/components/meta/ConstantsSection.vue';
import FaqSection from 'src/components/meta/FaqSection.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import NotifyEditItem from './notification/LimitItem.vue';
import MessageCard from '../views/MessageCard.vue';
import FeedbackTemplates from './FeedbackTemplates.vue';
import { config } from '../../config';

const feedback = useFeedbackStore();

const loading = ref({
  notice: false,
  update: false,
  reset: false,
  title: false,
  'notice-admin': false,
});
const setting = ref<MessageFeedbackSetting>(defaultFeedbackSetting);
const text = ref(setting.value.template_answer);
const title = ref(setting.value.template_answer);

const notice = computed(() => feedback.feedback.notice ?? defaultMessage);
const noticeAdmin = computed(
  () => feedback.feedback.noticeAdmin ?? defaultMessage
);

const cards = computed((): any => [
  {
    label: 'Напоминание для пользователя',
    data: notice.value,
    condition: feedback.feedback.notice !== null,
    desc: 'Уведолмение для пользователя, которое отправляется через установленное время.',
    method: 'notice',
  },
  {
    label: 'Напоминание для администратора',
    data: noticeAdmin.value,
    condition: feedback.feedback.noticeAdmin !== null,
    desc: 'Уведолмение для администраторов, которое отправляется через установленное время.',
    method: 'notice-admin',
  },
]);

const resetFeedback = () => {
  useDialog('Вы уверены, что хотите сбросить обратную связь?', true).onOk(
    () => {
      loading.value.reset = true;

      fetchMessage('reset', { message_id: feedback.message.id }, (response) => {
        feedback._message = response;
      }).then(() => (loading.value.reset = false));
    }
  );
};

const refreshMessage = (callback?: () => void) => {
  useDialog('Вы уверены, что хотите сбросить сообщение?', true).onOk(() => {
    fetchMessage('reset', { message_id: feedback.message.id }, (response) => {
      feedback._message = response;
    }).then(() => {
      if (callback !== void 0) callback();
    });
  });
};

const testMessage = (callback?: () => void) => {
  fetchMessage('test', {
    message_id: feedback.message.id,
    user_id: config.user_id || 0,
  }).then(() => {
    if (callback !== void 0) callback();
  });
};

const updateType = () => {
  feedback.openDialog('update_type');
};

const updateTitle = () => {
  loading.value.title = true;

  fetchMessage(
    'update-title',
    {
      title: title.value,
      message_id: feedback.message.id,
    },
    (response) => {
      feedback._message.title = response;
    }
  ).then(() => (loading.value.title = false));
};

const updateLocalSettings = () => {
  setting.value = feedback.feedback.setting;
};

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
  setting.value.template_answer = text.value;

  fetchFeedback('update-setting', setting.value).then(
    () => (loading.value.update = false)
  );
};

const updateShow = () => {
  title.value = feedback.message.title;
  setting.value = feedback.feedback.setting;
  text.value = setting.value.template_answer;
};

const spam = computed(
  (): Array<Setting<PropName>> => [
    {
      label: 'Сколько раз клиент может ответить на форму, всего',
      value: setting.value.user_limit,
      prop: 'user_limit',
    },
    {
      label: 'Период в минутах, между заявками',
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
