<template>
  <div class="">
    <div class="row q-col-gutter-sm">
      <div
        class="col-6 col-lg-3"
        v-for="[key, template] of Object.entries(templates)"
        :key="key"
      >
        <q-card flat bordered class="rounded fit overflow-hidden">
          <div
            class="row justify-between items-start no-wrap q-gutter-x-sm q-pa-xs"
          >
            <div class="text-caption">{{ template.label }}</div>

            <q-btn
              flat
              padding="2px"
              class="rounded"
              color="primary"
              icon="info"
            >
              <q-menu class="bott-portal-menu">
                <div class="q-pa-sm" style="max-width: 250px">
                  {{ template.desc }}
                </div>
              </q-menu>
            </q-btn>
          </div>

          <q-separator />

          <div
            class="fit"
            v-clickable
            @click="openEditor(key as keyof TemplateKeys)"
          >
            <div
              class="text-caption text-content q-pt-sm q-pa-xs"
              v-html="handleEmpty(template.value)"
            ></div>

            <q-tooltip
              class="bott-tooltip text-center"
              anchor="top middle"
              self="bottom middle"
            >
              Изменить
            </q-tooltip>
          </div>
        </q-card>
      </div>
    </div>
  </div>

  <q-dialog
    persistent
    position="bottom"
    v-model="dialog"
    @before-hide="updateHide"
  >
    <q-card bordered flat class="dialog-rounded" style="width: 100%">
      <dialog-header label="Редактирование шаблона"></dialog-header>

      <q-card-section class="q-pt-none">
        <editor-content
          :content="templates[selected].value"
          :max-value="1024"
          no-without-editor
          :id="0"
          :message_id="0"
          @update="updateText"
        ></editor-content>
      </q-card-section>

      <q-card-section class="row justify-end q-pt-none q-gutter-x-sm">
        <q-btn
          no-caps
          flat
          size="md"
          color="primary"
          label="Закрыть"
          class="rounded"
          v-close-popup
        />

        <q-btn
          no-caps
          unelevated
          size="md"
          color="primary"
          class="rounded"
          label="Сохранить"
          :loading="loading"
          @click="updateTemplate"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useFeedbackStore } from '../../stores/feedbackStore';
import { fetchFeedback } from '../../api/queries';
import { encodeText } from '../../../inline/stores/helpers';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import EditorContent from 'src/components/editor/EditorContent.vue';

const feedback = useFeedbackStore();

const selected = ref<keyof TemplateKeys | null>(null);
const dialog = ref(false);
const loading = ref(false);
const update = ref(false);

const openEditor = (key: keyof TemplateKeys) => {
  selected.value = key;
  dialog.value = true;
};

const updateText = (value: string) =>
  (templates.value[selected.value ?? 'template_answer'].value =
    encodeText(value));

const handleEmpty = (value: string | null) =>
  value?.length ? value : '<span class="text-red">Нет</span>';

const updateSetting = () =>
  Object.entries(feedback.message.feedback?.setting ?? {}).forEach(([key]) => {
    if (key in templates.value && feedback.message.feedback?.setting) {
      feedback.message.feedback.setting[<keyof TemplateKeys>key] =
        templates.value[<keyof TemplateKeys>key].value;
    }
  });

const updateTemplates = () =>
  Object.entries(templates.value).forEach(
    ([key, value]) =>
      (value.value =
        feedback.message.feedback?.setting[<keyof TemplateKeys>key] ?? '')
  );

const updateHide = () => {
  if (update.value) return;

  updateTemplates();
};

const updateTemplate = () => {
  loading.value = true;
  update.value = true;

  updateSetting();

  fetchFeedback(
    'update-setting',
    feedback.message.feedback?.setting,
    (response) => (feedback._message = response)
  ).then(() => {
    dialog.value = false;
    loading.value = false;
    update.value = false;
  });
};

const templates = ref<TemplatesEntries>({
  template_answer: {
    label: 'Шаблон ответа',
    desc: 'Будет применен для каждого ответа пользователя. И затем заменит поле {ANSWERS}.',
    value: '',
  },
  message_answer_read: {
    label: 'Текст после прочитывания заявки',
    desc: 'Текст автоматически отправляемый после прочитывания заявки (Смены статуса заявки на прочитано из не прочитано).',
    value: '',
  },
  message_answer_delete: {
    label: 'Текст после удаления заявки',
    desc: 'Текст автоматически отправляемый после удаления заявки (Отправляется только если удаляется заявка младше 3-х дней и статусов кроме "отвечен")',
    value: '',
  },
  message_answer_for_user: {
    label: 'Текст в ответ администратора на заявку',
    desc: 'Текст автоматически отправляемый в ответ администратора на заявку',
    value: '',
  },
});

onBeforeMount(updateTemplates);

interface TemplateKeys {
  template_answer: string;
  message_answer_read: string;
  message_answer_delete: string;
  message_answer_for_user: string;
}

type TemplatesEntries = Record<
  keyof TemplateKeys,
  { label: string; value: string; desc: string }
>;
</script>

<style scoped lang="scss"></style>
