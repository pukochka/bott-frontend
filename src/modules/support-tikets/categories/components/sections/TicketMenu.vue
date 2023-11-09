<template>
  <q-menu anchor="bottom end" self="top right" class="bott-portal-menu">
    <div class="text-center text-body2 text-primary q-pa-xs">
      Тикет №{{ ticket.id }}
    </div>

    <q-separator></q-separator>

    <q-list style="min-width: 100px" dense>
      <q-item
        clickable
        v-close-popup
        v-for="(button, index) of ticketActions"
        :key="index"
      >
        <q-item-section avatar>
          <q-icon :name="button.icon" :color="button.color" size="22px" />
        </q-item-section>

        <q-item-section>{{ button.label }}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script lang="ts" setup>
import {
  mdiBullhorn,
  mdiReply,
  mdiTuneVariant,
  mdiAccountPlus,
} from '@quasar/extras/mdi-v7';

const props = withDefaults(defineProps<TicketMenuProps>(), {
  ticket: null,
});

const ticketActions = [
  {
    label: 'Передать другому исполнителю',
    icon: mdiAccountPlus,
    action: '',
    color: 'grey',
    condition: '',
  },
  {
    label: 'Переместить тикет в другую категорию',
    icon: mdiReply,
    action: '',
    color: 'orange',
    condition: '',
  },
  {
    label: 'Предложить закрыть тикет',
    icon: mdiBullhorn,
    action: '',
    color: 'primary',
    condition: '',
  },
  {
    label: 'Взять тикет в работу',
    icon: 'check',
    action: '',
    color: 'green',
    condition: '',
  },
  {
    label: 'Редактировать настройки тикета',
    icon: mdiTuneVariant,
    action: '',
    color: 'primary',
    condition: '',
  },
  {
    label: 'Удалить тикет',
    icon: 'close',
    action: '',
    color: 'red',
    condition: '',
  },
];

interface TicketMenuProps {
  ticket: any;
}
</script>

<style lang="scss" scoped></style>
