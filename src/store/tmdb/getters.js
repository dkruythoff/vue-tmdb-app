export function tvPopular(state) {
  return state.tvPopular.pages
    .reduce((acc, page) => [...acc, ...page.ids], [])
    .map(id => ({
      ...state.tvData[id],
      _type: 'tv'
    }))
}

export function moviePopular(state) {
  return state.moviePopular.pages
    .reduce((acc, page) => [...acc, ...page.ids], [])
    .map(id => ({
      ...state.movieData[id],
      _type: 'movie'
    }))
}

export function moviesByGenre(state) {
  return Object.entries(state.movieByGenre).map(([id, { name, pages }]) => ({
    id,
    name,
    entries: pages
      .reduce((acc, page) => [...acc, ...page.ids], [])
      .map(id => ({
        ...state.movieData[id],
        _type: 'movie'
      }))
  }))
}

export const tvDetails = ({ tvDetails }) => tvDetails

export const movieDetails = ({ movieDetails }) => movieDetails

export const searchResults = ({ searchResults, activeSearch, movieData, tvData }) => {
  if (!activeSearch) {
    return null
  }

  const { tv, movie } = searchResults[activeSearch].results

  return {
    tv: tv.map(id => ({ ...tvData[id], _type: 'tv' })),
    movie: movie.map(id => ({ ...movieData[id], _type: 'movie' }))
  }
}