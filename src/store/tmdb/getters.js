export function tvPopular(state) {
  return state.tvPopular.pages
    .reduce((acc, page) => [...acc, ...page.ids], [])
    .map(id => state.tvData[id])
}

export function moviePopular(state) {
  return state.moviePopular.pages
    .reduce((acc, page) => [...acc, ...page.ids], [])
    .map(id => state.movieData[id])
}

export function moviesByGenre(state) {
  return Object.entries(state.movieByGenre).map(([id, { name, pages }]) => ({
    id,
    name,
    entries: pages
      .reduce((acc, page) => [...acc, ...page.ids], [])
      .map(id => state.movieData[id])
  }))
}