<template>
  <q-drawer
    bordered
    side="right"
    v-model="support.drawer.state"
    :width="350"
    :breakpoint="500"
    :mini="support.drawer.mini"
    :mini-width="70"
  >
    <div style="margin: 40px 0 57px 0" class="absolute-full">
      <q-list class="full-height">
        <q-item
          clickable
          @click="support.drawer.mini = !support.drawer.mini"
          class="transition"
          :class="[support.drawer.mini ? ' absolute-full' : '']"
        >
          <q-item-section avatar>
            <q-icon
              :name="support.drawer.mini ? 'info' : 'chevron_right'"
              color="primary"
              size="26px"
            />
          </q-item-section>

          <q-item-section class="absolute-center">
            Сведения о тикете
          </q-item-section>
        </q-item>

        <div class="" v-if="!support.drawer.mini">
          <q-item v-for="(item, index) of info" :key="index" class="font-14">
            <q-item-section>{{ item.label }}</q-item-section>

            <q-item-section side>{{ item.value }}</q-item-section>
          </q-item>
        </div>
      </q-list>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { useSupportStore } from '../../../stores/supportStore';
import { computed } from 'vue';

const support = useSupportStore();

const info = computed(() => [
  {
    label: 'Статус',
    value: '1',
  },
  {
    label: 'Запрос от',
    value: '333',
  },
  {
    label: 'Исполнитель',
    value: 'csde',
  },
  {
    label: 'Время создания',
    value: '21 дек. 2023г., 21:33:57',
  },
  {
    label: 'Время принятия в работу',
    value: '21 дек. 2023г., 21:33:57',
  },
  {
    label: 'Время закрытия',
    value: '21 дек. 2023г., 21:33:57',
  },
  {
    label: 'Время автоматического удаления',
    value: '21 дек. 2023г., 21:33:57',
  },
]);
</script>

<style scoped lang="scss"></style>
