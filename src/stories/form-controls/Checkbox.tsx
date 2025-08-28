export interface CheckboxProps {
  /** Checkbox label */
  label: string;
  /** Is the checkbox checked? */
  checked?: boolean;
  /** Is the checkbox disabled? */
  disabled?: boolean;
  /** Is the checkbox indeterminate? */
  indeterminate?: boolean;
  /** Size of the checkbox */
  size?: 'small' | 'medium' | 'large';
  /** onChange handler */
  onChange?: (checked: boolean) => void;
}

/** Checkbox component for toggling options */
export const Checkbox = ({
  label,
  checked = false,
  disabled = false,
  indeterminate = false,
  size = 'medium',
  onChange,
  ...props
}: CheckboxProps) => {
  const sizeClasses = {
    small: 'w-3 h-3 text-xs',
    medium: 'w-4 h-4 text-sm',
    large: 'w-5 h-5 text-base'
  };

  const labelSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  const checkboxClasses = `
    border-2 border-gray-300 rounded bg-white cursor-pointer transition-all duration-200 ease-in-out
    ${sizeClasses[size]}
    ${disabled 
      ? 'cursor-not-allowed bg-gray-100 border-gray-300 opacity-60' 
      : 'hover:border-blue-500 focus:ring-2 focus:ring-blue-100'
    }
    ${checked || indeterminate 
      ? 'bg-blue-500 border-blue-500' 
      : ''
    }
  `.trim();

  const wrapperClasses = `
    flex items-center gap-2 cursor-pointer select-none
    ${disabled ? 'cursor-not-allowed opacity-60' : ''}
  `.trim();

  return (
    <label className={wrapperClasses}>
      <input
        type="checkbox"
        className={checkboxClasses}
        checked={checked}
        disabled={disabled}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
        }}
        onChange={(e) => onChange?.(e.target.checked)}
        {...props}
      />
      <span className={`font-sans text-gray-800 ${labelSizeClasses[size]}`}>
        {label}
      </span>
    </label>
  );
};
