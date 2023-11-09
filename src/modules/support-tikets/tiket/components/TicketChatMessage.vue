<template>
  <q-card flat bordered class="inline-block q-px-xs" :class="[classes]">
    <div class="column">
      <q-img
        v-if="message.image"
        :src="message.image"
        fit="fill"
        class="rounded q-pt-xs"
        style="max-height: 200px"
      />

      <div :class="[classes]" class="text-caption">{{ message.name }}</div>

      <div class="">
        {{ message.message }}
      </div>
    </div>
  </q-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<TicketChatMessageProps>(), {
  message: null,
});

const classes = computed(() =>
  props.message.status ? ' self-end ' : ' self-start'
);

interface TicketChatMessageProps {
  message: any;
}
</script>

<style lang="scss" scoped></style>
