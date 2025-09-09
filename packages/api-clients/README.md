# @repo/api-clients

A collection of TypeScript API clients for different services with built-in error handling, request/response logging, and type safety.

## Installation

This package is designed to be used within the turbo-proto monorepo with pnpm workspaces. It's consumed directly as TypeScript source without a build step.

In your app's `package.json`, add:

```json
{
  "dependencies": {
    "@repo/api-clients": "workspace:*"
  }
}
```

Then run:
```bash
pnpm install
```

## Features

- 🔒 **Type Safety**: Full TypeScript support with proper types for requests and responses
- 🛠️ **Built on Axios**: Leverages the power and flexibility of Axios
- 🎯 **Modular Design**: Import only the clients you need
- ✅ **Standardized Response Format**: Consistent `{ data, error, isFetching }` response structure
- 🔄 **Individual Error Types**: Specific error types for each API service
- 📝 **Request/Response Logging**: Built-in logging for debugging
- 🔐 **Authentication Support**: Easy token-based authentication
- ⚡ **Factory Functions**: Convenient client creation

## Usage

### Individual Client Import

You can import specific clients as needed:

```typescript
// Import specific client
import { Api1Client } from '@repo/api-clients/api-1/client';
import { AnotherApiClient } from '@repo/api-clients/another-api/client';
import { UserServiceClient } from '@repo/api-clients/user-service/client';

// Create client instances
const api1Client = new Api1Client({
  baseURL: 'https://api-1.example.com',
  timeout: 10000,
  headers: {
    'X-API-Key': 'your-api-key'
  }
});

const orderClient = new AnotherApiClient({
  baseURL: 'https://orders-api.example.com'
});

const userClient = new UserServiceClient({
  baseURL: 'https://users.example.com/api/v1'
});
```

### Factory Functions

Use factory functions for easier client creation:

```typescript
import { 
  createApi1Client, 
  createAnotherApiClient, 
  createUserServiceClient 
} from '@repo/api-clients';

const api1Client = createApi1Client({
  baseURL: 'https://api-1.example.com'
});

const orderClient = createAnotherApiClient({
  baseURL: 'https://orders-api.example.com'
});

const userClient = createUserServiceClient({
  baseURL: 'https://users.example.com/api/v1'
});
```

### Multiple Clients at Once

Create all clients at once with environment-specific configurations:

```typescript
import { createClients, defaultConfigs } from '@repo/api-clients';

// Use default development configuration
const clients = createClients(defaultConfigs.development);

// Or provide custom configuration
const clients = createClients({
  api1: { baseURL: 'https://api-1.example.com' },
  anotherApi: { baseURL: 'https://orders-api.example.com' },
  userService: { baseURL: 'https://users.example.com/api/v1' }
});

// Use the clients
const products = await clients.api1?.getProducts();
const orders = await clients.anotherApi?.getOrders();
const users = await clients.userService?.getUsers();
```

## Client Examples

### API-1 Client (Products)

```typescript
import { createApi1Client } from '@repo/api-clients';

const client = createApi1Client({
  baseURL: 'https://api-1.example.com'
});

// Get all products - returns ApiResult<ProductsListResponse, Api1Error>
const productsResult = await client.products.get();

if (productsResult.error) {
  console.error('Failed to fetch products:', productsResult.error.message);
  // Handle specific API-1 errors
  if (productsResult.error.code === 'PRODUCT_NOT_FOUND') {
    // Handle product not found error
  }
} else {
  console.log(`Found ${productsResult.data.products.length} products`);
  const products = productsResult.data.products;
}

// Get products with pagination and filtering
const filteredResult = await client.products.get({
  page: 1,
  limit: 20,
  category: 'electronics',
  inStock: true
});

// Get single product
const productResult = await client.getProduct(123);
if (!productResult.error) {
  console.log('Product:', productResult.data.product);
}

// Create new product
const newProductResult = await client.products.create({
  name: 'New Product',
  description: 'Product description',
  price: 99.99,
  category: 'electronics'
});

// Update product
const updatedResult = await client.updateProduct(123, {
  name: 'Updated Product Name',
  price: 89.99
});

// Delete product
const deleteResult = await client.deleteProduct(123);

// Search products
const searchResult = await client.searchProducts('laptop', 10);
```

### Another API Client (Orders)

```typescript
import { createAnotherApiClient } from '@repo/api-clients';

const client = createAnotherApiClient({
  baseURL: 'https://orders-api.example.com'
});

// Get all orders
const orders = await client.getOrders();

// Get orders for specific customer
const customerOrders = await client.getOrdersByCustomer(123);

// Create new order
const newOrder = await client.createOrder({
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

// Update order status
const updatedOrder = await client.updateOrderStatus(newOrder.order.id, {
  status: 'confirmed',
  notes: 'Payment verified'
});

// Cancel order
await client.cancelOrder(newOrder.order.id, 'Customer requested cancellation');

// Get order status history
const statusHistory = await client.getOrderStatusHistory(newOrder.order.id);

// Get pending orders
const pendingOrders = await client.getPendingOrders();
```

### User Service Client

```typescript
import { createUserServiceClient } from '@repo/api-clients';

const client = createUserServiceClient({
  baseURL: 'https://users.example.com/api/v1'
});

// Login user
const loginResult = await client.login({
  email: 'user@example.com',
  password: 'password123'
});

// Client automatically sets auth token after login
console.log(loginResult.user);

// Get current user
const currentUser = await client.getCurrentUser();

// Get all users (admin only)
const users = await client.getUsers({
  page: 1,
  limit: 50,
  role: 'user',
  isActive: true
});

// Create new user
const newUser = await client.createUser({
  email: 'newuser@example.com',
  username: 'newuser',
  firstName: 'John',
  lastName: 'Doe',
  password: 'securepassword123'
});

// Update user profile
const profile = await client.updateCurrentUserProfile({
  bio: 'Software developer',
  website: 'https://johndoe.com',
  preferences: {
    theme: 'dark',
    language: 'en',
    notifications: {
      email: true,
      push: false,
      sms: false
    }
  }
});

// Change password
await client.changePassword({
  currentPassword: 'oldpassword',
  newPassword: 'newpassword123'
});

// Search users
const searchResults = await client.searchUsers('john');

// Logout
await client.logout();
```

## Authentication

All clients support token-based authentication:

```typescript
// Set authentication token
client.setAuthToken('your-jwt-token');

// Remove authentication token
client.removeAuthToken();

// For User Service, token is set automatically after login
const userClient = createUserServiceClient({ baseURL: 'https://users.example.com' });
await userClient.login({ email: 'user@example.com', password: 'password' });
// Token is now set automatically
```

## Error Handling

All clients provide consistent error handling with standardized response format:

```typescript
const result = await api1Client.getProduct(999);

if (result.error) {
  // Handle error
  console.log('Error message:', result.error.message);
  console.log('HTTP status:', result.error.status);
  console.log('Error code:', result.error.code);
  console.log('Timestamp:', result.error.timestamp); // API-1 specific
  
  // Handle specific error types
  switch (result.error.code) {
    case 'PRODUCT_NOT_FOUND':
      console.log('Product does not exist');
      break;
    case 'UNAUTHORIZED':
      console.log('Authentication required');
      break;
    case 'SERVER_ERROR':
      console.log('Internal server error');
      break;
  }
} else {
  // Handle success
  console.log('Product found:', result.data.product);
}

// You can also check for loading state (useful for UI)
if (result.isFetching) {
  console.log('Request in progress...');
}
```

### Different Error Types for Each API

Each API client has its own specific error type:

```typescript
import type { Api1Error } from '@repo/api-clients/api-1/client';
import type { AnotherGenericApiError } from '@repo/api-clients/another-api/client';
import type { UserServiceError } from '@repo/api-clients/user-service/client';

// API-1 errors have timestamp
const api1Result = await api1Client.getProduct(1);
if (api1Result.error) {
  console.log(api1Result.error.timestamp); // Available
}

// Another API errors have correlationId
const orderResult = await anotherApiClient.getOrder('123');
if (orderResult.error) {
  console.log(orderResult.error.correlationId); // Available
}

// User Service errors have field for validation errors
const userResult = await userServiceClient.createUser(userData);
if (userResult.error) {
  console.log(userResult.error.field); // Available for validation errors
}
```

## Custom Configuration

```typescript
const client = createApi1Client({
  baseURL: 'https://api-1.example.com',
  timeout: 15000, // 15 seconds
  headers: {
    'X-API-Key': 'your-api-key',
    'X-Client-Version': '1.0.0'
  }
});
```

## Available Clients

- **API-1 Client** (`@repo/api-clients/api-1/client`): Product management
- **Another API Client** (`@repo/api-clients/another-api/client`): Order management
- **User Service Client** (`@repo/api-clients/user-service/client`): User management and authentication

## TypeScript Support

All clients are built with TypeScript and provide full type safety:

```typescript
import type { Product, CreateProductRequest } from '@repo/api-clients/api-1/client';
import type { Order, OrderStatus } from '@repo/api-clients/another-api/client';
import type { User, UserRole } from '@repo/api-clients/user-service/client';

// Types are automatically inferred
const product: Product = await api1Client.getProduct(1);
const orders: Order[] = (await anotherApiClient.getOrders()).orders;
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
