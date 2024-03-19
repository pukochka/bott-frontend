<template>
  <q-item
    clickable
    :data-selected="isSelected"
    :class="[classes]"
    class="bott-ticket--item rounded non-selectable"
    @click="handleOpenChat"
  >
    <q-item-section>
      <q-item-label
        class="font-14 flex justify-start items-center overflow-hidden"
      >
        <div class="bott-ticket--item-info">
          <div class="bott-ticket--item-info-row">
            <span class="text-weight-bold ellipsis bott-ticket--item-user">
              {{ ticket.title }}
              <span class="bott-ticket--item-message--time">
                ({{ ticket.user.first_name }} {{ ticket.user.last_name }})
              </span>
            </span>

            <q-space></q-space>

            <div
              :class="[' bg-' + ticketStatus.color]"
              class="bott-ticket--item-status text-no-wrap rounded text-white q-px-xs"
            >
              {{ ticketStatus.label }}
            </div>

            <div class="font-12 q-px-xs bott-ticket--item-message--time">
              {{
                getMessageFormattedTime(
                  props.ticket?.last_message?.created_at ?? '0'
                )
              }}
            </div>
          </div>
        </div>
      </q-item-label>

      <div class="row no-wrap items-start q-pt-xs">
        <q-item-label
          style="word-break: break-all"
          class="bott-ticket--item-message--content col font-14"
        >
          <span class="ellipsis-2-lines">
            <q-icon
              size="20px"
              class="q-pr-sm"
              v-if="isMedia"
              :name="icon"
              :color="isSelected ? 'white' : 'primary'"
            />

            <span v-html="lastMessage"></span>
          </span>
        </q-item-label>

        <q-avatar
          size="16px"
          :color="isSelected ? 'white' : 'grey'"
          v-if="ticket.user.id === ticket.last_message?.user?.id"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { defaultTicket } from '../../stores/supportModels';
import { mediaIcons } from '../../utils/common';
import {
  getMessageFormattedTime,
  ticketStatuses,
} from '../../utils/messageMeta';
import { replaceUnsolvableTags } from 'src/utils/helpers/replace';

import { useSupportStore } from '../../stores/supportStore';

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

const lastMessage = computed(() =>
  replaceUnsolvableTags(props.ticket.last_message?.message?.text)
);

const handleOpenChat = () => {
  if (support.selectedTicket?.id === props.ticket.id) return;

  support.openChat(props.ticket);
};

interface TicketItemProps {
  ticket: SupportTicket;
}
</script>

<style scoped lang="scss"></style>
