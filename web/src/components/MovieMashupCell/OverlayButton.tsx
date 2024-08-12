export const OverlayButton = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`absolute bottom-2 rounded-full bg-white p-1 shadow-md ${className}`}
  >
    {children}
  </button>
);
export const OverlayContent = ({ show, onClose, className, children }) => show && (
  <button
    className={`absolute inset-0 flex cursor-pointer items-center justify-center overflow-y-scroll  bg-opacity-75 p-4 ${className}`}
    onClick={onClose}
  >
    {children}
  </button>
);
