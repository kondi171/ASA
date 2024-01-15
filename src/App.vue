<script setup lang="ts">
import Header from './components/Header.vue';
import SelectAlgorithm from './components/SelectAlgorithm.vue';
import SelectData from './components/SelectData.vue';
import ControlPanel from './components/ControlPanel.vue';
import Sorted from './components/Sorted.vue';
import Unsorted from './components/Unsorted.vue';
</script>

<template>
  <Header />
  <main>
    <div class="sort-wrapper">
      <Unsorted />
      <Sorted />
    </div>
    <div class="control-wrapper">
      <SelectAlgorithm />
      <SelectData />
      <ControlPanel />
    </div>
  </main>
</template>

<style scoped lang="scss">
@import './assets/scss/variables';

main {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
