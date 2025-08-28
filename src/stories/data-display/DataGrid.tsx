import { useState, useMemo } from 'react';
import { Table, TableColumn, TableProps } from './Table';
import { InputField } from '../form-controls/InputField';
import { Dropdown } from '../form-controls/Dropdown';
import { Button } from '../form-controls/Button';

export interface DataGridColumn<T = Record<string, unknown>> extends TableColumn<T> {
  /** Enable filtering for this column */
  filterable?: boolean;
  /** Filter type */
  filterType?: 'text' | 'select' | 'number' | 'date';
  /** Options for select filter */
  filterOptions?: { label: string; value: string | number }[];
}

export interface DataGridProps<T = Record<string, unknown>> extends Omit<TableProps<T>, 'columns'> {
  /** Enhanced columns with filtering capabilities */
  columns: DataGridColumn<T>[];
  /** Enable global search */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Enable pagination */
  enablePagination?: boolean;
  /** Items per page options */
  pageSizeOptions?: number[];
  /** Default page size */
  defaultPageSize?: number;
  /** Enable export functionality */
  exportable?: boolean;
  /** Export formats */
  exportFormats?: ('csv' | 'excel' | 'json')[];
  /** Custom toolbar actions */
  toolbarActions?: React.ReactNode;
}

/** Advanced data grid with filtering, sorting, pagination, and export capabilities */
export const DataGrid = <T extends Record<string, unknown>>({
  columns,
  dataSource,
  searchable = true,
  searchPlaceholder = 'Search...',
  enablePagination = true,
  pageSizeOptions = [10, 25, 50, 100],
  defaultPageSize = 25,
  exportable = false,
  exportFormats = ['csv', 'excel'],
  toolbarActions,
  ...tableProps
}: DataGridProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Filter and search data
  const filteredData = useMemo(() => {
    let filtered = [...dataSource];

    // Apply column filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value != null) {
        filtered = filtered.filter((item) => {
          const itemValue = item[key as keyof T];
          if (typeof value === 'string') {
            return String(itemValue).toLowerCase().includes(value.toLowerCase());
          }
          return itemValue === value;
        });
      }
    });

    // Apply global search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchLower)
        )
      );
    }

    return filtered;
  }, [dataSource, filters, searchTerm]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!enablePagination) return filteredData;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize, enablePagination]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleFilterChange = (columnKey: string, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [columnKey]: value
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  const exportData = (format: 'csv' | 'excel' | 'json') => {
    const dataToExport = filteredData;
    
    switch (format) {
      case 'csv':
        exportToCsv(dataToExport, columns);
        break;
      case 'json':
        exportToJson(dataToExport);
        break;
      case 'excel':
        // In a real implementation, you'd use a library like xlsx
        console.log('Excel export would be implemented with a library like xlsx');
        break;
    }
  };

  const exportToCsv = (data: T[], columns: DataGridColumn<T>[]) => {
    const headers = columns.map(col => col.title).join(',');
    const rows = data.map(item => 
      columns.map(col => {
        const value = col.dataIndex ? item[col.dataIndex as keyof T] : item[col.key as keyof T];
        return `"${String(value || '').replace(/"/g, '""')}"`;
      }).join(',')
    );
    
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data-export.csv';
    link.click();
  };

  const exportToJson = (data: T[]) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data-export.json';
    link.click();
  };

  return (
    <div className="w-full space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          {searchable && (
            <div className="w-full sm:w-64">
              <InputField
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(value) => {
                  setSearchTerm(value);
                  setCurrentPage(1);
                }}
                size="small"
              />
            </div>
          )}
          
          {/* Column Filters */}
          {columns.some(col => col.filterable) && (
            <div className="flex flex-wrap gap-2">
              {columns
                .filter(col => col.filterable)
                .map(column => (
                  <div key={column.key} className="min-w-32">
                    {column.filterType === 'select' && column.filterOptions ? (
                      <Dropdown
                        placeholder={`Filter ${column.title}`}
                        value={String(filters[column.key] || '')}
                        onChange={(value) => handleFilterChange(column.key, value)}
                        size="small"
                        options={[
                          { label: 'All', value: '' },
                          ...column.filterOptions.map(opt => ({
                            label: opt.label,
                            value: String(opt.value)
                          }))
                        ]}
                      />
                    ) : (
                      <InputField
                        type={column.filterType === 'number' ? 'number' : 'text'}
                        placeholder={`Filter ${column.title}`}
                        value={String(filters[column.key] || '')}
                        onChange={(value) => handleFilterChange(column.key, value)}
                        size="small"
                      />
                    )}
                  </div>
                ))}
              
              {Object.keys(filters).length > 0 || searchTerm ? (
                <Button
                  size="small"
                  onClick={clearFilters}
                  label="Clear Filters"
                />
              ) : null}
            </div>
          )}
        </div>

        <div className="flex gap-2 items-center">
          {toolbarActions}
          
          {exportable && (
            <div className="flex gap-1">
              {exportFormats.map(format => (
                <Button
                  key={format}
                  size="small"
                  onClick={() => exportData(format)}
                  label={`Export ${format.toUpperCase()}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Info */}
      <div className="text-sm text-gray-600">
        Showing {paginatedData.length} of {filteredData.length} results
        {filteredData.length !== dataSource.length && ` (filtered from ${dataSource.length} total)`}
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={paginatedData}
        {...tableProps}
      />

      {/* Pagination */}
      {enablePagination && filteredData.length > pageSize && (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <Dropdown
              value={String(pageSize)}
              onChange={(value) => {
                setPageSize(Number(value));
                setCurrentPage(1);
              }}
              size="small"
              options={pageSizeOptions.map(size => ({
                label: String(size),
                value: String(size)
              }))}
            />
          </div>

          <div className="flex items-center gap-2">
            {currentPage > 1 && (
              <>
                <Button
                  size="small"
                  onClick={() => setCurrentPage(1)}
                  label="First"
                />
                <Button
                  size="small"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  label="Previous"
                />
              </>
            )}
            
            <span className="text-sm text-gray-700 px-2">
              Page {currentPage} of {totalPages}
            </span>
            
            {currentPage < totalPages && (
              <>
                <Button
                  size="small"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  label="Next"
                />
                <Button
                  size="small"
                  onClick={() => setCurrentPage(totalPages)}
                  label="Last"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
