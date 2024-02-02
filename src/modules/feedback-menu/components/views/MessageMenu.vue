<template>
  <q-list dense>
    <q-item
      clickable
      v-for="(button, index) of buttons"
      :key="index"
      @click="button.action"
    >
      <q-item-section avatar>
        <q-icon :name="button.icon" :color="button.color" size="22px" />
      </q-item-section>

      <q-item-section>{{ button.label }}</q-item-section>

      <q-inner-loading :showing="loading" v-if="button.icon === 'close'">
        <q-spinner size="16px" color="primary" />
      </q-inner-loading>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useFeedbackStore } from '../../stores/feedbackStore';

const props = withDefaults(defineProps<MessageMenuProps>(), {
  message: null,
});

const emit = defineEmits<{ (e: 'drop'): void }>();

const feedback = useFeedbackStore();

const loading = ref(false);

const buttons = computed(() => [
  {
    label: 'Изменить',
    icon: 'edit',
    color: 'primary',
    action: () => {
      feedback.selectedMessageFree = props.message?.data ?? null;
      feedback.openDialog('message_free');
    },
  },
  {
    label: 'Удалить',
    icon: 'close',
    color: 'red',
    action: () => emit('drop'),
  },
]);
interface MessageMenuProps {
  message: {
    data: MessageFree;
    label: string;
    condition: boolean;
    method: 'hello';
  } | null;
}
</script>

<style scoped lang="scss"></style>
