<template>
  <div class="q-gutter-y-sm">
    <div
      class="row col-12 no-wrap q-gutter-x-sm"
      v-for="line of menu.lines"
      :key="line.id"
    >
      <q-btn
        flat
        padding="8px"
        class="rounded"
        color="primary"
        icon="delete"
        :loading="props.loading"
        @click="emit('delete-line', line.id)"
      >
        <q-tooltip
          class="bott-tooltip"
          anchor="top middle"
          self="bottom middle"
        >
          Удалить линию
        </q-tooltip>
      </q-btn>

      <q-scroll-area
        :thumb-style="thumbStyle"
        class="col-grow rounded bg-transparent"
        style="height: 50px"
      >
        <div class="row no-wrap q-gutter-x-sm">
          <q-card
            v-clickable
            flat
            bordered
            class="rounded col ellipsis q-py-sm q-px-md text-bold text-center ellipsis cursor-pointer flex flex-center"
            v-for="button in line.buttons"
            :key="button.id"
            style="height: 50px"
            @click="emit('select-button', button)"
          >
            <q-tooltip
              class="bott-tooltip"
              anchor="top middle"
              self="bottom middle"
            >
              Насторойки названия/маршрута
            </q-tooltip>

            {{ button.text }}
          </q-card>
        </div>
      </q-scroll-area>

      <q-btn
        flat
        padding="8px"
        class="rounded"
        color="primary"
        icon="add"
        @click="emit('add-button', line.id)"
      >
        <q-tooltip
          class="bott-tooltip"
          anchor="top middle"
          self="bottom middle"
        >
          Добавить кнопку
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<ButtonsSectionProps>(), {
  menu: () => ({ id: 0, lines: [] }),
  loading: false,
});

const emit = defineEmits<{
  (e: 'select-button', value: any): void;
  (e: 'add-button', line_id: number): void;
  (e: 'delete-line', line_id: number): void;
}>();

const thumbStyle = {
  margin: '4px',
  height: '4px',
  width: '4px',
};

interface ButtonsSectionProps {
  menu: IMMenu;
  loading: boolean;
}
</script>

<style lang="scss" scoped></style>
