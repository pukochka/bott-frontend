<template>
  <q-dialog
    :model-value="props.modelValue"
    @hide="emit('hide')"
    @before-show="updateShow"
  >
    <q-card bordered flat class="rounded" style="width: 100%">
      <q-card-section class="row justify-center">
        <q-btn
          unelevated
          no-caps
          size="md"
          class="rounded"
          color="primary"
          :label="exactly ? 'Обычный выбор' : 'Другой выбор'"
          @click="exactly = !exactly"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <timer-slider
          :value="time"
          v-if="exactly"
          @update="updateTime"
        ></timer-slider>

        <div class="" v-else>
          <div class="row no-wrap q-col-gutter-x-sm">
            <div class="col-6">
              <q-btn-dropdown
                unelevated
                no-caps
                color="primary"
                class="rounded fit"
                content-class="bott-portal-menu max-height"
              >
                <template #label>
                  <div class="text-h6">{{ selected.label }}</div>
                </template>

                <q-list dense>
                  <q-item
                    clickable
                    v-close-popup
                    v-for="(sect, index) of sections"
                    :key="index"
                    @click="selected = sect"
                  >
                    <q-item-section>
                      <q-item-label class="text-center text-subtitle1">
                        {{ sect.label }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>

            <div class="col-6">
              <q-btn-dropdown
                unelevated
                no-caps
                color="primary"
                class="rounded fit"
                content-class="bott-portal-menu"
              >
                <template #label>
                  <div class="text-h6">{{ selected.value }}</div>
                </template>

                <q-list dense>
                  <q-item
                    clickable
                    v-close-popup
                    v-for="(_, index) in selected.max + 1"
                    :key="index"
                    @click="updateTime(index, true)"
                    :class="[
                      selected.value === index ? ' bg-primary text-white' : '',
                    ]"
                  >
                    <q-item-section>
                      <q-item-label class="text-center text-subtitle1">
                        {{ index }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>

          <div class="row no-wrap q-pt-sm text-gradient">
            <div
              class="col text-center text-h6"
              v-for="(section, index) of sections"
              :key="index"
            >
              {{ section.value }} {{ section.label }}
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          no-caps
          flat
          size="md"
          label="Закрыть"
          color="primary"
          class="rounded"
          v-close-popup
        />

        <q-btn
          no-caps
          unelevated
          size="md"
          label="Сохранить"
          color="primary"
          class="rounded"
          :loading="loading"
          @click="updateTimerMessage"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { defaultMessage } from 'src/utils/helpers/defaults';
import { getFormattedTime } from 'src/utils/helpers/time';

import TimerSlider from './TimerSlider.vue';

const props = withDefaults(defineProps<TimerSettingsModalProps>(), {
  message: () => defaultMessage,
  model: false,
});

const emit = defineEmits<{
  (e: 'hide'): void;
  (e: 'update-time', time: number, callback?: () => void): void;
}>();

const exactly = ref(false);
const loading = ref(false);

const sections = ref<Array<SectionItem>>([
  {
    label: 'дн',
    max: 9,
    value: 0,
    multiplier: (val) => Number(val) * 60 * 60 * 24,
  },
  {
    label: 'ч',
    max: 23,
    value: 0,
    multiplier: (val) => Number(val) * 60 * 60,
  },
  { label: 'мин', max: 59, value: 0, multiplier: (val) => Number(val) * 60 },
  { label: 'сек', max: 59, value: 1, multiplier: (val) => Number(val) % 60 },
]);
const time = ref(0);
const selected = ref(sections.value[3]);

const updateTime = (value: number, translate?: boolean) => {
  if (translate) {
    selected.value.value = value;
    time.value = sections.value
      .map((s) => s.multiplier(s.value))
      .reduce((acc, rec) => acc + rec, 0);

    return;
  }

  time.value = value;
};

const updateTimerMessage = () => {
  loading.value = true;

  emit('update-time', time.value, () => (loading.value = false));
};

const updateShow = () => {
  time.value = Number(props.message?.text ?? '1');

  if (isNaN(time.value)) return;

  let correctMap = getFormattedTime(time.value);

  if (Array.isArray(correctMap)) correctMap = correctMap.reverse().slice(1);

  sections.value.forEach((sect, index) => {
    const time = correctMap[index];

    if (time === false) {
      sect.value = 0;
    } else {
      sect.value = Number(time?.slice(0, 2) ?? 0);
    }
  });
};

interface SectionItem {
  label: string;
  max: number;
  value: number;
  multiplier: (val: number) => number;
}

interface TimerSettingsModalProps {
  message: MessageFree;
  modelValue: boolean;
}
</script>

<style scoped lang="scss"></style>
