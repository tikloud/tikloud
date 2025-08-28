import React, { useState } from 'react';

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: TreeNode[];
  expanded?: boolean;
  selectable?: boolean;
  disabled?: boolean;
  metadata?: React.ReactNode;
}

export interface TreeProps {
  /** Tree data */
  data: TreeNode[];
  /** Show lines connecting nodes */
  showLines?: boolean;
  /** Show expand/collapse icons */
  showExpandIcon?: boolean;
  /** Enable node selection */
  selectable?: boolean;
  /** Multiple selection */
  multiple?: boolean;
  /** Selected node IDs */
  selectedKeys?: string[];
  /** Expanded node IDs */
  expandedKeys?: string[];
  /** Default expanded state */
  defaultExpandAll?: boolean;
  /** Node click handler */
  onSelect?: (selectedKeys: string[], node: TreeNode) => void;
  /** Node expand handler */
  onExpand?: (expandedKeys: string[], node: TreeNode) => void;
  /** Tree size */
  size?: 'small' | 'medium' | 'large';
  /** Indent size for nested levels */
  indent?: number;
}

/** Tree component for displaying hierarchical data */
export const Tree = ({
  data,
  showLines = false,
  showExpandIcon = true,
  selectable = false,
  multiple = false,
  selectedKeys = [],
  expandedKeys,
  defaultExpandAll = false,
  onSelect,
  onExpand,
  size = 'medium',
  indent = 24,
  ...props
}: TreeProps) => {
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(() => {
    if (expandedKeys) return expandedKeys;
    if (defaultExpandAll) {
      const allKeys: string[] = [];
      const collectKeys = (nodes: TreeNode[]) => {
        nodes.forEach(node => {
          if (node.children && node.children.length > 0) {
            allKeys.push(node.id);
            collectKeys(node.children);
          }
        });
      };
      collectKeys(data);
      return allKeys;
    }
    return [];
  });

  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(selectedKeys);

  const currentExpandedKeys = expandedKeys || internalExpandedKeys;
  const currentSelectedKeys = selectedKeys.length > 0 ? selectedKeys : internalSelectedKeys;

  const handleExpand = (node: TreeNode) => {
    const isExpanded = currentExpandedKeys.includes(node.id);
    const newExpandedKeys = isExpanded
      ? currentExpandedKeys.filter(key => key !== node.id)
      : [...currentExpandedKeys, node.id];

    if (!expandedKeys) {
      setInternalExpandedKeys(newExpandedKeys);
    }

    onExpand?.(newExpandedKeys, node);
  };

  const handleSelect = (node: TreeNode) => {
    if (!selectable || node.disabled) return;

    let newSelectedKeys: string[];

    if (multiple) {
      const isSelected = currentSelectedKeys.includes(node.id);
      newSelectedKeys = isSelected
        ? currentSelectedKeys.filter(key => key !== node.id)
        : [...currentSelectedKeys, node.id];
    } else {
      newSelectedKeys = currentSelectedKeys.includes(node.id) ? [] : [node.id];
    }

    if (selectedKeys.length === 0) {
      setInternalSelectedKeys(newSelectedKeys);
    }

    onSelect?.(newSelectedKeys, node);
  };

  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const paddingClasses = {
    small: 'py-1 px-2',
    medium: 'py-2 px-3',
    large: 'py-3 px-4'
  };

  const renderNode = (node: TreeNode, level: number = 0): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = currentExpandedKeys.includes(node.id);
    const isSelected = currentSelectedKeys.includes(node.id);

    const nodeClasses = `
      flex items-center gap-2 cursor-pointer
      ${paddingClasses[size]}
      ${sizeClasses[size]}
      ${isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}
      ${node.disabled ? 'opacity-50 cursor-not-allowed' : ''}
      transition-colors duration-150
    `.trim();

    return (
      <div key={node.id}>
        <div
          className={nodeClasses}
          style={{ paddingLeft: level * indent + (paddingClasses[size].includes('px-2') ? 8 : paddingClasses[size].includes('px-3') ? 12 : 16) }}
          onClick={() => !node.disabled && handleSelect(node)}
        >
          {/* Connection lines */}
          {showLines && level > 0 && (
            <div className="absolute left-0 top-0 h-full w-px bg-gray-300" 
                 style={{ left: level * indent - 12 }} />
          )}

          {/* Expand/Collapse Icon */}
          {hasChildren && showExpandIcon ? (
            <button
              className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-gray-500 hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                handleExpand(node);
              }}
              disabled={node.disabled}
            >
              {isExpanded ? (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ) : (
            <div className="w-4 h-4 flex-shrink-0" />
          )}

          {/* Node Icon */}
          {node.icon && (
            <div className="flex-shrink-0 text-gray-600">
              {node.icon}
            </div>
          )}

          {/* Node Label */}
          <div className="flex-1 min-w-0">
            <div className="truncate">
              {node.label}
            </div>
            {node.metadata && (
              <div className="text-xs text-gray-500 mt-1">
                {node.metadata}
              </div>
            )}
          </div>

          {/* Selection Checkbox */}
          {selectable && multiple && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleSelect(node)}
              onClick={(e) => e.stopPropagation()}
              disabled={node.disabled}
              className="rounded border-gray-300"
            />
          )}
        </div>

        {/* Children Nodes */}
        {hasChildren && isExpanded && (
          <div className="relative">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden" {...props}>
      <div className="relative">
        {data.map(node => renderNode(node))}
      </div>
    </div>
  );
};
