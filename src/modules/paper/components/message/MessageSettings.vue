<template>
  <q-dialog
    persistent
    full-width
    position="bottom"
    @before-show="update"
    v-model="store.dialogs.message"
  >
    <div class="row justify-center">
      <q-card class="dialog-rounded bott-dialog__responsive">
        <dialog-header label="Настройка вопроса"></dialog-header>

        <q-card-section class="q-pt-none q-gutter-sm">
          <div class="">
            <div>Текст вопроса</div>

            <q-input
              autofocus
              autogrow
              outlined
              counter
              class="bott-input--rounded"
              v-model="text.value"
              :maxlength="text.max"
              :rules="[() => text.required || 'config.text.danger_input']"
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
            no-caps
            flat
            class="rounded"
            size="md"
            label="Удалить"
            color="red"
            @click="deleteQuestion"
          />

          <q-btn
            flat
            no-caps
            class="rounded"
            size="md"
            label="Закрыть"
            color="primary"
            v-close-popup
          />

          <q-btn
            no-caps
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
    </div>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { fetchFeedback } from '../../api/queries';

import { usePSStore } from '../../stores/PSstore';
import DialogHeader from '../../../../components/dialogs-sections/DialogHeader.vue';

import FileView from './sections/FileView.vue';
import SimpleView from './sections/SimpleView.vue';
import QuizView from './sections/QuizView.vue';

const store = usePSStore();

const text = ref({
  value: '',
  max: 512,
  min: 2,
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

const setting: any = {
  1: { query: 'input', component: SimpleView },
  2: { query: 'file', component: FileView },
  3: { query: 'select', component: QuizView },
};

const query = computed(() => setting[type.value]?.query ?? 'text');

const currentComponent = computed(() => setting[type.value]?.component);

function registerOptions(value: FBSimpleQuestion | FBFileQuestion | ApiQuiz) {
  for (const key of Object.keys(value)) {
    // data.value[key] = value[key];
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

  // fetchFeedback(`update-input-${query.value}`, {
  //   ...data.value,
  //   text: text.value.value,
  //   confirm: !confirm.value,
  //   // input_id: store.selectedQuestion?.id ?? 0,
  // }).then(() => {
  //   loading.value = false;
  //   store.closeDialog('message');
  // });
};

const update = () => {
  console.log(store.selectedMessage);
  confirm.value = !store.selectedMessage?.confirm;
  type.value = store.selectedMessage?.type ?? 1;
  data.value = Object.create(
    store.selectedMessage?.[setting[type.value].query]
  );
  text.value.value = store.selectedMessage?.text ?? '';
};

interface ApiQuiz {
  is_multiple?: boolean;
  select_id?: number;
  option_id?: number;
}
</script>

<style lang="scss" scoped></style>
