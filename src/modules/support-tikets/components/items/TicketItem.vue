<template>
  <div :class="[classes]">
    <q-card flat bordered class="rounded text-size-12 overflow-hidden">
      <div class="row justify-between items-center">
        <div class="text-primary text-body2 q-px-sm">
          Тикет №{{ ticket.id }}
        </div>

        <q-btn square dense flat size="md" color="primary" icon="more_vert">
          <q-tooltip
            class="bott-tooltip"
            anchor="top middle"
            self="bottom middle"
          >
            Действия
          </q-tooltip>
        </q-btn>
      </div>

      <q-separator />

      <q-list dense v-clickable @click="work.chat = true">
        <q-tooltip
          class="bott-tooltip"
          anchor="top middle"
          self="bottom middle"
        >
          Перейти в чат
        </q-tooltip>

        <q-item v-for="(item, index) of info" :key="index">
          <q-item-section>{{ item.label }}</q-item-section>

          <q-item-section side>{{ item.value }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { date } from 'quasar';

import { useWorkStore } from '../../stores/workStore';

const props = withDefaults(defineProps<CategoryTicketProps>(), {
  ticket: null,
  classes: 'col-12 col-sm-6',
});

const work = useWorkStore();

const info = [
  {
    label: 'Статус',
    value: props.ticket.status,
  },
  {
    label: 'Запрос от',
    value: props.ticket.request_from,
  },
  {
    label: 'Исполнитель',
    value: props.ticket.executor,
  },
  {
    label: 'Время создания',
    value: date.formatDate(
      Number(props.ticket.create_at + '000'),
      'DD-MM-YYYY hh:mm'
    ),
  },
];

interface CategoryTicketProps {
  ticket: any;
  classes?: string;
}
</script>

<style lang="scss" scoped></style>
