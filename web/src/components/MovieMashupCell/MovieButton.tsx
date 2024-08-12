export const MovieButton = ({ movie, onClick }) => (
  <button
    key={movie.id}
    onClick={(e) => {
      e.stopPropagation();
      onClick(movie.id);
    }}
    className="group flex w-full flex-col items-center overflow-hidden rounded-md bg-white p-4 shadow-sm transition-transform hover:scale-105 hover:bg-orange-100 hover:shadow-md hover:ring-2 hover:ring-red-600"
  >
    <div className="flex items-center justify-center rounded-sm border border-orange-200 p-1">
      <img
        src={`https://www.themoviedb.org/t/p/w185_and_h278_bestv2${movie.photo}`}
        alt={movie.title}
        loading="lazy"
        className="max-h-16 max-w-screen-sm object-contain lg:max-h-36 lg:max-w-full" />
    </div>
    <h3 className="text-normal mt-2 truncate text-center font-movie-title text-sm text-gray-800 group-hover:text-red-600 md:text-sm">
      {movie.title}
    </h3>
  </button>
);
