<template>
  <info-list :columns="columns" :rows="info"></info-list>
</template>

<script lang="ts" setup>
import InfoList from 'src/components/info/InfoList.vue';

const columns = [
  {
    label: 'Название',
    field: 'label',
  },
  {
    label: 'Бесплатный',
    field: 'free',
  },
  {
    label: 'Полный',
    field: 'full',
    color: 'warning',
  },
  {
    label: 'Расширенный',
    field: 'advanced',
    color: 'success',
  },
  {
    label: 'Профессиональный',
    field: 'professional',
    color: 'negative',
  },
];

const info = [
  {
    label: 'Доступ к изменению меню',
    free: '-',
    full: '-',
    advanced: '+',
    professional: '+',
  },
  {
    label: 'Доступ к модулям ограничения доступа',
    free: '-',
    full: '-',
    advanced: '+',
    professional: '+',
  },
  {
    label: 'Доступ к командам',
    free: '-',
    full: '-',
    advanced: '-',
    professional: '+',
  },
  {
    label: 'Доступ к свободным сообщениям(Возможность создавать цепочки)',
    free: '-',
    full: '+',
    advanced: '+',
    professional: '+',
  },
  {
    label: 'Дополнительное дублирование файлов на серверах BOT-T',
    free: '-',
    full: '+',
    advanced: '+',
    professional: '+',
  },
  {
    label: 'Срок хранения транзакций',
    free: '50 Дней',
    full: '150 Дней',
    advanced: '300 Дней',
    professional: '500 Дней',
  },
];
</script>

<style lang="scss" scoped></style>
