export interface LabelProps {
  /** Label text */
  children: React.ReactNode;
  /** Is the field required? */
  required?: boolean;
  /** Size of the label */
  size?: 'small' | 'medium' | 'large';
  /** Label variant */
  variant?: 'default' | 'section' | 'fieldset';
  /** HTML for attribute */
  htmlFor?: string;
  /** Additional CSS classes */
  className?: string;
}

/** Label component for describing input fields or sections */
export const Label = ({
  children,
  required = false,
  size = 'medium',
  variant = 'default',
  htmlFor,
  className,
  ...props
}: LabelProps) => {
  const baseClasses = 'font-sans text-gray-800 inline-block mb-1';
  
  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  const variantClasses = {
    default: 'font-semibold',
    section: {
      small: 'text-sm font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2 block',
      medium: 'text-base font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2 block',
      large: 'text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2 block'
    },
    fieldset: {
      small: 'text-base font-bold text-gray-900 mb-3 block',
      medium: 'text-lg font-bold text-gray-900 mb-3 block',
      large: 'text-xl font-bold text-gray-900 mb-3 block'
    }
  };

  const getVariantClasses = () => {
    if (variant === 'default') return variantClasses.default;
    if (variant === 'section') return variantClasses.section[size];
    if (variant === 'fieldset') return variantClasses.fieldset[size];
    return '';
  };

  const labelClasses = `
    ${baseClasses}
    ${variant === 'default' ? sizeClasses[size] : ''}
    ${getVariantClasses()}
    ${className || ''}
  `.trim();

  return (
    <label
      className={labelClasses}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-0.5 font-bold">*</span>}
    </label>
  );
};
