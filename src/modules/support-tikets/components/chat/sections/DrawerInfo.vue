<template>
  <q-drawer
    bordered
    side="right"
    v-model="work.drawer.state"
    :width="350"
    :breakpoint="500"
    :mini="work.drawer.mini"
    :mini-width="70"
  >
    <div style="margin: 40px 0 57px 0" class="absolute-full">
      <q-list class="full-height">
        <q-item
          clickable
          @click="work.drawer.mini = !work.drawer.mini"
          class="transition"
          :class="[work.drawer.mini ? ' absolute-full' : '']"
        >
          <q-item-section avatar>
            <q-icon
              :name="work.drawer.mini ? 'info' : 'chevron_right'"
              color="primary"
              size="26px"
            />
          </q-item-section>

          <q-item-section class="absolute-center">
            Сведения о тикете
          </q-item-section>
        </q-item>

        <div class="" v-if="!work.drawer.mini">
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
import { useWorkStore } from '../../../stores/workStore';
import { computed } from 'vue';

const work = useWorkStore();

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
