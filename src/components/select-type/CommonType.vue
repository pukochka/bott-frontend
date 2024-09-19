<template>
  <div class="q-py-xs">{{ label }}</div>

  <q-input
    input-style="max-height: 200px"
    class="bott-input--rounded"
    autofocus
    outlined
    counter
    :autogrow="grow"
    :hint="hint"
    :maxlength="text.max"
    v-model="text.value"
    :label="label"
    :rules="[() => text.required || props.error]"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';

const props = withDefaults(defineProps<GeneralTypeProps>(), {
  regexp: () => /^/,
  action: null,
  label: '',
  grow: false,
  default: '',
  hint: '',
  error: 'Введено неверное количество символов',
  webs: [],
  actions: [],
  route: '',
  index: false,
  static: false,
  bot_id: undefined,
  host: '',
  message_id: undefined,
  token: undefined,
});

const emit = defineEmits<{
  (e: 'change', value: string | null): void;
}>();

const text = ref({
  value: '',
  min: 1,
  max: 256,
  get required() {
    return (
      this.value.length >= this.min &&
      this.value.length <= this.max &&
      props.regexp.test(this.value)
    );
  },
});

watch(
  text,
  (val) => {
    if (val.required) emit('change', val.value);
    else emit('change', null);
  },
  { deep: true }
);

onMounted(() => {
  if (props.action) {
    text.value.value = props.action;
    emit('change', text.value.value);
  } else {
    text.value.value = props.default;
    emit('change', text.value.value);
  }
});

interface GeneralTypeProps {
  label: string;
  action: string | null;
  bot_id: number;
  message_id: number;
  token: string;
  host: string;
  index?: boolean;
  static?: boolean;
  regexp?: RegExp;
  grow?: boolean;
  default?: string;
  hint?: string;
  error?: string;
  webs?: any;
  actions?: any;
  route?: any;
}
</script>

<style lang="scss" scoped></style>
