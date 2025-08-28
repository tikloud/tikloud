export interface InputFieldProps {
  /** Type of input */
  type?: 'text' | 'number' | 'password' | 'email';
  /** Input label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Input value */
  value?: string;
  /** Is the input disabled? */
  disabled?: boolean;
  /** Is the input required? */
  required?: boolean;
  /** Error message to display */
  error?: string;
  /** Help text to display */
  helpText?: string;
  /** Size of the input */
  size?: 'small' | 'medium' | 'large';
  /** onChange handler */
  onChange?: (value: string) => void;
}

/** Input field component for user data entry */
export const InputField = ({
  type = 'text',
  label,
  placeholder,
  value,
  disabled = false,
  required = false,
  error,
  helpText,
  size = 'medium',
  onChange,
  ...props
}: InputFieldProps) => {
  const sizeClasses = {
    small: 'px-2.5 py-1.5 text-xs',
    medium: 'px-3 py-2 text-sm',
    large: 'px-4 py-3 text-base'
  };

  const inputClasses = `
    font-sans border rounded-md bg-white transition-all duration-200 ease-in-out w-full
    ${sizeClasses[size]}
    ${error 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
    }
    ${disabled 
      ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
      : 'focus:outline-none focus:ring-2'
    }
  `.trim();

  return (
    <div className="flex flex-col gap-1 w-full max-w-sm">
      {label && (
        <label className="font-sans text-sm font-semibold text-gray-800 mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        required={required}
        onChange={(e) => onChange?.(e.target.value)}
        {...props}
      />
      {error && <div className="text-xs text-red-500 mt-0.5">{error}</div>}
      {helpText && !error && <div className="text-xs text-gray-600 mt-0.5">{helpText}</div>}
    </div>
  );
};
