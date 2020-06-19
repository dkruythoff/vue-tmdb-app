export function preparePopularMoviePage(state) {
  state.movie.popular.pages.push({ status: 'pending', ids: [] })
}

export function setPopularMoviePageError(state, { page, error }) {
  state.movie.popular.pages[page] = { status: 'error', error }
}

export function setPopularMoviePage(state, { page, total_results, total_pages, results }) {
  state.movie.popular.total_results = total_results
  state.movie.popular.total_pages = total_pages

  const pageIndex = page - 1
  state.movie.popular.pages[pageIndex] = {
    status: 'loaded',
    ids: results.map(({ id }) => id)
  }

  state.movie._entries = {
    ...state.movie._entries,
    ...results.reduce((acc, movie) => ({
      ...acc,
      [movie.id]: movie
    }))
  }
}

export function preparePopularTvPage(state) {
  state.tv.popular.pages.push({ status: 'pending', ids: [] })
}

export function setPopularTvPageError(state, { page, error }) {
  state.tv.popular.pages[page] = { status: 'error', error }
}

export function setPopularTvPage(state, { page, total_results, total_pages, results }) {
  state.tv.popular.total_results = total_results
  state.tv.popular.total_pages = total_pages

  const pageIndex = page - 1
  state.tv.popular.pages[pageIndex] = {
    status: 'loaded',
    ids: results.map(({ id }) => id)
  }

  state.tv._entries = {
    ...state.tv._entries,
    ...results.reduce((acc, tv) => ({
      ...acc,
      [tv.id]: tv
    }))
  }
}

export function setMovieGenres(state, genres) {
  state.genres = genres
}

export function prepareMovieGenrePage(state, { id, name }) {
  state.movie.by_genre[id] = state.movie.by_genre[id] || { id, name, pages: [] }
  state.movie.by_genre[id].pages.push({
    state: 'pending',
    ids: []
  })
}

export function setMovieGenrePageError(state, { genre, page, error }) {
  state.movie.by_genre[genre.id].pages[page] = { status: 'error', error }
}

export function setMovieGenrePage(state, { genre: { id }, pageData: { page, total_results, total_pages, results } }) {
  state.movie.by_genre[id].total_pages = total_pages
  state.movie.by_genre[id].total_results = total_results

  const pageIndex = page - 1

  state.movie.by_genre[id].pages[pageIndex] = {
    state: 'loaded',
    ids: results.map(({ id }) => id)
  }
  state.movie._entries = {
    ...state.movie._entries,
    ...results.reduce((acc, movie) => ({
      ...acc,
      [movie.id]: movie
    }), {})
  }
}