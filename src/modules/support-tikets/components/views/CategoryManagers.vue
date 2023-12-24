<template>
  <div class="text-weight-bold text-center text-h6">
    Менеджеры категории
    <span class="text-primary"> {{ work.selectedCategory?.label ?? '' }}</span>
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
              />
            </div>

            <q-scroll-area style="height: 350px" class="rotateIn bordered">
              <q-list separator dense class="overflow-hidden">
                <q-item v-for="item in 100" :key="item">
                  <q-item-section>
                    <q-item-label>
                      <q-btn
                        dense
                        flat
                        no-caps
                        size="md"
                        class="rounded"
                        color="primary"
                        label="@melart"
                      />
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-item-label>
                      <q-btn
                        dense
                        flat
                        no-caps
                        size="md"
                        icon="close"
                        class="rounded"
                        color="red"
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWorkStore } from '../../stores/workStore';

const work = useWorkStore();
</script>

<style scoped lang="scss"></style>
