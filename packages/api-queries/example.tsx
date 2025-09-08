/**
 * Example usage of API queries package
 * Demonstrates how to use TanStack Query hooks with API clients
 */

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { VismaSignApiClient, ShareLinkApiClient } from "@repo/api-clients";
import {
	ApiClientsProvider,
	useProductsWithStates,
	useCreateProductWithStates,
	useOrdersWithStates,
	useLoginWithStates,
} from "./src";

// Create query client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			retry: 1,
		},
	},
});

// Create API clients
const apiClients = {
	vismaSignApi: new VismaSignApiClient({
		baseURL: "https://visma-sign-api.example.com",
	}),
	shareLinkApi: new ShareLinkApiClient({
		baseURL: "https://share-link-api.example.com",
	}),
	userService: new UserServiceClient({
		baseURL: "https://user-service.example.com",
	}),
};

// Example component using products
function ProductsList() {
	const { products, isLoading, isError, error, refetch } = useProductsWithStates();

	const { createProduct, isCreating, error: createError } = useCreateProductWithStates();

	if (isLoading) return <div>Loading products...</div>;
	if (isError) return <div>Error: {error}</div>;

	const handleCreateProduct = () => {
		createProduct({
			name: "New Product",
			description: "A new product created via React Query",
			price: 99.99,
			category: "demo",
		});
	};

	return (
		<div>
			<h2>Products ({products.length})</h2>

			<button onClick={handleCreateProduct} disabled={isCreating}>
				{isCreating ? "Creating..." : "Create Product"}
			</button>

			{createError && <p style={{ color: "red" }}>Create Error: {createError}</p>}

			<button onClick={() => refetch()}>Refresh Products</button>

			<ul>
				{products.map((product) => (
					<li key={product.id}>
						{product.name} - ${product.price}
					</li>
				))}
			</ul>
		</div>
	);
}

// Example component using orders
function OrdersList() {
	const { orders, isLoading, isError, error } = useOrdersWithStates();

	if (isLoading) return <div>Loading orders...</div>;
	if (isError) return <div>Error: {error}</div>;

	return (
		<div>
			<h2>Orders ({orders.length})</h2>
			<ul>
				{orders.map((order) => (
					<li key={order.id}>
						Order #{order.id} - ${order.total} ({order.status})
					</li>
				))}
			</ul>
		</div>
	);
}

// Example component using login
function LoginForm() {
	const { login, isLoggingIn, isSuccess, user, error } = useLoginWithStates();

	const handleLogin = () => {
		login({
			email: "user@example.com",
			password: "password123",
		});
	};

	if (isSuccess && user) {
		return <div>Welcome, {user.username}!</div>;
	}

	return (
		<div>
			<h2>Login</h2>
			<button onClick={handleLogin} disabled={isLoggingIn}>
				{isLoggingIn ? "Logging in..." : "Login"}
			</button>
			{error && <p style={{ color: "red" }}>Login Error: {error}</p>}
		</div>
	);
}

// Main App component
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ApiClientsProvider clients={apiClients}>
				<div style={{ padding: "20px" }}>
					<h1>API Queries Example</h1>

					<LoginForm />

					<hr />

					<ProductsList />

					<hr />

					<OrdersList />
				</div>
			</ApiClientsProvider>
		</QueryClientProvider>
	);
}

export default App;
