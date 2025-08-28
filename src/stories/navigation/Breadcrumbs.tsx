export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator */
  separator?: string | React.ReactNode;
  /** Size of the breadcrumbs */
  size?: 'small' | 'medium' | 'large';
  /** Show home icon for first item */
  showHomeIcon?: boolean;
  /** Maximum number of items to show before collapsing */
  maxItems?: number;
  /** Callback when breadcrumb item is clicked */
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

/** Breadcrumbs component for showing hierarchical location */
export const Breadcrumbs = ({
  items,
  separator = '/',
  size = 'medium',
  showHomeIcon = false,
  maxItems,
  onItemClick,
  ...props
}: BreadcrumbsProps) => {
  const handleItemClick = (item: BreadcrumbItem, index: number, event: React.MouseEvent) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    
    onItemClick?.(item, index);
    item.onClick?.();
  };

  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  const renderItems = () => {
    let displayItems = items;
    let showEllipsis = false;

    // Handle collapsing when maxItems is set
    if (maxItems && items.length > maxItems) {
      showEllipsis = true;
      // Always show first item, ellipsis, and last few items
      const remainingSlots = maxItems - 2; // Reserve slots for first item and ellipsis
      const lastItems = items.slice(-remainingSlots);
      displayItems = [items[0], ...lastItems];
    }

    return (
      <>
        {/* First item (always shown if ellipsis is used) */}
        {showEllipsis && (
          <>
            {renderBreadcrumbItem(items[0], 0)}
            <span className={`mx-2 text-gray-400 ${sizeClasses[size]}`}>
              {separator}
            </span>
            <span className={`mx-1 text-gray-400 ${sizeClasses[size]}`}>
              ...
            </span>
            <span className={`mx-2 text-gray-400 ${sizeClasses[size]}`}>
              {separator}
            </span>
          </>
        )}

        {/* Regular items or collapsed items */}
        {(showEllipsis ? displayItems.slice(1) : displayItems).map((item, index) => {
          const actualIndex = showEllipsis ? items.length - displayItems.length + 1 + index : index;
          const isLast = actualIndex === items.length - 1;
          
          return (
            <span key={actualIndex} className="flex items-center">
              {renderBreadcrumbItem(item, actualIndex, isLast)}
              {!isLast && (
                <span className={`mx-2 text-gray-400 ${sizeClasses[size]}`}>
                  {separator}
                </span>
              )}
            </span>
          );
        })}
      </>
    );
  };

  const renderBreadcrumbItem = (item: BreadcrumbItem, index: number, isLast = false) => {
    const isFirst = index === 0;
    const baseClasses = `
      font-sans transition-colors duration-200
      ${sizeClasses[size]}
      ${isLast 
        ? 'text-gray-900 font-medium cursor-default' 
        : item.disabled 
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-blue-600 hover:text-blue-800 cursor-pointer hover:underline'
      }
    `.trim();

    const content = (
      <span className="flex items-center gap-1">
        {isFirst && showHomeIcon && (
          <span className="text-lg">🏠</span>
        )}
        {item.icon && !isFirst && (
          <span className="text-sm">{item.icon}</span>
        )}
        <span>{item.label}</span>
      </span>
    );

    if (isLast || item.disabled) {
      return (
        <span className={baseClasses} aria-current={isLast ? 'page' : undefined}>
          {content}
        </span>
      );
    }

    if (item.href) {
      return (
        <a
          href={item.href}
          className={baseClasses}
          onClick={(e) => handleItemClick(item, index, e)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        type="button"
        className={`${baseClasses} bg-transparent border-none p-0`}
        onClick={(e) => handleItemClick(item, index, e)}
      >
        {content}
      </button>
    );
  };

  return (
    <nav
      className="flex items-center flex-wrap font-sans"
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="flex items-center space-x-0 list-none m-0 p-0">
        <li className="flex items-center">
          {renderItems()}
        </li>
      </ol>
    </nav>
  );
};
