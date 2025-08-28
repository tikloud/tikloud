export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const baseClasses = 'font-sans font-medium rounded cursor-pointer border-0 inline-block leading-none transition-colors duration-200';
  
  const sizeClasses = {
    small: 'text-xs py-2 px-4',
    medium: 'text-sm py-3 px-5',
    large: 'text-base py-3 px-6'
  };

  const variantClasses = primary 
    ? 'text-white bg-blue-500 hover:bg-blue-600' 
    : 'text-gray-800 bg-transparent shadow-gray-800 shadow-inner hover:bg-gray-100';

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses}`;

  return (
    <button
      type="button"
      className={buttonClasses}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
