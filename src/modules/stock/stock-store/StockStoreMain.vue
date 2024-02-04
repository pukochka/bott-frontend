<template>
  <div class="text-h5 text-weight-bold">Категории ботов</div>

  <q-scroll-area style="width: 100%; height: 70px">
    <div class="row q-col-gutter-x-md no-wrap">
      <div
        class="col"
        style="min-width: 250px"
        v-for="(category, index) of bottBots"
        :key="index"
      >
        <q-card
          class="bott-stock__category-card fit rounded transition"
          :class="[selected === category.color ? ' selected' : '']"
          v-clickable
          @click="selected = category.color"
        >
          <div class="row no-wrap items-center q-pa-sm fit">
            <div class="">
              <q-icon
                :name="category.icon"
                :color="selected === category.color ? 'white' : category.color"
                size="32px"
              />
            </div>

            <div
              class="text-body2 text-weight-bold text-center fit row justify-center items-center"
              :class="[
                selected === category.color ? ' text-white' : ' text-grey',
              ]"
            >
              {{ category.title }}
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-scroll-area>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { bottBots } from '../../../content/bots-meta';

const selected = ref<string | null | undefined>(null);
</script>

<style scoped lang="scss"></style>
