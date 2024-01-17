<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from '../stores/app';

const appStore = useAppStore();
const { sortingTimes } = appStore;

const timesPinVisible = ref(false);

const toggleTimesPin = () => {
    timesPinVisible.value = !timesPinVisible.value;
};
</script>

<template>
    <div>
        <font-awesome-icon class="data-icon" :class="{ 'move-icon': timesPinVisible }" icon="chevron-right"
            @click="toggleTimesPin" />
        <section class="times-pin" :class="{ 'times-pin-visible': timesPinVisible }">
            <h2>Times pin</h2>
            <h3>QuickSort -
                <span v-if="sortingTimes.quickSort !== 0">{{ sortingTimes.quickSort }}ms</span>
                <span v-else class="none">None</span>
            </h3>
            <h3>MergeSort -
                <span v-if="sortingTimes.mergeSort !== 0">{{ sortingTimes.mergeSort }}ms</span>
                <span v-else class="none">None</span>
            </h3>
            <h3>HeapSort -
                <span v-if="sortingTimes.heapSort !== 0">{{ sortingTimes.heapSort }}ms</span>
                <span v-else class="none">None</span>
            </h3>
            <h3>RadixkSort -
                <span v-if="sortingTimes.radixSort !== 0">{{ sortingTimes.radixSort }}ms</span>
                <span v-else class="none">None</span>
            </h3>
            <h3>CountingSort -
                <span v-if="sortingTimes.countingSort !== 0">{{ sortingTimes.countingSort }}ms</span>
                <span v-else class="none">None</span>
            </h3>
            <h3>TimSort -
                <span v-if="sortingTimes.timSort !== 0">{{ sortingTimes.timSort }}ms</span>
                <span v-else class="none">None</span>
            </h3>
            <h3>BucketSort -
                <span v-if="sortingTimes.bucketSort !== 0">{{ sortingTimes.bucketSort }}ms</span>
                <span v-else class="none">None</span>
            </h3>
            <h3>IntroSort -
                <span v-if="sortingTimes.introSort !== 0">{{ sortingTimes.introSort }}ms</span>
                <span v-else class="none">None</span>
            </h3>
        </section>
    </div>
</template>

<style scoped lang="scss">
@import './../assets/scss/variables.scss';

.times-pin {
    position: fixed;
    top: 25vh;
    width: 15vw;
    height: 50vh;
    background-color: $hoverColor;
    z-index: 10;
    padding: 2vmin;
    border-top-right-radius: 2vmin;
    border-bottom-right-radius: 2vmin;
    border: .5vmin solid $primaryColor;
    border-left: none;
    transform: translateX(-15vw);
    transform: translateX(-15vw);
    transition: transform 0.3s ease;

    h2 {
        color: $supportColor;
        font-family: $headerFont;
        text-align: center;
        border-bottom: .3vmin solid $supportColor;
        margin-bottom: 2vmin;
    }

    h3 {
        color: $secondaryColor;
        margin: 1.5vmin 0;
    }

    .none {
        color: red;
    }
}

.data-icon {
    position: fixed;
    left: 0;
    top: 40vh;
    font-size: 8vmin;
    color: $primaryColor;
    padding: 2vmin;
    transition: all 0.3s ease;

    &:hover {
        cursor: pointer;
        color: $hoverColor;
    }
}

.move-icon {
    transform: translateX(15vw) rotate(180deg);

}

.times-pin-visible {
    transform: translateX(0);
}
</style>
