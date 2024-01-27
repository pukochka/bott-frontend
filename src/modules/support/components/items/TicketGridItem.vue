<template>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
    <q-card bordered flat class="rounded transition">
      <div class="q-pa-xs">
        <div class="row no-wrap items-center q-col-gutter-x-xs">
          <div class="col">
            <q-btn
              flat
              padding="4px"
              color="primary"
              class="rounded fit"
              icon="more_vert"
              @click="support.selectedTicket = vmProps.props.row"
            >
              <q-tooltip
                class="bott-tooltip text-center"
                anchor="top middle"
                self="bottom middle"
              >
                Действия
              </q-tooltip>

              <q-menu
                class="bott-portal-menu"
                anchor="bottom middle"
                self="top middle"
              >
                <ticket-menu :ticket="vmProps.props.row"></ticket-menu>
              </q-menu>
            </q-btn>
          </div>

          <div class="col">
            <table-buttons :ticket="props.row" fit></table-buttons>
          </div>
        </div>
      </div>

      <q-separator />

      <q-list class="relative-position overflow-hidden">
        <component
          v-for="col of props.cols"
          :key="col.name"
          :is="col.component"
          :label="col.label"
          :value="col.value"
        ></component>

        <div
          class="absolute-full"
          v-clickable
          @click="support.openChat(vmProps.props.row)"
        ></div>
      </q-list>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { defaultTicket } from '../../stores/supportModels';

import { useSupportStore } from '../../stores/supportStore';

import TicketMenu from './sections/TicketMenu.vue';
import TableButtons from './sections/TableButtons.vue';

const vmProps = withDefaults(defineProps<TicketGridItemProps>(), {
  props: () => ({ row: defaultTicket, cols: [] }),
});

const support = useSupportStore();

interface TicketGridItemProps {
  props: { row: SupportTicket; cols: Array<any> };
}
</script>

<style scoped lang="scss"></style>
