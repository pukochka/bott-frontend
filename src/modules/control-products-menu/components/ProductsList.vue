<template>
  <q-table
    wrap-cells
    separator="cell"
    dense
    flat
    hide-bottom
    bordered
    :rows="products"
    :columns="columns"
    row-key="id"
    selection="multiple"
    v-model:selected="data.selected"
  >
    <template v-slot:header-selection="scope">
      <q-checkbox dense size="38px" color="primary" v-model="scope.selected" />
    </template>

    <template v-slot:body-selection="scope">
      <q-checkbox dense size="38px" color="primary" v-model="scope.selected" />
    </template>

    <template v-slot:body="props">
      <q-tr :props="props" style="max-width: 100%">
        <q-td>
          <q-checkbox
            dense
            size="38px"
            color="primary"
            :model-value="props.selected"
            @update:model-value="
              (val) =>
                Object.getOwnPropertyDescriptor(props, 'selected').set(val)
            "
          />
        </q-td>

        <q-td v-for="col of props.cols" :key="col.name" :props="props">
          <component
            :props="props"
            :is="sections[col.name]"
            :products="vmProps.products"
          ></component>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { columns } from '../stores/columns';

import { useDataStore } from '../stores/dataStore';

import TitleSection from './products-sections/TitleSection.vue';
import AmountSection from './products-sections/AmountSection.vue';
import PriceSection from './products-sections/PriceSection.vue';
import ActionsSection from './products-sections/ActionsSection.vue';

const vmProps = withDefaults(defineProps<ProductsListProps>(), {
  products: () => [],
});

const data = useDataStore();

const sections = {
  title: TitleSection,
  price: PriceSection,
  amount: AmountSection,
  actions: ActionsSection,
};

interface ProductsListProps {
  products: Array<any>;
}
</script>

<style lang="scss" scoped>
.bott-products--table .q-table {
  max-width: 100%;
}
</style>
