<script setup lang="ts">
import { useAppStore } from './../stores/app.ts';

const appStore = useAppStore();
const { unsortedArray } = appStore;

const displayFileName = () => {
  const fileInput = document.getElementById('fileInput') as HTMLElement;
  const fileNameContainer = document.getElementById('fileName');
  fileNameContainer!.textContent = fileInput!.files[0].name;
  console.log(fileInput);
}

const getRandomInt = (min: number, max: number): number => { return Math.floor(Math.random() * (max - min + 1)) + min; }

const generateRandomNumbers = (length: number): number[] => {
  const numbers: number[] = [];

  for (let i = 0; i < length; i++) {
    const randomNumber = getRandomInt(1, 100);
    numbers.push(randomNumber);
  }

  return numbers;
}



const handleGenerateData = () => {
  const randomNumbers = generateRandomNumbers(100);
  unsortedArray.value = randomNumbers;
}
</script>

<template>
  <section class="data">
    <h2>Select Data:</h2>
    <div class="btn-wrapper">
      <button @click="handleGenerateData">
        Generate Data
        <font-awesome-icon class="data-icon" icon="shuffle" />
      </button>

      <label for="fileInput" class="custom-file-upload">
        Upload Data
        <font-awesome-icon class="data-icon" icon="upload" />
      </label>
      <div class="file-name" id="fileName">No file uploaded!</div>
      <input id="fileInput" type="file" name="file" v-on:change="displayFileName()" />

    </div>
  </section>
</template>

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

    #fileInput {
      display: none;
    }

    .custom-file-upload {
      @extend %btn;
    }

    .file-name {
      margin-top: 2vmin;
      font-style: italic;
      font-family: $headerFont;
      color: $secondaryColor;
    }
  }
}
</style>