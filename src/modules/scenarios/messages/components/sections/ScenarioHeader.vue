<template>
  <div
    class="q-px-md flex justify-between items-center no-wrap"
    style="height: 50px"
  >
    <bott-breadcrumbs class="text-size-13"></bott-breadcrumbs>

    <q-card flat bordered class="rounded">
      <q-btn
        flat
        color="primary"
        class="text-weight-bold rounded"
        :label="data.scenarioValue?.label"
      >
        <q-menu anchor="top right" self="bottom right" class="bott-portal-menu">
          <q-list separator dense>
            <q-item
              clickable
              v-close-popup
              class="row items-center"
              :href="button.href"
              v-for="(button, index) in menuButtons"
              :key="index"
              @click="button.action"
            >
              <q-icon :name="button.icon" :color="button.color" size="22px" />

              <div class="text-center q-ml-md flex-grow">
                {{ button.label }}
              </div>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { t } from 'src/boot/lang';

import { useStatesStore } from '../../stores/states/statesStore';
import { useDataStore } from '../../stores/data/dataStore';

import BottBreadcrumbs from 'layouts/sections/BottBreadcrumbs.vue';

const states = useStatesStore();
const data = useDataStore();

const menuButtons = [
  {
    label: t('edit-title'),
    color: 'primary',
    icon: 'edit',
    href: null,
    action: () => states.openDialog('edit_label'),
  },
  {
    label: 'FAQ',
    color: 'primary',
    icon: 'quiz',
    href: '/lk/common/premium/route/help?bot_id=' + 886,
    action: () => '',
  },
];
</script>
<style lang="scss"></style>
