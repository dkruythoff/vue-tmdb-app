<template>
  <div :class="elementClass">
    <template v-for="(group, groupIndex) in overviewData">
      <h2
        :key="`carousel-${groupIndex}-title`"
        class="overview__title"
        >{{ group.title }}</h2>
      <Carousel
         :key="`carousel-${groupIndex}-carousel`"
        >
        <Card
          v-for="entry in group.entries"
          :key="`carousel-item-${entry.id}`"
          :entry="entry"
          :focused="entry._focused"
          tabIndex="0"
          />
      </Carousel>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Carousel from './Carousel'
import Card from './Card'

const posterBase = 'http://image.tmdb.org/t/p/w342'

export default {
  name: 'Overview',
  components: {Card,Carousel},
  data() {
    return {
      focusedCarouselIndex: -1,
      focusedCardIndex: -1,
      inputType: null
    }
  },
  computed: {
    ...mapGetters({
      tvPopular: 'tmdb/tvPopular',
      moviePopular: 'tmdb/moviePopular',
      moviesByGenre:'tmdb/moviesByGenre'
    }),
    elementClass() {
      const classObj = {overview:true}
      return this.inputType ? {...classObj, [`input-${this.inputType}`]: true} : classObj
    },
    overviewData() {
      const {focusedCarouselIndex, focusedCardIndex} = this
      const data = []

      if (this.moviePopular.length) {
        data.push({
          title: this.$t('overview.title.moviesPopular'),
          entries: this.moviePopular.map((entry, entryIndex) => ({
            ...entry,
            _focused: focusedCarouselIndex === data.length && focusedCardIndex == entryIndex,
            _poster: `${posterBase}${entry.poster_path}`
          }))
        })
      }

      if (this.tvPopular.length) {
        data.push({
          title: this.$t('overview.title.tvPopular'),
          entries: this.tvPopular.map((entry, entryIndex) => ({
            ...entry,
            _focused: focusedCarouselIndex === data.length && focusedCardIndex == entryIndex,
            _poster: `${posterBase}${entry.poster_path}`
          }))
        })
      }

      Object.entries(this.moviesByGenre).forEach(([, genre]) => {
        if (genre.entries.length) {
          data.push({
            title: this.$t(`overview.title.genre.${genre.name}`),
            entries: genre.entries.map((entry, entryIndex) => ({
              ...entry,
              _focused: focusedCarouselIndex === data.length && focusedCardIndex == entryIndex,
            _poster: `${posterBase}${entry.poster_path}`
            }))
          })
        }
      })

      return data
    }
  },
  mounted() {
    document.addEventListener("touchstart",() => {
      this.inputType = 'touch'
    })
    document.addEventListener("mousemove",() => {
      this.inputType = 'pointer'
    })
    document.addEventListener("keydown",(event) => {
      this.inputType = 'keyboard'
      switch(event.key) {
        case 'ArrowDown':
          this.focusedCarouselIndex = Math.min(this.focusedCarouselIndex + 1, this.$children.length - 1)
          this.focusedCardIndex = 0
          break;
        case 'ArrowUp':
          this.focusedCarouselIndex = Math.max(this.focusedCarouselIndex - 1, 0)
          this.focusedCardIndex = 0
          break;
        case 'ArrowLeft':
          this.focusedCarouselIndex = Math.max(this.focusedCarouselIndex, 0)
          this.focusedCardIndex = Math.max(this.focusedCardIndex - 1, 0)
          break;
        case 'ArrowRight':
          this.focusedCarouselIndex = Math.max(this.focusedCarouselIndex, 0)
          this.focusedCardIndex = Math.min(this.focusedCardIndex + 1, this.overviewData[this.focusedCarouselIndex].entries.length - 1)
          break;
      }
    })
  }
}

</script>