<template>
  <q-drawer
    bordered
    :width="260"
    side="right"
    :behavior="sm ? 'mobile' : 'desktop'"
    :mini="data.drawerInfo"
    v-model="drawer"
  >
    <div class="relative-position" :class="[data.drawerInfo ? ' fit' : ' row']">
      <q-btn
        flat
        square
        size="md"
        color="primary"
        :class="[data.drawerInfo ? 'absolute-full' : 'col']"
        :icon="data.drawerInfo ? 'info' : 'chevron_right'"
        :disable="data.selectedFiles.length !== 1"
        @click="data.drawerInfo = !data.drawerInfo"
      />
    </div>

    <q-card square flat class="q-pa-xs" v-if="!data.drawerInfo">
      <div>
        <q-card
          flat
          bordered
          class="rounded overflow-hidden"
          style="height: 150px; max-height: 150px"
        >
          <component
            :is="component"
            :link="file?.link"
            :name="file?.name"
          ></component>
        </q-card>

        <q-list dense>
          <q-item
            v-for="(item, index) of info"
            :key="index"
            class="text-caption"
          >
            <q-item-section>
              <q-item-label class="ellipsis">
                {{ item.label }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>{{ item.value }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useQuasar } from 'quasar';
import { useFileStore } from '../../stores/fileStore';

import { defaultFileCard } from '../../stores/fileModels';

import { getMediaComponent } from 'src/components/file-manager/media';

const data = useFileStore();
const quasar = useQuasar();

const drawer = ref(true);

const sm = computed(() => quasar.screen.lt.sm);

const component = computed(() => getMediaComponent(data.paths));

const file = computed(() => data.selectedFiles[0] ?? defaultFileCard);

const size = computed(() => Number(file.value.size).dimension());

const info = computed(() => [
  {
    label: file.value.name,
    value: '',
  },
  {
    label: 'Размер файла',
    value: size.value,
  },
  {
    label: 'Дата загрузки',
    value: file.value.date,
  },
]);
</script>

<style scoped lang="scss">
.file-manager__drawer {
  max-width: 260px;
  width: 260px;
}

.transition-03 {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) all;
}
</style>
