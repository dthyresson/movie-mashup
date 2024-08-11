import fs from 'fs'
import path from 'path'

interface Movie {
  id: string
  title: string
  photo: string
  overview?: string
}

interface TmdbMovie {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
}

export default ({ _args }) => {
  console.log(':: Executing script to update movie overviews ::')

  // Read movies from data/movies.ts
  const moviesPath = path.join(process.cwd(), 'data', 'movies.ts')
  const moviesContent = fs.readFileSync(moviesPath, 'utf-8')
  const movies: Movie[] = eval(
    moviesContent.replace('export const MOVIES =', '')
  )

  // Read TMDB data from data/movies_tmdb.json
  const tmdbPath = path.join(process.cwd(), 'data', 'movies_tmdb.json')
  const tmdbContent = fs.readFileSync(tmdbPath, 'utf-8')
  const tmdbMovies: TmdbMovie[] = JSON.parse(tmdbContent)

  // Update movies with overviews
  const updatedMovies = movies.map((movie) => {
    const tmdbId = parseInt(movie.id.split('-')[0])
    const tmdbMovie = tmdbMovies.find((m) => m.id === tmdbId)
    if (tmdbMovie) {
      return {
        ...movie,
        overview: tmdbMovie.overview,
        title: tmdbMovie.title,
        photo: tmdbMovie.poster_path,
        releaseDate: new Date(tmdbMovie.release_date).toISOString(),
      }
    }
    return movie
  })

  // Generate updated content
  const updatedContent = `export const MOVIES = ${JSON.stringify(
    updatedMovies,
    null,
    2
  )}`

  // Write updated content back to data/movies.ts
  fs.writeFileSync(moviesPath, updatedContent, 'utf-8')

  console.log(':: Movie overviews updated successfully ::')
}
