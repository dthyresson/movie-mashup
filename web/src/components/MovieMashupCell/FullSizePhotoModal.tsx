export const FullSizePhotoModal = ({ photo, onClose }) => {
  const handleClose = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (
      e.target === e.currentTarget ||
      (e as React.KeyboardEvent).key === 'Escape'
    ) {
      onClose()
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={handleClose}
      onKeyDown={handleClose}
    >
      <div className="relative max-h-[90vh] max-w-[90vw]">
        <img
          src={photo.imageUrl}
          alt="Full size mashup"
          className="max-h-[90vh] max-w-[90vw] object-contain"
        />
      </div>
    </div>
  )
}
