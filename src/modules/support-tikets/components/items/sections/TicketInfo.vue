<template>
  <q-item class="items-center">
    <q-item-section>{{ label }}</q-item-section>

    <q-item-section
      side
      :style="{ maxWidth: percents + '%' }"
      class="ellipsis-3-lines"
    >
      <q-item-label caption>
        {{ value }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed } from 'vue';

withDefaults(defineProps<TicketInfoProps>(), {
  label: '',
  value: '',
});

const quasar = useQuasar();

const percents = computed(() => (quasar.screen.lt.sm ? 60 : 70));

interface TicketInfoProps {
  label: any;
  value: any;
}
</script>

<style scoped lang="scss"></style>
