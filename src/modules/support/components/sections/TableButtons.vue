<template>
  <q-btn
    flat
    padding="4px"
    class="rounded"
    :class="[props.fit ? ' fit' : '']"
    v-for="(button, index) of buttons"
    :key="index"
    :color="button.color"
    :icon="button.icon"
    :loading="loading"
    v-show="button.condition"
    @click="button.action"
  >
    <q-tooltip
      class="bott-tooltip text-center"
      anchor="top middle"
      self="bottom middle"
    >
      {{ button.label }}
    </q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { defaultTicket } from '../../stores/supportModels';

import { useSupportStore } from '../../stores/supportStore';

import { mdiBriefcase, mdiTagCheck, mdiTagOff } from '@quasar/extras/mdi-v7';

const props = withDefaults(defineProps<TableButtonsProps>(), {
  ticket: () => defaultTicket,
  fit: false,
});

const support = useSupportStore();

const loading = ref(false);

const offerTicket = () => {
  support.selectedTicket = props.ticket;
  support.workStatus(
    3,
    props.ticket.id,
    () => (loading.value = true),
    () => (loading.value = false)
  );
};

const pickTicket = () => {
  support.selectedTicket = props.ticket;
  support.workStatus(
    2,
    props.ticket.id,
    () => (loading.value = true),
    () => (loading.value = false)
  );
};

const closeTicket = () => {
  support.selectedTicket = props.ticket;
  support.workStatus(
    1,
    props.ticket.id,
    () => (loading.value = true),
    () => (loading.value = false)
  );
};

const buttons = computed(() => [
  {
    label: 'Взять в работу',
    color: 'positive',
    icon: mdiBriefcase,
    action: pickTicket,
    condition: [1, 5].includes(props.ticket.status),
  },
  {
    label: 'Предложить закрыть тикет',
    color: 'warning',
    icon: mdiTagOff,
    action: offerTicket,
    condition: props.ticket.status === 2,
  },
  {
    label: 'Закрыть тикет',
    color: 'accent',
    icon: mdiTagCheck,
    action: closeTicket,
    condition: props.ticket.status === 3,
  },
]);

interface TableButtonsProps {
  ticket: SupportTicket;
  fit?: boolean;
}
</script>

<style scoped lang="scss"></style>
