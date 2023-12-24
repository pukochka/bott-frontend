<template>
  <q-card
    flat
    class="rounded q-pt-xs q-px-sm overflow-hidden"
    :style="{ 'max-width': '450px' }"
    :class="[message.status ? 'self-end' : 'self-start']"
  >
    <q-img
      class="q-mt-xs rounded"
      v-if="message?.image"
      src="/src/assets/telega.png"
      spinner-color="primary"
      fit="cover"
      :ratio="4 / 3"
    />

    <div
      class="row text-primary text-caption text-weight-bold"
      :class="[message.status ? ' justify-end q-mr-xs' : ' q-ml-xs']"
    >
      {{ message.name }}
    </div>

    <div class="column items-end">
      <div class="font-14">{{ message.message }}</div>

      <div class="text-caption self-end">{{ message.time }}</div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<ChatMessageProps>(), {
  message: () => ({}),
});

interface ChatMessageProps {
  message: any;
}
</script>

<style scoped lang="scss">
.bg-blur {
  filter: blur(12px);
}
</style>
