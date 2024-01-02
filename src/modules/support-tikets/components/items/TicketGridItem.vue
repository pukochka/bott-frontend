<template>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
    <q-card bordered flat class="rounded">
      <div class="q-pa-xs">
        <div class="row no-wrap items-center q-col-gutter-x-xs">
          <div class="col row justify-center">
            <q-checkbox dense :model-value="props.selected" />
          </div>

          <div class="col">
            <q-btn
              flat
              padding="4px"
              color="primary"
              class="rounded fit"
              icon="more_vert"
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
                <ticket-menu></ticket-menu>
              </q-menu>
            </q-btn>
          </div>

          <div class="col">
            <q-btn
              flat
              padding="4px"
              color="positive"
              class="rounded fit"
              :icon="mdiBriefcase"
            >
              <q-tooltip
                class="bott-tooltip text-center"
                anchor="top middle"
                self="bottom middle"
              >
                Взять в работу
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>

      <q-separator />

      <q-list dense>
        <div class="" v-for="col of props.cols" :key="col.name">
          <q-item v-if="col.name !== 'status'">
            <q-item-section>
              <q-item-label>{{ col.label }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label caption>{{ col.value }}</q-item-label>
            </q-item-section>
          </q-item>

          <ticket-status-view v-else :item="col"></ticket-status-view>
        </div>
      </q-list>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { mdiBriefcase } from '@quasar/extras/mdi-v7';
import TicketMenu from './sections/TicketMenu.vue';
import TicketStatusView from './sections/TicketStatusView.vue';

const vmProps = withDefaults(defineProps<TicketGridItemProps>(), {
  props: () => ({}),
});

interface TicketGridItemProps {
  props: any;
}
</script>

<style scoped lang="scss"></style>
