<template>
    <div>
        <h2>IntroSort</h2>
        <div id="array-container">
            <div class="visualization-info" v-if="mainArray.length === 0">Start Visualization First!</div>
            <div v-else v-for="(value, index) in mainArray" :key="index" class="bar" :style="{ height: `${value}vmin` }">
                <span>{{ value }}</span>
            </div>
        </div>
        <button @click="startSort">Start IntroSort</button>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
    setup() {
        const mainArray = ref<number[]>([]);

        const generateBars = async (array: number[]) => {
            mainArray.value = [...array];
            await sleep(100);
        }

        const heapSort = async (array: number[], n: number) => {
            // Build max heap
            for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
                await heapify(array, n, i)

            // Extract elements from the heap one by one
            for (let i = n - 1; i > 0; i--) {
                await swap(array, 0, i)
                await heapify(array, i, 0)
            }
        }

        const heapify = async (array: number[], n: number, i: number) => {
            let largest = i
            const left = 2 * i + 1
            const right = 2 * i + 2

            if (left < n && array[left] > array[largest]) {
                largest = left
            }
            if (right < n && array[right] > array[largest]) {
                largest = right
            }
            if (largest !== i) {
                await swap(array, i, largest)
                await heapify(array, n, largest)
            }
        }

        const quickSort = async (array: number[], low: number, high: number) => {
            if (low < high) {
                const pivotIndex = await partition(array, low, high)
                await quickSort(array, low, pivotIndex - 1)
                await quickSort(array, pivotIndex + 1, high)
            }
        }

        const partition = async (array: number[], low: number, high: number) => {
            const pivot = array[high]
            let i = low - 1

            for (let j = low; j <= high - 1; j++) {
                if (array[j] < pivot) {
                    i++
                    await swap(array, i, j)
                }
            }

            await swap(array, i + 1, high)
            return i + 1
        }

        const insertionSort = (array: number[], n: number) => {
            for (let i = 1; i < n; i++) {
                const key = array[i]
                let j = i - 1

                while (j >= 0 && array[j] > key) {
                    array[j + 1] = array[j]
                    j--
                }

                array[j + 1] = key
            }
        }

        const swap = async (array: number[], i: number, j: number) => {
            await sleep(100)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp

            await generateBars([...array]);
        }

        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

        const startSort = async () => {
            mainArray.value = Array.from({ length: 20 }, () => Math.floor(Math.random() * 30) + 1);
            await generateBars(mainArray.value);

            await quickSort(mainArray.value, 0, mainArray.value.length - 1);

            const limit = Math.log2(mainArray.value.length);
            if (limit > 0) {
                await heapSort(mainArray.value, mainArray.value.length);
            } else {
                insertionSort(mainArray.value, mainArray.value.length);
            }
        }

        return {
            mainArray, startSort
        }
    }
}
</script>
<style scoped lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/placeholders.scss';
@import './../../assets/scss/mixins.scss';

#array-container {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    transform: rotate(180deg);
}

.bar {
    width: 3vmin;
    margin: 0 .5vmin;
    background-color: $primaryColor;

    span {
        display: block;
        text-align: center;
        color: $bgColor;
        transform: rotate(180deg);
    }
}

h2 {
    text-align: center;
    font-size: 5vmin;
    font-family: $headerFont;
    color: $secondaryColor;
    margin-bottom: 6vmin;
}

button {
    @extend %btn;
    position: absolute;
    bottom: 2vmin;
    left: 50%;
    transform: translate(-50%, -50%);
}

.visualization-info {
    transform: rotate(180deg);
    font-size: 5vmin;
    color: $primaryColor;
    margin-bottom: 5vmin;
}
</style>