import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { SortingAlgorithms } from '../ts/enums';
import { Array } from '../ts/types';
import { SortingTimes } from '../ts/interfaces';
export const useAppStore = defineStore('app', () => {
  const unsortedArray = reactive<Array>({
    value: []
  });
  const sortedArray = reactive<Array>({
    value: []
  });
  const selectedAlgorithm = reactive({
    value: SortingAlgorithms.QUICK_SORT
  });
  const error = reactive({
    dataGenerated: false,
    dataSorted: false,
    fileReaded: true,
  });
  const time = reactive({
    generatedIn: 0,
    sortedIn: 0
  });
  const sortingTimes = reactive<SortingTimes>({
    quickSort: 0,
    mergeSort: 0,
    heapSort: 0,
    radixSort: 0,
    countingSort: 0,
    timSort: 0,
    bucketSort: 0,
    introSort: 0
  });
  const isModalVisible = reactive({
    value: false
  });
  return {
    unsortedArray,
    sortedArray,
    selectedAlgorithm,
    error,
    time,
    sortingTimes,
    isModalVisible
  }
});
