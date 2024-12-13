# THF Labs React Component Library

A React component library designed for Texas High Frequency API routing services. This library provides reusable components and services for displaying and managing financial data.

## Installation

```bash
npm install thf-labs
```

## API Configuration

⚠️ **Important**: An API key is required to use any of the THF Labs services. Components can be used independently without an API key.

Before using any services (like DealerGammaService), configure the ApiClient with your API key:

```typescript
import { ApiClient } from 'thf-labs';

// Initialize the API client with your key
const apiClient = ApiClient.getInstance();

// Best practice: Set this in your app's entry point (e.g., App.js or index.js)
// Make sure to use environment variables for the API key
apiClient.setApiKey(process.env.REACT_APP_THF_API_KEY);
```

### Environment Variables

For security, we recommend storing your API key in environment variables:

1. Create a `.env` file in your project root:
```
REACT_APP_THF_API_KEY=your-api-key
```

2. Add `.env` to your `.gitignore` file:
```
# .gitignore
.env
.env.local
```

3. Create a `.env.example` file:
```
REACT_APP_THF_API_KEY=your-api-key-here
```

## Components

### THFtable

A flexible and feature-rich table component that supports sorting, pagination, and customizable styling.

#### Features

- Column sorting (ascending/descending)
- Pagination with customizable page size
- Responsive design with horizontal scrolling
- Error state handling
- Loading state display
- TypeScript support
- Customizable styling

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| data | array | Yes | - | Array of objects to display in the table |
| columns | Column[] | Yes | - | Array of column definitions |
| pageSize | number | No | 10 | Number of rows per page |
| title | string | No | - | Optional table title |

#### Column Definition

```typescript
interface Column {
  key: string;          // Unique identifier for the column
  header: string;       // Display text for column header
  sortable?: boolean;   // Enable sorting for this column
}
```

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

## Services

### DealerGammaService

A singleton service for fetching and transforming dealer gamma data. **Requires API key configuration** (see [API Configuration](#api-configuration) section above).

#### Features

- Singleton pattern for consistent state management
- Built-in data transformation for THFtable compatibility
- TypeScript support with proper typing
- Integrated with ApiClient for API communication

#### Usage

```typescript
import { DealerGammaService, THFtable } from 'thf-labs';

const GammaDataComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dealerGammaService = DealerGammaService.getInstance();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await dealerGammaService.getGammaData('SPY');
        const formattedData = dealerGammaService.transformGammaDataForTable(response);
        setTableData(formattedData);
        setError(null);
      } catch (error) {
        setError(error.message || 'Failed to fetch gamma data');
        setTableData([]);
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <THFtable data={tableData} columns={columns} />;
};
```

#### API Methods

##### `getInstance()`
Returns the singleton instance of DealerGammaService.

```typescript
const service = DealerGammaService.getInstance();
```

##### `getGammaData(symbol: string)`
Fetches dealer gamma data for a specific symbol.

```typescript
const data = await service.getGammaData('SPY');
```

##### `transformGammaDataForTable(data: DealerGammaResponse)`
Transforms the API response into a format compatible with THFtable.

```typescript
const tableData = service.transformGammaDataForTable(data);
```

## CSS Customization

The library provides default styling that can be customized using CSS classes:

### THFtable Classes

- `.thf-table-container` - Main table container
- `.thf-table` - Table element
- `.thf-table-title` - Table title
- `.thf-table th.sortable` - Sortable column headers
- `.thf-table th.sorted-asc` - Ascending sorted column
- `.thf-table th.sorted-desc` - Descending sorted column
- `.sort-indicator` - Sort direction indicator
- `.loading-container` - Loading state container
- `.loading-spinner` - Loading spinner animation
- `.error-container` - Error state container
- `.error-message` - Error message styling

## TypeScript Support

This library is written in TypeScript and includes type definitions. No additional @types packages are required.

## License

ISC
