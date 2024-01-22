<template>
  <q-btn
    flat
    padding="4px"
    color="accent"
    class="rounded"
    v-if="![2].includes(props.ticket.status)"
    :icon="mdiBriefcase"
    :loading="loading.pick"
    @click="pickTicket(props.ticket.id)"
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
    color="positive"
    class="rounded"
    :icon="mdiTagCheck"
    :loading="loading.close"
    @click="closeTicket(props.ticket.id)"
  >
    <q-tooltip
      class="bott-tooltip text-center"
      anchor="top middle"
      self="bottom middle"
    >
      Закрыть тикет
    </q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defaultTicket } from '../../../stores/supportModels';
import { mdiBriefcase, mdiTagCheck } from '@quasar/extras/mdi-v7';
import { useSupportStore } from '../../../stores/supportStore';

const props = withDefaults(defineProps<TableButtonsProps>(), {
  ticket: () => defaultTicket,
});

const support = useSupportStore();

const loading = ref({
  pick: false,
  close: false,
});

const closeTicket = (id: number) => {
  support.workStatus(
    1,
    id,
    () => (loading.value.close = true),
    () => (loading.value.close = false)
  );
};

const pickTicket = (id: number) => {
  support.workStatus(
    2,
    id,
    () => (loading.value.pick = true),
    () => (loading.value.pick = false)
  );
};

interface TableButtonsProps {
  ticket: SupportTicket;
}
</script>

<style scoped lang="scss"></style>
