export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioButtonProps {
  /** Radio button options */
  options: RadioOption[];
  /** Name attribute for the radio group */
  name: string;
  /** Selected value */
  value?: string;
  /** Size of the radio buttons */
  size?: 'small' | 'medium' | 'large';
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** onChange handler */
  onChange?: (value: string) => void;
}

/** Radio button component for selecting one option from a list */
export const RadioButton = ({
  options,
  name,
  value,
  size = 'medium',
  direction = 'vertical',
  onChange,
  ...props
}: RadioButtonProps) => {
  const containerClasses = `
    flex gap-3
    ${direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}
  `.trim();

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

  return (
    <div className={containerClasses}>
      {options.map((option) => {
        const radioClasses = `
          border-2 border-gray-300 rounded-full bg-white cursor-pointer transition-all duration-200 ease-in-out
          ${sizeClasses[size]}
          ${option.disabled
            ? 'cursor-not-allowed bg-gray-100 border-gray-300 opacity-60'
            : 'hover:border-blue-500 focus:ring-2 focus:ring-blue-100'
          }
          ${value === option.value
            ? 'border-blue-500 bg-blue-500'
            : ''
          }
        `.trim();

        const wrapperClasses = `
          flex items-center gap-2 cursor-pointer select-none
          ${option.disabled ? 'cursor-not-allowed opacity-60' : ''}
        `.trim();

        return (
          <label
            key={option.value}
            className={wrapperClasses}
          >
            <input
              type="radio"
              className={radioClasses}
              name={name}
              value={option.value}
              checked={value === option.value}
              disabled={option.disabled}
              onChange={() => onChange?.(option.value)}
              {...props}
            />
            <span className={`font-sans text-gray-800 ${labelSizeClasses[size]}`}>
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};
