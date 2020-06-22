<template>
  <li class="carousel__item card">
    <h3 v-if="entry">{{entry.title}}</h3>
  </li>
</template>

<script>
export default {
  name: 'Card',
  props: {
    entry: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
.card {
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px #ccc;
}
</style>