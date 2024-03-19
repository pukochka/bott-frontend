<template>
  <div class="bott-page__background" id="support-chat-card">
    <div class="row items-center no-wrap relative-position">
      <div class="q-px-sm ellipsis" style="font-size: 1rem">
        <div class="ellipsis q-gutter-x-sm text-color--grey">
          <span class="text-weight-bold">
            {{ support.selectedTicket?.user?.first_name }}
            {{ support.selectedTicket?.user?.last_name }}
          </span>

          <span
            v-clickable
            v-html="support.selectedTicket?.user?.link"
            class="text-primary cursor-pointer rounded"
            @click="copyToClipboard(support.selectedTicket?.user?.link ?? '')"
          >
          </span>
        </div>

        <div class="text-caption bott-ticket--item-message--content ellipsis">
          {{ support.selectedTicket?.title }}
        </div>
      </div>

      <q-space></q-space>

      <q-btn flat square color="primary" icon="more_vert" v-if="md || splitter">
        <q-menu class="bott-portal-menu">
          <q-list dense>
            <q-item
              clickable
              v-close-popup
              v-for="(button, index) of buttons"
              :key="index"
              v-show="button.condition"
              @click="button.action"
            >
              <q-item-section avatar>
                <q-icon :name="button.icon" :color="button.color" size="26px" />
              </q-item-section>

              <q-item-section>{{ button.label }}</q-item-section>

              <q-inner-loading :showing="button.loading">
                <q-spinner-gears size="32px" color="primary" />
              </q-inner-loading>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <div class="row no-wrap" v-else>
        <q-btn
          flat
          square
          padding="8px 22px"
          v-for="(button, index) of buttons"
          :key="index"
          v-show="button.condition"
          :loading="button.loading"
          :color="button.color"
          :icon="button.icon"
          @click="button.action"
        >
          <q-tooltip
            class="bott-tooltip text-center"
            anchor="bottom middle"
            self="top middle"
          >
            {{ button.label }}
          </q-tooltip>
        </q-btn>
      </div>

      <q-btn
        padding="8px 22px"
        square
        flat
        size="md"
        color="primary"
        icon="info"
        @click="toggleDrawer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { ticketMenu, TicketMenuNames } from '../../../utils/ticket-menu';

import { useSupportStore } from '../../../stores/supportStore';
import { copyToClipboard, useQuasar } from 'quasar';

const support = useSupportStore();
const quasar = useQuasar();

const md = computed(() => quasar.screen.lt.md);
const splitter = computed(() => support.rightSplitterPanel < 250);

const loading = ref({
  offer: false,
  pick: false,
  delete: false,
  close: false,
});

const buttons = computed(() =>
  Object.entries(ticketMenu).map(([key, value]) =>
    Object.assign(actions.value[<TicketMenuNames>key], value)
  )
);

const toggleDrawer = () => {
  support.drawer = !support.drawer;
};

const pickTicket = () => {
  support.workStatus(
    2,
    support.selectedTicket?.id ?? -1,
    () => (loading.value.pick = true),
    () => (loading.value.pick = false)
  );
};

const offerTicket = () => {
  support.workStatus(
    3,
    support.selectedTicket?.id ?? -1,
    () => (loading.value.offer = true),
    () => (loading.value.offer = false)
  );
};

const deleteTicket = () => {
  support.deleteTicket(
    support.selectedTicket?.id ?? -1,
    () => (loading.value.delete = true),
    () => (loading.value.delete = false)
  );
};

const closeTicket = () => {
  support.workStatus(
    1,
    support.selectedTicket?.id ?? -1,
    () => (loading.value.close = true),
    () => (loading.value.close = false)
  );
};

onMounted(() => {
  support.updateChatActionButtons(50);
});

const actions = computed(
  (): Record<TicketMenuNames, any> => ({
    pick: {
      action: pickTicket,
      condition: ![2].includes(support.selectedTicket?.status ?? -1),
      loading: loading.value.pick,
    },
    close: {
      action: closeTicket,
      condition: [3].includes(support.selectedTicket?.status ?? -1),
      loading: loading.value.close,
    },
    transfer: {
      action: () => (support.dialogs.implementor_transfer = true),
      condition: [2, 3, 4].includes(support.selectedTicket?.status ?? -1),
      loading: false,
    },
    offer: {
      action: offerTicket,
      condition: [2].includes(support.selectedTicket?.status ?? -1),
      loading: loading.value.offer,
    },
    move: {
      action: () => (support.dialogs.transfer_ticket = true),
      condition: true,
      loading: false,
    },
    delete: {
      action: deleteTicket,
      condition: true,
      loading: loading.value.delete,
    },
    edit: {
      action: () => (support.dialogs.edit_ticket = true),
      condition: true,
      loading: false,
    },
  })
);
</script>

<style scoped lang="scss"></style>
