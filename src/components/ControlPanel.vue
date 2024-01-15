<script setup lang="ts">

</script>

<template>
  <section class="control-panel">
    <h2>Control Panel:</h2>
    <div class="btn-wrapper">

      <button>
        Run
        <font-awesome-icon class="data-icon" icon="play" />
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import './../assets/scss/variables.scss';
@import './../assets/scss/mixins.scss';
@import './../assets/scss/placeholders.scss';

.control-panel {
  @include tile(30vw, 22vh);

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
  }
}
</style>