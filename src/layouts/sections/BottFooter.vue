<template>
  <div class="col"></div>

  <div class="bott-footer q-px-lg q-pb-lg">
    <div class="q-gutter-y-md">
      <div class="row q-col-gutter-sm">
        <div
          class="col-12 col-sm-6"
          v-for="(column, index) in footer.columns"
          :key="index"
        >
          <div
            class="text-weight-regular text-center letter-spacing-100 q-pb-sm"
          >
            {{ column.title }}
          </div>

          <div class="column items-center q-pl-xs">
            <q-btn
              dense
              flat
              no-caps
              padding="1px 8px"
              size="13px"
              v-for="(item, index) in column.items"
              :key="index"
              class="rounded header-btn"
            >
              {{ item.label }}
            </q-btn>
          </div>
        </div>
      </div>

      <div class="column items-center">
        <div class="letter-spacing-100 q-pb-sm">
          {{ t('we-social-networks') }}
        </div>

        <div class="row items-center q-gutter-x-lg">
          <q-btn
            flat
            class="rounded"
            size="14px"
            padding="4px"
            color="primary"
            v-for="(button, index) of footer.services"
            :key="index"
            :icon="button.icon"
          />
        </div>
      </div>

      <div class="text-center letter-spacing-100">
        {{ t('footer-desc-support') }}

        <span class="bott-text__link">@BOTT_SUPPORT_BOT</span>
      </div>

      <div class="text-center letter-spacing-100">
        {{ t('footer-desc') }}

        <span class="bott-text__link">BOT-T</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { footer } from 'layouts/content/footer';
import { t } from 'src/boot/lang';
</script>

<style lang="scss" scoped></style>
