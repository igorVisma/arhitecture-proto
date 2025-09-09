# @repo/api-queries

TanStack Query hooks for API clients using `react-query-kit`.

## Installation

This package is part of the monorepo and should be installed as a workspace dependency.

## Usage

### Basic Hook Creation

```typescript
import { QueryClient } from '@tanstack/react-query';
import { VismaSignApiClient, ShareLinkApiClient } from '@repo/api-clients';
import { createVismaSignHooks, createShareLinkHooks } from '@repo/api-queries';

// Create API clients
const vismaSignClient = new VismaSignApiClient({
  baseURL: 'https://visma-sign-api.example.com'
});

const shareLinkClient = new ShareLinkApiClient({
  baseURL: 'https://share-link-api.example.com'
});

// Create query client
const queryClient = new QueryClient();

// Create hooks
const vismaSignHooks = createVismaSignHooks(vismaSignClient, queryClient);
const shareLinkHooks = createShareLinkHooks(shareLinkClient, queryClient);
```

### Using the Hooks

#### Visma Sign API Hooks

```typescript
// In your component
function ProductsList() {
  // Fetch products
  const { data, error, isLoading } = vismaSignHooks.useGetProducts({});
  
  // Create product mutation
  const createProductMutation = vismaSignHooks.useMutateProduct();
  
  const handleCreateProduct = () => {
    createProductMutation.mutate({
      name: 'New Product',
      description: 'Product description',
      price: 99.99,
      category: 'electronics'
    });
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <button onClick={handleCreateProduct}>
        {createProductMutation.isPending ? 'Creating...' : 'Create Product'}
      </button>
      
      <ul>
        {data?.products.map(product => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### Share Link API Hooks

```typescript
// In your component
function OrdersList() {
  // Fetch orders
  const { data, error, isLoading } = shareLinkHooks.useGetOrders({});
  
  // Create order mutation
  const createOrderMutation = shareLinkHooks.useMutateOrder();
  
  const handleCreateOrder = () => {
    createOrderMutation.mutate({
      customerId: 123,
      items: [
        { productId: 1, quantity: 2, unitPrice: 29.99 }
      ],
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'US'
      }
    });
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <button onClick={handleCreateOrder}>
        {createOrderMutation.isPending ? 'Creating...' : 'Create Order'}
      </button>
      
      <ul>
        {data?.orders.map(order => (
          <li key={order.id}>Order #{order.id} - ${order.total}</li>
        ))}
      </ul>
    </div>
  );
}
```

## API Reference

### Hook Creators

#### `createVismaSignHooks(client, queryClient)`

Creates hooks for the Visma Sign API.

**Parameters:**
- `client`: `VismaSignApiClient` - The API client instance
- `queryClient`: `QueryClient` - TanStack Query client instance

**Returns:**
- `useGetProducts`: Query hook for fetching products
- `useMutateProduct`: Mutation hook for creating products

#### `createShareLinkHooks(client, queryClient)`

Creates hooks for the Share Link API.

**Parameters:**
- `client`: `ShareLinkApiClient` - The API client instance
- `queryClient`: `QueryClient` - TanStack Query client instance

**Returns:**
- `useGetOrders`: Query hook for fetching orders
- `useMutateOrder`: Mutation hook for creating orders

### Utilities

#### `unwrapResult<TData, TError>(result: ApiResult<TData, TError>): TData`

Unwraps an API result by either returning the data or throwing the error.

**Parameters:**
- `result`: `ApiResult<TData, TError>` - The API result to unwrap

**Returns:** The data from the API result
**Throws:** The error from the API result if present

## Type Exports

The package re-exports commonly used types:

```typescript
import type {
  // TanStack Query types
  UseQueryResult,
  UseMutationResult,
  
  // API types
  ApiResult,
  
  // Visma Sign API types
  CreateProductRequest,
  ProductResponse,
  ProductsListResponse,
  VismaSignApiError,
  
  // Share Link API types
  CreateOrderRequest,
  OrderResponse,
  OrdersListResponse,
  ShareLinkApiError
} from '@repo/api-queries';
```

## Tree Shaking

Import specific hooks for optimal bundle size:

```tsx
// Import specific hook creators
import { createVismaSignHooks } from '@repo/api-queries/visma-sign';
import { createShareLinkHooks } from '@repo/api-queries/share-link';

// Import utilities
import { unwrapResult } from '@repo/api-queries/utils';
```

## Features

- ✅ **Type Safe**: Full TypeScript support with proper error and response types
- ✅ **Auto-refetch**: Mutations automatically trigger fresh data fetching
- ✅ **Error Handling**: Proper error handling with structured error types
- ✅ **React Query Kit**: Built on modern `react-query-kit` for better DX
- ✅ **Factory Pattern**: Flexible hook creation with dependency injection
- ✅ **Optimistic Updates**: Built-in cache invalidation after mutations
