/**
 * Write popular movie page to state
 * @param {object} state - The VueX module state
 */
export function preparePopularMoviePage(state) {
  state.movie.popular.pages.push({ status: 'pending', ids: [] })
}

/**
 * Write error to page object
 * @param {object} state - The VueX module state
 * @param {{ page: number, error: Error }} payload - The error and corresponding page number
 */
export function setPopularMoviePageError(state, { page, error }) {
  const pageIndex = page - 1
  state.movie.popular.pages[pageIndex] = { status: 'error', error }
}

/**
 * Write page data for popular movies
 * @param {object} state - The VueX module state
 * @param {object} pageData - The page data
 */
export function setPopularMoviePage(state, pageData) {
  const { page, total_results, total_pages, results } = pageData

  state.movie.popular.total_results = total_results
  state.movie.popular.total_pages = total_pages

  // page numbers are 1-based, but their array index is 0-based
  const pageIndex = page - 1
  state.movie.popular.pages[pageIndex] = {
    status: 'loaded',
    ids: results.map(({ id }) => id)
  }

  // normalization:
  // store data in _entries, while referencing it in lists of ids
  state.movie._entries = {
    ...state.movie._entries,
    ...results.reduce((acc, movie) => ({
      ...acc,
      [movie.id]: movie
    }))
  }
}

/**
 * Prepare a new popular tv show page to write to
 * @param {object} state - The VueX module state
 */
export function preparePopularTvPage(state) {
  state.tv.popular.pages.push({ status: 'pending', ids: [] })
}

/**
 * Write fetch error to given popular tv show page
 * @param {object} state - The VueX module state
 * @param {{ page: number, error: Error }} payload - The page number and error
 */
export function setPopularTvPageError(state, { page, error }) {
  state.tv.popular.pages[page] = { status: 'error', error }
}

/**
 * Write page data for popular tv shows
 * @param {object} state - The VueX module state
 * @param {object} pageData - The page data
 */
export function setPopularTvPage(state, pageData) {
  const { page, total_results, total_pages, results } = pageData

  state.tv.popular.total_results = total_results
  state.tv.popular.total_pages = total_pages

  // page numbers are 1-based, but their array index is 0-based
  const pageIndex = page - 1
  state.tv.popular.pages[pageIndex] = {
    status: 'loaded',
    ids: results.map(({ id }) => id)
  }

  // normalization:
  // store data in _entries, while referencing it in lists of ids
  state.tv._entries = {
    ...state.tv._entries,
    ...results.reduce((acc, tv) => ({
      ...acc,
      [tv.id]: tv
    }), {})
  }
}

/**
 * Write genres to state
 * @param {object} state - The VueX module state
 * @param {array} genres - The genre list
 */
export function setMovieGenres(state, genres) {
  state.genres = genres
}

/**
 * Prepare a genre result page to write to
 * @param {object} state - The VueX module state
 * @param {{id: number, name: string}} genre - The genre for which to prepare a page
 */
export function prepareMovieGenrePage(state, genre) {
  const { id, name } = genre

  // if the genre object does not exist, create it now
  state.movie.by_genre[id] = state.movie.by_genre[id] || { id, name, pages: [] }

  state.movie.by_genre[id].pages.push({
    state: 'pending',
    ids: []
  })
}

/**
 * Write fetch error to given movie genre page
 * @param {object} state - The VueX module state
 * @param {{genre:object, page: number, error: Error}} payload - Payload containing genre, page, and error
 */
export function setMovieGenrePageError(state, { genre, page, error }) {
  state.movie.by_genre[genre.id].pages[page] = { status: 'error', error }
}

/**
 * Write page data to given genre
 * @param {object} state - The VueX module state
 * @param {{ genre:object, pageData: object }} payload - The genre on which to write, and the page data to write
 */
export function setMovieGenrePage(state, { genre, pageData }) {
  const { id } = genre
  const { page, total_results, total_pages, results } = pageData

  state.movie.by_genre[id].total_pages = total_pages
  state.movie.by_genre[id].total_results = total_results

  // page numbers are 1-based, but their array index is 0-based
  const pageIndex = page - 1

  state.movie.by_genre[id].pages[pageIndex] = {
    state: 'loaded',
    ids: results.map(({ id }) => id)
  }

  // normalization:
  // store data in _entries, while referencing it in lists of ids
  state.movie._entries = {
    ...state.movie._entries,
    ...results.reduce((acc, movie) => ({
      ...acc,
      [movie.id]: movie
    }), {})
  }
}