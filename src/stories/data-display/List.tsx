import React from 'react';

export interface ListItem {
  id: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  metadata?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface ListProps {
  /** List items */
  items: ListItem[];
  /** List orientation */
  orientation?: 'vertical' | 'horizontal';
  /** List size */
  size?: 'small' | 'medium' | 'large';
  /** Show dividers between items */
  divided?: boolean;
  /** Enable hover effects */
  hoverable?: boolean;
  /** List style variant */
  variant?: 'default' | 'outlined' | 'borderless';
  /** Enable selection */
  selectable?: boolean;
  /** Selected item IDs */
  selectedIds?: string[];
  /** Selection change handler */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Empty state content */
  emptyContent?: React.ReactNode;
  /** Maximum height with scroll */
  maxHeight?: string;
}

/** Flexible list component for displaying items vertically or horizontally */
export const List = ({
  items,
  orientation = 'vertical',
  size = 'medium',
  divided = true,
  hoverable = true,
  variant = 'default',
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  emptyContent = 'No items to display',
  maxHeight,
  ...props
}: ListProps) => {
  const handleItemClick = (item: ListItem) => {
    if (selectable && onSelectionChange) {
      const isSelected = selectedIds.includes(item.id);
      const newSelectedIds = isSelected
        ? selectedIds.filter(id => id !== item.id)
        : [...selectedIds, item.id];
      onSelectionChange(newSelectedIds);
    } else if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.location.href = item.href;
    }
  };

  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const paddingClasses = {
    small: 'p-2',
    medium: 'p-3',
    large: 'p-4'
  };

  const variantClasses = {
    default: 'bg-white border border-gray-200 rounded-lg',
    outlined: 'border border-gray-300 rounded-lg',
    borderless: ''
  };

  const baseClasses = `
    ${sizeClasses[size]} 
    ${variantClasses[variant]}
    ${maxHeight ? 'overflow-auto' : ''}
  `.trim();

  const listClasses = orientation === 'vertical' 
    ? 'flex flex-col' 
    : 'flex flex-row gap-2 overflow-x-auto';

  if (items.length === 0) {
    return (
      <div className={`${baseClasses} flex items-center justify-center p-8 text-gray-500`}>
        {emptyContent}
      </div>
    );
  }

  return (
    <div 
      className={baseClasses}
      style={{ maxHeight }}
      {...props}
    >
      <div className={listClasses}>
        {items.map((item, index) => {
          const isSelected = selectedIds.includes(item.id);
          const isClickable = selectable || item.onClick || item.href;
          
          const itemClasses = `
            ${paddingClasses[size]}
            ${orientation === 'vertical' ? 'flex items-center justify-between' : 'flex-shrink-0'}
            ${isClickable ? 'cursor-pointer' : ''}
            ${hoverable && isClickable ? 'hover:bg-gray-50' : ''}
            ${isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}
            ${divided && orientation === 'vertical' && index < items.length - 1 ? 'border-b border-gray-200' : ''}
            transition-colors duration-150
          `.trim();

          const ItemWrapper = item.href ? 'a' : 'div';
          const wrapperProps = item.href ? { href: item.href } : {};

          return (
            <ItemWrapper
              key={item.id}
              className={itemClasses}
              onClick={() => handleItemClick(item)}
              {...wrapperProps}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {item.icon && (
                  <div className="flex-shrink-0 text-gray-600">
                    {item.icon}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="truncate">
                    {item.content}
                  </div>
                  {item.metadata && (
                    <div className="text-sm text-gray-500 mt-1">
                      {item.metadata}
                    </div>
                  )}
                </div>
              </div>

              {item.action && (
                <div className="flex-shrink-0 ml-3">
                  {item.action}
                </div>
              )}

              {selectable && (
                <div className="flex-shrink-0 ml-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleItemClick(item)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded border-gray-300"
                  />
                </div>
              )}
            </ItemWrapper>
          );
        })}
      </div>
    </div>
  );
};
