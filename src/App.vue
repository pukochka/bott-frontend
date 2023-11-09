<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';

useMeta({
  titleTemplate: (title) => `${title} | Сервис по созданию ботов в telegram`,
});
</script>
