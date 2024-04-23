<template>
  <q-item dense class="bott-message-free--item">
    <q-item-section>
      <q-item-label class="text-primary text-no-wrap ellipsis">
        {{ message.title }}
      </q-item-label>

      <q-item-label class="text-content">
        <div class="ellipsis-3-lines word-break-all" v-html="text"></div>
      </q-item-label>
    </q-item-section>

    <q-item-section side class="bott-message-free--item-type">
      <q-item-label class="full-width">
        <q-chip
          :color="type.color"
          text-color="white"
          class="rounded full-width"
        >
          <div class="row justify-center col text-caption">
            {{ type.label }}
          </div>
        </q-chip>
      </q-item-label>

      <q-item-label class="row full-width">
        <q-chip
          v-if="combined"
          color="primary"
          text-color="white"
          class="rounded full-width"
        >
          <div class="row justify-center col non-selectable">Совмещено</div>
        </q-chip>

        <div v-else-if="props.viewMessage.id === props.message.id"></div>

        <q-btn
          v-else
          dense
          flat
          no-caps
          size="md"
          color="primary"
          class="rounded col"
          label="Совместить"
          :loading="loading"
          @click="combineMessage"
        />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { defaultMessage } from 'src/utils/helpers/defaults';

import { replaceUnsolvableTags } from 'src/utils/helpers/replace';
import { messageFreeTypes } from './common';

const props = withDefaults(defineProps<CombineMessageItemProps>(), {
  message: () => defaultMessage,
  viewMessage: () => defaultMessage,
});

const emit = defineEmits<{
  (e: 'set-next-message', next_id: number, callback?: () => void): void;
}>();

const loading = ref(false);

const combined = computed(
  () => props.viewMessage.nextMessage?.id === props.message.id
);

const text = computed(() => replaceUnsolvableTags(props.message.text));

const type = computed(
  () => messageFreeTypes[props.message.type.id] ?? messageFreeTypes[0]
);

const combineMessage = () => {
  loading.value = true;

  emit('set-next-message', props.message.id, () => (loading.value = false));
};

interface CombineMessageItemProps {
  message: MessageFree;
  viewMessage: MessageFree;
}
</script>

<style scoped lang="scss">
.bott-message-free--item {
  height: 78px;
  align-items: start;
  &-type {
    width: 190px;
  }
}
</style>
