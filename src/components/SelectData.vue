<template>
  <section class="data">
    <h2>Select Data:</h2>
    <div class="btn-wrapper">
      <button @click="handleGenerateData" class="generate-btn" title="Generate Random Data">
        Generate Data
        <font-awesome-icon class="data-icon" icon="shuffle" />
      </button>
      <div class="input-wrapper">
        <label for="arraySize">Array Size:</label>
        <input placeholder="Array Size" type="number" :value="arraySize" id="arraySize" @change="updateArraySize"><br>
        <label for="startRange">Generate from</label>
        <input placeholder="from" type="number" :value="startRange" id="startRange" @change="updateStartRange">
        <label for="endRange">to</label>
        <input placeholder="to" type="number" :value="endRange" id="endRange" @change="updateEndRange">
      </div>
      <label for="fileInput" class="custom-file-upload" title="Upload Data">
        Upload Data
        <font-awesome-icon class="data-icon" icon="upload" />
      </label>
      <div class="file-name" id="fileName">No file uploaded!</div>
      <input id="fileInput" type="file" name="file" @change="readFile" />
    </div>
  </section>
  <div v-if="!error.fileReaded" class="error-message">
    <h4>The file was not read correctly. File must meet the following conditions:</h4>
    <span>&bull; Must be in .json format.</span>
    <span>&bull; Must have the following template: [12, 67, ... ,39]</span>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from './../stores/app.ts'
import { ref, watch } from 'vue';

const appStore = useAppStore()
const { unsortedArray, sortedArray, error, time, sortingTimes } = appStore

const arraySize = ref(100);
const startRange = ref(0);
const endRange = ref(100);

const readFile = () => {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  const fileNameContainer = document.getElementById('fileName') as HTMLDivElement;
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    const cleanedText = (event.target?.result as string).replace(/^\uFEFF/, '');
    try {
      const array = JSON.parse(cleanedText);
      unsortedArray.value = array;
      fileNameContainer.textContent = file.name;
    } catch (err) {
      console.error("Błąd parsowania JSON:", err);
      error.fileReaded = false;
    }
  };

  if (file) {
    reader.readAsText(file);
  } else {
    fileNameContainer.textContent = 'No file uploaded!';
    error.fileReaded = false;
  }
}


const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateRandomNumbers = (length: number): number[] => {
  const numbers: number[] = [];

  for (let i = 0; i < length; i++) {
    const randomNumber = getRandomInt(Number(startRange.value), Number(endRange.value));
    numbers.push(randomNumber);
  }

  return numbers
}


const updateArraySize = (event: Event) => {
  arraySize.value = Number((event.target as HTMLInputElement).value);
}

const updateStartRange = (event: Event) => {
  startRange.value = Number((event.target as HTMLInputElement).value);
}

const updateEndRange = (event: Event) => {
  endRange.value = Number((event.target as HTMLInputElement).value);
}

const handleGenerateData = () => {
  const startTime = performance.now();
  const randomNumbers = generateRandomNumbers(arraySize.value);
  const endTime = performance.now();
  const executionTime = endTime - startTime;

  time.generatedIn = Number(executionTime.toFixed(5));
  unsortedArray.value = randomNumbers;
  error.dataGenerated = true;
  sortingTimes.quickSort = 0;
  sortingTimes.mergeSort = 0;
  sortingTimes.heapSort = 0;
  sortingTimes.radixSort = 0;
  sortingTimes.countingSort = 0;
  sortingTimes.timSort = 0;
  sortingTimes.bucketSort = 0;
  sortingTimes.introSort = 0;
  sortedArray.value = [];
}



watch(error, () => {
  if (!error.fileReaded) {
    setTimeout(() => {
      error.fileReaded = true;
    }, 2000);
  }
});
</script>

<style scoped lang="scss">
@import './../assets/scss/variables.scss';
@import './../assets/scss/mixins.scss';
@import './../assets/scss/placeholders.scss';

.data {
  @include tile(30vw, 40vh);

  h2 {
    @extend %title;
  }

  .btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    button {
      @extend %btn;

      .data-icon {
        margin-left: 1vmin;
      }
    }

    .input-wrapper {

      label {
        color: $secondaryColor;
      }

      input {
        background-color: transparent;
        outline: none;
        border: none;
        border-bottom: 2px solid $bgColor;
        text-align: center;
        margin: .5vmin 1vmin;
        width: 10vmin;
        color: $primaryColor;

        &::placeholder {
          color: $bgColor;
        }
      }
    }

    #fileInput {
      display: none;
    }

    .custom-file-upload {
      @extend %btn;
    }

    .file-name {
      font-style: italic;
      font-family: $headerFont;
      color: $secondaryColor;
    }
  }
}

.error-message {
  position: fixed;
  right: 2vmin;
  top: 2vmin;
  transform: scale(1);
  transition: transform 0.4s;
  background-color: $hoverColor;
  color: #ff0000;
  width: 60vmin;
  padding: 2vmin;
  border-radius: 2vmin;
  border: .1vmin solid #ff0000;

  span {
    display: block;
  }
}
</style>