<script setup lang="ts">

</script>

<template>
  <div class="logoText">
    <h2>Advanced Sorting Algorithms</h2>
    <h2>Advanced Sorting Algorithms</h2>
  </div>
</template>

<style scoped lang="scss">
@import './../assets/scss/variables.scss';

h1 {
  font-size: 5vmin;
  font-family: $headerFont;
  color: $primaryColor;
  padding: 2vmin;
}

.logoText {
  position: relative;
  left: 6vw;
  top: 1vh;
  width: 50vw;
  height: 10vmin;

  h2 {
    position: absolute;
    font-size: 6vmin;
    font-size: 5vmin;
    font-family: $headerFont;
    color: $primaryColor;
    padding: 2vmin;

    &:nth-child(1) {
      color: transparent;
      -webkit-text-stroke: .1vmin $primaryColor;
    }

    &:nth-child(2) {
      background-color: $primaryColor;
      background: linear-gradient(180deg, $primaryColor 50%, $hoverColor 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: animate 4s ease-in-out infinite;
    }
  }

  @keyframes animate {

    0%,
    100% {
      clip-path: polygon(0% 45%, 15% 44%, 32% 50%,
          54% 60%, 70% 61%, 84% 59%, 100% 52%,
          100% 100%, 0% 100%);
    }

    50% {
      clip-path: polygon(0% 60%, 16% 65%, 34% 66%,
          51% 62%, 67% 50%, 84% 45%, 100% 46%,
          100% 100%, 0% 100%);
    }
  }
}
</style>
