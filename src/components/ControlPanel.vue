<script setup lang="ts">

import { SortingAlgorithms } from '../ts/enums';
import { useAppStore } from './../stores/app.ts';

const appStore = useAppStore();
const { selectedAlgorithm, unsortedArray, sortedArray, error, time, sortingTimes } = appStore;

const handleRunSorting = () => {
  if (unsortedArray.value.length === 0) error.dataGenerated = true;
  else if (selectedAlgorithm.value === SortingAlgorithms.QUICK_SORT) {
    const startTime = performance.now();
    sortedArray.value = quickSort(unsortedArray.value);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    time.sortedIn = Number(executionTime.toFixed(5));
    sortingTimes.quickSort = Number(executionTime.toFixed(5));
  }
  else if (selectedAlgorithm.value === SortingAlgorithms.MERGE_SORT) {
    const startTime = performance.now();
    sortedArray.value = mergeSort(unsortedArray.value);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    time.sortedIn = Number(executionTime.toFixed(5));
    sortingTimes.mergeSort = Number(executionTime.toFixed(5));
  }
  else if (selectedAlgorithm.value === SortingAlgorithms.HEAP_SORT) {
    const startTime = performance.now();
    sortedArray.value = heapSort(unsortedArray.value);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    time.sortedIn = Number(executionTime.toFixed(5));
    sortingTimes.heapSort = Number(executionTime.toFixed(5));
  }
  else if (selectedAlgorithm.value === SortingAlgorithms.RADIX_SORT) {
    const startTime = performance.now();
    sortedArray.value = radixSort(unsortedArray.value);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    time.sortedIn = Number(executionTime.toFixed(5));
    sortingTimes.radixSort = Number(executionTime.toFixed(5));
  }
  else if (selectedAlgorithm.value === SortingAlgorithms.COUNTING_SORT) {
    const startTime = performance.now();
    sortedArray.value = countingSort(unsortedArray.value);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    time.sortedIn = Number(executionTime.toFixed(5));
    sortingTimes.countingSort = Number(executionTime.toFixed(5));
  }
  else if (selectedAlgorithm.value === SortingAlgorithms.TIM_SORT) {
    const startTime = performance.now();
    sortedArray.value = timSort(unsortedArray.value);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    time.sortedIn = Number(executionTime.toFixed(5));
    sortingTimes.timSort = Number(executionTime.toFixed(5));
  }
  else if (selectedAlgorithm.value === SortingAlgorithms.BUCKET_SORT) {
    const startTime = performance.now();
    sortedArray.value = bucketSort(unsortedArray.value);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    time.sortedIn = Number(executionTime.toFixed(5));
    sortingTimes.bucketSort = Number(executionTime.toFixed(5));
  }
  else if (selectedAlgorithm.value === SortingAlgorithms.INTRO_SORT) {
    const startTime = performance.now();
    sortedArray.value = introSort(unsortedArray.value);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    time.sortedIn = Number(executionTime.toFixed(5));
    sortingTimes.introSort = Number(executionTime.toFixed(5));
  }
}

const quickSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;

  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex];

  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue;
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

const mergeSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  function merge(left: number[], right: number[]): number[] {
    let result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
  return merge(mergeSort(left), mergeSort(right));
}

const heapSort = (arr: number[]): number[] => {
  const clonedArray = [...arr];
  const n = clonedArray.length;

  buildMaxHeap(clonedArray);

  function buildMaxHeap(arr: number[]): void {
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, i, n);
    }
  }

  function heapify(arr: number[], i: number, heapSize: number): void {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;

    if (left < heapSize && arr[left] > arr[largest]) largest = left;
    if (right < heapSize && arr[right] > arr[largest]) largest = right;
    if (largest !== i) {
      swap(arr, i, largest);
      heapify(arr, largest, heapSize);
    }
  }

  function swap(arr: number[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  for (let end = n - 1; end > 0; end--) {
    swap(clonedArray, 0, end);
    heapify(clonedArray, 0, end);
  }

  return clonedArray;
}

const radixSort = (arr: number[]): number[] => {
  const max = getMax(arr);

  function countingSort(arr: number[], exp: number): number[] {
    const n = arr.length;
    const output: number[] = new Array(n).fill(0);
    const count: number[] = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
      count[Math.floor(arr[i] / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
      count[Math.floor(arr[i] / exp) % 10]--;
    }

    return output;
  }

  function getMax(arr: number[]): number {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }

  let sortedArray: number[] = arr.slice();

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    sortedArray = countingSort(sortedArray, exp);
  }

  return sortedArray;
}

const countingSort = (arr: number[]): number[] => {
  const n = arr.length;
  const max = Math.max(...arr);
  const count: number[] = Array(max + 1).fill(0);

  for (let i = 0; i < n; i++) {
    count[arr[i]]++;
  }

  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }

  const output: number[] = new Array(n);

  for (let i = n - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }

  return output;
}

const timSort = (arr: number[]): number[] => {
  const MIN_MERGE = 32;
  const n = arr.length;
  function merge(left: number[], right: number[]): number[] {
    const mergedArray: number[] = [];

    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        mergedArray.push(left[i]);
        i++;
      } else {
        mergedArray.push(right[j]);
        j++;
      }
    }

    return mergedArray.concat(left.slice(i)).concat(right.slice(j));
  }

  function insertionSort(arr: number[], left: number, right: number): void {
    for (let i = left + 1; i <= right; i++) {
      const key = arr[i];
      let j = i - 1;

      while (j >= left && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }

      arr[j + 1] = key;
    }
  }

  const sortedArray: number[] = arr.slice();

  for (let i = 0; i < n; i += MIN_MERGE) {
    insertionSort(sortedArray, i, Math.min(i + MIN_MERGE - 1, n - 1));
  }

  for (let size = MIN_MERGE; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);

      if (mid < right) {
        const leftPart = sortedArray.slice(left, mid + 1);
        const rightPart = sortedArray.slice(mid + 1, right + 1);
        const mergedPart = merge(leftPart, rightPart);
        sortedArray.splice(left, mergedPart.length, ...mergedPart);
      }
    }
  }

  return sortedArray;
}

const bucketSort = (arr: number[]): number[] => {
  const n = arr.length;
  const buckets: number[][] = [];
  const sortedArray: number[] = [];

  for (let i = 0; i < n; i++) {
    const bucketIndex = Math.floor(n * arr[i]);
    if (!buckets[bucketIndex]) {
      buckets[bucketIndex] = [];
    }
    buckets[bucketIndex].push(arr[i]);
  }

  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i]) {
      insertionSort(buckets[i]);
      sortedArray.push(...buckets[i]);
    }
  }
  function insertionSort(arr: number[]): void {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }

      arr[j + 1] = key;
    }
  }
  return sortedArray;
}

const introSort = (arr: number[]): number[] => {
  function introSortHelper(arr: number[], low: number, high: number, maxDepth: number): void {
    if (low < high) {
      if (high - low <= 16) {
        insertionSort(arr, low, high);
      } else if (maxDepth === 0) {
        heapSort(arr, low, high);
      } else {
        const pivotIndex = partition(arr, low, high);
        introSortHelper(arr, low, pivotIndex, maxDepth - 1);
        introSortHelper(arr, pivotIndex + 1, high, maxDepth - 1);
      }
    }
  }

  function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[Math.floor((low + high) / 2)];
    let i = low - 1;
    let j = high + 1;

    while (true) {
      do {
        i++;
      } while (arr[i] < pivot);

      do {
        j--;
      } while (arr[j] > pivot);

      if (i >= j) {
        return j;
      }

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function insertionSort(arr: number[], low: number, high: number): void {
    for (let i = low + 1; i <= high; i++) {
      const key = arr[i];
      let j = i - 1;

      while (j >= low && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }

      arr[j + 1] = key;
    }
  }
  function heapSort(arr: number[], low: number, high: number): void {
    for (let i = Math.floor((high - low) / 2); i >= 0; i--) {
      heapify(arr, i, high);
    }

    for (let i = high; i > low; i--) {
      [arr[low], arr[i]] = [arr[i], arr[low]];
      heapify(arr, low, i - 1);
    }
  }
  function heapify(arr: number[], index: number, size: number): void {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (left <= size && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right <= size && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== index) {
      [arr[index], arr[largest]] = [arr[largest], arr[index]];
      heapify(arr, largest, size);
    }
  }
  const clonedArray = [...arr];
  const maxDepth = Math.floor(2 * Math.log(clonedArray.length) / Math.log(2));
  introSortHelper(clonedArray, 0, clonedArray.length - 1, maxDepth);
  return clonedArray;
}

const handleDownloadUnsorted = () => {
  if (unsortedArray.value.length === 0) {
    error.dataGenerated = true;
    return;
  }

  const jsonData = JSON.stringify(unsortedArray.value, null, 2);

  const blob = new Blob([jsonData], { type: 'application/json' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);

  const fileName = 'unsortedData.json';
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
}


const handleDownloadSorted = () => {
  if (sortedArray.value.length === 0) {
    error.dataSorted = true;
    return;
  }

  const jsonData = JSON.stringify(sortedArray.value, null, 2);

  const blob = new Blob([jsonData], { type: 'application/json' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);

  const fileName = 'sortedData.json';
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
}

</script>

<template>
  <section class="control-panel">
    <h2>Control Panel:</h2>
    <div class="btn-wrapper">
      <button :class="{ disabled: unsortedArray.value.length <= 0 }" @click="handleRunSorting" title="Run Sorting">
        Run
        <font-awesome-icon class="data-icon" icon="play" />
      </button>
      <button :class="{ disabled: unsortedArray.value.length <= 0 }" @click="handleDownloadUnsorted"
        title="Download Unsorted Array">
        Unsorted
        <font-awesome-icon class="data-icon" icon="download" />
      </button>
      <button :class="{ disabled: sortedArray.value.length <= 0 }" @click="handleDownloadSorted"
        title="Download Sorted Array">
        Sorted
        <font-awesome-icon class="data-icon" icon="download" />
      </button>
    </div>

  </section>
</template>

<style scoped lang="scss">
@import './../assets/scss/variables.scss';
@import './../assets/scss/mixins.scss';
@import './../assets/scss/placeholders.scss';

.control-panel {
  @include tile(30vw, 22vh);

  h2 {
    @extend %title;
  }

  .btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    // flex-direction: column;

    button {
      @extend %btn;
      font-size: 1.7vmin;

      &.disabled {
        background: linear-gradient(180deg, rgba(112, 112, 112, 1) 34%, rgba(22, 22, 22, 1) 100%);
        color: black;
        border: 2px solid black;

        &:hover {
          border-color: black;
        }
      }


      .data-icon {
        margin-left: 1vmin;
      }
    }
  }
}
</style>