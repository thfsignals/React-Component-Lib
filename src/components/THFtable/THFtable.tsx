import * as React from "react";
import { useState, useMemo } from "react";
import "./THFtable.css";

// Column configuration for table headers
export interface Column {
  key: string;          // Unique identifier for the column
  header: string;       // Display text for column header
  sortable?: boolean;   // Enable sorting for this column
}

// Main table component props
export interface TableProps {
  data: any[];           // Array of data objects to display
  columns: Column[];     // Column definitions
  pageSize?: number;     // Number of rows per page (default: 10)
  title?: string;        // Optional table title
}

const THFtable: React.FC<TableProps> = ({ 
  data = [], 
  columns, 
  pageSize = 10,
  title 
}) => {
  // State for pagination and sorting
  //const [currentPage, setCurrentPage] = useState(1);
  //const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Sort data based on current sort configuration
  /*
  const sortedData = useMemo(() => {
    if (!sortConfig || !data) return data || [];
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue === undefined || bValue === undefined) return 0;
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig?.key, sortConfig?.direction]);
  */

  // Calculate pagination values
  //const totalPages = Math.ceil((sortedData?.length || 0) / pageSize);
  //const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data //sortedData?.slice(startIndex, startIndex + pageSize) || [];

  // Handle column sort clicks
  const handleSort = (key: string) => {
    /*
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
    */
  };

  return (
    <div className="thf-table-container">
      {title && <h2 className="thf-table-title">{title}</h2>}
      <table className="thf-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                onClick={() => column.sortable && handleSort(column.key)}
                className={column.sortable ? 'sortable' : ''}
              >
                {column.header}
                {/* sortConfig?.key === column.key && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                ) */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={`${rowIndex}-${column.key}`}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/*}
      {totalPages > 1 && (
        <div className="thf-table-pagination">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="thf-pagination-button"
          >
            Previous
          </button>
          <span className="thf-pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="thf-pagination-button"
          >
            Next
          </button>
        </div>
      )}
      */}
    </div>
  );
};

export default THFtable;
