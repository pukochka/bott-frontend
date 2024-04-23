<template>
  <q-dialog
    persistent
    full-width
    position="bottom"
    :model-value="props.modelValue"
    @hide="emit('hide')"
    @before-show="updateShow"
  >
    <div class="row justify-center">
      <q-card flat bordered class="dialog-rounded bott-dialog__responsive">
        <dialog-header label="Настройки таймера"></dialog-header>

        <q-card-section class="row q-col-gutter-sm q-pt-none">
          <div class="col-12 col-lg-7 q-gutter-y-xs">
            <div class="text-subtitle1">Быстрый выбор</div>

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
                  @click="
                    time = Number(value);
                    updated = true;
                  "
                >
                  <div class="text-center text-primary text-h6 q-pa-md">
                    {{ label }}
                  </div>
                </q-card>
              </div>
            </div>

            <div class="row justify-center q-py-sm">
              <div class="col-12 col-sm-6">
                <q-btn
                  unelevated
                  no-caps
                  size="md"
                  color="primary"
                  class="rounded fit"
                  label="Настроить"
                  @click="settingsModal = true"
                />
              </div>
            </div>

            <div class="text-center text-h6">
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
            <faq-section :faq="message.faq"></faq-section>
          </div>
        </q-card-section>

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

  <timer-settings-modal
    :message="message"
    :model-value="settingsModal"
    @hide="settingsModal = false"
    @update-time="updateBySettings"
  ></timer-settings-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { getFormattedTime } from 'src/utils/helpers/time';
import { defaultMessage } from 'src/utils/helpers/defaults';

import FaqSection from 'src/components/meta/FaqSection.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import TimerSettingsModal from './TimerSettingsModal.vue';

const props = withDefaults(defineProps<TimerViewModalProps>(), {
  message: () => defaultMessage,
  modelValue: false,
});

const emit = defineEmits<{
  (e: 'hide'): void;
  (e: 'update-time', time: number, callback?: () => void): void;
}>();

const time = ref(1);
const updated = ref(false);
const loading = ref(false);
const settingsModal = ref(false);

const formatted = computed(() => getFormattedTime(time.value, true));

const fastChoose = computed(() => ({
  10: '10 сек',
  60: '1 мин',
  3600: '1 час',
  86400: '1 день',
}));

const updateBySettings = (value: number, callback?: () => void) => {
  emit('hide');

  emit('update-time', value, () => {
    settingsModal.value = false;
    if (callback !== void 0) callback();
  });
};

const updateTimerMessage = () => {
  loading.value = true;

  emit('update-time', time.value, () => {
    emit('hide');
    loading.value = false;
  });
};

const updateShow = () => {
  updated.value = false;
  time.value = Number(props.message.text);
};

interface TimerViewModalProps {
  message: MessageFree;
  modelValue: boolean;
}
</script>

<style scoped lang="scss"></style>
