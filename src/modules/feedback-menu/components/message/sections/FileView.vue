<template>
  <div class="q-gutter-y-sm">
    <div>
      Максимальный размер файла
      <span class="text-primary text-weight-bold">{{ size }}</span>
    </div>

    <div class="row no-wrap items-center">
      <div class="text-weight-bold text-subtitle2 text-no-wrap">
        {{ minSize }}
      </div>

      <q-slider
        label
        track-size="10px"
        color="primary"
        class="q-px-lg"
        v-model="slider.value"
        :min="slider.min"
        :max="slider.max"
        :step="slider.step"
        :label-value="size"
      />

      <div class="text-weight-bold text-subtitle2 text-no-wrap">
        {{ maxSize }}
      </div>
    </div>
  </div>

  <div class="q-gutter-y-sm">
    <div>Разрешенные расширения</div>

    <q-tabs
      dense
      no-caps
      v-model="section"
      class="bott-tab__indicator text-primary"
    >
      <q-tab
        class="col rounded"
        v-for="([name, value], index) of Object.entries(radios)"
        :key="index"
        :name="name"
        :label="value.label"
      />
    </q-tabs>

    <div class="" v-if="section === 'your'">
      <q-item-label header class="q-py-xs">Свои расширения</q-item-label>

      <q-input
        outlined
        dense
        counter
        autofocus
        v-model="text"
        :maxlength="512"
        class="bott-input--rounded"
        hint="Для корректной работы, все расширения пишутся через запятую. Пример doc, docx, txt."
      />
    </div>

    <div class="" v-if="section === 'select'">
      <q-item-label header class="q-py-xs">Выбор расширений</q-item-label>

      <q-select
        use-chips
        dense
        outlined
        multiple
        counter
        v-model="selected"
        :options="extensions"
        options-dense
        class="bott-input--rounded"
        options-selected-class="bg-primary-2"
        hint="Если выбор останется пустым, будут разрешены все расширения"
      >
        <template v-slot:option="scope">
          <q-item dense v-bind="scope.itemProps">
            <q-item-section class="text-center text-subtitle1">
              <q-item-label>{{ scope.opt }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { fetchFeedback } from '../../../api/queries';

import { defaultInput } from '../../../stores/feedbackModels';
import { extensions } from '../models';
import { usePSStore } from '../../../stores/feedbackStore';

const props = withDefaults(defineProps<FileQuestionProps>(), {
  message: () => defaultInput,
  update: false,
});

const emit = defineEmits<{
  (e: 'load'): void;
}>();

const store = usePSStore();

const slider = ref({
  value: 1,
  max: 10485760,
  min: 0,
  step: 1 / 10,
});
const section = ref<RadioNames>('all');
const text = ref('');
const selected = ref<Array<string>>([]);

const size = computed(() => slider.value.value.dimension());
const minSize = computed(() => slider.value.min.dimension());
const maxSize = computed(() => slider.value.max.dimension());

const radios = computed((): Radios => {
  return {
    all: { label: 'Все расширения', value: '' },
    your: { label: 'Свои расширения', value: text.value },
    select: { label: 'Выбор', value: selected.value.join(',') },
  };
});

const updateFile = () => {
  fetchFeedback(
    'update-input-file',
    {
      input_id: props.message.id,
      extensions: radios.value[section.value].value,
      size: slider.value.value,
    },
    store.updateQuestion
  ).then(() => {
    store.closeDialog('message');
    emit('load');
  });
};

function toFormat(ext: string) {
  return ext.replace(/ /gi, '').split(',');
}

onMounted(() => {
  slider.value.value = props.message.file?.size ?? 1024;
  selected.value = toFormat(props.message.file?.extensions ?? '');

  if (props.message.file?.extensions.length) {
    section.value = 'your';

    const condition = selected.value.map((ext) => extensions.includes(ext));

    if (!condition.includes(false)) {
      section.value = 'select';
    }
  }
});

watch(
  () => props.update,
  (val) => {
    if (!val) updateFile();
  }
);

interface FileQuestionProps {
  message: MessageFeedbackItem;
  update: boolean;
}
type Radios = Record<RadioNames, { label: string; value: string }>;
type RadioNames = 'your' | 'select' | 'all';
</script>

<style lang="scss" scoped></style>
