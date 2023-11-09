<template>
  <div class="bott-page__subtitle">Возможности тарифов</div>

  <q-table
    flat
    bordered
    hide-bottom
    class="bott-table rounded"
    :rows="props.rows"
    :columns="props.columns"
    wrap-cells
    row-key="name"
    separator="none"
    :rows-per-page-options="[0]"
  >
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.label"
          :class="['text-color--' + (col.color ?? '')]"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body-cell="props">
      <q-td :props="props" no-hover>
        <info-icon :value="props.value"></info-icon>
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import InfoIcon from './InfoIcon.vue';

const props = withDefaults(defineProps<InfoListProps>(), {
  faq: false,
  rows: () => [],
  columns: () => [],
});

interface InfoListProps {
  columns: Array<any>;
  rows: Array<any>;
  faq?: boolean;
}
</script>

<style lang="scss" scoped></style>
