<script setup lang="ts">
import { watch } from 'vue';
import { useAppStore } from '../stores/app';


const appStore = useAppStore();
const { unsortedArray, error } = appStore;
watch(error, () => {
  if (error.value) {
    setTimeout(() => {
      error.value = false;
    }, 1000);
  }
});
</script>

<template>
  <section class="sorting">
    <h2>Unsorted Array:</h2>
    <div class="data">
      <div v-if="unsortedArray.value.length === 0" class="info" :class="{ error: error.value }">
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

  .error {
    color: red !important;
    transform: scale(.9);
  }
}
</style>