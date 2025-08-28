import { useState } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  /** Dropdown options */
  options: DropdownOption[];
  /** Selected value */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Is the dropdown disabled? */
  disabled?: boolean;
  /** Size of the dropdown */
  size?: 'small' | 'medium' | 'large';
  /** Error state */
  error?: boolean;
  /** Label for the dropdown */
  label?: string;
  /** onChange handler */
  onChange?: (value: string) => void;
}

/** Dropdown component for selecting from a list of options */
export const Dropdown = ({
  options,
  value,
  placeholder = 'Select an option...',
  disabled = false,
  size = 'medium',
  error = false,
  label,
  onChange,
  ...props
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const sizeClasses = {
    small: 'px-2.5 py-1.5 text-xs',
    medium: 'px-3 py-2 text-sm',
    large: 'px-4 py-3 text-base'
  };

  const dropdownClasses = `
    w-full flex items-center justify-between font-sans border rounded-md bg-white cursor-pointer transition-all duration-200 ease-in-out
    ${sizeClasses[size]}
    ${error 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
      : 'border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring-blue-100'
    }
    ${disabled 
      ? 'bg-gray-100 cursor-not-allowed opacity-60' 
      : 'focus:outline-none focus:ring-2'
    }
    ${isOpen ? 'ring-2 ring-blue-100 border-blue-500' : ''}
  `.trim();

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-sm">
      {label && (
        <label className="font-sans text-sm font-semibold text-gray-800">{label}</label>
      )}
      <div className="relative">
        <button
          type="button"
          className={dropdownClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          {...props}
        >
          <span className={`flex-1 text-left ${selectedOption ? 'text-gray-800' : 'text-gray-500'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className={`ml-2 transition-transform duration-200 text-gray-600 text-xs ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 border-t-0 rounded-b-md shadow-lg max-h-48 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`
                  w-full px-3 py-2 border-none text-left font-sans text-sm text-gray-800 cursor-pointer transition-colors duration-200
                  ${option.disabled 
                    ? 'text-gray-400 cursor-not-allowed bg-gray-50' 
                    : 'hover:bg-gray-100'
                  }
                  ${option.value === value 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : ''
                  }
                `.trim()}
                onClick={() => !option.disabled && handleSelect(option.value)}
                disabled={option.disabled}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
