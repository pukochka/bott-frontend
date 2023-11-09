<template>
  <div class="">
    <div class="row items-stretch q-col-gutter-md">
      <div class="col-12 col-sm-6">
        <q-card flat bordered class="rounded fit">
          <q-tabs
            dense
            v-model="tab"
            class="text-primary bott-tab__indicator overflow-hidden fit"
          >
            <q-tab name="all" no-caps :label="$t('all')" class="col" />

            <q-tab name="actions" no-caps :label="$t('actions')" class="col" />

            <q-tab
              name="scenarios"
              no-caps
              :label="$t('scenarios')"
              class="col"
            />
          </q-tabs>
        </q-card>
      </div>

      <div class="col-12 col-sm-6">
        <q-input
          dense
          v-model="search"
          label="Поиск..."
          outlined
          class="bott-input--rounded fit"
        >
          <template #append>
            <q-icon name="search" color="primary" size="24px" />
          </template>
        </q-input>
      </div>
    </div>
  </div>

  <div class="relative-position" style="min-height: 200px">
    <div class="row q-col-gutter-md" v-if="data.commands?.length">
      <command-item
        v-for="command of data.commands"
        :key="command.id"
        :command="command"
      ></command-item>
    </div>

    <div
      v-else
      class="flex flex-center absolute-full text-center text-primary text-h6"
    >
      {{ $t('create-scenarios-action') }}
    </div>

    <q-inner-loading :showing="data.loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

import { useDataStore } from '../../stores/dataStore';

import CommandItem from '../CommandItem.vue';

const data = useDataStore();

const search = ref('');
const tab = ref('all');

watch(tab, () => (search.value = ''));
</script>

<style lang="scss" scoped></style>
