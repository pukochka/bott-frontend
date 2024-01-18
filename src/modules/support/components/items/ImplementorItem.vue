<template>
  <q-item>
    <q-item-section>
      <q-item-label>
        <q-btn dense flat no-caps size="md" class="rounded" color="primary">
          <div v-html="implementer.user.link"></div>

          <q-tooltip
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            Перейти в телеграм
          </q-tooltip>
        </q-btn>
      </q-item-label>

      <q-item-label
        caption
        :class="['text-' + (status === 0 ? 'red' : 'positive')]"
      >
        {{ statusLabel }}ожет принимать тикеты
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-item-label>
        <q-btn
          dense
          flat
          no-caps
          size="md"
          icon="more_vert"
          class="rounded"
          color="primary"
          :loading="loading"
        >
          <q-menu class="bott-portal-menu">
            <q-list dense>
              <q-item
                clickable
                v-close-popup
                v-for="(button, index) in actions"
                :key="index"
                @click="button.action"
              >
                <q-item-section avatar>
                  <q-icon
                    :name="button.icon"
                    :color="button.color"
                    size="26px"
                  />
                </q-item-section>

                <q-item-section>{{ button.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { defaultImplementer } from '../../stores/supportModels';
import { computed, onMounted, ref } from 'vue';
import { useDialog } from '../../../file-manager/stores/useDialog';
import { fetchSupportImplementer } from '../../api/queries';
import { useSupportStore } from '../../stores/supportStore';

const props = withDefaults(defineProps<ImplementorItemProps>(), {
  implementer: () => defaultImplementer,
});

const support = useSupportStore();

const loading = ref(false);
const status = ref(0);

const statusLabel = computed(() => (status.value === 0 ? 'Не м' : 'М'));

const removeImplementer = () => {
  useDialog('Вы уверены, что хотите удалить исполнителя?', true).onOk(() => {
    loading.value = true;

    fetchSupportImplementer(
      'delete',
      {
        category_id: support.selectedCategory?.id ?? -1,
        implementer_id: props.implementer.id,
      },
      (response) => {
        support.implementers = response;
      }
    ).then(() => (loading.value = false));
  });
};

const changeStatus = () => {
  loading.value = true;

  fetchSupportImplementer(
    'change-status',
    {
      implementer_id: props.implementer.id,
    },
    () => {
      status.value === 0 ? status.value++ : status.value--;
    }
  ).then(() => (loading.value = false));
};

const actions = computed(() => [
  {
    label: 'Изменить статус',
    icon: 'edit',
    color: 'primary',
    action: changeStatus,
  },
  {
    label: 'Удалить исполнителя',
    icon: 'close',
    color: 'red',
    action: removeImplementer,
  },
]);

onMounted(() => {
  status.value = props.implementer.status;
});

interface ImplementorItemProps {
  implementer: SupportImplementer;
}
</script>

<style scoped lang="scss"></style>
