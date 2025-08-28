import React from 'react';
import Image from 'next/image';

export interface AvatarProps {
  /** Avatar source image URL */
  src?: string;
  /** Alternative text for image */
  alt?: string;
  /** Display name (used for initials if no image) */
  name?: string;
  /** Avatar size */
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl' | number;
  /** Avatar shape */
  shape?: 'circle' | 'square';
  /** Icon to display (if no image or name) */
  icon?: React.ReactNode;
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Online status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Show status indicator */
  showStatus?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Custom class name */
  className?: string;
}

export interface AvatarGroupProps {
  /** Array of avatar props */
  avatars: AvatarProps[];
  /** Maximum avatars to show */
  max?: number;
  /** Size for all avatars */
  size?: AvatarProps['size'];
  /** Shape for all avatars */
  shape?: AvatarProps['shape'];
  /** Click handler for overflow indicator */
  onOverflowClick?: () => void;
  /** Custom class name */
  className?: string;
}

/** Get initials from name */
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/** Generate background color from name */
const getBackgroundColor = (name: string): string => {
  const colors = [
    '#F87171', '#FB923C', '#FBBF24', '#A3E635', '#34D399',
    '#22D3EE', '#60A5FA', '#A78BFA', '#F472B6', '#FB7185'
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

/** Individual Avatar component */
export const Avatar = ({
  src,
  alt,
  name = 'User',
  size = 'medium',
  shape = 'circle',
  icon,
  backgroundColor,
  textColor = 'white',
  status,
  showStatus = false,
  onClick,
  className = '',
  ...props
}: AvatarProps) => {
  const [imageFailed, setImageFailed] = React.useState(false);

  const sizeClasses = typeof size === 'number' ? '' : {
    xs: 'w-6 h-6 text-xs',
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  }[size];

  const customSize = typeof size === 'number' ? {
    width: size,
    height: size,
    fontSize: size * 0.4
  } : {};

  const shapeClasses = shape === 'circle' ? 'rounded-full' : 'rounded-lg';
  
  const baseClasses = `
    inline-flex items-center justify-center font-medium bg-gray-200 text-gray-600 overflow-hidden relative
    ${sizeClasses}
    ${shapeClasses}
    ${onClick ? 'cursor-pointer hover:opacity-80' : ''}
    ${className}
  `.trim();

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };

  const statusSize = typeof size === 'number' 
    ? size * 0.25 
    : { xs: 6, small: 8, medium: 10, large: 12, xl: 16 }[size];

  const bgColor = backgroundColor || (name ? getBackgroundColor(name) : '#6B7280');

  // Render content based on available props
  const renderContent = () => {
    if (src && !imageFailed) {
      return (
        <Image
          src={src}
          alt={alt || name || 'Avatar'}
          fill
          className="object-cover"
          onError={() => setImageFailed(true)}
        />
      );
    }

    if (icon) {
      return <div className="w-1/2 h-1/2">{icon}</div>;
    }

    if (name) {
      return (
        <span style={{ color: textColor }}>
          {getInitials(name)}
        </span>
      );
    }

    return (
      <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div
      className={baseClasses}
      style={{ backgroundColor: bgColor, ...customSize }}
      onClick={onClick}
      {...props}
    >
      {renderContent()}
      
      {showStatus && status && (
        <div
          className={`absolute bottom-0 right-0 rounded-full border-2 border-white ${statusColors[status]}`}
          style={{
            width: statusSize,
            height: statusSize
          }}
        />
      )}
    </div>
  );
};

/** Avatar Group component */
export const AvatarGroup = ({
  avatars,
  max = 5,
  size = 'medium',
  shape = 'circle',
  onOverflowClick,
  className = '',
  ...props
}: AvatarGroupProps) => {
  const visibleAvatars = avatars.slice(0, max);
  const overflowCount = Math.max(0, avatars.length - max);

  const containerClasses = `
    flex items-center -space-x-2
    ${className}
  `.trim();

  return (
    <div className={containerClasses} {...props}>
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className="relative ring-2 ring-white rounded-full"
          style={{ zIndex: avatars.length - index }}
        >
          <Avatar
            {...avatar}
            size={size}
            shape={shape}
          />
        </div>
      ))}

      {overflowCount > 0 && (
        <div
          className="relative ring-2 ring-white rounded-full"
          style={{ zIndex: 0 }}
        >
          <Avatar
            name={`+${overflowCount}`}
            size={size}
            shape={shape}
            backgroundColor="#6B7280"
            onClick={onOverflowClick}
          />
        </div>
      )}
    </div>
  );
};
