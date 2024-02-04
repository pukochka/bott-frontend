<template>
  <div class="bott-landing__layout">
    <div class="bott-landing__container">
      <div class="bott-landing__title q-py-md text-gradient">
        Биржа ботов и рекламы
      </div>

      <div class="bott-landing__description text-gradient">
        Продавайте, рекламируйте Ваших ботов Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Accusamus at beatae consequatur culpa
        dignissimos ea eius et fuga fugiat id impedit, incidunt ipsam, ipsum
        laboriosam laudantium maiores porro vero voluptatibus?
      </div>

      <div class="bott-landing__icon">
        <q-icon :name="mdiAbacus" size="120px" />
      </div>
    </div>

    <div class="">
      <div class="row q-col-gutter-md">
        <div
          class="col-12 col-sm-6"
          v-for="(service, index) of services"
          :key="index"
        >
          <router-link :to="service.link">
            <q-card flat class="bott-landing__service-card transition">
              <q-icon
                :name="service.icon"
                :color="service.color"
                size="120px"
                class="bott-landing__service-card__icon transition"
              />

              <q-card-section>
                <div class="text-h5" :class="['text-' + service.color]">
                  {{ service.label }}
                </div>
              </q-card-section>

              <q-card-section class="font-14 text-weight-medium text-grey">
                {{ service.description }}
              </q-card-section>
            </q-card>
          </router-link>
        </div>

        <div class="col-12">
          <router-link to="/desktop">
            <q-card flat class="bott-landing__service-card transition">
              <q-icon
                name="launch"
                color="primary"
                size="120px"
                class="bott-landing__service-card__icon transition"
              />

              <q-card-section class="q-py-xl">
                <div class="text-h5 text-center text-primary">
                  Создать своего бота!
                </div>
              </q-card-section>
            </q-card>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  mdiAbacus,
  mdiOctagramOutline,
  mdiFinance,
} from '@quasar/extras/mdi-v7';
import { computed } from 'vue';

const services = computed(() => [
  {
    label: 'Биржа ботов',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque beatae consequatur delectus ducimus earum eligendi eum explicabo impedit iure magnam magni molestias officia perferendis, placeat sapiente ut vero voluptas.',
    action: '',
    icon: mdiFinance,
    color: 'landing-pink',
    link: '/stock/store',
  },
  {
    label: 'Реклама и продвижение',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque beatae consequatur delectus ducimus earum eligendi eum explicabo impedit iure magnam magni molestias officia perferendis, placeat sapiente ut vero voluptas.',
    action: '',
    icon: mdiOctagramOutline,
    color: 'landing-primary',
    link: '/stock/advertisement',
  },
]);
</script>

<style scoped lang="scss"></style>
