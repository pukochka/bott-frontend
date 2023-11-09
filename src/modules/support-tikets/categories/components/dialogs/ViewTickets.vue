<template>
  <q-dialog v-model="data.dialogs['view-tickets']" position="bottom" full-width>
    <div class="row justify-center q-pt-xl">
      <q-card class="dialog-rounded bott-dialog__responsive" flat bordered>
        <dialog-header label="Просмотр всех тикетов категории"></dialog-header>

        <div class="q-px-md">
          <q-tabs
            dense
            v-model="tab"
            class="text-primary full-width row bott-tab__indicator"
          >
            <q-tab no-caps name="mails" label="В работе" class="col rounded" />
            <q-tab no-caps name="alarms" label="Закрытые" class="col rounded" />
          </q-tabs>
        </div>

        <q-card-section class="relative-position">
          <div class="absolute-full flex flex-center text-center" v-if="false">
            <div class="">
              <div class="">
                <q-icon name="font_download" color="primary" size="32px" />
              </div>

              <div class="">В категории нет тикетов</div>
            </div>
          </div>

          <q-virtual-scroll
            style="max-height: calc(100vh - 250px); min-height: 200px"
            :items="data.tickets"
            class="bott-dialog__virtual-scroll"
          >
            <template v-slot="{ item, index }">
              <ticket-item
                :ticket="item"
                :key="index"
                classes="col-12 col-sm-6 col-md-4 col-lg-3"
              ></ticket-item>
            </template>
          </q-virtual-scroll>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useDataStore } from '../../stores/dataStore';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import TicketItem from '../sections/TicketItem.vue';

const data = useDataStore();

const tab = ref('');
</script>

<style lang="scss" scoped></style>
