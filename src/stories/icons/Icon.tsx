export interface IconProps {
  /** Icon name */
  name: 'check' | 'cross' | 'warning' | 'info' | 'loading' | 'play' | 'pause' | 'stop' | 'refresh' | 'settings' | 'user' | 'cloud' | 'database' | 'network' | 'security' | 'monitor';
  /** Size of the icon */
  size?: 'small' | 'medium' | 'large';
  /** Color of the icon */
  color?: string;
  /** Is the icon clickable? */
  clickable?: boolean;
  /** Click handler */
  onClick?: () => void;
}

const iconPaths = {
  check: '✓',
  cross: '✕',
  warning: '⚠️',
  info: 'ℹ️',
  loading: '⟳',
  play: '▶️',
  pause: '⏸️',
  stop: '⏹️',
  refresh: '🔄',
  settings: '⚙️',
  user: '👤',
  cloud: '☁️',
  database: '🗄️',
  network: '🌐',
  security: '🔒',
  monitor: '📊'
};

/** Icon component for visual indicators */
export const Icon = ({
  name,
  size = 'medium',
  color,
  clickable = false,
  onClick,
  ...props
}: IconProps) => {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-xl'
  };

  const iconClasses = `
    inline-block leading-none transition-all duration-200 ease-in-out
    ${sizeClasses[size]}
    ${clickable ? 'cursor-pointer hover:opacity-70 hover:scale-110 active:scale-95' : ''}
  `.trim();

  return (
    <span
      className={iconClasses}
      onClick={clickable ? onClick : undefined}
      style={{ color }}
      {...props}
    >
      {iconPaths[name]}
    </span>
  );
};
