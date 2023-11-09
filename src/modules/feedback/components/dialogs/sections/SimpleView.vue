<template>
  <div class="">
    <q-item-label header class="q-py-xs">Проверка</q-item-label>

    <div class="rounded-container-grey">
      <q-radio v-model="typeSelect" val="without" label="Без проверки" />

      <q-radio v-model="typeSelect" val="your" label="Свой шаблон" />

      <q-radio v-model="typeSelect" val="patterns" label="Готовые шаблоны" />
    </div>
  </div>
  <div class="" v-if="typeSelect === 'patterns'">
    <q-item-label header class="q-py-xs">Готовые шаблоны</q-item-label>

    <div class="row q-col-gutter-sm">
      <div
        class="col-12 col-sm-6 col-md-4"
        v-for="pattern in patterns"
        :key="pattern.id"
        @click="selectedPattern = Object.assign(pattern, {})"
      >
        <q-item
          clickable
          v-ripple
          class="rounded fit"
          :class="[
            selectedPattern.id === pattern.id ? ' outline-2 bg-blue-2' : '',
          ]"
        >
          <q-item-section>
            <q-item-label>{{ pattern.label }}</q-item-label>

            <q-item-label caption>{{ pattern.description }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </div>

  <div class="" v-if="typeSelect === 'your'">
    <q-item-label header class="q-py-xs">Cвой шаблон</q-item-label>

    <q-input
      dense
      autogrow
      outlined
      counter
      v-model="yourPattern.value"
      :maxlength="yourPattern.max"
      hint="Необходимо знание регулярных выражений, иначе проверка не будет работать"
      :rules="[() => yourPattern.required || config.text.danger_input]"
    />
  </div>

  <div class="" v-if="typeSelect === 'patterns' || typeSelect === 'your'">
    <q-item-label header class="q-py-xs">
      Сообщение при неверном ответе
    </q-item-label>

    <q-input
      v-model="text.value"
      :maxlength="text.max"
      dense
      autogrow
      outlined
      counter
      :rules="[() => text.required || config.text.danger_input]"
    />
  </div>
</template>

<script setup lang="ts">
import config from '../../../config';
import { ref, onMounted, watch } from 'vue';
import { patterns } from '../../../stores/patterns';

import { defaultSimpleQuestion } from '../../../stores/FBModels';

const props = withDefaults(defineProps<SimpleQuestionProps>(), {
  data: () => defaultSimpleQuestion,
});

const emit = defineEmits<{
  (e: 'change', value: any): void;
  (e: 'required', value: any): void;
}>();

const typeSelect = ref<'without' | 'your' | 'patterns'>('without');
const selectedPattern = ref(patterns[0]);

const text = ref({
  value: 'Неверно введена информация',
  max: config.limits.maxInputLength,
  min: config.limits.minInputLength,
  get required() {
    return this.value.length >= this.min && this.value.length <= this.max;
  },
});

const yourPattern = ref({
  value: '',
  max: config.limits.maxInputLength,
  min: config.limits.minInputLength,
  get required() {
    return this.value.length >= this.min && this.value.length <= this.max;
  },
});

watch(text.value, () => changeData());
watch(selectedPattern, () => changeData());
watch(yourPattern.value, () => changeData(true));

watch(typeSelect, (val) => {
  if (val === 'without') {
    emit('change', { message: '', validator: '' });
    emit('required', { message: true, your: true });
  } else if (val === 'your') changeData(true);
  else if (val === 'patterns') changeData();
});

function changeData(is?: boolean) {
  emit('change', {
    message: text.value.value,
    validator: is ? yourPattern.value.value : selectedPattern.value.value,
  });
  emit('required', {
    message: text.value.required,
    your: is ? yourPattern.value.required : true,
  });
}

onMounted(() => {
  if (props.data.validator === '') {
    emit('change', { message: '', validator: '' });
    emit('required', { message: true, your: true });
    typeSelect.value = 'without';
    return;
  }

  text.value.value = props.data.message;

  if (
    patterns.find((item) => item.value === props.data.validator) === undefined
  ) {
    typeSelect.value = 'your';
    yourPattern.value.value = props.data.validator;
  } else {
    typeSelect.value = 'patterns';
    selectedPattern.value = patterns.find(
      (item) => item.value === props.data.validator
    );
  }
});

interface SimpleQuestionProps {
  data: FBSimpleQuestion;
}
</script>

<style lang="scss" scoped></style>
