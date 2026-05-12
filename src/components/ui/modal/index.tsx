import { useRef, useEffect } from "react";
import { CloseIcon } from "../../../icons";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean; 
  isFullscreen?: boolean;
  heading?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
  isFullscreen = false,
  heading
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : "relative w-[600px]  bg-gray-100 border-[1px] border-gray-200 rounded-3xl dark:bg-gray-900";

  return (
    <div className="fixed  inset-0 flex items-center justify-center overflow-y-auto modal z-99999 bg-black/40 backdrop-blur-[2px] transition-opacity">
      {!isFullscreen && (
        <div
          className="fixed mt-5 inset-0 h-full w-full  "
          onClick={onClose}
        ></div>
      )}
      <div
        ref={modalRef}
        className={`${contentClasses}  ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='py-5 px-5 flex flex-row items-center justify-between'>
          <p className='text-gray-900 dark:text-gray-400 font-bold text-[18px]'>{heading}</p>
          {showCloseButton && (
            <button
              onClick={onClose}
              className=" hover:bg-slate-400 p-2 rounded-full"
            >
              <CloseIcon className = 'text-gray-900 dark:text-gray-400' />
            </button>
          )}
        </div>
        <div>

          <div className=''>
            <div className='w-full mt-5 '>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
