import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

type MainLayoutProps = {
  children?: React.ReactNode
}

const Header = () => (
  <nav className="flex justify-between py-4">
    <h1 className="md:text-xml font-movie-title text-2xl font-normal lg:text-3xl">
      <Link className="hover:text-orange-500" to={routes.movieMashups()}>
        💥🍿 Movie Mashup
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
)

const Footer = () => (
  <footer className="mt-4 flex flex-col items-center justify-between border-t border-orange-200 px-4 py-4 text-sm text-gray-500 sm:flex-row">
    <p className="mb-2 sm:mb-0">
      Made with ❤️ by{' '}
      <a href="https://www.thyresson.io" className="hover:text-orange-500">
        DT
      </a>
    </p>
    <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
      <Link to={routes.about()} className="hover:text-orange-500">
        About
      </Link>
      {['RedwoodJS', 'GitHub', 'Cursor', 'Langbase', 'Tailwind', 'Unkey'].map(
        (item) => (
          <a
            key={item}
            href={`https://${item.toLowerCase()}.com`}
            className="hover:text-orange-500"
          >
            {item}
          </a>
        )
      )}
    </div>
  </footer>
)

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Metadata />
      <Toaster
        toastOptions={{
          className: 'font-movie-title text-lg',
          success: {
            icon: <>🍿</>,
          },
          error: {
            icon: <>💥</>,
          },
        }}
      />{' '}
      <main className="flex min-h-screen flex-col bg-orange-50 px-4 font-movie-body">
        <Header />
        <div className="container mx-auto flex-grow rounded-md border border-orange-100 bg-white p-4">
          {children}
        </div>
        <Footer />
      </main>
    </>
  )
}

export default MainLayout
