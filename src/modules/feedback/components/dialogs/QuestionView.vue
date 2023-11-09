<template>
  <q-dialog
    persistent
    position="bottom"
    @before-show="update"
    v-model="main.dialogs.question_view"
  >
    <q-card style="width: 100%" class="dialog-rounded">
      <q-toolbar class="q-px-md">
        <q-toolbar-title>Настройка вопроса</q-toolbar-title>

        <q-btn
          flat
          class="rounded"
          size="md"
          color="primary"
          icon="close"
          v-close-popup
        />
      </q-toolbar>

      <q-card-section class="q-pt-none q-gutter-sm">
        <div class="">
          <q-item-label header class="q-py-xs">Текст вопроса</q-item-label>

          <q-input
            dense
            autofocus
            autogrow
            outlined
            counter
            v-model="text.value"
            :maxlength="text.max"
            :rules="[() => text.required || config.text.danger_input]"
          />
        </div>

        <div class="q-gutter-y-sm">
          <component
            :is="currentComponent"
            :data="data"
            @change="registerOptions"
            @required="registerRequired"
          />
        </div>

        <div class="">
          <q-item tag="label" v-ripple class="rounded">
            <q-item-section>
              <q-item-label>Обязательный вопрос</q-item-label>

              <q-item-label caption>
                Этот вопрос нельзя будет пропустить
              </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-toggle color="primary" v-model="confirm" val="battery" />
            </q-item-section>
          </q-item>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-x-sm">
        <q-btn
          class="rounded"
          flat
          size="md"
          label="Удалить"
          color="red"
          @click="deleteQuestion"
        />

        <q-btn
          class="rounded"
          flat
          size="md"
          label="Отмена"
          color="primary"
          v-close-popup
        />

        <q-btn
          class="rounded"
          unelevated
          size="md"
          label="Сохранить"
          color="primary"
          :disable="
            !(text.required && add_required.message && add_required.your)
          "
          :loading="loading"
          @click="saveSettings"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import config from '../../config';

import { computed, ref } from 'vue';

import { fetchFeedback } from '../../api/feedback';

import { useFBStore } from '../../stores/FBStore';

import FileView from './sections/FileView.vue';
import SimpleView from './sections/SimpleView.vue';
import QuizView from './sections/QuizView.vue';

const main = useFBStore();

const text = ref({
  value: '',
  max: config.limits.maxInputLength,
  min: config.limits.minInputLength,
  get required() {
    return this.value.length >= this.min && this.value.length <= this.max;
  },
});

const confirm = ref(false);
const loading = ref(false);
const type = ref<1 | 2 | 3>(1);
const data = ref<FBSimpleQuestion | FBFileQuestion | ApiQuiz | null>(null);

const add_required = ref({
  your: true,
  message: true,
});

const setting = {
  1: { query: 'text', component: SimpleView },
  2: { query: 'file', component: FileView },
  3: { query: 'select', component: QuizView },
};

const query = computed(() => setting[type.value]?.query ?? 'text');

const currentComponent = computed(() => setting[type.value]?.component);

function registerOptions(value: FBSimpleQuestion | FBFileQuestion | ApiQuiz) {
  for (const key of Object.keys(value)) {
    data.value[key] = value[key];
  }
}

function registerRequired(value: { your: boolean; message: boolean }) {
  add_required.value = value;
}

const deleteQuestion = () => {
  console.log(1);
  // main.openNotify({
  //   message: 'Вы уверены, что хотите удалить вопрос?',
  //   type: 'sure',
  //   data: {
  //     type: main.viewSelected.question.type,
  //     id: main.viewSelected.question.id,
  //   },
  // });
};

const saveSettings = () => {
  loading.value = true;

  fetchFeedback(`update-input-${query.value}`, {
    ...data.value,
    text: text.value.value,
    confirm: !confirm.value,
    input_id: main.selectedQuestion?.id ?? 0,
  }).then(() => {
    loading.value = false;
    main.closeDialog('question_view');
  });
};

const update = () => {
  confirm.value = !main.selectedQuestion?.confirm;
  type.value = main.selectedQuestion?.type ?? 1;
  data.value = Object.create(main.selectedQuestion?.data);
  text.value.value = main.selectedQuestion?.text ?? '';
};

interface ApiQuiz {
  is_multiple?: boolean;
  select_id?: number;
  option_id?: number;
}
</script>

<style lang="scss" scoped></style>
