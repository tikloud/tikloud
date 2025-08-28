import { useEffect, useCallback } from 'react';

export interface DrawerProps {
  /** Is drawer open */
  isOpen: boolean;
  /** Drawer title */
  title?: string;
  /** Drawer content */
  children: React.ReactNode;
  /** Drawer position */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** Drawer size */
  size?: 'small' | 'medium' | 'large';
  /** Show close button */
  showCloseButton?: boolean;
  /** Close on backdrop click */
  closeOnBackdrop?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Show backdrop */
  showBackdrop?: boolean;
  /** Footer content */
  footer?: React.ReactNode;
  /** Prevent scrolling when open */
  preventScroll?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Callback when drawer is closed */
  onClose: () => void;
  /** Custom backdrop className */
  backdropClassName?: string;
  /** Custom drawer className */
  drawerClassName?: string;
}

/** Drawer component for slide-out panels with additional details or settings */
export const Drawer = ({
  isOpen,
  title,
  children,
  position = 'right',
  size = 'medium',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showBackdrop = true,
  footer,
  preventScroll = true,
  animationDuration = 300,
  onClose,
  backdropClassName = '',
  drawerClassName = '',
  ...props
}: DrawerProps) => {
  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget && closeOnBackdrop) {
      onClose();
    }
  }, [closeOnBackdrop, onClose]);

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscape) {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen && closeOnEscape) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen, handleEscapeKey, closeOnEscape]);

  useEffect(() => {
    if (isOpen && preventScroll) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, preventScroll]);

  if (!isOpen) return null;

  const getSizeClasses = () => {
    const isHorizontal = position === 'left' || position === 'right';
    
    if (isHorizontal) {
      return {
        small: 'w-80',
        medium: 'w-96',
        large: 'w-1/2'
      }[size];
    } else {
      return {
        small: 'h-80',
        medium: 'h-96',
        large: 'h-1/2'
      }[size];
    }
  };

  const getPositionClasses = () => {
    const baseClasses = 'fixed bg-white shadow-xl z-50';
    
    const positionClasses = {
      left: 'top-0 left-0 h-full',
      right: 'top-0 right-0 h-full',
      top: 'top-0 left-0 w-full',
      bottom: 'bottom-0 left-0 w-full'
    };

    return `${baseClasses} ${positionClasses[position]}`;
  };

  const getAnimationClasses = () => {
    const base = `transform transition-transform duration-${animationDuration} ease-in-out`;
    
    const animations = {
      left: isOpen ? 'translate-x-0' : '-translate-x-full',
      right: isOpen ? 'translate-x-0' : 'translate-x-full',
      top: isOpen ? 'translate-y-0' : '-translate-y-full',
      bottom: isOpen ? 'translate-y-0' : 'translate-y-full'
    };

    return `${base} ${animations[position]}`;
  };

  const isHorizontal = position === 'left' || position === 'right';

  return (
    <>
      {/* Backdrop */}
      {showBackdrop && (
        <div
          className={`
            fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm
            transition-opacity duration-${animationDuration} ease-in-out
            ${backdropClassName}
          `}
          onClick={handleBackdropClick}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          ${getPositionClasses()}
          ${getSizeClasses()}
          ${getAnimationClasses()}
          ${drawerClassName}
        `}
        {...props}
      >
        <div className={`h-full flex ${isHorizontal ? 'flex-col' : 'flex-row'}`}>
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
              {title && (
                <h2 className="text-lg font-semibold text-gray-900">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick={onClose}
                  aria-label="Close drawer"
                >
                  <span className="text-xl">×</span>
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex-shrink-0">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
