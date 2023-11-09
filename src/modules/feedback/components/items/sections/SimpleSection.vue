<template>
  <div class="row no-wrap rounded-container-grey">
    <div class="q-pa-sm">
      <div class="text-subtitle1">Сообщение при неверном ответе</div>

      <div
        class="rounded q-py-xs q-px-sm ellipsis-3-lines"
        :class="[verify ? ' bg-red-2' : ' bg-blue-2']"
      >
        {{ message }}
      </div>
    </div>

    <q-space />
  </div>

  <Validator />
</template>

<script setup lang="ts">
import { computed, h } from 'vue';
import { QSpace } from 'quasar';
import { patterns } from '../../../stores/patterns';

import { defaultSimpleQuestion } from '../../../stores/FBModels';

const props = withDefaults(defineProps<SimpleSectionProps>(), {
  data: () => defaultSimpleQuestion,
});

const verify = computed(() => props.data.message === '');

const message = computed(() =>
  verify.value ? 'Нет проверки сообщения' : props.data.message
);

const Validator = () => {
  const is_new_pattern =
    patterns.find((item) => item.value === props.data.validator) !== undefined;

  if (!is_new_pattern) return h('div');

  const pattern_text =
    patterns.find((item) => item.value === props.data.validator)?.label ?? '';

  const titleNode = h('div', { class: 'text-subtitle1' }, 'Шаблон проверки');
  const validatorNode = h(
    'div',
    { class: 'rounded bg-blue-2 q-py-xs q-px-sm' },
    pattern_text
  );

  const node = h('div', { class: 'q-pa-sm' }, [titleNode, validatorNode]);
  const space = h(QSpace);

  return h('div', { class: 'row no-wrap rounded-container-grey' }, [
    node,
    space,
  ]);
};

interface SimpleSectionProps {
  data: FBSimpleQuestion;
}
</script>

<style lang="scss" scoped></style>
