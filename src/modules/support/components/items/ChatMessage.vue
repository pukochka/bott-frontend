<template>
  <div
    class="relative-position q-mx-sm"
    :class="[message.status ? ' self-end' : ' self-start']"
  >
    <q-card
      flat
      class="q-pt-xs q-px-sm"
      :class="[message.status ? ' rounded-none-right' : ' rounded-none-left']"
      :style="{ 'max-width': '450px' }"
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

    <message-appendix
      :style="{
        transform: !props.message.status ? 'scale(-1, 1)' : '',
        left: !props.message.status ? '-8px' : '',
        right: props.message.status ? '-8px' : '',
      }"
    ></message-appendix>
  </div>
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
