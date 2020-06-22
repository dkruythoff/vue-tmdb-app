<template>
  <ol class="carousel">
    <slot/>
  </ol>
</template>

<script>
export default {
  name: 'Carousel'
}
</script>

<style lang="scss">
.carousel {
  list-style: none;
  display: flex;
  overflow-x: auto;
  padding: 1rem;

  &__item {
    flex: 0 0 12.5rem;
    height: calc(12.5rem * 1.5);
    margin-left: 2rem;

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>