<template>
  <q-item
    clickable
    :data-selected="isSelected"
    class="bott-ticket--item rounded non-selectable"
    :class="[classes]"
    @click="support.openChat(props.ticket)"
  >
    <q-item-section>
      <q-item-label
        class="font-14 flex justify-start items-center overflow-hidden"
      >
        <div class="bott-ticket--item-info">
          <div class="bott-ticket--item-info-row">
            <span class="text-weight-bold ellipsis bott-ticket--item-user">
              {{ ticket.user.first_name }} {{ ticket.user.last_name }}
            </span>

            <q-space></q-space>

            <div
              :class="[' bg-' + ticketStatus.color]"
              class="bott-ticket--item-status text-no-wrap rounded text-white q-px-xs"
            >
              {{ ticketStatus.label }}
            </div>

            <div class="font-12 q-px-xs bott-ticket--item-message--time">
              {{ time }}
            </div>

            <q-icon
              size="16px"
              name="check"
              :color="isSelected ? 'white' : 'primary'"
              v-if="ticket.user.id === ticket.last_message?.user?.id"
            />
          </div>
        </div>
      </q-item-label>

      <q-item-label
        class="bott-ticket--item-message--content font-14 q-pt-xs"
        style="word-break: break-all"
      >
        <span class="ellipsis-2-lines">
          <q-icon
            size="20px"
            class="q-pr-sm"
            v-if="isMedia"
            :name="icon"
            :color="isSelected ? 'white' : 'primary'"
          />

          <span v-html="ticket.last_message?.message?.text"></span>
        </span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { defaultTicket } from '../../stores/supportModels';
import { mediaIcons } from '../../utils/common';
import { ticketStatuses } from '../../utils/statuses';

import { useSupportStore } from '../../stores/supportStore';
import { date } from 'quasar';

const props = withDefaults(defineProps<TicketItemProps>(), {
  ticket: () => defaultTicket,
});

const support = useSupportStore();

const isSelected = computed(
  () => props.ticket.id === support.selectedTicket?.id
);

const classes = computed(() =>
  isSelected.value
    ? 'rounded overflow-hidden bg-primary'
    : '' + (props.ticket.manager ? '' : ' bg-opacity--red')
);

const type = computed(() => props.ticket.last_message?.message?.type?.id ?? -1);

const icon = computed(() => mediaIcons[type.value]);

const isMedia = computed(() => ![0, 2].includes(type.value));

const ticketStatus = computed(
  () => ticketStatuses[props.ticket.status] ?? ticketStatuses[0]
);

const time = computed(() =>
  date.formatDate(
    Date.parse(props.ticket?.last_message?.created_at ?? '0'),
    'HH:mm'
  )
);

interface TicketItemProps {
  ticket: SupportTicket;
}
</script>

<style scoped lang="scss"></style>
