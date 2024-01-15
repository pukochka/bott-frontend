<template>
  <q-card flat bordered class="rounded q-px-sm q-pb-sm" v-if="visible">
    <panel-header icon="settings" label="Панель управления"></panel-header>

    <div class="row q-col-gutter-sm">
      <div
        :class="[
          index + 1 === menu.length && menu.length % 2 ? '  col' : ' col-6',
        ]"
        v-for="(item, index) of menu"
        :key="index">
        <q-item
          clickable
          class="rounded fit"
          :class="['text-' + item.color]"
          :href="item.color !== 'danger' ? item.link : undefined"
          @click="activate(item)">
          <q-item-section>
            <q-item-label class="text-center text-body2">
              {{ item.label }}
            </q-item-label>
          </q-item-section>

          <q-tooltip
            v-if="item.description"
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle">
            {{ item.description }}
          </q-tooltip>
        </q-item>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useInlineStore } from '../../stores/inlineStore';
import { useDialog } from '../../../file-manager/stores/useDialog';

import PanelHeader from '../PanelHeader.vue';
import { historyGo } from '../../stores/helpers';

const inline = useInlineStore();

const activate = (item: any) => {
  if (item.color !== 'danger') return;

  useDialog(
    'Подтвердить действие ' +
      '<span class="text-red">' +
      item.label +
      '</span>',
    true
  ).onOk(historyGo.bind(this, item.link));
};

const menu = computed(() => inline.message.frontendMenu);

const visible = computed(() => menu.value.length);
</script>

<style scoped lang="scss"></style>
