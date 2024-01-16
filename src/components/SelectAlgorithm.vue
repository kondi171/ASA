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
    <div class="wrapper">
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
      <font-awesome-icon class="data-icon" icon="circle-info" />
      <div class="sort-description">
        <div v-if="selectedAlgorithm.value === SortingAlgorithms.QUICK_SORT">
          <h4>QuickSort</h4>
          <span>&bull; Operates on the divide and conquer principle.</span>
          <span>&bull; Uses recursion to partition the array into smaller parts.</span>
          <span>&bull; Utilizes a pivot element for comparison and moving elements.</span>
        </div>
        <div v-if="selectedAlgorithm.value === SortingAlgorithms.MERGE_SORT">
          <h4>MergeSort</h4>
          <span>&bull; Operates on the divide and conquer principle.</span>
          <span>&bull; Divides the array into two equal parts, sorts each of them, and then merges them into one sorted
            array.</span>
          <span>&bull; Utilizes recursion.</span>
        </div>
        <div v-if="selectedAlgorithm.value === SortingAlgorithms.HEAP_SORT">
          <h4>HeapSort</h4>
          <span>&bull; Uses the heap data structure.</span>
          <span>&bull; Creates a maximum heap (for ascending order) or minimum heap (for descending order).</span>
          <span>&bull; Extracts elements from the heap, placing them in the sorted array.</span>
        </div>
        <div v-if="selectedAlgorithm.value === SortingAlgorithms.RADIX_SORT">
          <h4>RadixSort</h4>
          <span>&bull; Sorts numbers based on digits, starting from the least significant digit.</span>
          <span>&bull; Can be applied to sort integers, strings, or other data that can be compared digit by digit.</span>
        </div>
        <div v-if="selectedAlgorithm.value === SortingAlgorithms.COUNTING_SORT">
          <h4>CountingSort</h4>
          <span>&bull; Efficient for sorting integers within a limited range.</span>
          <span>&bull; Creates an auxiliary array to count occurrences of each element and then builds a sorted
            array.</span>
        </div>
        <div v-if="selectedAlgorithm.value === SortingAlgorithms.TIM_SORT">
          <h4>TimSort</h4>
          <span>&bull; Utilizes a combination of MergeSort and InsertionSort.</span>
          <span>&bull; Optimized for partially sorted data and applies adaptive strategies.</span>
        </div>
        <div v-if="selectedAlgorithm.value === SortingAlgorithms.BUCKET_SORT">
          <h4>BucketSort</h4>
          <span>&bull; Divides the array into "buckets" and places elements into the appropriate buckets.</span>
          <span>&bull; Then sorts the contents of each bucket, finally merging them into one sorted array.</span>
        </div>
        <div v-if="selectedAlgorithm.value === SortingAlgorithms.INTRO_SORT">
          <h4>IntroSort</h4>
          <span>&bull; Combines QuickSort, HeapSort, and InsertionSort.</span>
          <span>&bull; Starts with QuickSort but transitions to HeapSort when the number of recursive calls is too
            high.</span>
        </div>
      </div>
    </div>
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

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    .select-container {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      select {
        width: 700%;
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

    .data-icon {
      font-size: 3vmin;
      margin-left: 6vmin;
      color: $primaryColor;
      transition-duration: .4s;

      &:hover {
        color: $bgColor;
        cursor: pointer;

        &+.sort-description {
          transform: scale(1);
        }
      }
    }


    .sort-description {
      position: fixed;
      left: 2vmin;
      bottom: 2vmin;
      transform: scale(0);
      transition: transform 0.4s;
      background-color: $hoverColor;
      color: $primaryColor;
      width: 60vmin;
      padding: 2vmin;
      border-radius: 2vmin;
      border: .1vmin solid $primaryColor;

      span {
        display: block;
      }
    }
  }

}
</style>