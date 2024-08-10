import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className=" bg-orange-50 px-4 font-movie-body">
      <Toaster />
      <nav className="flex justify-between py-4">
        <h1 className="md:text-xml font-movie-title text-2xl font-normal lg:text-3xl">
          <Link className="hover:text-orange-500" to={routes.movieMashups()}>
            💥🍿 Movie Mashup 🍿💥
          </Link>
        </h1>
        <Link
          to={routes.newMovieMashup()}
          className="flex px-2 py-1 hover:text-orange-500"
        >
          <span className="mr-2">🎬</span>
          <span className="text-normal flex-grow text-right font-movie-title md:text-lg lg:text-lg">
            Mashup!
          </span>
        </Link>
      </nav>
      <div className="container mx-auto rounded-md border border-orange-100 bg-white p-4">
        {children}
      </div>
      <footer className="mt-4 flex items-center justify-between border-t border-orange-200 px-4 py-4 text-sm text-gray-500">
        <p>
          Made with ❤️ by{' '}
          <a href="https://www.thyresson.io" className="hover:text-orange-500">
            DT
          </a>
        </p>
        <div className="space-x-4">
          <Link to={routes.about()} className="hover:text-orange-500">
            About
          </Link>
          <a href="https://www.redwoodjs.com" className="hover:text-orange-500">
            RedwoodJS
          </a>
          <a href="https://github.com" className="hover:text-orange-500">
            GitHub
          </a>
          <a href="https://cursor.com" className="hover:text-orange-500">
            Cursor
          </a>
          <a href="https://langbase.com" className="hover:text-orange-500">
            Langbase
          </a>
          <a href="https://tailwindcss.com" className="hover:text-orange-500">
            Tailwind
          </a>
          <a href="https://unkey.dev" className="hover:text-orange-500">
            Unkey
          </a>
        </div>
      </footer>
    </main>
  )
}

export default MainLayout
