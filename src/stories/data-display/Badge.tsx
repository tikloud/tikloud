export interface BadgeProps {
  /** Badge text */
  children: React.ReactNode;
  /** Badge variant */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark';
  /** Size of the badge */
  size?: 'small' | 'medium' | 'large';
  /** Is the badge removable? */
  removable?: boolean;
  /** Callback when badge is removed */
  onRemove?: () => void;
}

/** Badge component for displaying status or tags */
export const Badge = ({
  children,
  variant = 'primary',
  size = 'medium',
  removable = false,
  onRemove,
  ...props
}: BadgeProps) => {
  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-1 text-xs',
    large: 'px-3 py-1.5 text-sm'
  };

  const variantClasses = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-400 text-gray-900',
    danger: 'bg-red-500 text-white',
    info: 'bg-cyan-500 text-white',
    light: 'bg-gray-100 text-gray-900 border border-gray-300',
    dark: 'bg-gray-800 text-white'
  };

  const badgeClasses = `
    inline-flex items-center font-sans font-semibold rounded-full whitespace-nowrap gap-1
    ${sizeClasses[size]}
    ${variantClasses[variant]}
  `.trim();

  return (
    <span className={badgeClasses} {...props}>
      {children}
      {removable && (
        <button 
          className="bg-transparent border-none text-inherit cursor-pointer text-sm font-bold leading-none p-0 ml-1 opacity-70 hover:opacity-100 focus:opacity-100 focus:outline-none transition-opacity duration-200"
          onClick={onRemove}
          type="button"
          aria-label="Remove badge"
        >
          ×
        </button>
      )}
    </span>
  );
};
