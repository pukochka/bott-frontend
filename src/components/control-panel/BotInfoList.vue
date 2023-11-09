<template>
  <q-list class="overflow-hidden col-12 col-sm-6" dense separator>
    <q-item
      v-for="(item, index) in info"
      :key="index"
      :to="item.link ?? null"
      :clickable="!!item.classes"
    >
      <q-item-section>
        {{ item.label }}
      </q-item-section>

      <q-item-section side class="ellipsis">
        <span class="q-pl-xl ellipsis full-width" style="">
          <span :class="[item.classes]">{{ item.value }}</span>
        </span>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<BotInfoProps>(), {
  info: () => [],
});

interface BotInfoProps {
  info: Array<any>;
}
</script>

<style lang="scss" scoped></style>
