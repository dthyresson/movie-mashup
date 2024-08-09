// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import MoviesCell from 'src/components/MoviesCell'

const NewMovieMashupPage = () => {
  return (
    <>
      <Metadata title="NewMovieMashup" description="NewMovieMashup page" />

      <MoviesCell />
    </>
  )
}

export default NewMovieMashupPage
