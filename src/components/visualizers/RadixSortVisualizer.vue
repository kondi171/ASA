<template>
    <div>
        <h2>RadixSort</h2>
        <div id="array-container">
            <div class="visualization-info" v-if="array.length === 0">Start Visualization First!</div>
            <div v-else v-for="(value, index) in array" :key="index" class="bar" :style="{ height: `${value}vmin` }">
                <span>{{ value }}</span>
            </div>
        </div>
        <button @click="startSort">Start RadixSort</button>
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
            await this.sleep(600);
        },
        getMax(array: number[]): number {
            return Math.max(...array);
        },
        async countSort(array: number[], exp: number) {
            const output: number[] = new Array(array.length).fill(0);
            const count: number[] = new Array(10).fill(0);

            for (let i = 0; i < array.length; i++) {
                count[Math.floor(array[i] / exp) % 10]++;
            }

            for (let i = 1; i < 10; i++) {
                count[i] += count[i - 1];
            }

            for (let i = array.length - 1; i >= 0; i--) {
                const index = Math.floor(array[i] / exp) % 10;
                output[count[index] - 1] = array[i];
                count[index]--;
            }

            for (let i = 0; i < array.length; i++) {
                array[i] = output[i];
            }

            await this.generateBars([...array]);
        },
        async radixSort(array: number[]) {
            const max = this.getMax(array);

            for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
                await this.countSort(array, exp);
            }
        },
        sleep(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        async startSort() {
            this.array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 30) + 1);
            await this.generateBars(this.array);
            await this.radixSort(this.array);
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