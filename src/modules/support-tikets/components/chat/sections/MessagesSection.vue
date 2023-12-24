<template>
  <q-layout
    view="hHh Lpr lff"
    container
    class="bott-layout__drawer absolute-full"
  >
    <q-page-container>
      <drawer-info></drawer-info>

      <q-page>
        <q-scroll-area
          class="q-px-md absolute-full"
          :thumb-style="thumbStyle"
          style="margin: 40px 0 57px 0"
        >
          <div class="column q-gutter-y-sm q-py-sm">
            <q-chip
              dense
              color="grey"
              text-color="white"
              class="self-center q-my-md"
            >
              Начало диалога
            </q-chip>

            <chat-message
              v-for="message of messages"
              :key="message.id"
              :message="message"
            ></chat-message>

            <!--            <div class="row items-center q-py-md full-width">-->
            <!--              <div class="col">-->
            <!--                <q-separator color="grey" />-->
            <!--              </div>-->

            <!--              <div class="col row justify-center">-->
            <!--                <q-chip-->
            <!--                  dense-->
            <!--                  color="grey"-->
            <!--                  text-color="white"-->
            <!--                  class="self-center"-->
            <!--                >-->
            <!--                  <div class="ellipsis">Непрочитанные сообщения</div>-->
            <!--                </q-chip>-->
            <!--              </div>-->

            <!--              <div class="col">-->
            <!--                <q-separator color="grey" />-->
            <!--              </div>-->
            <!--            </div>-->

            <chat-message
              v-for="message of messages"
              :key="message.id"
              :message="message"
            ></chat-message>
          </div>
        </q-scroll-area>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import ChatMessage from '../../items/ChatMessage.vue';
import DrawerInfo from './DrawerInfo.vue';

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
    time: '21:33',
    image:
      'https://unsplash.com/photos/a-painting-of-a-bird-flying-in-the-sky-YHEUjiwgfgs',
    name: 'Менеджер',
    message: 'mi. Duis risus odio, auctor vitae,',
  },
  {
    id: 2,
    status: false,
    time: '21:33',
    name: 'Christopher',
    message:
      'lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus',
  },
  {
    id: 3,
    status: false,
    time: '21:33',
    name: 'Charde',
    message: 'magna. Praesent',
  },
  {
    id: 4,
    status: false,
    time: '21:33',
    name: 'Wylie',
    message: 'quis diam. Pellentesque',
  },
  {
    id: 5,
    status: false,
    time: '21:33',
    name: 'Wallace',
    message:
      'Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit,',
  },
  {
    id: 6,
    status: true,
    time: '21:33',
    name: 'Менеджер',
    message:
      'amet, risus. Donec nibh enim, gravida sit amet, dapibus id, blandit at, nisi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  },
  {
    id: 7,
    status: false,
    time: '21:33',
    name: 'Sawyer',
    message: 'orci. Phasellus dapibus quam quis',
  },
  {
    id: 8,
    status: true,
    time: '21:33',
    name: 'Менеджер',
    message:
      'ornare. Fusce mollis. Duis sit amet diam eu dolor egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere at, velit. Cras',
  },
  {
    id: 9,
    status: true,
    time: '21:33',
    name: 'Менеджер',
    message:
      'ridiculus mus. Donec dignissim magna a tortor. Nunc commodo auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus.',
  },
  {
    id: 10,
    status: true,
    time: '21:33',
    name: 'Менеджер',
    message:
      'dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis',
  },
  {
    id: 11,
    status: true,
    time: '21:33',
    name: 'Менеджер',
    message:
      'consequat purus. Maecenas libero est, congue a, aliquet vel, vulputate',
  },
  {
    id: 12,
    status: true,
    time: '21:33',
    name: 'Менеджер',
    message: 'non, bibendum sed,',
  },
  {
    id: 13,
    status: true,
    time: '21:33',
    name: 'Менеджер',
    message:
      'Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare sagittis',
  },
  {
    id: 14,
    status: true,
    time: '21:33',
    name: 'Менеджер',
    message:
      'amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in sodales elit erat vitae risus. Duis',
  },
  {
    id: 15,
    status: true,
    time: '21:33',
    name: 'Менеджер',
    message:
      'id ante dictum cursus. Nunc mauris elit, dictum eu, eleifend nec, malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in',
  },
  {
    id: 16,
    status: false,
    time: '21:33',
    name: 'Rebecca',
    message:
      'non, feugiat nec, diam. Duis mi enim, condimentum eget, volutpat ornare,',
  },
  {
    id: 17,
    status: false,
    time: '21:33',
    name: 'Jorden',
    message:
      'luctus sit amet, faucibus ut, nulla. Cras eu tellus eu augue porttitor interdum. Sed auctor odio a',
  },
  {
    id: 18,
    status: false,
    time: '21:33',
    name: 'Sara',
    message: 'erat, in consectetuer ipsum',
  },
  {
    id: 19,
    status: true,
    time: '21:33',
    name: 'Менеджер',
    message:
      'sem mollis dui, in sodales elit erat vitae risus. Duis a mi fringilla mi lacinia mattis. Integer eu lacus. Quisque imperdiet, erat nonummy ultricies',
  },
  {
    id: 20,
    status: false,
    time: '21:33',
    name: 'Irene',
    message:
      'at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet',
  },
  {
    id: 21,
    status: true,
    time: '21:33',
    name: 'Менеджер',
    message: 'mauris sit',
  },
  {
    id: 22,
    status: true,
    time: '21:33',
    name: 'Менеджер',
    message:
      'mauris elit, dictum eu, eleifend nec, malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in felis. Nulla tempor augue ac ipsum. Phasellus',
  },
  {
    id: 23,
    status: false,
    time: '21:33',
    name: 'Shana',
    message:
      'Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum',
  },
  {
    id: 24,
    status: true,
    time: '21:33',
    name: 'Менеджер',
    message: 'convallis in, cursus et, eros. Proin ultrices. Duis',
  },
];
</script>

<style scoped lang="scss"></style>
