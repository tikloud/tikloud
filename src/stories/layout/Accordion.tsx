import { useState, useCallback } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: string;
  badge?: string | number;
}

export interface AccordionProps {
  /** Array of accordion items */
  items: AccordionItem[];
  /** Allow multiple panels to be open */
  allowMultiple?: boolean;
  /** Default expanded item IDs */
  defaultExpanded?: string[];
  /** Controlled expanded item IDs */
  expanded?: string[];
  /** Size of the accordion */
  size?: 'small' | 'medium' | 'large';
  /** Accordion variant */
  variant?: 'default' | 'bordered' | 'separated' | 'minimal';
  /** Animation duration in ms */
  animationDuration?: number;
  /** Callback when accordion item is toggled */
  onToggle?: (itemId: string, isExpanded: boolean) => void;
  /** Callback when expanded items change */
  onChange?: (expandedIds: string[]) => void;
}

/** Accordion component for expand/collapse sections */
export const Accordion = ({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  expanded,
  size = 'medium',
  variant = 'default',
  animationDuration = 300,
  onToggle,
  onChange,
  ...props
}: AccordionProps) => {
  const [internalExpanded, setInternalExpanded] = useState<string[]>(defaultExpanded);

  const expandedIds = expanded || internalExpanded;

  const handleToggle = useCallback((itemId: string) => {
    const isCurrentlyExpanded = expandedIds.includes(itemId);
    let newExpandedIds: string[];

    if (allowMultiple) {
      newExpandedIds = isCurrentlyExpanded
        ? expandedIds.filter(id => id !== itemId)
        : [...expandedIds, itemId];
    } else {
      newExpandedIds = isCurrentlyExpanded ? [] : [itemId];
    }

    if (expanded === undefined) {
      setInternalExpanded(newExpandedIds);
    }

    onToggle?.(itemId, !isCurrentlyExpanded);
    onChange?.(newExpandedIds);
  }, [expandedIds, allowMultiple, expanded, onToggle, onChange]);

  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const headerSizeClasses = {
    small: 'px-3 py-2',
    medium: 'px-4 py-3',
    large: 'px-6 py-4'
  };

  const contentSizeClasses = {
    small: 'px-3 pb-2',
    medium: 'px-4 pb-3',
    large: 'px-6 pb-4'
  };

  const getContainerClasses = () => {
    const baseClasses = 'w-full';
    
    const variantClasses = {
      default: 'border border-gray-200 rounded-lg overflow-hidden',
      bordered: 'border border-gray-200 rounded-lg',
      separated: 'space-y-2',
      minimal: ''
    };

    return `${baseClasses} ${variantClasses[variant]}`;
  };

  const getItemClasses = (index: number) => {
    const baseClasses = '';
    
    const variantClasses = {
      default: index > 0 ? 'border-t border-gray-200' : '',
      bordered: 'border border-gray-200 rounded-lg overflow-hidden',
      separated: 'border border-gray-200 rounded-lg overflow-hidden',
      minimal: index > 0 ? 'border-t border-gray-200' : ''
    };

    return `${baseClasses} ${variantClasses[variant]}`;
  };

  const getHeaderClasses = (item: AccordionItem, isExpanded: boolean) => {
    const baseClasses = `
      w-full flex items-center justify-between text-left bg-transparent border-0 cursor-pointer
      font-sans font-medium transition-colors duration-200
      ${headerSizeClasses[size]} ${sizeClasses[size]}
    `;

    const stateClasses = item.disabled
      ? 'text-gray-400 cursor-not-allowed bg-gray-50'
      : isExpanded
        ? 'text-gray-900 bg-gray-50'
        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900';

    return `${baseClasses} ${stateClasses}`;
  };

  const renderAccordionItem = (item: AccordionItem, index: number) => {
    const isExpanded = expandedIds.includes(item.id);

    return (
      <div key={item.id} className={getItemClasses(index)}>
        <button
          className={getHeaderClasses(item, isExpanded)}
          onClick={() => !item.disabled && handleToggle(item.id)}
          aria-expanded={isExpanded}
          aria-controls={`accordion-content-${item.id}`}
          disabled={item.disabled}
        >
          <div className="flex items-center gap-3 flex-1">
            {item.icon && (
              <span className="flex-shrink-0">{item.icon}</span>
            )}
            <span className="flex-1 text-left">{item.title}</span>
            {item.badge && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {item.badge}
              </span>
            )}
          </div>
          <div className={`
            transition-transform duration-200 flex-shrink-0 ml-2
            ${isExpanded ? 'rotate-180' : 'rotate-0'}
            ${item.disabled ? 'text-gray-400' : 'text-gray-500'}
          `}>
            ▼
          </div>
        </button>
        
        <div
          id={`accordion-content-${item.id}`}
          className={`
            overflow-hidden transition-all duration-${animationDuration} ease-in-out
            ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
          `}
          aria-hidden={!isExpanded}
        >
          <div className={`${contentSizeClasses[size]} ${sizeClasses[size]} text-gray-600`}>
            {item.content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={getContainerClasses()} {...props}>
      {items.map((item, index) => renderAccordionItem(item, index))}
    </div>
  );
};
