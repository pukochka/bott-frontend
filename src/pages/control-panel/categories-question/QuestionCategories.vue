<template>
  <categories-section></categories-section>

  <div class="">
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-sm-6">
        <note-block label="FAQ" color="warning"></note-block>
      </div>

      <div class="col-12 col-sm-6">
        <note-block label="Ваш тариф" color="prism"></note-block>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CategoriesSection from 'src/modules/support-tikets/categories/CategoriesSection.vue';
import NoteBlock from 'src/components/note/NoteBlock.vue';
</script>

<style lang="scss" scoped></style>
