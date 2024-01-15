<script setup lang="ts">
import { useAppStore } from './../stores/app.ts';

const appStore = useAppStore();
const { data } = appStore;

const displayFileName = () => {
  const fileInput = document.getElementById('fileInput') as HTMLElement;
  const fileNameContainer = document.getElementById('fileName');
  fileNameContainer!.textContent = fileInput!.files[0].name;
}

const handleGenerateData = () => {

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

import {
  useAppStore
}

from '../../.history/src/stores/app_20240115180226';

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