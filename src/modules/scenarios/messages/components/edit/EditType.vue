<template>
  <q-list class="overflow-hidden row q-col-gutter-sm">
    <div class="col-6" v-for="(type, index) of data.types" :key="index">
      <q-item
        dense
        clickable
        class="bordered rounded fit"
        @click="select(type.type)"
      >
        <q-item-section avatar v-if="!sm">
          <q-icon :name="icons[type.type]" color="primary" size="24px" />
        </q-item-section>

        <q-item-section class="column items-center q-gutter-y-sm q-pa-sm">
          <q-item-label class="text-center">{{ type.label }}</q-item-label>

          <q-item-label class="text-center" caption>
            {{ type.description }}
          </q-item-label>
        </q-item-section>

        <q-checkbox
          toggle-indeterminate
          v-if="selected === type.type"
          class="absolute-top-right"
          :model-value="checkbox === type.type"
        />
      </q-item>
    </div>
  </q-list>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useDataStore } from '../../stores/data/dataStore';
import { useQuasar } from 'quasar';

const props = withDefaults(defineProps<EditTypeProps>(), {
  messageType: 0,
});

const emit = defineEmits<{
  (e: 'select', value: number): void;
}>();

const data = useDataStore();
const quasar = useQuasar();

const selected = ref(0);
const checkbox = ref(0);

const sm = computed(() => quasar.screen.lt.sm);

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

onMounted(() => {
  if (props.messageType) select(props.messageType);

  emit('select', selected.value);
});

interface EditTypeProps {
  messageType?: number | undefined;
}
</script>

<style lang="scss" scoped></style>
