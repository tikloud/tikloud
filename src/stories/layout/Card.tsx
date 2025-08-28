import { ReactNode } from 'react';
import Image from 'next/image';

export interface CardAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  icon?: string;
}

export interface CardProps {
  /** Card title */
  title?: string;
  /** Card subtitle */
  subtitle?: string;
  /** Card content */
  children?: ReactNode;
  /** Header content (overrides title/subtitle) */
  header?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Card image */
  image?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Card variant */
  variant?: 'default' | 'outlined' | 'elevated' | 'minimal';
  /** Card size */
  size?: 'small' | 'medium' | 'large';
  /** Is card clickable */
  clickable?: boolean;
  /** Is card disabled */
  disabled?: boolean;
  /** Action buttons */
  actions?: CardAction[];
  /** Status indicator */
  status?: 'success' | 'warning' | 'error' | 'info';
  /** Status text */
  statusText?: string;
  /** Badge content */
  badge?: string | number;
  /** Loading state */
  loading?: boolean;
  /** onClick handler for clickable cards */
  onClick?: () => void;
  /** Custom className */
  className?: string;
}

/** Card component for grouping related information */
export const Card = ({
  title,
  subtitle,
  children,
  header,
  footer,
  image,
  imageAlt,
  variant = 'default',
  size = 'medium',
  clickable = false,
  disabled = false,
  actions = [],
  status,
  statusText,
  badge,
  loading = false,
  onClick,
  className = '',
  ...props
}: CardProps) => {
  const sizeClasses = {
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  };

  const imageSizeClasses = {
    small: 'h-32',
    medium: 'h-48',
    large: 'h-64'
  };

  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-sm',
    outlined: 'bg-white border-2 border-gray-300',
    elevated: 'bg-white border border-gray-200 shadow-lg',
    minimal: 'bg-transparent'
  };

  const statusClasses = {
    success: 'border-l-4 border-l-green-500',
    warning: 'border-l-4 border-l-yellow-500',
    error: 'border-l-4 border-l-red-500',
    info: 'border-l-4 border-l-blue-500'
  };

  const statusColors = {
    success: 'text-green-600 bg-green-50',
    warning: 'text-yellow-600 bg-yellow-50',
    error: 'text-red-600 bg-red-50',
    info: 'text-blue-600 bg-blue-50'
  };

  const getCardClasses = () => {
    const baseClasses = `
      rounded-lg font-sans transition-all duration-200 relative overflow-hidden
      ${variantClasses[variant]}
      ${status ? statusClasses[status] : ''}
      ${clickable && !disabled 
        ? 'cursor-pointer hover:shadow-md transform hover:-translate-y-0.5' 
        : ''
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${className}
    `;
    return baseClasses.trim();
  };

  const getActionButtonClasses = (action: CardAction) => {
    const baseClasses = 'px-3 py-1.5 text-sm font-medium rounded border transition-colors duration-200';
    
    const variantClasses = {
      primary: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700',
      secondary: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
      danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700'
    };

    const disabledClasses = action.disabled 
      ? 'opacity-50 cursor-not-allowed' 
      : '';

    return `${baseClasses} ${variantClasses[action.variant || 'secondary']} ${disabledClasses}`;
  };

  const handleCardClick = () => {
    if (clickable && !disabled && onClick) {
      onClick();
    }
  };

  const handleActionClick = (action: CardAction, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!action.disabled) {
      action.onClick();
    }
  };

  if (loading) {
    return (
      <div className={getCardClasses()}>
        <div className={sizeClasses[size]}>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={getCardClasses()}
      onClick={handleCardClick}
      {...props}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-2 right-2 z-10">
          <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
            {badge}
          </span>
        </div>
      )}

      {/* Image */}
      {image && (
        <div className={`w-full ${imageSizeClasses[size]} overflow-hidden`}>
          <Image
            src={image}
            alt={imageAlt || ''}
            className="w-full h-full object-cover"
            width={500}
            height={300}
          />
        </div>
      )}

      {/* Header */}
      <div className={sizeClasses[size]}>
        {header ? (
          header
        ) : (
          (title || subtitle) && (
            <div className="mb-3">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600">
                  {subtitle}
                </p>
              )}
            </div>
          )
        )}

        {/* Status */}
        {status && statusText && (
          <div className={`
            inline-flex items-center px-2 py-1 rounded text-xs font-medium mb-3
            ${statusColors[status]}
          `}>
            {statusText}
          </div>
        )}

        {/* Content */}
        {children && (
          <div className="text-gray-700">
            {children}
          </div>
        )}
      </div>

      {/* Footer */}
      {(footer || actions.length > 0) && (
        <div className={`border-t border-gray-200 ${sizeClasses[size]} pt-3`}>
          {footer}
          
          {actions.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {actions.map((action, index) => (
                <button
                  key={index}
                  className={getActionButtonClasses(action)}
                  onClick={(e) => handleActionClick(action, e)}
                  disabled={action.disabled}
                >
                  {action.icon && <span className="mr-1">{action.icon}</span>}
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
