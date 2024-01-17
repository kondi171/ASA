<template>
    <div>
        <h2>QuickSort</h2>
        <div id="array-container">
            <div class="visualization-info" v-if="array.length === 0">Start Visualization First!</div>
            <div v-else v-for="(value, index) in array" :key="index" class="bar" :style="{ height: `${value}vmin` }">
                <span>{{ value }}</span>
            </div>
        </div>
        <button @click="startSort">Start QuickSort</button>
    </div>
</template>
  
<script lang="ts">
export default {
    data() {
        return {
            array: [] as number[]
        };
    },
    methods: {
        async generateBars(array: number[]) {
            this.array = array;
            await this.sleep(100);
        },
        async quickSort(array: number[], start: number, end: number) {
            if (start >= end) return;

            const pivotIndex = await this.partition(array, start, end);

            await Promise.all([
                this.quickSort(array, start, pivotIndex - 1),
                this.quickSort(array, pivotIndex + 1, end)
            ]);
        },
        async partition(array: number[], start: number, end: number) {
            const pivotValue = array[end];
            let pivotIndex = start;

            for (let i = start; i < end; i++) {
                if (array[i] < pivotValue) {
                    await this.swap(array, i, pivotIndex);
                    pivotIndex++;
                }
            }

            await this.swap(array, pivotIndex, end);
            return pivotIndex;
        },
        async swap(array: number[], i: number, j: number) {
            await this.sleep(100);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            await this.generateBars([...array]);
        },
        sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        async startSort() {
            this.array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 30) + 1);
            await this.generateBars(this.array);
            await this.quickSort(this.array, 0, this.array.length - 1);
        }
    }
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