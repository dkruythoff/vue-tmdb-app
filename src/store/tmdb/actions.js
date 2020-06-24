import axios from 'axios'

const baseURL = process.env.VUE_APP_TMDB_API_BASE || '/.netlify/functions/tmdb'

/**
 * Fetch the next page for popular tv movies and store it in state
 *
 * @param {object} context - The VueX module context
 */
export async function fetchPopularMoviePage({ commit, state }) {
  // prepare a new empty page on which to set the results
  commit('preparePopularMoviePage')
  // pages in API are 1-based, so pages.length will suffice
  const nextPage = state.moviePopular.pages.length

  try {
    // fetch the next page data
    const { data } = await axios({
      url: '/movie/popular',
      baseURL,
      params: {
        page: nextPage
      }
    })
    // commit page data to state
    commit('setPopularMoviePage', data)
  } catch (error) {
    // since we can store multiple pages simultaneously, store errors in the page object
    commit('setPopularMoviePageError', { page: nextPage, error })
  }
}

/**
 * Fetch the next page for popular tv shows and store it in state
 *
 * @param {object} context - The VueX module context
 */
export async function fetchPopularTvPage({ commit, state }) {
  // prepare a new empty page on which to set the results
  commit('preparePopularTvPage')
  // pages in API are 1-based, so pages.length will suffice
  const nextPage = state.tvPopular.pages.length

  try {
    // fetch the next page data
    const { data } = await axios({
      url: '/tv/popular',
      baseURL,
      params: {
        page: nextPage
      }
    })
    // commit page data to state
    commit('setPopularTvPage', data)
  } catch (error) {
    // since we can store multiple pages simultaneously, store errors in the page object
    commit('setPopularTvPageError', { page: nextPage, error })
  }
}

/**
 * Fetch all movie genres and store them in state 
 * Will only fetch when no genres are present
 * 
 * @param {object} context - The VueX module context
 */
export async function fetchMovieGenres({ commit, state }) {
  if (state.genres.length > 0) {
    // we already have genres, and we only need them once
    return Promise.resolve()
  }

  try {
    // fetch the genre list
    const { data: { genres } } = await axios({
      url: '/genre/movie/list',
      baseURL
    })
    // store the genre list
    commit('setMovieGenres', genres)
  } catch (error) {
    // either log the error, or fail silently
    console.log(error)
  }
}

/**
 * Fetch a new page for given movie genre
 * @param {object} context - The VueX module context
 * @param {{ id: number, name: string }} genre - The genre for which to fetch a page
 */
export async function fetchMovieGenrePage({ commit, state }, genre) {
  // prepare a new empty page on which to set the results
  commit('prepareMovieGenrePage', genre)
  // pages in API are 1-based, so pages.length will suffice
  const page = state.movieByGenre[genre.id].pages.length

  try {
    // fetch the genre page
    const { data: pageData } = await axios({
      url: '/discover/movie',
      baseURL,
      params: {
        page,
        with_genres: genre.id
      }
    })
    // commit the page data to state
    commit('setMovieGenrePage', { genre, pageData })
  } catch (error) {
    // since we can store multiple pages simultaneously, store errors in the page object
    commit('setMovieGenrePageError', { genre, page, error })
  }
}

/**
 * Run initial fetches
 * @param {object} context - The VueX context
 */
export function init({ state, dispatch }) {

  // if no pages are present for popular movies, fetch the first
  if (state.moviePopular.pages.length === 0) {
    dispatch('fetchPopularMoviePage')
  }

  // if no pages are present for popular tv shows, fetch the first
  if (state.tvPopular.pages.length === 0) {
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

export async function fetchDetails({ state, commit }, { type, id }) {

  const typeContainer = `${type}Details`

  if (typeof state[typeContainer] === 'undefined') {
    return Promise.reject(`Type ${type} not supported`)
  }

  if (state[typeContainer] && state[typeContainer][id]) {
    return Promise.resolve()
  }

  try {
    // fetch the genre page
    const { data } = await axios({
      url: `/${type}/${id}`,
      baseURL
    })
    // commit the page data to state
    commit('setDetails', { type, data })
  } catch (error) {
    // we may log an error, but for now it will suffice to not store anything
  }
}