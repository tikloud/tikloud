import { useState, useEffect, useCallback } from 'react';

export interface AlertProps {
  /** Alert message */
  children: React.ReactNode;
  /** Alert type */
  type?: 'success' | 'warning' | 'error' | 'info';
  /** Title of the alert */
  title?: string;
  /** Is the alert dismissible? */
  dismissible?: boolean;
  /** Auto dismiss after milliseconds */
  autoDismiss?: number;
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
  /** Size of the alert */
  size?: 'small' | 'medium' | 'large';
  /** Show as toast (floating) */
  toast?: boolean;
}

/** Alert component for notifying users */
export const Alert = ({
  children,
  type = 'info',
  title,
  dismissible = false,
  autoDismiss,
  onDismiss,
  size = 'medium',
  toast = false,
  ...props
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    onDismiss?.();
  }, [onDismiss]);

  useEffect(() => {
    if (autoDismiss && autoDismiss > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoDismiss);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, handleDismiss]);

  if (!isVisible) return null;

  const sizeClasses = {
    small: 'px-3 py-2 text-xs',
    medium: 'px-4 py-3 text-sm',
    large: 'px-5 py-4 text-base'
  };

  const typeClasses = {
    success: 'bg-green-100 border-green-300 text-green-800',
    warning: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    error: 'bg-red-100 border-red-300 text-red-800',
    info: 'bg-blue-100 border-blue-300 text-blue-800'
  };

  const alertClasses = `
    border border-transparent rounded-md font-sans relative
    ${sizeClasses[size]}
    ${typeClasses[type]}
    ${toast 
      ? 'fixed top-5 right-5 z-50 min-w-64 max-w-96 shadow-lg alert-slide-in' 
      : ''
    }
  `.trim();

  const iconMap = {
    success: '✓',
    warning: '⚠️',
    error: '✕',
    info: 'ℹ️'
  };

  return (
    <div className={alertClasses} role="alert" {...props}>
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 text-lg mt-0.5">
          {iconMap[type]}
        </div>
        <div className="flex-1 min-w-0">
          {title && <div className="font-bold mb-1">{title}</div>}
          <div className="m-0">{children}</div>
        </div>
        {dismissible && (
          <button
            className="bg-transparent border-none text-inherit cursor-pointer text-lg font-bold leading-none opacity-50 hover:opacity-75 focus:opacity-100 focus:outline-none transition-opacity duration-200 absolute top-2 right-2 p-0"
            onClick={handleDismiss}
            aria-label="Dismiss alert"
            type="button"
          >
            ×
          </button>
        )}
      </div>
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .alert-slide-in {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
