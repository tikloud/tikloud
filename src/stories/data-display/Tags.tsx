import React, { useState } from 'react';

export interface TagProps {
  /** Tag content */
  children: React.ReactNode;
  /** Tag color variant */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  /** Tag size */
  size?: 'small' | 'medium' | 'large';
  /** Show close button */
  closable?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Click handler */
  onClick?: () => void;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Tag is selected */
  selected?: boolean;
  /** Tag is disabled */
  disabled?: boolean;
  /** Custom background color */
  color?: string;
}

export interface TagsProps {
  /** Array of tag data */
  tags: (string | { 
    id: string; 
    label: string; 
    variant?: TagProps['variant']; 
    color?: string;
    icon?: React.ReactNode;
    closable?: boolean;
  })[];
  /** Default variant for all tags */
  defaultVariant?: TagProps['variant'];
  /** Size for all tags */
  size?: TagProps['size'];
  /** Enable adding new tags */
  addable?: boolean;
  /** Placeholder for add input */
  addPlaceholder?: string;
  /** Maximum number of tags */
  maxTags?: number;
  /** Predefined tag options for selection */
  options?: string[];
  /** New tag handler */
  onAdd?: (tag: string) => void;
  /** Remove tag handler */
  onRemove?: (tag: string | { id: string; label: string }) => void;
  /** Tag click handler */
  onTagClick?: (tag: string | { id: string; label: string }) => void;
  /** Wrap tags to new lines */
  wrap?: boolean;
}

/** Individual Tag component */
export const Tag = ({
  children,
  variant = 'secondary',
  size = 'medium',
  closable = false,
  onClose,
  onClick,
  icon,
  selected = false,
  disabled = false,
  color,
  ...props
}: TagProps) => {
  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-2'
  };

  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800 border-blue-200',
    secondary: 'bg-gray-100 text-gray-800 border-gray-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    info: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    light: 'bg-gray-50 text-gray-700 border-gray-200',
    dark: 'bg-gray-800 text-white border-gray-700'
  };

  const baseClasses = `
    inline-flex items-center gap-1 rounded-full border font-medium
    ${sizeClasses[size]}
    ${selected ? 'ring-2 ring-blue-500 ring-offset-1' : ''}
    ${onClick && !disabled ? 'cursor-pointer hover:opacity-80' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    transition-all duration-150
  `.trim();

  const tagClasses = color 
    ? `${baseClasses} border-gray-200`
    : `${baseClasses} ${variantClasses[variant]}`;

  const tagStyle = color ? { backgroundColor: color, color: 'white' } : {};

  return (
    <span
      className={tagClasses}
      style={tagStyle}
      onClick={!disabled ? onClick : undefined}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
      {closable && !disabled && (
        <button
          className="flex-shrink-0 ml-1 rounded-full hover:bg-black hover:bg-opacity-10 p-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  );
};

/** Tags component for managing multiple tags */
export const Tags = ({
  tags,
  defaultVariant = 'secondary',
  size = 'medium',
  addable = false,
  addPlaceholder = 'Add tag...',
  maxTags,
  options = [],
  onAdd,
  onRemove,
  onTagClick,
  wrap = true,
  ...props
}: TagsProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleAddTag = (tagValue: string) => {
    const trimmedValue = tagValue.trim();
    if (trimmedValue && (!maxTags || tags.length < maxTags)) {
      onAdd?.(trimmedValue);
      setInputValue('');
      setShowInput(false);
      setShowOptions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === 'Escape') {
      setInputValue('');
      setShowInput(false);
      setShowOptions(false);
    }
  };

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(inputValue.toLowerCase()) &&
    !tags.some(tag => {
      const tagLabel = typeof tag === 'string' ? tag : tag.label;
      return tagLabel === option;
    })
  );

  const containerClasses = `
    flex items-center gap-2
    ${wrap ? 'flex-wrap' : 'overflow-x-auto'}
  `.trim();

  return (
    <div className={containerClasses} {...props}>
      {tags.map((tag, index) => {
        const tagData = typeof tag === 'string' 
          ? { id: `tag-${index}`, label: tag }
          : tag;

        return (
          <Tag
            key={typeof tag === 'string' ? `${tag}-${index}` : tag.id}
            variant={tagData.variant || defaultVariant}
            size={size}
            closable={tagData.closable !== false && !!onRemove}
            onClose={() => onRemove?.(tag)}
            onClick={() => onTagClick?.(tag)}
            icon={tagData.icon}
            color={tagData.color}
          >
            {tagData.label}
          </Tag>
        );
      })}

      {addable && (!maxTags || tags.length < maxTags) && (
        <div className="relative">
          {showInput ? (
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowOptions(options.length > 0);
                }}
                onKeyDown={handleKeyPress}
                onBlur={() => {
                  setTimeout(() => {
                    setShowInput(false);
                    setShowOptions(false);
                    setInputValue('');
                  }, 150);
                }}
                placeholder={addPlaceholder}
                className="px-3 py-1 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />

              {/* Options dropdown */}
              {showOptions && filteredOptions.length > 0 && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                  {filteredOptions.map((option) => (
                    <button
                      key={option}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleAddTag(option);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              className="inline-flex items-center gap-1 px-3 py-1 text-sm text-gray-600 border border-dashed border-gray-300 rounded-full hover:border-gray-400 hover:text-gray-700 transition-colors duration-150"
              onClick={() => setShowInput(true)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add tag
            </button>
          )}
        </div>
      )}
    </div>
  );
};
