import { useState, useCallback } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  icon?: string;
  badge?: string | number;
  closable?: boolean;
}

export interface TabsProps {
  /** Array of tab items */
  items: TabItem[];
  /** Currently active tab ID */
  activeId?: string;
  /** Default active tab ID */
  defaultActiveId?: string;
  /** Tab variant */
  variant?: 'default' | 'pills' | 'underline' | 'minimal';
  /** Size of the tabs */
  size?: 'small' | 'medium' | 'large';
  /** Position of tabs */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Allow scrolling when tabs overflow */
  scrollable?: boolean;
  /** Show close button on tabs */
  closable?: boolean;
  /** Callback when tab is changed */
  onChange?: (activeId: string) => void;
  /** Callback when tab is closed */
  onClose?: (tabId: string) => void;
  /** Custom content wrapper className */
  contentClassName?: string;
}

/** Tabs component for switching between related content */
export const Tabs = ({
  items,
  activeId,
  defaultActiveId,
  variant = 'default',
  size = 'medium',
  position = 'top',
  scrollable = false,
  closable = false,
  onChange,
  onClose,
  contentClassName = '',
  ...props
}: TabsProps) => {
  const [internalActiveId, setInternalActiveId] = useState(
    activeId || defaultActiveId || items[0]?.id
  );

  const currentActiveId = activeId || internalActiveId;

  const handleTabClick = useCallback((tabId: string) => {
    if (activeId === undefined) {
      setInternalActiveId(tabId);
    }
    onChange?.(tabId);
  }, [activeId, onChange]);

  const handleCloseTab = useCallback((tabId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onClose?.(tabId);
  }, [onClose]);

  const sizeClasses = {
    small: 'px-3 py-1.5 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  };

  const getTabClasses = (tab: TabItem) => {
    const isActive = currentActiveId === tab.id;
    
    const baseClasses = `
      font-sans font-medium transition-all duration-200 cursor-pointer border-0 bg-transparent
      flex items-center gap-2 relative select-none
      ${sizeClasses[size]}
    `;

    const variantClasses = {
      default: `
        border-b-2 
        ${isActive 
          ? 'text-blue-600 border-blue-600' 
          : 'text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300'
        }
        ${tab.disabled ? 'text-gray-400 cursor-not-allowed' : ''}
      `,
      pills: `
        rounded-lg
        ${isActive 
          ? 'bg-blue-100 text-blue-700' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
        }
        ${tab.disabled ? 'text-gray-400 cursor-not-allowed hover:bg-transparent' : ''}
      `,
      underline: `
        border-b-2 border-transparent
        ${isActive 
          ? 'text-blue-600 border-blue-600' 
          : 'text-gray-600 hover:text-gray-800'
        }
        ${tab.disabled ? 'text-gray-400 cursor-not-allowed' : ''}
      `,
      minimal: `
        ${isActive 
          ? 'text-blue-600' 
          : 'text-gray-600 hover:text-gray-800'
        }
        ${tab.disabled ? 'text-gray-400 cursor-not-allowed' : ''}
      `
    };

    return `${baseClasses} ${variantClasses[variant]}`.trim();
  };

  const getContainerClasses = () => {
    const baseClasses = 'flex';
    
    const positionClasses = {
      top: 'flex-col',
      bottom: 'flex-col-reverse',
      left: 'flex-row',
      right: 'flex-row-reverse'
    };

    return `${baseClasses} ${positionClasses[position]}`;
  };

  const getTabListClasses = () => {
    const baseClasses = `
      flex gap-1 relative
      ${scrollable ? 'overflow-x-auto scrollbar-hide' : ''}
    `;

    const positionClasses = {
      top: `border-b border-gray-200 ${variant === 'default' ? '' : 'border-0'}`,
      bottom: `border-t border-gray-200 ${variant === 'default' ? '' : 'border-0'}`,
      left: `flex-col border-r border-gray-200 ${variant === 'default' ? '' : 'border-0'}`,
      right: `flex-col border-l border-gray-200 ${variant === 'default' ? '' : 'border-0'}`
    };

    return `${baseClasses} ${positionClasses[position]}`;
  };

  const activeTab = items.find(tab => tab.id === currentActiveId);

  return (
    <div className={getContainerClasses()} {...props}>
      {/* Tab List */}
      <div className={getTabListClasses()} role="tablist">
        {items.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={currentActiveId === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            className={getTabClasses(tab)}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            disabled={tab.disabled}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full min-w-5 text-center">
                {tab.badge}
              </span>
            )}
            {(closable || tab.closable) && !tab.disabled && (
              <button
                className="ml-1 text-gray-400 hover:text-gray-600 text-lg leading-none"
                onClick={(e) => handleCloseTab(tab.id, e)}
                aria-label={`Close ${tab.label} tab`}
              >
                ×
              </button>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab?.content && (
        <div
          id={`tabpanel-${activeTab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab.id}`}
          className={`flex-1 p-4 ${contentClassName}`}
        >
          {activeTab.content}
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
