/**
 * Write popular movie page to state
 * @param {object} state - The VueX module state
 */
export function preparePopularMoviePage(state) {
  const { pages } = state.moviePopular
  pages.push({ status: 'pending', ids: [] })
  state.moviePopular = {
    ...state.moviePopular,
    pages
  }
}

/**
 * Write error to page object
 * @param {object} state - The VueX module state
 * @param {{ page: number, error: Error }} payload - The error and corresponding page number
 */
export function setPopularMoviePageError(state, { page, error }) {
  const { pages } = state.moviePopular
  // page numbers are 1-based, but their array index is 0-based
  const pageIndex = page - 1
  pages[pageIndex] = { status: 'error', error }

  state.moviePopular = {
    ...state.moviePopular,
    pages
  }
}

/**
 * Write page data for popular movies
 * @param {object} state - The VueX module state
 * @param {object} pageData - The page data
 */
export function setPopularMoviePage(state, pageData) {
  const { page, total_results, total_pages, results } = pageData

  // page numbers are 1-based, but their array index is 0-based
  const pageIndex = page - 1
  const { pages } = state.moviePopular
  pages[pageIndex] = {
    status: 'loaded',
    ids: results.map(({ id }) => id)
  }

  state.moviePopular = {
    total_pages,
    total_results,
    pages
  }

  // normalization:
  // store data in data, while referencing it in lists of ids
  state.movieData = {
    ...state.movieData,
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
  const { pages } = state.tvPopular
  pages.push({ status: 'pending', ids: [] })
  state.tvPopular = { ...state.tvPopular, pages }
}

/**
 * Write fetch error to given popular tv show page
 * @param {object} state - The VueX module state
 * @param {{ page: number, error: Error }} payload - The page number and error
 */
export function setPopularTvPageError(state, { page, error }) {
  const { pages } = state.tvPopular
  pages[page] = { status: 'error', error }
  state.tvPopular = { ...state.tvPopular, pages }
}

/**
 * Write page data for popular tv shows
 * @param {object} state - The VueX module state
 * @param {object} pageData - The page data
 */
export function setPopularTvPage(state, pageData) {
  const { page, total_results, total_pages, results } = pageData

  state.tvPopular.total_results = total_results
  state.tvPopular.total_pages = total_pages

  // page numbers are 1-based, but their array index is 0-based
  const pageIndex = page - 1
  const { pages } = state.tvPopular
  pages[pageIndex] = {
    status: 'loaded',
    ids: results.map(({ id }) => id)
  }

  state.tvPopular = {
    ...state.tvPopular,
    total_pages,
    total_results,
    pages
  }

  // normalization:
  // store data in data, while referencing it in lists of ids
  state.tvData = {
    ...state.tvData,
    ...results.reduce((acc, tv) => ({
      ...acc,
      [tv.id]: { ...tv, title: tv.name }
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

  const pages = [
    ...(state.movieByGenre[id] ? state.movieByGenre[id].pages : []),
    { state: 'pending', ids: [] }
  ]

  state.movieByGenre = {
    ...state.movieByGenre,
    [id]: {
      ...state.movieByGenre[id],
      id,
      name,
      pages
    }
  }
}

/**
 * Write fetch error to given movie genre page
 * @param {object} state - The VueX module state
 * @param {{genre:object, page: number, error: Error}} payload - Payload containing genre, page, and error
 */
export function setMovieGenrePageError(state, { genre, page, error }) {
  const { id: genreId } = genre
  const { pages } = state.movieByGenre[genreId]

  pages[page] = { status: 'error', error }

  state.movieByGenre = {
    ...state.movieByGenre,
    [genreId]: {
      ...state.movieByGenre[genreId],
      pages
    }
  }
}

/**
 * Write page data to given genre
 * @param {object} state - The VueX module state
 * @param {{ genre:object, pageData: object }} payload - The genre on which to write, and the page data to write
 */
export function setMovieGenrePage(state, { genre, pageData }) {
  const { id: genreId } = genre
  const { page, total_results, total_pages, results } = pageData

  // page numbers are 1-based, but their array index is 0-based
  const pageIndex = page - 1

  const { pages } = state.movieByGenre[genreId]
  pages[pageIndex] = {
    state: 'loaded',
    ids: results.map(({ id }) => id)
  }

  state.movieByGenre = {
    ...state.movieByGenre,
    [genreId]: {
      ...state.movieByGenre[genreId],
      total_results,
      total_pages,
      pages
    }
  }

  // normalization:
  // store data in data, while referencing it in lists of ids
  state.movieData = {
    ...state.movieData,
    ...results.reduce((acc, movie) => ({
      ...acc,
      [movie.id]: movie
    }), {})
  }
}