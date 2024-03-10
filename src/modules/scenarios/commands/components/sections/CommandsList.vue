<template>
  <div class="">
    <div class="row items-stretch q-col-gutter-md">
      <div class="col-12 col-sm-6">
        <q-card flat bordered class="rounded fit">
          <q-tabs
            dense
            v-model="tab"
            class="text-primary bott-tab__indicator overflow-hidden fit">
            <q-tab name="all" no-caps label="Все" class="col" />

            <q-tab name="actions" no-caps label="Действия" class="col" />

            <q-tab name="scenarios" no-caps label="Сценарии" class="col" />
          </q-tabs>
        </q-card>
      </div>

      <div class="col-12 col-sm-6">
        <q-input
          dense
          v-model="search"
          label="Поиск..."
          outlined
          class="bott-input--rounded fit">
          <template #append>
            <q-icon name="search" color="primary" size="24px" />
          </template>
        </q-input>
      </div>
    </div>
  </div>

  <div class="relative-position" style="min-height: 200px">
    <div
      class="row q-col-gutter-md"
      v-if="commands.commands?.length && !commands.loading">
      <command-item
        v-for="command of filtered"
        :key="command.id"
        :command="command"></command-item>
    </div>

    <div
      v-if="!commands.commands?.length && !commands.loading"
      class="flex flex-center absolute-full text-center text-primary text-h6">
      У Вас пока нет сценариев
    </div>

    <transition name="q-transition--fade">
      <div
        class="absolute-full flex flex-center"
        v-if="
          commands.commands?.length && !filtered.length && !commands.loading
        ">
        <div class="column items-center">
          <q-icon name="search" color="primary" size="32px" />

          <div class="text-h6">Ничего не нашлось (:</div>
        </div>
      </div>
    </transition>

    <q-inner-loading :showing="commands.loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import { useCommandsStore } from '../../stores/commandsStore';

import CommandItem from '../CommandItem.vue';

const commands = useCommandsStore();

const search = ref('');
const tab = ref('all');

const filtered = computed(() =>
  commands.commands
    .filter(Boolean)
    .filter((command) =>
      tab.value === 'scenarios'
        ? command.is_column
        : tab.value === 'actions'
        ? !command.is_column
        : command
    )
    .filter((command) =>
      command.label.toLowerCase().includes(search.value.toLowerCase())
    )
);

watch(tab, () => (search.value = ''));
</script>

<style lang="scss" scoped></style>
