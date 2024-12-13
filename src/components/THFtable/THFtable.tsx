import * as React from "react";
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

interface TableState {
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  currentPage: number;
}

class THFtable extends React.Component<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props);
    this.state = {
      sortConfig: null,
      currentPage: 1
    };
  }

  handleSort = (key: string) => {
    this.setState((prevState) => {
      if (!prevState.sortConfig || prevState.sortConfig.key !== key) {
        return { ...prevState, sortConfig: { key, direction: 'asc' } };
      }
      if (prevState.sortConfig.direction === 'asc') {
        return { ...prevState, sortConfig: { key, direction: 'desc' } };
      }
      return { ...prevState, sortConfig: null };
    });
  };

  getSortedData = () => {
    const { data } = this.props;
    const { sortConfig } = this.state;

    if (!sortConfig || !data || !Array.isArray(data)) return data || [];

    try {
      return [...data].sort((a, b) => {
        if (!a || !b) return 0;

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === undefined || bValue === undefined) return 0;

        // Handle different data types appropriately
        if (typeof aValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        // Handle numeric values
        const aNum = Number(aValue);
        const bNum = Number(bValue);

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }

        // Fallback for other types
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    } catch (error) {
      console.warn('Error sorting data:', error);
      return data;
    }
  };

  render() {
    const { columns, title, pageSize = 10 } = this.props;
    const { sortConfig, currentPage } = this.state;
    const sortedData = this.getSortedData();
    
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(sortedData.length / pageSize);

    return (
      <div className="thf-table-container">
        {title && <h2 className="thf-table-title">{title}</h2>}
        <table className="thf-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable && this.handleSort(column.key)}
                  className={`${column.sortable ? 'sortable' : ''} ${
                    sortConfig?.key === column.key ? `sorted-${sortConfig.direction}` : ''
                  }`}
                >
                  {column.header}
                  {sortConfig?.key === column.key && (
                    <span className="sort-indicator">
                      {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
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

        {totalPages > 1 && (
          <div className="thf-table-pagination">
            <button
              onClick={() => this.setState(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
              disabled={currentPage === 1}
              className="thf-pagination-button"
            >
              Previous
            </button>
            <span className="thf-pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => this.setState(prev => ({ ...prev, currentPage: Math.min(totalPages, prev.currentPage + 1) }))}
              disabled={currentPage === totalPages}
              className="thf-pagination-button"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default THFtable;
