<script setup lang="ts">
import { watch } from 'vue';
import { useAppStore } from '../stores/app';


const appStore = useAppStore();
const { unsortedArray, error } = appStore;
watch(error, () => {
  if (error.dataGenerated) {
    setTimeout(() => {
      error.dataGenerated = false;
    }, 1000);
  }
});
</script>

<template>
  <section class="sorting">
    <h2>Unsorted Array:</h2>
    <div class="data">
      <div v-if="unsortedArray.value.length === 0" class="info" :class="{ error: error.dataGenerated }">
        Generate or Upload Data!
      </div>
      <div v-else>
        {{ unsortedArray.value.map((element: number) => element) }}
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