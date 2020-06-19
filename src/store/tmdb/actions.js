import axios from 'axios'

const baseURL = process.env.VUE_APP_TMDB_API_BASE || '/.netlify/functions/tmdb'

/**
 * Fetch the next page for popular tv movies and store it in state
 *
 * @param context The VueX module context
 */
export async function fetchPopularMoviePage({ commit, state }) {
  commit('preparePopularMoviePage') // prepare new empty page
  const nextPage = state.movie.popular.pages.length // which gives us the next index

  try {
    // fetch the next page data
    const { data } = await axios({
      url: '/movie/popular',
      baseURL,
      params: {
        page: nextPage
      }
    })
    commit('setPopularMoviePage', data)
  } catch (error) {
    commit('setPopularMoviePageError', { page: nextPage, error })
  }
}

/**
 * Fetch the next page for popular tv shows and store it in state
 *
 * @param context The VueX module context
 */
export async function fetchPopularTvPage({ commit, state }) {
  commit('preparePopularTvPage') // prepare new empty page
  const nextPage = state.tv.popular.pages.length // which gives us the next index

  try {
    // fetch the next page data
    const { data } = await axios({
      url: '/tv/popular',
      baseURL,
      params: {
        page: nextPage
      }
    })
    // commit page data
    commit('setPopularTvPage', data)
  } catch (error) {
    // store error for debugging purposes
    commit('setPopularTvPageError', { page: nextPage, error })
  }
}

/**
 * Fetch all movie genres and store them in state 
 * Will only fetch when no genres are present
 * 
 * @param context The VueX module context
 */
export async function fetchMovieGenres({ commit, state }) {
  if (state.genres.length > 0) {
    return Promise.resolve()
  }

  try {
    const { data: { genres } } = await axios({
      url: '/genre/movie/list',
      baseURL
    })
    commit('setMovieGenres', genres)
  } catch (error) {
    // either log the error, or fail silently
    console.log(error)
  }
}

export async function fetchMovieGenrePage({ commit, state }, genre) {
  commit('prepareMovieGenrePage', genre)
  const page = state.movie.by_genre[genre.id].pages.length

  try {
    const { data: pageData } = await axios({
      url: '/discover/movie',
      baseURL,
      params: {
        page,
        with_genres: genre.id
      }
    })
    commit('setMovieGenrePage', { genre, pageData })
  } catch (error) {
    commit('setMovieGenrePageError', { genre, page, error })
  }
}

export function init({ state, dispatch }) {

  if (state.movie.popular.pages.length === 0) {
    dispatch('fetchPopularMoviePage')
  }

  if (state.tv.popular.pages.length === 0) {
    dispatch('fetchPopularTvPage')
  }

  // the names of the genres we want to load
  const desiredMovieGenres = [
    'Family',
    'Documentary'
  ]
  dispatch('fetchMovieGenres').then(() => {
    // seek out the desired genres and start loading those
    state.genres
      .filter(({ name }) => desiredMovieGenres.includes(name))
      .forEach(genre => dispatch('fetchMovieGenrePage', genre))
  })
}