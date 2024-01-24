<template>
  <q-btn
    flat
    padding="4px"
    color="accent"
    class="rounded"
    v-if="![2].includes(props.ticket.status)"
    :icon="mdiBriefcase"
    :loading="loading.pick"
    @click="pickTicket"
  >
    <q-tooltip
      class="bott-tooltip text-center"
      anchor="top middle"
      self="bottom middle"
    >
      Взять в работу
    </q-tooltip>
  </q-btn>

  <q-btn
    flat
    v-else
    padding="4px"
    color="warning"
    class="rounded"
    :icon="mdiTagOff"
    :loading="loading.offer"
    @click="offerTicket"
  >
    <q-tooltip
      class="bott-tooltip text-center"
      anchor="top middle"
      self="bottom middle"
    >
      Предложить закрыть тикет
    </q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defaultTicket } from '../../../stores/supportModels';
import { mdiBriefcase, mdiTagOff } from '@quasar/extras/mdi-v7';
import { useSupportStore } from '../../../stores/supportStore';

const props = withDefaults(defineProps<TableButtonsProps>(), {
  ticket: () => defaultTicket,
});

const support = useSupportStore();

const loading = ref({
  pick: false,
  offer: false,
});

const offerTicket = () => {
  support.workStatus(
    3,
    props.ticket.id,
    () => (loading.value.offer = true),
    () => (loading.value.offer = false)
  );
};

const pickTicket = () => {
  support.workStatus(
    2,
    props.ticket.id,
    () => (loading.value.pick = true),
    () => (loading.value.pick = false)
  );
};

interface TableButtonsProps {
  ticket: SupportTicket;
}
</script>

<style scoped lang="scss"></style>
