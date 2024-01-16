import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { SortingAlgorithms } from '../ts/enums';
import { Array } from '../ts/types';
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
    value: false
  });
  return {
    unsortedArray,
    sortedArray,
    selectedAlgorithm,
    error,
  }
});
