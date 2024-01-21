<template>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
    <q-card
      bordered
      flat
      class="rounded transition"
      :style="{ transform: `scale(${vmProps.props.selected ? '0.95' : '1'})` }"
    >
      <div class="q-pa-xs">
        <div class="row no-wrap items-center q-col-gutter-x-xs">
          <div class="col">
            <q-item
              dense
              clickable
              class="rounded row justify-center"
              tag="label"
            >
              <q-checkbox
                dense
                :model-value="vmProps.props.selected"
                @update:model-value="updateSelected"
              />

              <q-tooltip
                class="bott-tooltip text-center"
                anchor="top middle"
                self="bottom middle"
              >
                {{ vmProps.props.selected ? 'Убрать' : 'Выбрать' }}
              </q-tooltip>
            </q-item>
          </div>

          <div class="col">
            <q-btn
              flat
              padding="4px"
              color="primary"
              class="rounded fit"
              icon="more_vert"
              :loading="loading"
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
                <ticket-menu
                  :ticket="vmProps.props.row"
                  @loading="(value) => (loading = value)"
                ></ticket-menu>
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
          @click="support.openChat(vmProps.props?.row)"
        ></div>

        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          Перейти в чат
        </q-tooltip>
      </q-list>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useSupportStore } from '../../stores/supportStore';

import { mdiBriefcase } from '@quasar/extras/mdi-v7';

import TicketMenu from './sections/TicketMenu.vue';

const vmProps = withDefaults(defineProps<TicketGridItemProps>(), {
  props: () => ({}),
});

const support = useSupportStore();

const loading = ref(false);

const updateSelected = () => {
  if (vmProps.props.selected) {
    support.selected = support.selected.filter(
      (item) => vmProps.props.row.id !== item.id
    );

    return;
  }

  support.selected.push(vmProps.props.row);
};

interface TicketGridItemProps {
  props: any;
}
</script>

<style scoped lang="scss"></style>
