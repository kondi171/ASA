<template>
    <div>
        <h2>BucketSort</h2>
        <div id="array-container">
            <div class="visualization-info" v-if="array.length === 0">Start Visualization First!</div>
            <div v-else v-for="(value, index) in array" :key="index" class="bar" :style="{ height: `${value}vmin` }">
                <span>{{ value }}</span>
            </div>
        </div>
        <button @click="startSort">Start BucketSort</button>
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
        async bucketSort(array: number[]) {
            const n = array.length;
            const max = Math.max(...array);
            const min = Math.min(...array);
            const bucketCount = Math.floor((max - min) / n) + 1;

            const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

            for (let i = 0; i < n; i++) {
                const bucketIndex = Math.floor((array[i] - min) / n);
                buckets[bucketIndex].push(array[i]);
            }

            for (let i = 0; i < bucketCount; i++) {
                await this.insertionSort(buckets[i]);
            }

            let k = 0;
            for (let i = 0; i < bucketCount; i++) {
                for (let j = 0; j < buckets[i].length; j++) {
                    array[k++] = buckets[i][j];
                    await this.generateBars([...array]);
                }
            }
        },
        async insertionSort(bucket: number[]) {
            const n = bucket.length;
            for (let i = 1; i < n; i++) {
                const key = bucket[i];
                let j = i - 1;
                while (j >= 0 && bucket[j] > key) {
                    bucket[j + 1] = bucket[j];
                    j--;
                }
                bucket[j + 1] = key;
                await this.generateBars([...bucket]);
            }
        },
        sleep(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        async startSort() {
            this.array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 30) + 1);
            await this.generateBars(this.array);
            await this.bucketSort(this.array);
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