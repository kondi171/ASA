<template>
  <section class="data">
    <h2>Select Data:</h2>
    <div class="btn-wrapper">
      <button @click="handleGenerateData" class="generate-btn">
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
      <label for="fileInput" class="custom-file-upload">
        Upload Data
        <font-awesome-icon class="data-icon" icon="upload" />
      </label>
      <div class="file-name" id="fileName">No file uploaded!</div>
      <input id="fileInput" type="file" name="file" @change="displayFileName" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAppStore } from './../stores/app.ts'
import { ref } from 'vue'

const appStore = useAppStore()
const { unsortedArray } = appStore

const arraySize = ref(100);
const startRange = ref(0);
const endRange = ref(100);

const displayFileName = () => {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement
  const fileNameContainer = document.getElementById('fileName') as HTMLDivElement
  fileNameContainer.textContent = fileInput.files[0].name
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
  const randomNumbers = generateRandomNumbers(arraySize.value)
  unsortedArray.value = randomNumbers
}
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
</style>