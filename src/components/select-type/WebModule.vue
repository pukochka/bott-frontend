<template>
  <div class="q-py-xs">WEB модуль</div>

  <q-tabs
    v-model="module"
    class="text-primary row bott-tab__indicator q-gutter-x-sm"
    dense
    no-caps
    v-if="visible"
  >
    <q-tab name="link" label="Ссылка на Ваш модуль" class="col-6 rounded" />

    <q-tab name="modules" label="Модули BOT-T" class="col-6 rounded" />
  </q-tabs>

  <q-input
    outlined
    counter
    maxlength="256"
    v-if="module === 'link'"
    v-model="link"
    label="Ссылка на модуль"
    class="bott-input--rounded"
    @update:model-value="(value) => emit('change', value)"
  />

  <div
    class="row rounded bordered overflow-hidden"
    v-if="visible && module === 'modules'"
  >
    <q-item
      class="col-grow"
      clickable
      v-if="selected === null"
      @click="dialog = !dialog"
    >
      <q-item-section>
        <q-item-label>Выберите модуль</q-item-label>
      </q-item-section>
    </q-item>

    <q-item class="col-grow" clickable v-else @click="dialog = !dialog">
      <q-item-section>
        <q-item-label>{{ selected.text }} </q-item-label>
      </q-item-section>
    </q-item>
  </div>

  <q-dialog v-model="dialog" position="bottom">
    <q-card style="width: 100%" flat bordered class="dialog-rounded">
      <div class="row q-pa-sm">
        <q-btn
          flat
          dense
          class="col rounded"
          size="md"
          color="primary"
          icon="close"
          label="Закрыть"
          v-close-popup
        />
      </div>

      <q-separator />

      <q-list separator>
        <q-item
          v-close-popup
          clickable
          v-ripple
          v-for="item in webs"
          :key="item.id"
          @click="update(item)"
        >
          <q-item-section>
            <q-item-label>
              {{ item.text }}
            </q-item-label>
          </q-item-section>

          <q-item-section class="items-end">
            <q-badge
              v-if="item.value === selected?.value"
              color="orange"
              text-color="black"
              label="Выбранное"
              class="text-bold"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';

const props = withDefaults(defineProps<WebModuleProps>(), {
  webs: () => [],
  action: () => null,
});

const emit = defineEmits<{
  (e: 'change', value: string | null): void;
}>();

const dialog = ref(false);
const selected = ref<WebModule | null>(null);
const module = ref<'link' | 'modules'>('link');
const link = ref('');

const visible = computed(() => props.webs.length);

const update = (item: WebModule) => {
  selected.value = Object.assign({}, item);

  emit('change', item.value);
};

onMounted(() => {
  if (props.action === null) emit('change', null);
  else {
    selected.value =
      props.webs?.find((item) => item.value === props.action) ?? null;

    if (selected.value?.value) module.value = 'modules';
    else link.value = props.action;

    emit('change', selected.value?.value ?? null);
  }
});

interface WebModuleProps {
  webs: WebModule[];
  action: string | null;
  label?: any;
  actions?: any;
  hint?: any;
  route?: any;
  default?: any;
  grow?: any;
  bot_id: number;
  message_id: number;
  token: string;
  host: string;
}
</script>
