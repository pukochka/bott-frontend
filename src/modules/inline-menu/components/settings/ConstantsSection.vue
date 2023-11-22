<template>
  <q-card flat bordered class="rounded" v-if="visible">
    <panel-header
      label="Константы для сообщения"
      icon="data_object"
    ></panel-header>

    <div class="q-px-sm q-pb-sm">
      <div
        class="row items-center"
        v-for="([name, text], index) of constants"
        :key="index"
      >
        <q-btn
          dense
          no-caps
          padding="0 6px"
          flat
          size="13px"
          color="primary"
          class="rounded"
          :label="'{' + name + '}'"
          @click="copy('{' + name + '}')"
        >
          <q-tooltip
            class="bott-tooltip"
            anchor="top middle"
            self="bottom middle"
          >
            Скопировать {{ '{' + name + '}' }}
          </q-tooltip>
        </q-btn>

        <div class="text-body2">- {{ text }}</div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useInlineStore } from '../../stores/inlineStore';

import PanelHeader from '../PanelHeader.vue';
import { copyToClipboard } from 'quasar';
import { useNotify } from '../../stores/helpers';

const inline = useInlineStore();

const constants = computed(() => Object.entries(inline.message.constants));

const visible = computed(() => Object.entries(inline.message.constants).length);

const copy = (name: string) => {
  copyToClipboard(name).then(useNotify.bind(this, 'Скопированно!'));
};
</script>

<style scoped lang="scss"></style>
