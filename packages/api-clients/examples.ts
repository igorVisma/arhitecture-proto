/**
 * Example usage of API clients
 * This file demonstrates how to use the different API clients in a real application
 */

import { createApi1Client, createAnotherApiClient, createUserServiceClient } from "./src/index";

// Example 1: Individual client creation and usage
async function individualClientExample() {
	console.log("=== Individual Client Example ===");

	// Create individual clients
	const api1Client = createApi1Client({
		baseURL: "https://api-1.example.com",
		timeout: 10000,
		headers: {
			"X-API-Key": "your-api-key",
		},
	});

	const orderClient = createAnotherApiClient({
		baseURL: "https://orders-api.example.com",
	});

	const userClient = createUserServiceClient({
		baseURL: "https://users.example.com/api/v1",
	});

	try {
		// Use API-1 client
		console.log("Fetching products...");
		const productsResult = await api1Client.getProducts(new URLSearchParams({ limit: "5" }));

		if (productsResult.error) {
			console.error("Error fetching products:", productsResult.error.message);
			return;
		}

		console.log(`Found ${productsResult.data!.products.length} products`);

		// Create a new product
		const newProductResult = await api1Client.createProduct({
			name: "Demo Product",
			description: "This is a demo product",
			price: 29.99,
			category: "demo",
		});

		if (newProductResult.error) {
			console.error("Error creating product:", newProductResult.error.message);
			return;
		}

		console.log(`Created product with ID: ${newProductResult.data!.product.id}`);

		// Use User Service client
		console.log("Attempting login...");
		const loginResult = await userClient.login({
			email: "demo@example.com",
			password: "demopassword",
		});

		if (loginResult.error) {
			console.error("Login failed:", loginResult.error.message);
			return;
		}

		console.log(`Logged in as: ${loginResult.data!.user.username}`);

		// Get all users
		const usersResult = await userClient.getUsers(new URLSearchParams({ limit: "10" }));
		if (usersResult.error) {
			console.error("Error getting users:", usersResult.error.message);
			return;
		}

		console.log(`Found ${usersResult.data!.users.length} users`);

		// Use Another API client for orders
		console.log("Creating order...");
		const newOrderResult = await orderClient.createOrder({
			customerId: loginResult.data!.user.id,
			items: [{ productId: newProductResult.data!.product.id, quantity: 2, unitPrice: 29.99 }],
			shippingAddress: {
				street: "123 Demo St",
				city: "Demo City",
				state: "DC",
				zipCode: "12345",
				country: "US",
			},
		});

		if (newOrderResult.error) {
			console.error("Error creating order:", newOrderResult.error.message);
			return;
		}

		console.log(`Created order with ID: ${newOrderResult.data!.order.id}`);

		// Get orders with filtering
		const ordersResult = await orderClient.getOrders(
			new URLSearchParams({
				customerId: loginResult.data!.user.id.toString(),
				limit: "5",
			}),
		);

		if (ordersResult.error) {
			console.error("Error getting orders:", ordersResult.error.message);
			return;
		}

		console.log(`Found ${ordersResult.data!.orders.length} orders for customer`);
	} catch (error) {
		console.error("Error in individual client example:", error);
	}
}

// Example 2: Error handling demonstration
async function errorHandlingExample() {
	console.log("\n=== Error Handling Example ===");

	const api1Client = createApi1Client({
		baseURL: "https://nonexistent-api.example.com",
	});

	try {
		// This will likely return an error result instead of throwing
		const result = await api1Client.getProducts();

		if (result.error) {
			console.log("API returned error result:");
			console.log("- Message:", result.error.message);
			console.log("- Status:", result.error.status);
			console.log("- Code:", result.error.code);

			// Handle specific error cases
			if (result.error.status === 404) {
				console.log("Resource not found (HTTP 404)");
			} else if (result.error.status === 500) {
				console.log("Server error (HTTP 500)");
			} else {
				console.log("Other error occurred");
			}
		} else {
			console.log("Products found:", result.data?.products.length);
		}
	} catch (error: any) {
		// This should rarely happen now since errors are returned in the result
		console.error("Unexpected error:", error);
	}
}

// Example 3: Authentication workflow
async function authenticationExample() {
	console.log("\n=== Authentication Example ===");

	const userClient = createUserServiceClient({
		baseURL: "https://users.example.com/api/v1",
	});

	const api1Client = createApi1Client({
		baseURL: "https://api-1.example.com",
	});

	try {
		// Login and get token
		const loginResult = await userClient.login({
			email: "admin@example.com",
			password: "adminpassword",
		});

		if (loginResult.error) {
			console.error("Login failed:", loginResult.error.message);
			return;
		}

		console.log(`Logged in as: ${loginResult.data!.user.username}`);

		// The token is automatically set in the client after successful login
		// Now we can make authenticated requests to other APIs using the same token
		api1Client.setAuthToken(loginResult.data!.token);

		// Use authenticated requests
		const productsResult = await api1Client.getProducts();
		if (productsResult.error) {
			console.error("Error fetching products:", productsResult.error.message);
		} else {
			console.log(`Fetched ${productsResult.data!.products.length} products with authentication`);
		}

		// Get users (admin only)
		const usersResult = await userClient.getUsers(new URLSearchParams({ role: "admin" }));

		if (usersResult.error) {
			console.error("Error getting admin users:", usersResult.error.message);
		} else {
			console.log(`Found ${usersResult.data!.users.length} admin users`);
		}
	} catch (error) {
		console.error("Error in authentication example:", error);
	}
}

// Example 4: Parallel operations
async function parallelOperationsExample() {
	console.log("\n=== Parallel Operations Example ===");

	const api1Client = createApi1Client({
		baseURL: "https://api-1.example.com",
	});

	const orderClient = createAnotherApiClient({
		baseURL: "https://orders-api.example.com",
	});

	const userClient = createUserServiceClient({
		baseURL: "https://users.example.com/api/v1",
	});

	try {
		// Perform multiple operations in parallel
		const [productsResult, ordersResult, usersResult] = await Promise.all([
			api1Client.getProducts(new URLSearchParams({ limit: "5" })),
			orderClient.getOrders(new URLSearchParams({ limit: "5" })),
			userClient.getUsers(new URLSearchParams({ limit: "5" })),
		]);

		console.log("Parallel requests completed:");
		console.log(
			`- Products: ${productsResult.data?.products.length || 0} (${productsResult.error ? "error" : "success"})`,
		);
		console.log(`- Orders: ${ordersResult.data?.orders.length || 0} (${ordersResult.error ? "error" : "success"})`);
		console.log(`- Users: ${usersResult.data?.users.length || 0} (${usersResult.error ? "error" : "success"})`);

		// Create multiple products in parallel
		const productPromises = [
			api1Client.createProduct({
				name: "Batch Product 1",
				description: "First batch product",
				price: 19.99,
				category: "batch",
			}),
			api1Client.createProduct({
				name: "Batch Product 2",
				description: "Second batch product",
				price: 29.99,
				category: "batch",
			}),
		];

		const createdProducts = await Promise.all(productPromises);
		const successfulProducts = createdProducts.filter((result) => !result.error);
		console.log(
			`Created ${successfulProducts.length} products in batch (${createdProducts.length - successfulProducts.length} failed)`,
		);
	} catch (error) {
		console.error("Error in parallel operations example:", error);
	}
}

// Run all examples
async function runAllExamples() {
	console.log("API Clients Usage Examples");
	console.log("============================");

	await individualClientExample();
	await errorHandlingExample();
	await authenticationExample();
	await parallelOperationsExample();

	console.log("\n=== All Examples Completed ===");
}

// Export for use in other files
export {
	individualClientExample,
	errorHandlingExample,
	authenticationExample,
	parallelOperationsExample,
	runAllExamples,
};
