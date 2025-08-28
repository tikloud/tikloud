import { useState } from 'react';

export interface TooltipProps {
  /** Content to show in the tooltip */
  content: string;
  /** Children element that triggers the tooltip */
  children?: React.ReactNode;
  /** Position of the tooltip */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Trigger type */
  trigger?: 'hover' | 'click';
  /** Size of the tooltip */
  size?: 'small' | 'medium' | 'large';
  /** Delay before showing tooltip (in ms) */
  delay?: number;
}

/** Tooltip component for providing hints or additional info */
export const Tooltip = ({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  size = 'medium',
  delay = 500,
  ...props
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsVisible(!isVisible);
    }
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-800',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800'
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-xs max-w-xs',
    medium: 'px-2.5 py-1.5 text-xs max-w-sm',
    large: 'px-3 py-2 text-sm max-w-md'
  };

  const tooltipClasses = `
    absolute z-50 transition-opacity duration-200 ease-in-out pointer-events-none
    ${positionClasses[position]}
    ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
  `.trim();

  return (
    <div
      className="relative inline-block"
      onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
      onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
      onClick={handleClick}
      {...props}
    >
      {children}
      <div className={tooltipClasses}>
        <div className={`
          bg-gray-800 text-white rounded font-sans whitespace-normal break-words shadow-lg
          ${sizeClasses[size]}
        `}>
          {content}
        </div>
        <div className={`absolute w-0 h-0 ${arrowClasses[position]}`} />
      </div>
    </div>
  );
};
