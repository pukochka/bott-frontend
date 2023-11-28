<template>
  <div class="">
    <q-item-label header class="q-py-xs">Разрешенные расширения</q-item-label>

    <q-tabs
      v-model="typeSelect"
      no-caps
      dense
      class="bott-tab__indicator text-primary"
    >
      <q-tab
        v-for="(radio, index) of radios"
        :key="index"
        :name="radio.value"
        :label="radio.label"
        class="col rounded"
      />
    </q-tabs>

    <div class="" v-if="typeSelect === 'your'">
      <q-item-label header class="q-py-xs">Свои расширения</q-item-label>

      <q-input
        outlined
        dense
        counter
        autofocus
        v-model="text.value"
        :maxlength="text.max"
        class="bott-input--rounded"
        hint="Для корректной работы, все расширения пишутся через запятую. Пример doc, docx, txt."
      />
    </div>

    <div class="" v-if="typeSelect === 'select'">
      <q-item-label header class="q-py-xs">Выбор расширений</q-item-label>

      <q-select
        use-chips
        dense
        outlined
        v-model="select"
        multiple
        :options="extensions"
        counter
        class="bott-input--rounded"
        options-selected-class="bg-blue-2"
        behavior="dialog"
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

  <div class="">
    <div class="text-subtitle1 row justify-between items-center">
      <q-item-label header class="q-py-xs">
        Максимальный размер файла
      </q-item-label>

      <div class="bg-primary rounded text-white q-px-xs">
        {{ slider.value }} MB
      </div>
    </div>
    <div
      class="rounded-container-grey row no-wrap q-py-sm q-my-sm items-center"
    >
      <div class="text-weight-bold text-subtitle1 q-mr-xs">
        {{ 1 / 10 }}
      </div>

      <q-slider
        v-model="slider.value"
        :min="slider.min"
        :max="slider.max"
        :step="slider.step"
        label
        :label-value="slider.value + ' MB'"
        color="primary"
      />

      <div class="text-weight-bold text-subtitle1 q-ml-xs">
        {{ 10e5 }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import { extensions } from '../models';

import { defaultFileQuestion } from '../models';

const props = withDefaults(defineProps<FileQuestionProps>(), {
  data: () => defaultFileQuestion,
});

const emit = defineEmits<{
  (e: 'change', value: any): void;
}>();

const slider = ref({
  value: 1,
  max: 10e5,
  min: 1 / 10,
  step: 1 / 100,
});

const typeSelect = ref<'all' | 'your' | 'select'>('select');

const text = ref({
  value: '',
  max: 512,
});

const select = ref([]);

onMounted(() => {
  slider.value.value = Math.round(props.data.size / 10e3) / 100;
  // select.value = verifyExtensions(props.data.extensions);
});

watch(typeSelect, () => {
  text.value.value = select.value.join(', ');
  changeData();
});

watch(select, () => changeData());

watch(text.value, () => changeData(true));

watch(slider.value, () => changeData());

const changeData = (is?: boolean) =>
  emit('change', {
    size: slider.value.value * 10e5,
    extensions: is ? text.value.value : select.value.join(', '),
  });

const radios = computed(() => [
  {
    label: 'Все расширения',
    value: 'all',
  },
  {
    label: 'Свои расширения',
    value: 'your',
  },
  {
    label: 'Выбор',
    value: 'select',
  },
]);

function verifyExtensions(data: string) {
  if (data === '') {
    typeSelect.value = 'all';
    return [];
  }

  const str = data.replace(/ /gi, '');
  const massData = [...str];

  let selected = [];
  let word = '';

  for (let i = 0; i < massData.length; i++) {
    if ((i !== 0 && massData[i] === ',') || i === massData.length - 1) {
      if (i === massData.length - 1 && massData[i] !== ',') word += massData[i];

      selected.push(word);

      if (extensions.find((item) => item === word) === undefined) {
        typeSelect.value = 'your';
        text.value.value = data;
      }
      word = '';
    } else {
      word += massData[i];
    }
  }

  return selected;
}

interface FileQuestionProps {
  data: FBFileQuestion;
}
</script>

<style lang="scss" scoped></style>
