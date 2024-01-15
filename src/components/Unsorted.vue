<script setup lang="ts">
import { useAppStore } from '../stores/app';


const appStore = useAppStore();
const { unsortedArray } = appStore;

</script>

<template>
  <section class="sorting">
    <h2>Unsorted Array:</h2>
    <div class="data">
      <div v-if="unsortedArray.value.length === 0" class="info">
        Generate or Upload Data!
      </div>
      <div v-else>
        {{ unsortedArray.value.map((element: number) => element) }}
        <span>{{ unsortedArray.value.length }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import './../assets/scss/variables.scss';
@import './../assets/scss/mixins.scss';
@import './../assets/scss/placeholders.scss';

.sorting {
  @extend %arrayTile;

  span {
    color: red;
  }
}
</style>