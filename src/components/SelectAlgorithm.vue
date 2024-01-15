<script setup lang="ts">
import { ref } from 'vue';
import { SortingAlgorithms } from './../ts/enums';
import { useAppStore } from './../stores/app.ts';

const appStore = useAppStore();
const { selectedAlgorithm } = appStore;

const selected = ref(SortingAlgorithms.QUICK_SORT);

const handleChangeSort = () => { selectedAlgorithm.value = selected.value; }

</script>

<template>
  <section class="algorithm">
    <h2>Select Algorithm:</h2>
    <section class="select-container">
      <select v-model="selected" @change="handleChangeSort" id="id" name="id">
        <option v-bind:value="SortingAlgorithms.QUICK_SORT">QuickSort</option>
        <option v-bind:value="SortingAlgorithms.MERGE_SORT">MergeSort</option>
        <option v-bind:value="SortingAlgorithms.HEAP_SORT">HeapSort</option>
        <option v-bind:value="SortingAlgorithms.RADIX_SORT">RadixSort</option>
        <option v-bind:value="SortingAlgorithms.COUNTING_SORT">CountingSort</option>
        <option v-bind:value="SortingAlgorithms.TIM_SORT">TimSort</option>
        <option v-bind:value="SortingAlgorithms.BUCKET_SORT">BucketSort</option>
        <option v-bind:value="SortingAlgorithms.INTRO_SORT">IntroSort</option>
      </select>
    </section>
  </section>
</template>


<style scoped lang="scss">
@import './../assets/scss/variables.scss';
@import './../assets/scss/mixins.scss';
@import './../assets/scss/placeholders.scss';

.algorithm {
  @include tile(30vw, 15vh);

  h2 {
    @extend %title;
  }

  .select-container {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    select {
      width: 50%;
      text-align: center;
      padding: 1vmin;
      font-size: 2vmin;
      font-weight: bold;
      border: 2px solid $hoverColor;
      border-radius: 5px;
      background: linear-gradient(180deg, $bgColor 0%, $hoverColor 100%);
      color: $primaryColor;
      outline: none;
      transition: border-color 0.3s;

      &:hover {
        cursor: pointer;
        border-color: $primaryColor;
      }
    }

    option {
      background-color: $bgColor;
    }
  }
}
</style>