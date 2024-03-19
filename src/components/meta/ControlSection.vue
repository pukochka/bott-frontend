<template>
  <q-card flat bordered class="rounded q-px-sm q-pb-sm" v-if="visible">
    <panel-header
      v-if="!props.noHeader"
      :icon="props.icon"
      :label="props.label"
    ></panel-header>

    <div class="row q-col-gutter-sm">
      <div
        :class="[
          index + 1 === menu.length && menu.length % 2 ? '  col' : ' col-6',
        ]"
        v-for="(item, index) of menu"
        :key="index"
      >
        <q-item
          clickable
          class="rounded fit"
          :class="['text-' + item.color]"
          :href="item.color !== 'danger' ? item.link : undefined"
          @click="activate(item)"
        >
          <q-item-section>
            <q-item-label class="text-center text-body2">
              {{ item.label }}
            </q-item-label>
          </q-item-section>

          <q-tooltip
            v-if="item.description"
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            {{ item.description }}
          </q-tooltip>
        </q-item>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useDialog } from 'src/utils/use/useDialog';
import { historyGo } from 'src/utils/helpers/string';
import { defaultMessage } from 'src/utils/helpers/defaults';

import PanelHeader from './components/PanelHeader.vue';

const props = withDefaults(defineProps<ControlSectionProps>(), {
  message: () => defaultMessage,
  label: 'Панель управления',
  icon: 'settings',
  noHeader: false,
});

const menu = computed(() => props.message.frontendMenu);

const visible = computed(() => menu.value.length);

const activate = (item: { label: string; link: string; color: string }) => {
  if (item.color !== 'danger') return;

  useDialog(
    'Подтвердить действие ' +
      '<span class="text-red">' +
      item.label +
      '</span>',
    true
  ).onOk(historyGo.bind(this, item.link));
};

interface ControlSectionProps {
  message: MessageFree;
  label?: string;
  icon?: string;
  noHeader?: boolean;
}
</script>

<style scoped lang="scss"></style>
