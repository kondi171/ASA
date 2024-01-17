<script setup lang="ts">
import QuickSortVisualizer from './visualizers/QuickSortVisualizer.vue';
import MergeSortVisualizer from './visualizers/MergeSortVisualizer.vue';
import HeapSortVisualizer from './visualizers/HeapSortVisualizer.vue';
import RadixSortVisualizer from './visualizers/RadixSortVisualizer.vue';
import CountingSortVisualizer from './visualizers/CountingSortVisualizer.vue';
import TimSortVisualizer from './visualizers/TimSortVisualizer.vue';
import BucketSortVisualizer from './visualizers/BucketSortVisualizer.vue';
import IntroSortVisualizer from './visualizers/IntroSortVisualizer.vue';
import { useAppStore } from '../stores/app';
import { SortingAlgorithms } from '../ts/enums';
// import { onMounted, reactive } from 'vue';
// import { useAppStore } from '../stores/app';


const { isModalVisible, closeModal } = defineProps(['isModalVisible', 'closeModal']);
const appStore = useAppStore();
const { selectedAlgorithm } = appStore;

</script>
<template>
    <div class="overlay" :class="{ activeOverlay: isModalVisible }">
        <div v-if="isModalVisible" class="modal" :class="{ activeModal: isModalVisible }">
            <div v-if="selectedAlgorithm.value === SortingAlgorithms.QUICK_SORT">
                <QuickSortVisualizer />
            </div>
            <div v-if="selectedAlgorithm.value === SortingAlgorithms.MERGE_SORT">
                <MergeSortVisualizer />
            </div>
            <div v-if="selectedAlgorithm.value === SortingAlgorithms.HEAP_SORT">
                <HeapSortVisualizer />
            </div>
            <div v-if="selectedAlgorithm.value === SortingAlgorithms.RADIX_SORT">
                <RadixSortVisualizer />
            </div>
            <div v-if="selectedAlgorithm.value === SortingAlgorithms.COUNTING_SORT">
                <CountingSortVisualizer />
            </div>
            <div v-if="selectedAlgorithm.value === SortingAlgorithms.TIM_SORT">
                <TimSortVisualizer />
            </div>
            <div v-if="selectedAlgorithm.value === SortingAlgorithms.BUCKET_SORT">
                <BucketSortVisualizer />
            </div>
            <div v-if="selectedAlgorithm.value === SortingAlgorithms.INTRO_SORT">
                <IntroSortVisualizer />
            </div>

            <font-awesome-icon v-on:click="closeModal" icon="fa-solid fa-x" class="icon" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import './../assets/scss/variables.scss';

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    transition-duration: 0.4s;
    opacity: 0;
    transform: translateY(100vmin);
    z-index: 1;

    &.activeOverlay {
        transform: translateY(0);
        opacity: 1;
    }

    .modal {
        position: relative;
        width: 70%;
        height: 65vh;
        background-color: $hoverColor;
        border-radius: 5vmin 0 5vmin 0;
        border: 2px solid $supportColor;
        padding: 2vmin;
        transform: scale(0);
        opacity: 0;

        &.activeModal {
            transform: scale(1);
            opacity: 1;
        }
    }

    .icon {
        font-size: 2.5vmin;
        font-weight: bold;
        position: absolute;
        right: -1vmin;
        top: -2vmin;
        width: 30px;
        height: 30px;
        color: $hoverColor;
        background-color: $secondaryColor;
        border-radius: 50%;
        padding: 1vmin;
        border: 2px solid $hoverColor;
        transition-duration: .4s;

        &:hover {
            cursor: pointer;
            color: $secondaryColor;
            background-color: $hoverColor;
            border-color: $secondaryColor;
            transform: rotate(180deg);
        }
    }
}
</style>
