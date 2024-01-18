<template>
  <div class="text-weight-bold text-center text-h6">
    Менеджеры категории
    <span class="text-primary"> {{ work.selectedCategory?.title ?? '' }}</span>
  </div>

  <div class="q-pt-md">
    <div class="row justify-center">
      <div class="col-12 col-sm-6">
        <q-card flat bordered class="rounded">
          <q-card-section>
            <div class="row q-pb-md">
              <q-btn
                unelevated
                dense
                size="md"
                color="primary"
                icon="add"
                no-caps
                class="rounded col"
                label="Добавить менеджера"
              >
                <user-search
                  :bot_id="config.bot.id"
                  :token="config.bot.token"
                  @select="addManager"
                ></user-search>
              </q-btn>
            </div>

            <q-scroll-area
              ref="table"
              :thumb-style="thumbStyle"
              :style="{ height: height + 'px' }"
              class="rotateIn"
            >
              <q-list separator dense class="overflow-hidden">
                <div class="text-center q-pa-sm">
                  У категории нет менеджеров...
                </div>

                <!--                <q-item v-for="item in 100" :key="item">-->
                <!--                  <q-item-section>-->
                <!--                    <q-item-label>-->
                <!--                      <q-btn-->
                <!--                        dense-->
                <!--                        flat-->
                <!--                        no-caps-->
                <!--                        size="md"-->
                <!--                        class="rounded"-->
                <!--                        color="primary"-->
                <!--                        label="@melart"-->
                <!--                      />-->
                <!--                    </q-item-label>-->
                <!--                  </q-item-section>-->

                <!--                  <q-item-section side>-->
                <!--                    <q-item-label>-->
                <!--                      <q-btn-->
                <!--                        dense-->
                <!--                        flat-->
                <!--                        no-caps-->
                <!--                        size="md"-->
                <!--                        icon="close"-->
                <!--                        class="rounded"-->
                <!--                        color="red"-->
                <!--                      />-->
                <!--                    </q-item-label>-->
                <!--                  </q-item-section>-->
                <!--                </q-item>-->
              </q-list>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { config } from '../../config';

import { onMounted, ref } from 'vue';
import { useWorkStore } from '../../stores/workStore';

import UserSearch from 'src/components/search/UserSearch.vue';

const work = useWorkStore();

const loading = ref(true);
const height = ref(300);
const table = ref();

const addManager = (id: number) => {
  console.log(1);
};

onMounted(() => {
  height.value =
    window.innerHeight -
    30 -
    (table.value?.$el?.getBoundingClientRect().y ?? 300);
});

const thumbStyle = {
  background: 'var(--q-primary)',
  margin: '2px',
  width: '6px',
};
</script>

<style scoped lang="scss"></style>
