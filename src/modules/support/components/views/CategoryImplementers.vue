<template>
  <div class="text-weight-bold text-center text-h6">
    Исполнители категории
    <span class="text-primary">
      {{ support.selectedCategory?.title ?? '' }}</span
    >
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
                label="Добавить исполнителя"
                :loading="loading.add"
              >
                <user-search
                  :bot_id="config.bot.id"
                  :token="config.bot.token"
                  @select="addImplementer"
                ></user-search>
              </q-btn>
            </div>
          </q-card-section>

          <q-scroll-area
            ref="table"
            :thumb-style="thumbStyle"
            :style="{ height: height + 'px' }"
            class="rotateIn"
          >
            <q-list separator dense class="overflow-hidden">
              <div
                class="text-center q-pa-sm"
                v-if="!support.implementers.length"
              >
                У категории нет исполнителей...
              </div>

              <implementor-item
                v-for="implementer in support.implementers"
                :key="implementer.id"
                :implementer="implementer"
              ></implementor-item>
            </q-list>
          </q-scroll-area>

          <q-inner-loading :showing="loading.start">
            <q-spinner size="50px" color="primary" />
          </q-inner-loading>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { config } from '../../config';
import { computed, onMounted, ref } from 'vue';

import { useSupportStore } from '../../stores/supportStore';
import { useQuasar } from 'quasar';
import { fetchSupportImplementer } from '../../api/queries';

import UserSearch from 'src/components/search/UserSearch.vue';
import ImplementorItem from '../items/ImplementorItem.vue';

const support = useSupportStore();
const quasar = useQuasar();

const loading = ref({
  start: false,
  add: false,
});

const height = ref(300);
const table = ref();

const sm = computed(() => quasar.screen.lt.sm);

const addImplementer = (id: string) => {
  loading.value.add = true;

  fetchSupportImplementer(
    'create',
    {
      category_id: support.selectedCategory?.id ?? -1,
      user_id: Number(id),
    },
    (response) => {
      support.implementers = response;
    }
  ).then(() => (loading.value.add = false));
};

onMounted(() => {
  const offset = sm.value ? 80 : 60;

  height.value =
    window.innerHeight -
    offset -
    (table.value?.$el?.getBoundingClientRect().y ?? 300);

  loading.value.start = true;

  fetchSupportImplementer('index', {
    category_id: support.selectedCategory?.id ?? -1,
    offset: 0,
    limit: 25,
  }).then(() => {
    loading.value.start = false;
  });
});

const thumbStyle = {
  background: 'var(--q-primary)',
  margin: '2px',
  width: '6px',
};
</script>

<style scoped lang="scss"></style>
