<script setup lang="ts">
import { watch } from 'vue';
import { useAppStore } from '../stores/app';


const appStore = useAppStore();
const { sortedArray, error } = appStore;
watch(error, () => {
  if (error.dataSorted) {
    setTimeout(() => {
      error.dataSorted = false;
    }, 1000);
  }
});
</script>

<template>
  <section class="sorting">
    <h2>Sorted Array:</h2>
    <div class="data">
      <div v-if="sortedArray.value.length === 0" class="info" :class="{ error: error.dataSorted }">
        Select Sorting Algorithm and Click Run!
      </div>
      <div v-else>
        {{ sortedArray.value.map((number: number) => number) }}
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
}
</style>