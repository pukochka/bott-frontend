<template>
  <keep-alive>
    <q-list class="overflow-hidden row q-col-gutter-sm">
      <div class="col-6" v-for="(tp, index) of types" :key="index">
        <q-item
          dense
          clickable
          class="bordered rounded fit"
          @click="select(tp.type)"
        >
          <q-item-section avatar>
            <q-icon :name="icons[tp.type]" color="primary" size="24px" />
          </q-item-section>

          <q-item-section class="column items-center q-gutter-y-sm q-pa-sm">
            <q-item-label class="text-center">{{ tp.label }}</q-item-label>

            <q-item-label class="text-center" caption>
              {{ tp.description }}
            </q-item-label>
          </q-item-section>

          <q-checkbox
            toggle-indeterminate
            v-if="selected === tp.type"
            class="absolute-top-right"
            :model-value="checkbox === tp.type"
          />
        </q-item>
      </div>
    </q-list>
  </keep-alive>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';

const props = withDefaults(defineProps<EditTypeProps>(), {
  type: 0,
  host: '',
  bot_id: 0,
  token: '',
  types: () => [],
});

const emit = defineEmits<{
  (e: 'select', value: number): void;
}>();

const selected = ref(0);
const checkbox = ref(0);

const select = (type: number) => {
  selected.value = type;
  emit('select', type);
  setTimeout(() => (checkbox.value = selected.value), 10);
};

const icons = [
  'text_fields',
  'image',
  'forum',
  'description',
  'movie',
  'gif_box',
];

onBeforeMount(() => {
  if (props.type) select(props.type);
  emit('select', selected.value);
});

interface EditTypeProps {
  type?: number;
  token: string;
  host: string;
  bot_id: number;
  types: Array<any>;
}
</script>

<style lang="scss" scoped></style>
