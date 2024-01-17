<script setup lang="ts">
import Header from './components/Header.vue';
import SelectAlgorithm from './components/SelectAlgorithm.vue';
import SelectData from './components/SelectData.vue';
import ControlPanel from './components/ControlPanel.vue';
import Sorted from './components/Sorted.vue';
import Unsorted from './components/Unsorted.vue';
import TimesPin from './components/TimesPin.vue';
import { useAppStore } from './stores/app';
import Modal from './components/Modal.vue';

const appStore = useAppStore();
const { isModalVisible } = appStore;

const handleCloseModal = () => {
  isModalVisible.value = false;
}
</script>

<template>
  <Header />
  <TimesPin />
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
  <Modal v-bind:isModalVisible="isModalVisible.value" v-bind:closeModal="handleCloseModal" />
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
