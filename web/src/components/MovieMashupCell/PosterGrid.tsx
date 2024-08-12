import React from 'react'

interface Photo {
  id: string
  imageUrl: string
}

interface PosterGridProps {
  photos: Photo[]
  title: string
  onPhotoClick: (photoId: string) => void
}

const PosterGrid: React.FC<PosterGridProps> = ({
  photos,
  title,
  onPhotoClick,
}) => {
  return (
    <>
      <h3 className="mt-8 text-xl font-bold text-gray-800">All Posters</h3>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => onPhotoClick(photo.id)}
            className="w-full cursor-pointer rounded-lg shadow-md transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <img
              src={photo.imageUrl}
              alt={`${title} ${index + 1}`}
              className="w-full rounded-lg object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </>
  )
}

export default PosterGrid
