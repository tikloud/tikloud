export interface ProgressBarProps {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Size of the progress bar */
  size?: 'small' | 'medium' | 'large';
  /** Color variant */
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  /** Show percentage text */
  showPercentage?: boolean;
  /** Custom label text */
  label?: string;
  /** Striped animation */
  striped?: boolean;
  /** Animated stripes */
  animated?: boolean;
}

/** Progress bar component for showing progress of operations */
export const ProgressBar = ({
  value,
  max = 100,
  size = 'medium',
  variant = 'primary',
  showPercentage = false,
  label,
  striped = false,
  animated = false,
  ...props
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    small: 'h-1.5',
    medium: 'h-2.5',
    large: 'h-4'
  };

  const variantClasses = {
    primary: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-400',
    danger: 'bg-red-500',
    info: 'bg-cyan-500'
  };

  const containerClasses = `
    w-full bg-gray-200 rounded overflow-hidden relative
    ${sizeClasses[size]}
  `.trim();

  const barClasses = `
    h-full transition-all duration-300 ease-in-out rounded-inherit
    ${variantClasses[variant]}
    ${striped ? 'progress-striped' : ''}
    ${animated ? 'animate-pulse' : ''}
  `.trim();

  return (
    <div className="w-full max-w-md">
      {label && (
        <div className="flex justify-between items-center mb-1 font-sans text-sm font-semibold text-gray-800">
          <span>{label}</span>
          {showPercentage && <span className="text-xs text-gray-600">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={containerClasses} {...props}>
        <div
          className={barClasses}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || `${Math.round(percentage)}% complete`}
        />
      </div>
      {!label && showPercentage && (
        <div className="text-center mt-1 font-sans text-xs text-gray-600">
          {Math.round(percentage)}%
        </div>
      )}
      <style jsx>{`
        .progress-striped {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
          );
          background-size: 1rem 1rem;
        }
      `}</style>
    </div>
  );
};
