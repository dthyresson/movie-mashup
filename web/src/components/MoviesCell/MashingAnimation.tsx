const MashingAnimation = ({ movies, selectedMovies }) => {
  const selectedMovieData = movies.filter((movie) =>
    selectedMovies.includes(movie.id)
  )
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 px-4">
      <div className="mb-8 text-center text-2xl font-bold text-orange-600 sm:text-3xl md:text-4xl">
        <span className="inline-block animate-wiggle-reverse">🎬</span>
        <span className="mx-4 inline-block font-movie-title">Mashing!</span>
        <span className="inline-block animate-wiggle">🍿</span>
      </div>
      <div className="flex flex-col space-y-8 rounded-md border border-orange-200 bg-white p-4 sm:flex-row sm:space-x-8 sm:space-y-0 md:space-x-16">
        {selectedMovieData.map((movie, index) => (
          <div key={movie.id} className="flex flex-col items-center">
            <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.photo}`}
              alt={movie.title}
              className={`h-8 object-scale-down transition-all duration-300 md:h-14 lg:h-20 ${
                index === 0 ? 'animate-wiggle' : 'animate-wiggle-reverse'
              }`}
            />
            <p className="mt-4 animate-bounce text-center font-movie-title text-lg font-normal text-gray-800 sm:text-xl">
              {movie.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default MashingAnimation
