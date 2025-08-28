import { useEffect, useCallback } from 'react';

export interface ModalAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
}

export interface ModalProps {
  /** Is modal open */
  isOpen: boolean;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Modal size */
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'fullscreen';
  /** Show close button */
  showCloseButton?: boolean;
  /** Close on backdrop click */
  closeOnBackdrop?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Modal variant */
  variant?: 'default' | 'danger' | 'success' | 'warning';
  /** Action buttons */
  actions?: ModalAction[];
  /** Footer content (overrides actions) */
  footer?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Prevent scrolling when open */
  preventScroll?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Custom backdrop className */
  backdropClassName?: string;
  /** Custom modal className */
  modalClassName?: string;
}

/** Modal/Dialog component for displaying forms or confirmations */
export const Modal = ({
  isOpen,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  variant = 'default',
  actions = [],
  footer,
  loading = false,
  preventScroll = true,
  animationDuration = 300,
  onClose,
  backdropClassName = '',
  modalClassName = '',
  ...props
}: ModalProps) => {
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

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    xlarge: 'max-w-4xl',
    fullscreen: 'max-w-full h-full m-0 rounded-none'
  };

  const variantClasses = {
    default: '',
    danger: 'border-l-4 border-l-red-500',
    success: 'border-l-4 border-l-green-500',
    warning: 'border-l-4 border-l-yellow-500'
  };

  const variantTitleClasses = {
    default: 'text-gray-900',
    danger: 'text-red-700',
    success: 'text-green-700',
    warning: 'text-yellow-700'
  };

  const getActionButtonClasses = (action: ModalAction) => {
    const baseClasses = 'px-4 py-2 text-sm font-medium rounded border transition-colors duration-200';
    
    const variantClasses = {
      primary: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 disabled:bg-blue-400',
      secondary: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 disabled:bg-gray-100',
      danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700 disabled:bg-red-400'
    };

    const disabledClasses = action.disabled || action.loading
      ? 'cursor-not-allowed opacity-50' 
      : '';

    return `${baseClasses} ${variantClasses[action.variant || 'secondary']} ${disabledClasses}`;
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm
        transition-opacity duration-${animationDuration} ease-in-out
        ${backdropClassName}
      `}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={`
          bg-white rounded-lg shadow-xl w-full max-h-full overflow-hidden
          transform transition-all duration-${animationDuration} ease-in-out
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${modalClassName}
        `}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            {title && (
              <h2
                id="modal-title"
                className={`text-lg font-semibold ${variantTitleClasses[variant]}`}
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                onClick={onClose}
                aria-label="Close modal"
              >
                <span className="text-xl">×</span>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-96">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            children
          )}
        </div>

        {/* Footer */}
        {(footer || actions.length > 0) && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            {footer ? (
              footer
            ) : (
              <div className="flex justify-end gap-3">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    className={getActionButtonClasses(action)}
                    onClick={action.onClick}
                    disabled={action.disabled || action.loading}
                  >
                    {action.loading && (
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2 inline-block"></span>
                    )}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
