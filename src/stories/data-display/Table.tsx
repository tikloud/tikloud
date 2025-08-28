import { useState, useMemo } from 'react';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}

export interface TableProps<T = Record<string, unknown>> {
  /** Table columns configuration */
  columns: TableColumn<T>[];
  /** Table data source */
  dataSource: T[];
  /** Row key field name */
  rowKey?: string | ((record: T) => string);
  /** Loading state */
  loading?: boolean;
  /** Table size */
  size?: 'small' | 'medium' | 'large';
  /** Show header */
  showHeader?: boolean;
  /** Show borders */
  bordered?: boolean;
  /** Striped rows */
  striped?: boolean;
  /** Hoverable rows */
  hoverable?: boolean;
  /** Enable row selection */
  rowSelection?: {
    type?: 'checkbox' | 'radio';
    selectedRowKeys?: string[];
    onChange?: (selectedRowKeys: string[], selectedRows: T[]) => void;
    getCheckboxProps?: (record: T) => { disabled?: boolean };
  };
  /** Pagination configuration */
  pagination?: {
    current?: number;
    pageSize?: number;
    total?: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    onChange?: (page: number, pageSize: number) => void;
  } | false;
  /** Empty state content */
  emptyText?: React.ReactNode;
  /** Scroll configuration */
  scroll?: {
    x?: number | string;
    y?: number | string;
  };
  /** Row click handler */
  onRow?: (record: T, index: number) => {
    onClick?: (event: React.MouseEvent) => void;
    onDoubleClick?: (event: React.MouseEvent) => void;
    onContextMenu?: (event: React.MouseEvent) => void;
  };
}

/** Table component for displaying lists of resources */
export const Table = <T extends Record<string, unknown>>({
  columns,
  dataSource,
  rowKey = 'id',
  loading = false,
  size = 'medium',
  showHeader = true,
  bordered = false,
  striped = false,
  hoverable = true,
  rowSelection,
  emptyText = 'No data',
  scroll,
  onRow,
  ...props
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    const key = record[rowKey as keyof T];
    return (key as string) || index.toString();
  };

  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable) return;

    const key = column.dataIndex || column.key;
    let direction: 'asc' | 'desc' = 'asc';

    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return dataSource;

    return [...dataSource].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (String(aValue) < String(bValue)) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (String(aValue) > String(bValue)) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [dataSource, sortConfig]);

  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  const cellPaddingClasses = {
    small: 'px-2 py-1',
    medium: 'px-4 py-2',
    large: 'px-6 py-3'
  };

  const tableClasses = `
    w-full border-collapse bg-white font-sans
    ${bordered ? 'border border-gray-200' : ''}
    ${sizeClasses[size]}
  `.trim();

  const renderCell = (column: TableColumn<T>, record: T, index: number): React.ReactNode => {
    const value = column.dataIndex ? record[column.dataIndex as keyof T] : record[column.key as keyof T];
    
    if (column.render) {
      return column.render(value, record, index);
    }
    
    return String(value || '');
  };

  const getSortIcon = (column: TableColumn<T>) => {
    if (!column.sortable) return null;

    const key = column.dataIndex || column.key;
    const isActive = sortConfig?.key === key;
    
    return (
      <span className="ml-1 inline-flex flex-col">
        <span className={`text-xs leading-none ${
          isActive && sortConfig.direction === 'asc' ? 'text-blue-600' : 'text-gray-400'
        }`}>▲</span>
        <span className={`text-xs leading-none ${
          isActive && sortConfig.direction === 'desc' ? 'text-blue-600' : 'text-gray-400'
        }`}>▼</span>
      </span>
    );
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-100 rounded mb-1"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {scroll ? (
        <div 
          className="overflow-auto"
          style={{ 
            maxHeight: scroll.y, 
            maxWidth: scroll.x 
          }}
        >
          <table className={tableClasses} {...props}>
            {showHeader && (
              <thead className="bg-gray-50">
                <tr>
                  {rowSelection && (
                    <th className={`${cellPaddingClasses[size]} border-b border-gray-200 text-left font-medium text-gray-900`}>
                      {rowSelection.type !== 'radio' && (
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          onChange={(e) => {
                            const allKeys = sortedData.map((item, index) => getRowKey(item, index));
                            rowSelection.onChange?.(
                              e.target.checked ? allKeys : [],
                              e.target.checked ? sortedData : []
                            );
                          }}
                        />
                      )}
                    </th>
                  )}
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`
                        ${cellPaddingClasses[size]} border-b border-gray-200 font-medium text-gray-900
                        ${column.align === 'center' ? 'text-center' : ''}
                        ${column.align === 'right' ? 'text-right' : 'text-left'}
                        ${column.sortable ? 'cursor-pointer hover:bg-gray-100 select-none' : ''}
                      `}
                      style={{ width: column.width }}
                      onClick={() => handleSort(column)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{column.title}</span>
                        {getSortIcon(column)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {sortedData.length === 0 ? (
                <tr>
                  <td 
                    colSpan={columns.length + (rowSelection ? 1 : 0)}
                    className={`${cellPaddingClasses[size]} text-center text-gray-500 border-b border-gray-200`}
                  >
                    {emptyText}
                  </td>
                </tr>
              ) : (
                sortedData.map((record, index) => {
                  const key = getRowKey(record, index);
                  const rowProps = onRow?.(record, index) || {};
                  const isSelected = rowSelection?.selectedRowKeys?.includes(key);
                  
                  return (
                    <tr
                      key={key}
                      className={`
                        ${striped && index % 2 === 1 ? 'bg-gray-50' : ''}
                        ${hoverable ? 'hover:bg-gray-50' : ''}
                        ${isSelected ? 'bg-blue-50' : ''}
                        transition-colors duration-150
                      `}
                      {...rowProps}
                    >
                      {rowSelection && (
                        <td className={`${cellPaddingClasses[size]} border-b border-gray-200`}>
                          <input
                            type={rowSelection.type || 'checkbox'}
                            name={rowSelection.type === 'radio' ? 'table-radio' : undefined}
                            className="rounded border-gray-300"
                            checked={isSelected}
                            disabled={rowSelection.getCheckboxProps?.(record)?.disabled}
                            onChange={(e) => {
                              const selectedKeys = rowSelection.selectedRowKeys || [];

                              if (rowSelection.type === 'radio') {
                                rowSelection.onChange?.([key], [record]);
                              } else {
                                const newSelectedKeys = e.target.checked
                                  ? [...selectedKeys, key]
                                  : selectedKeys.filter(k => k !== key);
                                const newSelectedRows = sortedData.filter((item, i) => 
                                  newSelectedKeys.includes(getRowKey(item, i))
                                );
                                rowSelection.onChange?.(newSelectedKeys, newSelectedRows);
                              }
                            }}
                          />
                        </td>
                      )}
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className={`
                            ${cellPaddingClasses[size]} border-b border-gray-200
                            ${column.align === 'center' ? 'text-center' : ''}
                            ${column.align === 'right' ? 'text-right' : 'text-left'}
                          `}
                        >
                          {renderCell(column, record, index)}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <table className={tableClasses} {...props}>
          {showHeader && (
            <thead className="bg-gray-50">
              <tr>
                {rowSelection && (
                  <th className={`${cellPaddingClasses[size]} border-b border-gray-200 text-left font-medium text-gray-900`}>
                    {rowSelection.type !== 'radio' && (
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        onChange={(e) => {
                          const allKeys = sortedData.map((item, index) => getRowKey(item, index));
                          rowSelection.onChange?.(
                            e.target.checked ? allKeys : [],
                            e.target.checked ? sortedData : []
                          );
                        }}
                      />
                    )}
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`
                      ${cellPaddingClasses[size]} border-b border-gray-200 font-medium text-gray-900
                      ${column.align === 'center' ? 'text-center' : ''}
                      ${column.align === 'right' ? 'text-right' : 'text-left'}
                      ${column.sortable ? 'cursor-pointer hover:bg-gray-100 select-none' : ''}
                    `}
                    style={{ width: column.width }}
                    onClick={() => handleSort(column)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{column.title}</span>
                      {getSortIcon(column)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (rowSelection ? 1 : 0)}
                  className={`${cellPaddingClasses[size]} text-center text-gray-500 border-b border-gray-200`}
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              sortedData.map((record, index) => {
                const key = getRowKey(record, index);
                const rowProps = onRow?.(record, index) || {};
                const isSelected = rowSelection?.selectedRowKeys?.includes(key);
                
                return (
                  <tr
                    key={key}
                    className={`
                      ${striped && index % 2 === 1 ? 'bg-gray-50' : ''}
                      ${hoverable ? 'hover:bg-gray-50' : ''}
                      ${isSelected ? 'bg-blue-50' : ''}
                      transition-colors duration-150
                    `}
                    {...rowProps}
                  >
                    {rowSelection && (
                      <td className={`${cellPaddingClasses[size]} border-b border-gray-200`}>
                        <input
                          type={rowSelection.type || 'checkbox'}
                          name={rowSelection.type === 'radio' ? 'table-radio' : undefined}
                          className="rounded border-gray-300"
                          checked={isSelected}
                          disabled={rowSelection.getCheckboxProps?.(record)?.disabled}
                          onChange={(e) => {
                            const selectedKeys = rowSelection.selectedRowKeys || [];

                            if (rowSelection.type === 'radio') {
                              rowSelection.onChange?.([key], [record]);
                            } else {
                              const newSelectedKeys = e.target.checked
                                ? [...selectedKeys, key]
                                : selectedKeys.filter(k => k !== key);
                              const newSelectedRows = sortedData.filter((item, i) => 
                                newSelectedKeys.includes(getRowKey(item, i))
                              );
                              rowSelection.onChange?.(newSelectedKeys, newSelectedRows);
                            }
                          }}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`
                          ${cellPaddingClasses[size]} border-b border-gray-200
                          ${column.align === 'center' ? 'text-center' : ''}
                          ${column.align === 'right' ? 'text-right' : 'text-left'}
                        `}
                      >
                        {renderCell(column, record, index)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
