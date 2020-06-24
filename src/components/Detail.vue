<template>
  <div class="detail">
    <div class="detail__content">
      <button class="detail__close" @click="$emit('close')">Close</button>
      <h4 class="detail__title">{{data.title}}</h4>
      <div class="detail__visual" :style="visualStyle">
        <img class="detail__visual__poster" :src="data._poster" />
      </div>
      <div class="detail__poster-wrapper">
        <img class="detail__poster" :src="`http://image.tmdb.org/t/p/w185${data.poster_path}`" />
      </div>
      <div class="detail__overview">
        <h5 class="detail__overview__title">{{$t('detail.title.overview')}}</h5>
        <p>{{data.overview}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    data: {
      type: Object,
      required: true
    },
    detail: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  computed: {
    visualStyle() {
      return {
        backgroundImage: `url(${this.data._backdrop})`
      }
    }
  }
}
</script>