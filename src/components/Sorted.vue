<script setup lang="ts">
import { useAppStore } from '../stores/app';


const appStore = useAppStore();
const { sortedArray } = appStore;

</script>

<template>
  <section class="sorting">
    <h2>Sorted Array:</h2>
    <div class="data">
      <div v-if="sortedArray.value.length === 0" class="info">
        Select Sorting Algorithm and Click Run!
      </div>
      <div v-else>
        {{ sortedArray.value.map((number: number) => number) }}
        <span>{{ sortedArray.value.length }}</span>
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