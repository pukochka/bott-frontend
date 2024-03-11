<template>
  <q-dialog
    persistent
    position="bottom"
    full-width
    v-model="states.dialogs.timer"
    @before-show="updateShow"
  >
    <div class="row justify-center">
      <q-card flat bordered class="dialog-rounded bott-dialog__responsive">
        <dialog-header label="Настройки таймера"></dialog-header>

        <q-card-section class="row q-col-gutter-sm q-pt-none">
          <div class="col-12 col-lg-7 q-gutter-y-xs">
            <div class="">Быстрый выбор</div>

            <div class="row q-col-gutter-sm">
              <div
                class="col-6 col-sm"
                v-for="[value, label] of Object.entries(fastChoose)"
                :key="value"
              >
                <q-card
                  flat
                  bordered
                  class="rounded"
                  v-clickable
                  @click="time = Number(value)"
                >
                  <div class="text-center text-primary text-h6 q-pa-md">
                    {{ label }}
                  </div>
                </q-card>
              </div>
            </div>

            <div class="">Настроить</div>

            <time-slider :value="time" @update="updateTime"></time-slider>

            <div class="text-center q-pt-sm text-h6">
              Таймер {{ updated ? 'будет' : '' }} установлен на

              <span class="text-gradient text-weight-bold">
                {{ formatted }}
              </span>
            </div>

            <div class="text-center">
              Таймер можно настроить от 1 секудны до 10 дней.
            </div>
          </div>

          <div class="col-12 col-lg-5 q-gutter-y-sm">
            <faq-section :faq="selected.faq"></faq-section>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center"> </q-card-section>

        <q-card-section class="q-pt-none row justify-end q-gutter-sm">
          <q-btn
            flat
            no-caps
            class="rounded"
            size="md"
            label="Закрыть"
            color="primary"
            v-close-popup
          />

          <q-btn
            no-caps
            unelevated
            class="rounded"
            size="md"
            label="Сохранить"
            color="primary"
            :loading="loading"
            @click="updateTimerMessage"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { defaultMessage } from '../../stores/defaults';

import { useStatesStore } from '../../stores/states/statesStore';
import { useDataStore } from '../../stores/data/dataStore';

import { parseTimestamp } from 'src/utils/helpers/time';
import { fetchMessage } from '../../api';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import FaqSection from '../../../../inline/components/settings/FaqSection.vue';
import TimeSlider from '../items/sections/TimeSlider.vue';

const states = useStatesStore();
const messages = useDataStore();

const time = ref(1);
const updated = ref(false);
const loading = ref(false);

const formatted = computed(() => parseTimestamp(time.value, true));

const selected = computed(() => messages.selectedMessage ?? defaultMessage);

const fastChoose = computed(() => ({
  10: '10 сек',
  60: '1 мин',
  3600: '1 час',
  86400: '1 день',
}));

const updateTime = (value: number) => {
  updated.value = true;

  time.value = value;
};

const updateTimerMessage = () => {
  loading.value = true;
  const timerValue = time.value.toString();
  const message = messages.selectedMessage || defaultMessage;

  fetchMessage(
    'update-text',
    { message_id: selected.value.id, text: timerValue },
    () => {
      message.text = timerValue;
    }
  ).then(() => {
    loading.value = false;
    states.closeDialog('timer');
  });
};

const updateShow = () => {
  updated.value = false;
  time.value = Number(selected.value.text);
};
</script>

<style scoped lang="scss"></style>
