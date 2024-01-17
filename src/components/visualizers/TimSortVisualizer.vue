<template>
    <div>
        <h2>TimSort</h2>
        <div id="array-container">
            <div class="visualization-info" v-if="array.length === 0">Start Visualization First!</div>
            <div v-else v-for="(value, index) in array" :key="index" class="bar" :style="{ height: `${value}vmin` }">
                <span>{{ value }}</span>
            </div>
        </div>
        <button @click="startSort">Start TimSort</button>
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
            await this.sleep(400);
        },
        async insertionSort(array: number[], left: number, right: number) {
            for (let i = left + 1; i <= right; i++) {
                const key = array[i];
                let j = i - 1;
                while (j >= left && array[j] > key) {
                    array[j + 1] = array[j];
                    j--;
                }
                array[j + 1] = key;
            }
        },
        async merge(array: number[], left: number, mid: number, right: number) {
            const len1 = mid - left + 1;
            const len2 = right - mid;

            const leftArray = new Array(len1);
            const rightArray = new Array(len2);

            for (let i = 0; i < len1; i++) {
                leftArray[i] = array[left + i];
            }

            for (let i = 0; i < len2; i++) {
                rightArray[i] = array[mid + 1 + i];
            }

            let i = 0;
            let j = 0;
            let k = left;

            while (i < len1 && j < len2) {
                if (leftArray[i] <= rightArray[j]) {
                    array[k] = leftArray[i];
                    i++;
                } else {
                    array[k] = rightArray[j];
                    j++;
                }
                k++;
            }

            while (i < len1) {
                array[k] = leftArray[i];
                i++;
                k++;
            }

            while (j < len2) {
                array[k] = rightArray[j];
                j++;
                k++;
            }

            await this.generateBars([...array]);
        },
        async timSort(array: number[]) {
            const RUN = 32;
            const n = array.length;

            for (let i = 0; i < n; i += RUN) {
                await this.insertionSort(array, i, Math.min(i + RUN - 1, n - 1));
            }

            for (let size = RUN; size < n; size = 2 * size) {
                for (let left = 0; left < n; left += 2 * size) {
                    const mid = left + size - 1;
                    const right = Math.min(left + 2 * size - 1, n - 1);
                    await this.merge(array, left, mid, right);
                }
            }
        },
        sleep(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        async startSort() {
            this.array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 30) + 1);
            await this.generateBars(this.array);
            await this.timSort(this.array);
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