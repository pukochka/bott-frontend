<template>
  <q-list class="overflow-hidden row q-col-gutter-sm" v-if="types.length">
    <div class="col-6" v-for="(type, index) of types" :key="index">
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
          <q-item-label class="text-center">
            {{ type.label }}
          </q-item-label>

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

  <div class="text-h6 text-center text-red absolute-center" v-else>
    В данном сообщении нельзя изменить тип
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';

import { useQuasar } from 'quasar';
import { defaultMessage } from 'src/utils/helpers/defaults';

import { mdiEmoticonHappy, mdiTimer } from '@quasar/extras/mdi-v7';

const props = withDefaults(defineProps<EditTypeProps>(), {
  message: () => defaultMessage,
});

const emit = defineEmits<{
  (e: 'select', value: number): void;
}>();

const quasar = useQuasar();

const selected = ref(0);
const checkbox = ref(0);

const sm = computed(() => quasar.screen.lt.sm);

const types = computed(() =>
  props.message?.id !== 0
    ? Object.values(props.message?.support_types || {})
    : props.types || []
);

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
  mdiEmoticonHappy,
  mdiTimer,
];

onBeforeMount(() => {
  if (!types.value.length) return;

  select(props.message?.type?.id || 0);

  emit('select', props.message?.type?.id || 0);
});

interface EditTypeProps {
  message?: MessageFree | null;
  types?: Array<any>;
}
</script>

<style lang="scss" scoped></style>
