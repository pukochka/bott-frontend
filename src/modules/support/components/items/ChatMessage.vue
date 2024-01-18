<template>
  <q-card
    flat
    class="q-pt-xs q-px-sm"
    :style="{ 'max-width': '450px' }"
    :class="[
      message.status
        ? ' self-end rounded-none-right'
        : ' self-start rounded-none-left',
    ]"
  >
    <q-img
      class="q-mt-xs rounded"
      v-if="message?.image"
      src="/src/assets/telega.png"
      spinner-color="primary"
      fit="cover"
      :ratio="4 / 3"
    />

    <message-appendix
      class="absolute"
      style="bottom: 0; right: -1px"
    ></message-appendix>

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
import MessageAppendix from '../../../../components/emoji/MessageAppendix.vue';

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

.rounded-none-left {
  border-radius: 10px 10px 10px 0;
}
.rounded-none-right {
  border-radius: 10px 10px 0 10px;
}
</style>
