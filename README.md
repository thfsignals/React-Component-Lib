# THF Labs React Component Library

A React component library designed for Texas High Frequency API routing services. This library provides reusable components and services for displaying and managing financial data.

## Installation

```bash
npm install thf-labs
```

## Components

### THFtable

A flexible and feature-rich table component that supports pagination, sorting, and customizable styling.

#### Features

- Pagination with customizable page size
- Column sorting
- Responsive design with horizontal scrolling
- Customizable styling
- TypeScript support

#### Basic Usage

```tsx
import { THFtable } from 'thf-labs';

const MyComponent = () => {
  const columns = [
    { key: 'symbol', header: 'Symbol', sortable: true },
    { key: 'strike', header: 'Strike', sortable: true },
    { key: 'gamma', header: 'Gamma', sortable: true }
  ];

  const data = [
    { symbol: 'SPY', strike: 432, gamma: -1 },
    { symbol: 'SPY', strike: 440, gamma: -1 },
    // ... more data
  ];

  return (
    <THFtable 
      data={data}
      columns={columns}
      pageSize={15}
      title="Options Data"
    />
  );
};
```

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| data | array | Yes | - | Array of objects to display in the table |
| columns | Column[] | Yes | - | Array of column definitions |
| pageSize | number | No | 10 | Number of rows per page |
| title | string | No | - | Table title |

#### Column Definition

```typescript
interface Column {
  key: string;          // Key to access data
  header: string;       // Column header text
  sortable?: boolean;   // Whether column is sortable
}
```

## API Services

The library includes a set of services for interacting with the THF API.

### DealerGammaService

Service for fetching and managing dealer gamma data.

#### Usage with THFtable

```typescript
import { DealerGammaService, THFtable } from 'thf-labs';

const GammaDataComponent = () => {
  const [tableData, setTableData] = useState([]);
  const dealerGammaService = DealerGammaService.getInstance();

  // Optional: Set API key if required
  dealerGammaService.setApiKey('your-api-key');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dealerGammaService.getGammaData('SPY');
        const formattedData = dealerGammaService.transformGammaDataForTable(response);
        setTableData(formattedData);
      } catch (error) {
        console.error('Failed to fetch gamma data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { key: 'symbol', header: 'Symbol', sortable: true },
    { key: 'zerogex', header: 'Zero GEX', sortable: true },
    { key: 'strike', header: 'Strike', sortable: true },
    { key: 'gamma', header: 'Gamma', sortable: true }
  ];

  return <THFtable data={tableData} columns={columns} />;
};
```

### API Configuration

The API services can be configured through the `API_CONFIG` object:

```typescript
import { ApiClient } from 'thf-labs';

const apiClient = ApiClient.getInstance();

// Set API key
apiClient.setApiKey('your-api-key');
```

## Styling

The THFtable component comes with default styling that can be customized through CSS classes:

```css
/* Example custom styling */
.thf-table {
  /* Your custom table styles */
}

.thf-table th {
  /* Your custom header styles */
}

.thf-table td {
  /* Your custom cell styles */
}

.thf-pagination-button {
  /* Your custom pagination button styles */
}
```

## Error Handling

The API services include built-in error handling:

```typescript
try {
  const data = await dealerGammaService.getGammaData('SPY');
  // Handle success
} catch (error) {
  if (error instanceof ApiError) {
    // Handle API-specific error
    console.error(`API Error: ${error.status} - ${error.statusText}`);
  } else {
    // Handle other errors
    console.error('An unexpected error occurred:', error);
  }
}
```

## License

ISC License - see LICENSE file for details.
