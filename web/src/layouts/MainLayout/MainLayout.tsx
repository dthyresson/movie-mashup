import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="container mx-auto">
      <Toaster />
      <nav className="flex justify-between">
        <h1 className="text-2xl font-bold">
          <Link to={routes.movieMashups()}>💥🍿 Movie Mashup 🍿💥</Link>
        </h1>
        <ul>
          <li>
            <Link to={routes.movieMashups()}>Movie Mashups</Link>
          </li>
        </ul>
      </nav>
      {children}
    </main>
  )
}

export default MainLayout
