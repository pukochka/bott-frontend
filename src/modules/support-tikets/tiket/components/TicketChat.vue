<template>
  <q-card flat bordered class="rounded overflow-hidden fit">
    <q-img src="/src/assets/telega.png" class="absolute-full" fit="cover" />

    <q-card flat square class="card-border__bottom">
      <div class="row justify-between q-px-sm q-py-xs">
        <div class="">Чат с пользователем</div>

        <div class="">Artem</div>
      </div>
    </q-card>

    <div>
      <q-scroll-area
        style="min-height: 200px; height: 420px"
        class="q-px-md"
        :thumb-style="thumbStyle"
      >
        <div class="column q-gutter-y-sm bott-chat__area q-py-sm">
          <ticket-chat-message
            v-for="message of messages"
            :key="message.id"
            :message="message"
          ></ticket-chat-message>
        </div>
      </q-scroll-area>
    </div>

    <q-card square flat bordered>
      <q-input
        dense
        outlined
        autogrow
        class="bott-input--rounded__bottom"
        v-model="text"
        label="Label"
        input-style="max-height: 100px"
      >
        <template #prepend>
          <div class="">
            <q-btn
              flat
              padding="8px"
              class="rounded"
              size="md"
              color="primary"
              icon="attach_file"
            />
          </div>
        </template>

        <template #append>
          <div class="">
            <q-btn
              flat
              padding="8px"
              class="rounded"
              size="md"
              color="primary"
              icon="send"
            />
          </div>
        </template>
      </q-input>
    </q-card>
  </q-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TicketChatMessage from './TicketChatMessage.vue';

const text = ref('');

const thumbStyle = {
  width: '8px',
  opacity: '1',
  backgroundColor: 'var(--q-primary)',
  borderRadius: '10px',
  border: '4px solid rgba(0, 0, 0, 0)',
  margin: '2px',
};

const messages = [
  {
    id: 1,
    status: true,
    name: 'Morgan',
    image:
      'https://images-ext-1.discordapp.net/external/-kjbCE02V1hC7JDx2OJwb6R2iq4N5xrYvnQVPzFLWIs/https/storage.yandexcloud.net/bottstorage/bot/7/photos/230926_230924_canvapro1875jpg.jpg?width=1191&height=670',
    message: 'mi. Duis risus odio, auctor vitae,',
  },
  {
    id: 2,
    status: false,
    name: 'Christopher',
    message:
      'lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus',
  },
  {
    id: 3,
    status: false,
    name: 'Charde',
    message: 'magna. Praesent',
  },
  {
    id: 4,
    status: false,
    name: 'Wylie',
    message: 'quis diam. Pellentesque',
  },
  {
    id: 5,
    status: false,
    name: 'Wallace',
    message:
      'Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit,',
  },
  {
    id: 6,
    status: true,
    name: 'Herrod',
    message:
      'amet, risus. Donec nibh enim, gravida sit amet, dapibus id, blandit at, nisi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  },
  {
    id: 7,
    status: false,
    name: 'Sawyer',
    message: 'orci. Phasellus dapibus quam quis',
  },
  {
    id: 8,
    status: true,
    name: 'Iliana',
    message:
      'ornare. Fusce mollis. Duis sit amet diam eu dolor egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere at, velit. Cras',
  },
  {
    id: 9,
    status: true,
    name: 'Dana',
    message:
      'ridiculus mus. Donec dignissim magna a tortor. Nunc commodo auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus.',
  },
  {
    id: 10,
    status: true,
    name: 'John',
    message:
      'dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis',
  },
  {
    id: 11,
    status: true,
    name: 'Imogene',
    message:
      'consequat purus. Maecenas libero est, congue a, aliquet vel, vulputate',
  },
  {
    id: 12,
    status: true,
    name: 'Channing',
    message: 'non, bibendum sed,',
  },
  {
    id: 13,
    status: true,
    name: 'Axel',
    message:
      'Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare sagittis',
  },
  {
    id: 14,
    status: true,
    name: 'Aimee',
    message:
      'amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in sodales elit erat vitae risus. Duis',
  },
  {
    id: 15,
    status: true,
    name: 'Garth',
    message:
      'id ante dictum cursus. Nunc mauris elit, dictum eu, eleifend nec, malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in',
  },
  {
    id: 16,
    status: false,
    name: 'Rebecca',
    message:
      'non, feugiat nec, diam. Duis mi enim, condimentum eget, volutpat ornare,',
  },
  {
    id: 17,
    status: false,
    name: 'Jorden',
    message:
      'luctus sit amet, faucibus ut, nulla. Cras eu tellus eu augue porttitor interdum. Sed auctor odio a',
  },
  {
    id: 18,
    status: false,
    name: 'Sara',
    message: 'erat, in consectetuer ipsum',
  },
  {
    id: 19,
    status: true,
    name: 'Gisela',
    message:
      'sem mollis dui, in sodales elit erat vitae risus. Duis a mi fringilla mi lacinia mattis. Integer eu lacus. Quisque imperdiet, erat nonummy ultricies',
  },
  {
    id: 20,
    status: false,
    name: 'Irene',
    message:
      'at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet',
  },
  {
    id: 21,
    status: true,
    name: 'Thomas',
    message: 'mauris sit',
  },
  {
    id: 22,
    status: true,
    name: 'Jillian',
    image:
      'https://images-ext-1.discordapp.net/external/-kjbCE02V1hC7JDx2OJwb6R2iq4N5xrYvnQVPzFLWIs/https/storage.yandexcloud.net/bottstorage/bot/7/photos/230926_230924_canvapro1875jpg.jpg?width=1191&height=670',
    message:
      'mauris elit, dictum eu, eleifend nec, malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in felis. Nulla tempor augue ac ipsum. Phasellus',
  },
  {
    id: 23,
    status: false,
    name: 'Shana',
    message:
      'Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum',
  },
  {
    id: 24,
    status: true,
    name: 'Blossom',
    message: 'convallis in, cursus et, eros. Proin ultrices. Duis',
  },
];
</script>

<style lang="scss" scoped>
.card-border__bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
body.body--dark {
  .card-border__bottom {
    border-bottom: 1px solid rgba(255, 255, 255, 0.28);
  }
}
</style>
