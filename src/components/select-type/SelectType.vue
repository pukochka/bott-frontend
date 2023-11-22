<template>
  <div class="q-gutter-y-sm">
    <div class="q-my-none">Выберите тип кнопки</div>

    <div class="">
      <div class="row q-col-gutter-sm">
        <div class="col-6" v-for="(button, index) in buttons" :key="index">
          <q-btn
            outline
            padding="4px"
            class="col-grow rounded fit"
            :color="selected === button.type ? 'primary' : 'item'"
            :label="button.label"
            @click="select(button.type)" />
        </div>
      </div>
    </div>

    <component
      :webs="webs"
      :action="action"
      :route="action"
      :bot_id="props.bot_id"
      :message_id="props.message_id"
      :token="props.token"
      :host="props.host"
      :is="selectedType.component"
      :label="selectedType.label"
      :hint="selectedType.hint"
      :grow="selectedType.grow"
      :default="selectedType.default"
      @change="update"></component>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';

const props = withDefaults(defineProps<SelectTypesProps>(), {
  webs: () => [],
  button: () => null,
  buttons: () => [],
  bot_id: 0,
  message_id: 0,
  token: '',
  types: () => {
    return {};
  },
});

const emit = defineEmits<{
  (e: 'update', value: any): void;
}>();

const selected = ref(0);
const action = ref<string | null>(null);

const select = (type: number) => {
  action.value = null;
  selected.value = type;

  update(null);
};

const update = (value: string | null) => {
  emit('update', { action: value, type: selected.value });
};

const selectedType = computed(() => props.types[selected.value]);

onBeforeMount(() => {
  selected.value = props.button?.type ?? 0;
  action.value = props.button?.action ?? null;

  update(action.value);
});

interface SelectTypesProps {
  button: IMButton | RMButton | null;
  webs: WebModule[];
  buttons: Array<{ label: string; type: number }>;
  types: Record<number, any>;
  bot_id: number;
  message_id: number;
  token: string;
  host: string;
}
</script>

<style lang="scss" scoped></style>
