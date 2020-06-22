<template>
  <div class="overview">
    <template v-if="moviePopular.length">
      <b>{{ $t('Popular movies') }}</b>
      <Carousel>
        <Card
          v-for="(entry, index) in moviePopular"
          :key="`pop-movies-${index}`"
          :entry="entry"
          />
      </Carousel>
    </template>
    <template v-if="tvPopular.length">
    <b>{{ $t('Popular series') }}</b>
    <Carousel>
      <Card
        v-for="entry in tvPopular"
        :key="`pop-movies-${entry.id}`"
        :entry="entry"
        />
    </Carousel>
    </template>
    <template v-for="genre in moviesByGenre">
      <b :key="`movies-for-genre-${genre.id}-title`">{{ $t(genre.name) }}</b>
      <Carousel :key="`movies-for-genre-${genre.id}-carousel`">
        <Card
          v-for="entry in genre.entries"
          :key="`pop-movies-${entry.id}`"
          :entry="entry"
          />
      </Carousel>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Carousel from './Carousel'
import Card from './Card'

export default {
  name: 'Overview',
  components: {Card,Carousel},
  computed: mapGetters({
    tvPopular: 'tmdb/tvPopular',
    moviePopular: 'tmdb/moviePopular',
    moviesByGenre:'tmdb/moviesByGenre'
  })
}

</script>