<template>
  <li class="carousel_item card">
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