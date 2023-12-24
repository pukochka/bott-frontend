<template>
  <div class="text-weight-bold text-center text-h6">
    Лог категории
    <span class="text-primary"> {{ work.selectedCategory?.label ?? '' }}</span>
  </div>

  <q-card flat bordered class="q-mt-md">
    <q-scroll-area style="height: 350px">
      <q-list dense separator>
        <q-item v-for="item in 100" :key="item">
          <q-item-section>
            <span class="text-primary">NOT_FOUND_NICKNAME</span> Создал новый
            тикет: "Тикет #7127"
          </q-item-section>

          <q-item-section side>Время: 20 дек. 2023г., 22:10:38</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-card>
</template>

<script setup lang="ts">
import { useWorkStore } from '../../stores/workStore';

const work = useWorkStore();
</script>

<style scoped lang="scss"></style>
