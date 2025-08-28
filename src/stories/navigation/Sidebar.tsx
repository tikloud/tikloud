import { useState } from 'react';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
  children?: SidebarItem[];
  badge?: string | number;
  disabled?: boolean;
}

export interface SidebarProps {
  /** Navigation items */
  items: SidebarItem[];
  /** Currently active item ID */
  activeId?: string;
  /** Is sidebar collapsed */
  collapsed?: boolean;
  /** Allow collapsible sidebar */
  collapsible?: boolean;
  /** Sidebar width when expanded */
  width?: 'narrow' | 'medium' | 'wide';
  /** Position of the sidebar */
  position?: 'left' | 'right';
  /** Show brand/logo section */
  brand?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Callback when item is clicked */
  onItemClick?: (item: SidebarItem) => void;
  /** Callback when collapse state changes */
  onCollapseChange?: (collapsed: boolean) => void;
}

/** Sidebar component for main navigation menu */
export const Sidebar = ({
  items,
  activeId,
  collapsed = false,
  collapsible = true,
  width = 'medium',
  position = 'left',
  brand,
  footer,
  onItemClick,
  onCollapseChange,
  ...props
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleToggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
  };

  const handleItemClick = (item: SidebarItem) => {
    if (item.disabled) return;
    
    if (item.children && item.children.length > 0) {
      const isExpanded = expandedItems.includes(item.id);
      setExpandedItems(prev =>
        isExpanded
          ? prev.filter(id => id !== item.id)
          : [...prev, item.id]
      );
    } else {
      onItemClick?.(item);
      item.onClick?.();
    }
  };

  const widthClasses = {
    narrow: isCollapsed ? 'w-16' : 'w-48',
    medium: isCollapsed ? 'w-16' : 'w-64',
    wide: isCollapsed ? 'w-16' : 'w-80'
  };

  const sidebarClasses = `
    flex flex-col h-full bg-gray-900 text-white transition-all duration-300 ease-in-out border-r border-gray-700
    ${widthClasses[width]}
    ${position === 'right' ? 'border-l border-r-0' : ''}
  `.trim();

  const renderItem = (item: SidebarItem, level = 0) => {
    const isActive = activeId === item.id;
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    const itemClasses = `
      flex items-center justify-between w-full px-3 py-2.5 text-left transition-colors duration-200 rounded-lg mx-2 my-0.5
      ${level > 0 ? 'ml-6 text-sm' : 'text-sm'}
      ${isActive 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }
      ${item.disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'cursor-pointer'
      }
    `.trim();

    return (
      <div key={item.id}>
        <button
          className={itemClasses}
          onClick={() => handleItemClick(item)}
          disabled={item.disabled}
          title={isCollapsed ? item.label : undefined}
        >
          <div className="flex items-center min-w-0 flex-1">
            {item.icon && (
              <span className="flex-shrink-0 w-5 h-5 mr-3 text-lg">
                {item.icon}
              </span>
            )}
            {!isCollapsed && (
              <span className="truncate">{item.label}</span>
            )}
          </div>
          
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              {item.badge && (
                <span className="px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full min-w-5 text-center">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                  ▶
                </span>
              )}
            </div>
          )}
        </button>
        
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1">
            {item.children!.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={sidebarClasses} {...props}>
      {/* Brand/Logo Section */}
      {brand && (
        <div className={`flex items-center px-4 py-4 border-b border-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
          {isCollapsed ? (
            <div className="w-8 h-8 flex items-center justify-center">
              {typeof brand === 'string' ? brand.charAt(0) : brand}
            </div>
          ) : (
            brand
          )}
        </div>
      )}

      {/* Collapse Toggle */}
      {collapsible && (
        <div className="flex justify-end p-2 border-b border-gray-700">
          <button
            onClick={handleToggleCollapse}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors duration-200"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span className={`text-sm transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}>
              ◀
            </span>
          </button>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-2">
        {items.map(item => renderItem(item))}
      </nav>

      {/* Footer */}
      {footer && !isCollapsed && (
        <div className="border-t border-gray-700 p-4">
          {footer}
        </div>
      )}
    </div>
  );
};
