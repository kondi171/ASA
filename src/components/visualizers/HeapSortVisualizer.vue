<template>
    <div>
        <h2>HeapSort</h2>
        <div id="array-container">
            <div class="visualization-info" v-if="array.length === 0">Start Visualization First!</div>
            <div v-else v-for="(value, index) in array" :key="index" class="bar" :style="{ height: `${value}vmin` }">
                <span>{{ value }}</span>
            </div>
        </div>
        <button @click="startSort">Start HeapSort</button>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            array: [] as number[],
        };
    },
    methods: {
        async generateBars(array: number[]) {
            this.array = array;
            await this.sleep(100);
        },
        async heapSort(array: number[]) {
            const n = array.length;

            // Build max heap
            for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
                await this.heapify(array, n, i);
            }

            // Extract elements from the heap one by one
            for (let i = n - 1; i > 0; i--) {
                await this.swap(array, 0, i);
                await this.heapify(array, i, 0);
            }
        },
        async heapify(array: number[], n: number, i: number) {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            if (left < n && array[left] > array[largest]) {
                largest = left;
            }

            if (right < n && array[right] > array[largest]) {
                largest = right;
            }

            if (largest !== i) {
                await this.swap(array, i, largest);
                await this.heapify(array, n, largest);
            }
        },
        async swap(array: number[], i: number, j: number) {
            await this.sleep(100);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            await this.generateBars([...array]);
        },
        sleep(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        async startSort() {
            this.array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 30) + 1);
            await this.generateBars(this.array);
            await this.heapSort(this.array);
        },
    },
};
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