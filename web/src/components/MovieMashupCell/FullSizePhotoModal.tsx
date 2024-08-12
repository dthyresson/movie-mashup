// Add this new component
export const FullSizePhotoModal = ({ photo, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
    <div className="relative max-h-[90vh] max-w-[90vw]">
      <img
        src={photo.imageUrl}
        alt="Full size mashup"
        className="max-h-[90vh] max-w-[90vw] object-contain" />
      <button
        onClick={onClose}
        className="absolute right-2 top-2 rounded-full bg-white p-2 text-black hover:bg-gray-200"
      >
        💥
      </button>
    </div>
  </div>
);
