<script setup lang="ts">

</script>

<template>
  <section class="sorting">
    <h2>Sorted Data:</h2>
  </section>
</template>

<style scoped lang="scss">
@import './../assets/scss/variables.scss';
@import './../assets/scss/mixins.scss';
@import './../assets/scss/placeholders.scss';

.sorting {
  @include tile(70vw, 83vh);

  h2 {
    @extend %title;
  }
}
</style>