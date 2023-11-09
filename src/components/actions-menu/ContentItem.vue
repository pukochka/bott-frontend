<template>
  <div class="row no-wrap rounded bordered overflow-hidden">
    <q-item clickable class="flex-grow" @click="openDialog('select')">
      <q-item-section>
        <q-item-label>{{ selectedItem?.text }}</q-item-label>

        <q-item-label caption v-if="selectedItem?.description !== ''">
          <div v-html="selectedItem?.description"></div>
        </q-item-label>
      </q-item-section>
    </q-item>

    <edit-link
      v-if="selectedItem?.link"
      :link="selectedItem?.link"
      :text="selectedItem?.text ?? ''"
    ></edit-link>

    <q-btn
      flat
      size="md"
      color="primary"
      icon="search"
      v-if="search"
      @click="openDialog('search')"
    >
      <q-tooltip
        class="bott-tooltip text-center"
        anchor="top middle"
        self="bottom middle"
      >
        Поиск
      </q-tooltip>
    </q-btn>
  </div>

  <q-dialog v-model="dialog" position="bottom">
    <q-card style="width: 100%" flat bordered class="dialog-rounded">
      <div class="row q-pa-sm">
        <q-btn
          flat
          dense
          no-caps
          class="col rounded"
          size="md"
          color="primary"
          icon="close"
          label="Закрыть"
          v-close-popup
        />
      </div>

      <div class="q-px-sm q-pb-sm" v-if="filterSection === 'search'">
        <q-input
          autofocus
          outlined
          v-model="text"
          label="Поиск..."
          class="bott-input--rounded"
        />
      </div>

      <q-separator />

      <scroll-list-update
        :visible-items="20"
        :items="filtered"
        separator
        v-close-popup
      >
        <template v-slot="{ item }">
          <q-item
            clickable
            :key="item.route"
            @click="emit(filterSection, item)"
            v-close-popup
          >
            <q-item-section>
              <q-item-label>{{ item.text }}</q-item-label>

              <q-item-label caption v-if="item.description !== ''">
                <div v-html="item?.description"></div>
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </scroll-list-update>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import ScrollListUpdate from '../scroll-update/ScrollListUpdate.vue';
import EditLink from '../editor/EditLink.vue';

const dialog = ref(false);

const props = withDefaults(defineProps<Props>(), {
  search: () => false,
  select: () => false,
  state: () => [],
  selectedItem: () => null,
  searchItems: () => [],
});

const emit = defineEmits<{
  (e: 'search', value: any): void;
  (e: 'select', value: any): void;
}>();

const text = ref('');
const filterSection = ref<'select' | 'search'>('select');

const filtered = computed(() =>
  filterSection.value === 'select' ? filteredItems.value : filteredSearch.value
);

const filteredItems = computed(() =>
  props.state.filter((item) =>
    props.select ? item.route !== props.selectedItem?.route : true
  )
);

const filteredSearch = computed(() =>
  props.search
    ? props.searchItems?.filter(
        (item) =>
          item.text?.toLowerCase().includes(text.value.toLowerCase()) ||
          (item.description?.toLowerCase().includes(text.value.toLowerCase()) &&
            (props.select ? item.route !== props.selectedItem?.route : true))
      )
    : null
);

const openDialog = (section: 'select' | 'search') => {
  dialog.value = !dialog.value;

  filterSection.value = section;
};

interface Props {
  state: (RoutesMenu | OptionsMenu)[];
  search?: boolean;
  select?: boolean;
  selectedItem: RoutesMenu | OptionsMenu | null;
  searchItems?: Array<any>;
}
</script>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}

.bott-item__padding {
  padding: 6px;
}
</style>
