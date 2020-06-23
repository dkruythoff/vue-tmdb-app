<template>
  <li class="carousel__item card">
    <img
      v-if="entry.poster_path"
      class="card__image" :src="entry._poster"
      :alt="entry.title"
      />
    <div
      v-else
      class="card__filler"
      >
      <span class="card__filler__title">{{entry.title}}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'Card',
  props: {
    entry: {
      type: Object,
      default: null
    },
    focused: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    focused(newVal) {
      if (newVal) {
        this.$el.focus()
      }
    }
  }
}
</script>
