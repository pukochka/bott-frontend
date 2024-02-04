<template>
  <div class="row no-wrap justify-center">
    <div class="bott-token text-primary" v-if="isMedia">
      <span class="text-caption">{{ mediaLabel }}</span>
    </div>

    <div
      v-else
      class="ellipsis-2-lines text-wrap text-caption"
      style="max-width: 150px"
      v-html="text"
    ></div>

    <q-badge color="primary" rounded class="self-start q-ml-xs" v-if="isUser">
      <q-tooltip
        class="bott-tooltip text-center"
        anchor="top middle"
        self="bottom middle"
        :delay="1000"
      >
        Сообщение от пользователя
      </q-tooltip>
    </q-badge>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defaultTicket } from '../../../stores/supportModels';
import { grinding } from '../../../../../utils/helpers/grinding';

const props = withDefaults(defineProps<TicketMessageProps>(), {
  ticket: () => defaultTicket,
  col: () => ({}),
});

const isUser = computed(
  () => props.ticket?.last_message?.user?.id === props.ticket.user.id
);

const isMedia = computed(
  () => ![0, 2].includes(props.ticket?.last_message?.message?.type?.id ?? -1)
);

const text = computed(() =>
  grinding(props.ticket?.last_message?.message?.text ?? '')
);

const mediaLabel = computed(
  () => media[props.ticket?.last_message?.message?.type?.id ?? 1]
);

const media: Record<number, string> = {
  1: 'Изображение',
  3: 'Файл',
  4: 'Видео',
  5: 'Анимация',
};

interface TicketMessageProps {
  ticket: SupportTicket;
  col?: any;
}
</script>

<style scoped lang="scss"></style>
