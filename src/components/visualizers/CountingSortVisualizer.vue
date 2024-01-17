<template>
    <div>
        <h2>CountingSort</h2>
        <div id="array-container">
            <div class="visualization-info" v-if="array.length === 0">Start Visualization First!</div>
            <div v-else v-for="(value, index) in array" :key="index" class="bar" :style="{ height: `${value}vmin` }">
                <span>{{ value }}</span>
            </div>
        </div>
        <button @click="startSort">Start CountingSort</button>
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
        async countingSort(array: number[]) {
            const max = Math.max(...array);
            const min = Math.min(...array);
            const range = max - min + 1;
            const count: number[] = new Array(range).fill(0);
            const output: number[] = new Array(array.length);

            for (let i = 0; i < array.length; i++) {
                count[array[i] - min]++;
            }

            for (let i = 1; i < range; i++) {
                count[i] += count[i - 1];
            }

            for (let i = array.length - 1; i >= 0; i--) {
                output[count[array[i] - min] - 1] = array[i];
                count[array[i] - min]--;
            }

            for (let i = 0; i < array.length; i++) {
                array[i] = output[i];
                await this.generateBars([...array]);
            }
        },
        sleep(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        async startSort() {
            this.array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 30) + 1);
            await this.generateBars(this.array);
            await this.countingSort(this.array);
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