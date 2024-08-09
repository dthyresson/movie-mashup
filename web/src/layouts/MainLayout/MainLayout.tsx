import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="container mx-auto font-movie-body">
      <Toaster />
      <nav className="flex justify-between py-4">
        <h1 className="font-movie-title text-3xl font-bold">
          <Link to={routes.movieMashups()}>💥🍿 Movie Mashup 🍿💥</Link>
        </h1>
        <ul>
          <li className="font-movie-subtitle text-xl">
            <Link to={routes.movieMashups()}>Movie Mashups</Link>
          </li>
        </ul>
      </nav>
      {children}
    </main>
  )
}

export default MainLayout
