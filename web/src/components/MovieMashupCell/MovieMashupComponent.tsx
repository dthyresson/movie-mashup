import { useState } from 'react'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { REALISM_OPTIONS } from 'src/components/MoviesCell/RealismSelector'

import { FullSizePhotoModal } from './FullSizePhotoModal'
import { MovieButton } from './MovieButton'
import { OverlayButton, OverlayContent } from './OverlayButton'
import PosterGrid from './PosterGrid'

const CREATE_PHOTO_MUTATION = gql`
  mutation CreatePhotoMutation($input: CreatePhotoInput!) {
    createPhoto(input: $input) {
      id
    }
  }
`

const SET_MOVIE_MASHUP_PHOTO_MUTATION = gql`
  mutation SetMovieMashupPhotoMutation($input: SetMovieMashupPhotoInput!) {
    setMovieMashupPhoto(input: $input) {
      id
    }
  }
`

const MovieMashupComponent = ({ movieMashup }) => {
  const [showDescription, setShowDescription] = useState(false)
  const [showMovies, setShowMovies] = useState(false)
  const [showRealism, setShowRealism] = useState(false)
  // const [realism, setRealism] = useState('MEDIUM')
  const [fullSizePhoto, setFullSizePhoto] = useState(null)

  const [createPhoto] = useMutation(CREATE_PHOTO_MUTATION, {
    onCompleted: (data) => {
      toast.success(`Poster generated!`)
      navigate(routes.movieMashup({ id: data.createPhoto.id }), {
        replace: true,
      })
    },
  })

  const [setMovieMashupPhoto] = useMutation(SET_MOVIE_MASHUP_PHOTO_MUTATION, {
    onCompleted: () => {
      toast.success('Set as main poster')
      navigate(routes.movieMashup({ id: movieMashup.id }), {
        replace: true,
      })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
  })

  const handleMovieClick = (movieId: string) => {
    navigate(routes.newMovieMashup({ firstMovieId: movieId }))
  }

  const handleCreatePhoto = (realism) => {
    const baseTime = 2_000
    const realismFactor = {
      LOW: 1,
      MEDIUM: 12,
      HIGH: 20,
      ULTRA: 24,
    }
    const duration = baseTime * (realismFactor[realism] || 1)
    toast.loading('Generating poster ...', { duration })
    createPhoto({
      variables: {
        input: {
          movieMashupId: movieMashup.id,
          realism: realism,
        },
      },
      onCompleted: (data) => {
        toast.success('Poster generated!')
        navigate(routes.movieMashup({ id: data.createPhoto.id }), {
          replace: true,
        })
        setTimeout(() => {
          window.location.reload()
        }, 1_000)
      },
    })
  }

  const handlePhotoClick = (photoId) => {
    setMovieMashupPhoto({
      variables: {
        input: {
          movieMashupId: movieMashup.id,
          photoId: photoId,
        },
      },
      onCompleted: () => {
        toast.success('Set as main poster')
        navigate(routes.movieMashup({ id: movieMashup.id }), {
          replace: true,
        })
        setTimeout(() => {
          window.location.reload()
        }, 1_000)
      },
    })
  }

  const openFullSizePhoto = (photo) => {
    setFullSizePhoto(photo)
  }

  return (
    <div className="mx-auto my-0 max-w-3xl bg-white">
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <h2 className="mb-2 font-movie-title text-3xl font-normal text-gray-800">
          {movieMashup.title}
        </h2>
        <div className="relative mb-2 aspect-video w-full max-w-2xl bg-gradient-to-b from-slate-50 via-slate-200 to-slate-100">
          <button
            className="absolute inset-0 h-full w-full cursor-pointer p-4"
            onClick={() => openFullSizePhoto(movieMashup.photos[0])}
          >
            <img
              className="h-full w-full border-gray-200 object-contain"
              src={movieMashup.photos[0]?.imageUrl}
              alt={movieMashup.title}
              loading="lazy"
            />
          </button>
          <OverlayButton
            onClick={() => setShowDescription(true)}
            className="left-2"
          >
            <span className="h-6 w-6 text-gray-600">🥤</span>
          </OverlayButton>
          <OverlayButton
            onClick={() => setShowMovies(true)}
            className="right-12"
          >
            <span className="h-6 w-6 text-gray-600">🎬</span>
          </OverlayButton>
          <OverlayButton
            onClick={() => setShowRealism(true)}
            className="right-2"
          >
            <span className="h-6 w-6 text-gray-600">🖼️</span>
          </OverlayButton>
          <OverlayContent
            show={showDescription}
            onClose={() => setShowDescription(false)}
            className="min-h-[50vh] bg-red-500"
          >
            <p className="overflow-clip text-center font-movie-body text-sm text-white lg:text-lg">
              {movieMashup.description}
            </p>
          </OverlayContent>
          <OverlayContent
            show={showMovies}
            onClose={() => setShowMovies(false)}
            className="min-h-[50vh] bg-orange-500"
          >
            <div className="mx-auto flex w-full max-w-md flex-col gap-4">
              <h4 className="mb-4 text-xl font-bold text-white">
                Pick a movie for a new mashup
              </h4>
              <div className="grid grid-cols-2 gap-6">
                {[movieMashup.firstMovie, movieMashup.secondMovie].map(
                  (movie) => (
                    <MovieButton
                      key={movie.id}
                      movie={movie}
                      onClick={handleMovieClick}
                    />
                  )
                )}
              </div>
            </div>
          </OverlayContent>
          <OverlayContent
            show={showRealism}
            onClose={() => setShowRealism(false)}
            className="min-h-[50vh] bg-yellow-500"
          >
            <div className="mx-auto flex w-full max-w-md flex-col gap-4">
              <h4 className="mb-4 text-xl font-bold text-white">
                Choose a realism level
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {REALISM_OPTIONS.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleCreatePhoto(level)}
                    className="rounded bg-white px-4 py-2 font-bold text-gray-500 hover:bg-gray-200"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </OverlayContent>
        </div>
        <h3 className="mb-2 font-movie-subtitle text-xl font-semibold text-gray-600">
          {movieMashup.tagline}
        </h3>
        <p className="font-movie-body text-lg text-gray-800">
          {movieMashup.treatment}
        </p>
        <nav className="mt-4 flex items-center justify-center">
          <Link
            to={routes.newMovieMashup({
              firstMovieId: movieMashup.firstMovie.id,
            })}
            className="text-normal mr-2 font-movie-body text-gray-500 hover:text-orange-500"
          >
            {movieMashup.firstMovie.title}
          </Link>
          💥
          <Link
            to={routes.newMovieMashup({
              secondMovieId: movieMashup.secondMovie.id,
            })}
            className="text-normal ml-2 font-movie-body font-normal text-gray-500 hover:text-orange-500"
          >
            {movieMashup.secondMovie.title}
          </Link>
        </nav>

        {movieMashup.photos.length > 1 && (
          <PosterGrid
            photos={movieMashup.photos}
            title={movieMashup.title}
            onPhotoClick={handlePhotoClick}
          />
        )}

        {fullSizePhoto && (
          <FullSizePhotoModal
            photo={fullSizePhoto}
            onClose={() => setFullSizePhoto(null)}
          />
        )}
      </div>
    </div>
  )
}

export default MovieMashupComponent
