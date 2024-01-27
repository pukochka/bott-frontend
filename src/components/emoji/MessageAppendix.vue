<template>
  <svg width="9" height="20" class="svg-appendix">
    <g fill="none" fill-rule="evenodd">
      <path
        d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z"
      ></path>
      <path
        d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z"
        class="corner"
      ></path>
    </g>
  </svg>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.corner {
  fill: #ffffff;
}

body.body--dark {
  .corner {
    fill: #1d1d1d;
  }
}

.svg-appendix {
  position: absolute;
  bottom: -0.0625rem;
  width: 0.5625rem;
  height: 1.125rem;
}
</style>
