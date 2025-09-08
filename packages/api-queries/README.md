# @repo/api-queries

TanStack Query (React Query) hooks for `@repo/api-clients` package. This package provides React hooks with built-in caching, loading states, error handling, and optimistic updates.

## Installation

```bash
npm install @repo/api-queries @tanstack/react-query
# or
pnpm add @repo/api-queries @tanstack/react-query
```

## Setup

1. **Setup TanStack Query and API Clients Provider:**

```tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { VismaSignApiClient, ShareLinkApiClient, UserServiceClient } from '@repo/api-clients';
import { ApiClientsProvider } from '@repo/api-queries';

const queryClient = new QueryClient();

const apiClients = {
  vismaSignApi: new VismaSignApiClient({ baseURL: 'https://api.example.com' }),
  shareLinkApi: new ShareLinkApiClient({ baseURL: 'https://orders.example.com' }),
  userService: new UserServiceClient({ baseURL: 'https://users.example.com' }),
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiClientsProvider clients={apiClients}>
        <YourComponents />
      </ApiClientsProvider>
    </QueryClientProvider>
  );
}
```

## Usage

### Visma Sign API Hooks

```tsx
import { useProducts, useCreateProduct } from '@repo/api-queries';

function ProductsComponent() {
  // Fetch products with automatic caching
  const { data, isLoading, error } = useProducts();
  
  // Create product mutation
  const createProduct = useCreateProduct();

  const handleCreate = () => {
    createProduct.mutate({
      name: 'New Product',
      price: 99.99,
      category: 'electronics'
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={handleCreate}>Create Product</button>
      {data?.products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Convenient State Hooks

For easier state management, use the "WithStates" versions:

```tsx
import { useProductsWithStates, useCreateProductWithStates } from '@repo/api-queries';

function ProductsComponent() {
  const { products, isLoading, error, refetch } = useProductsWithStates();
  const { createProduct, isCreating } = useCreateProductWithStates();

  return (
    <div>
      <button 
        onClick={() => createProduct({ name: 'Product', price: 50 })}
        disabled={isCreating}
      >
        {isCreating ? 'Creating...' : 'Create Product'}
      </button>
      
      <button onClick={() => refetch()}>Refresh</button>
      
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## Available Hooks

### Visma Sign API
- `useProducts(params?)` - Fetch products
- `useCreateProduct()` - Create a product
- `useProductsWithStates(params?)` - Products with convenient state properties
- `useCreateProductWithStates()` - Create product with convenient state properties

### Share Link API
- `useOrders(params?)` - Fetch orders
- `useCreateOrder()` - Create an order
- `useOrdersWithStates(params?)` - Orders with convenient state properties
- `useCreateOrderWithStates()` - Create order with convenient state properties

### User Service API
- `useUsers(params?)` - Fetch users
- `useLogin()` - User login
- `useUsersWithStates(params?)` - Users with convenient state properties
- `useLoginWithStates()` - Login with convenient state properties

## Query Keys

Access query keys for manual invalidation:

```tsx
import { queryKeys } from '@repo/api-queries';
import { useQueryClient } from '@tanstack/react-query';

function MyComponent() {
  const queryClient = useQueryClient();

  const refreshProducts = () => {
    queryClient.invalidateQueries({ 
      queryKey: queryKeys.vismaSign.products() 
    });
  };

  // ...
}
```

## Features

- ✅ **Automatic Caching** - Responses are cached automatically
- ✅ **Loading States** - Built-in loading indicators
- ✅ **Error Handling** - Consistent error handling across all APIs
- ✅ **Optimistic Updates** - UI updates immediately, with rollback on error
- ✅ **Query Invalidation** - Automatic cache updates after mutations
- ✅ **TypeScript Support** - Full type safety
- ✅ **Tree Shakeable** - Import only what you need

## Tree Shaking

Import specific hooks for optimal bundle size:

```tsx
// Import specific hooks
import { useProducts } from '@repo/api-queries/visma-sign';
import { useOrders } from '@repo/api-queries/share-link';
import { useLogin } from '@repo/api-queries/user-service';
```
