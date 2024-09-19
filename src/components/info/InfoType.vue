<template>
  <div class="text-center q-py-md">{{ label }}</div>

  <div class="row q-col-gutter-y-xs" v-if="props.buttons.length">
    <div class="col-12" v-for="(button, index) of props.buttons" :key="index">
      <q-btn
        flat
        no-caps
        padding="4px"
        color="primary"
        class="rounded fit"
        :label="button.label"
        :href="button.link"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<InfoTypeProps>(), {
  label: '',
  buttons: () => [],
  route: '',
});

interface InfoTypeProps {
  label: string;
  route: string;
  buttons: Array<{ label: string; link: string; type: string }>;
  action: string | null;
  bot_id: number;
  message_id: number;
  token: string;
  host: string;
  index?: boolean;
  static?: boolean;
  regexp?: RegExp;
  grow?: boolean;
  default?: string;
  hint?: string;
  error?: string;
  webs?: any;
  actions?: any;
}
</script>

<style lang="scss" scoped></style>
