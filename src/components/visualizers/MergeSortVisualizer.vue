<template>
    <div>
        <h2>MergeSort</h2>
        <div id="array-container">
            <div class="visualization-info" v-if="array.length === 0">Start Visualization First!</div>
            <div v-else v-for="(value, index) in array" :key="index" class="bar" :style="{ height: `${value}vmin` }">
                <span>{{ value }}</span>
            </div>
        </div>
        <button @click="startSort">Start MergeSort</button>
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
        async mergeSort(array: number[]) {
            if (array.length <= 1) return array;

            const mid = Math.floor(array.length / 2);
            const left = array.slice(0, mid);
            const right = array.slice(mid);

            const leftSorted = await this.mergeSort(left);
            const rightSorted = await this.mergeSort(right);

            return await this.merge(leftSorted, rightSorted);
        },
        async merge(left: number[], right: number[]) {
            const result: number[] = [];
            let leftIndex = 0;
            let rightIndex = 0;

            while (leftIndex < left.length && rightIndex < right.length) {
                if (left[leftIndex] < right[rightIndex]) {
                    result.push(left[leftIndex++]);
                } else {
                    result.push(right[rightIndex++]);
                }
            }

            return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
        },
        async animateMergeSort(sortedArray: number[]) {
            for (let i = 0; i < sortedArray.length; i++) {
                await this.sleep(100);
                await this.generateBars(sortedArray.slice(0, i + 1));
            }
        },
        sleep(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        async startSort() {
            this.array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 30) + 1);
            await this.generateBars(this.array);
            const sortedArray = await this.mergeSort(this.array);
            await this.animateMergeSort(sortedArray);
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