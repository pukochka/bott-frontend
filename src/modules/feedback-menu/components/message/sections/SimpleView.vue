<template>
  <div class="">
    <div>Проверка</div>

    <q-tabs
      no-caps
      dense
      class="bott-tab__indicator text-primary"
      v-model="section"
    >
      <q-tab
        class="col rounded"
        v-for="([name, value], index) of Object.entries(radios)"
        :key="index"
        :name="name"
        :label="value.label"
      />
    </q-tabs>
  </div>

  <div v-if="section === 'patterns'">
    <div>Готовые шаблоны</div>

    <div class="row q-col-gutter-sm">
      <div
        v-for="pat of patterns"
        :key="pat.id"
        class="col-12 col-sm-6 col-md-4"
        @click="pattern = pat"
      >
        <q-item clickable class="rounded fit">
          <q-item-section>
            <q-item-label>{{ pat.label }}</q-item-label>

            <q-item-label caption>{{ pat.description }}</q-item-label>
          </q-item-section>

          <q-checkbox
            :model-value="pattern.id === pat.id"
            color="primary"
            size="30px"
          />
        </q-item>
      </div>
    </div>
  </div>

  <div class="" v-if="section === 'your'">
    <div>Cвой шаблон</div>

    <q-input
      dense
      autogrow
      outlined
      counter
      v-model="validator"
      :maxlength="1024"
      class="bott-input--rounded"
      hint="Необходимо знание регулярных выражений, иначе проверка не будет работать"
    />
  </div>

  <div class="" v-if="['patterns', 'your'].includes(section)">
    <div>Сообщение при неверном ответе</div>

    <q-input
      dense
      autogrow
      outlined
      counter
      v-model="text"
      :maxlength="512"
      class="bott-input--rounded"
      hint="При неверном формате сообщения, отправится это сообщение"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { patterns } from '../models';

import { defaultInput } from '../../../stores/feedbackModels';
import { fetchFeedback } from '../../../api/queries';
import { usePSStore } from '../../../stores/feedbackStore';

const props = withDefaults(defineProps<SimpleQuestionProps>(), {
  message: () => defaultInput,
  update: false,
});

const emit = defineEmits<{
  (e: 'load'): void;
}>();

const store = usePSStore();

const text = ref('');
const validator = ref('');
const section = ref<RadioNames>('without');
const pattern = ref(patterns[0]);

const radios = computed((): Radios => {
  return {
    without: { label: 'Без проверки', value: '' },
    your: { label: 'Свой шаблон', value: validator.value },
    patterns: { label: 'Готовые шаблоны', value: pattern.value.value },
  };
});

const updateInput = () => {
  fetchFeedback(
    'update-input-text',
    {
      input_id: props.message.id,
      message: text.value,
      validator: radios.value[section.value].value,
    },
    store.updateQuestion
  ).then(() => {
    store.closeDialog('message');
    emit('load');
  });
};

onMounted(() => {
  text.value = props.message.input?.message ?? 'Неверно введена информация';

  if (props.message.input?.validator.length) {
    section.value = 'your';
    validator.value = props.message.input.validator;

    const condition = patterns
      .map((pat) => pat.value)
      .includes(validator.value);

    if (condition) {
      pattern.value = patterns.filter(
        (item) => item.value === validator.value
      )[0];

      if (pattern.value !== void 0) {
        pattern.value = patterns[0];
        section.value = 'patterns';
        validator.value = '';
      }
    }
  }
});

watch(
  () => props.update,
  (val) => {
    if (!val) updateInput();
  }
);

interface SimpleQuestionProps {
  message: MessageFeedbackItem;
  update: boolean;
}
type Radios = Record<RadioNames, { label: string; value: string }>;
type RadioNames = 'without' | 'your' | 'patterns';
</script>

<style lang="scss" scoped></style>
