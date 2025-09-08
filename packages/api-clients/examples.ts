/**
 * Example usage of API clients
 * This file demonstrates how to use the different API clients in a real application
 */

import {
	createApi1Client,
	createAnotherApiClient,
	createUserServiceClient,
	createClients,
	defaultConfigs,
} from "./src/index";

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
		const productsResult = await api1Client.getProducts({ limit: 5 });
		
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

		// Get current user info
		const currentUserResult = await userClient.getCurrentUser();
		if (currentUserResult.error) {
			console.error("Error getting current user:", currentUserResult.error.message);
			return;
		}
		
		console.log(`Current user: ${currentUserResult.data!.user.email}`);

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

		// Update order status
		const updateResult = await orderClient.updateOrderStatus(newOrderResult.data!.order.id, {
			status: "confirmed",
			notes: "Order confirmed by demo",
		});
		
		if (updateResult.error) {
			console.error("Error updating order status:", updateResult.error.message);
			return;
		}
		
		console.log("Order status updated to confirmed");
	} catch (error) {
		console.error("Error in individual client example:", error);
	}
}

// Example 2: Using the convenience factory for multiple clients
async function multipleClientsExample() {
	console.log("\n=== Multiple Clients Example ===");

	// Create all clients at once using development configuration
	const clients = createClients(defaultConfigs.development);

	try {
		// Check if clients are available
		if (clients.userService) {
			console.log("Getting users...");
			const usersResult = await clients.userService.getUsers({ limit: 3 });
			if (usersResult.error) {
				console.error("Error getting users:", usersResult.error.message);
			} else {
				console.log(`Found ${usersResult.data!.users.length} users`);
			}
		}

		if (clients.api1) {
			console.log("Searching products...");
			const searchResult = await clients.api1.searchProducts("demo", 5);
			if (searchResult.error) {
				console.error("Error searching products:", searchResult.error.message);
			} else {
				console.log(`Search returned ${searchResult.data!.products.length} products`);
			}
		}

		if (clients.anotherApi) {
			console.log("Getting recent orders...");
			const ordersResult = await clients.anotherApi.getOrders({ limit: 3 });
			if (ordersResult.error) {
				console.error("Error getting orders:", ordersResult.error.message);
			} else {
				console.log(`Found ${ordersResult.data!.orders.length} recent orders`);
			}
		}
	} catch (error) {
		console.error("Error in multiple clients example:", error);
	}
}

// Example 3: Error handling demonstration
async function errorHandlingExample() {
	console.log("\n=== Error Handling Example ===");

	const api1Client = createApi1Client({
		baseURL: "https://api-1.example.com",
	});

	try {
		// This will likely return an error result instead of throwing
		const result = await api1Client.getProduct(999999);
		
		if (result.error) {
			console.log("API returned error result:");
			console.log("- Message:", result.error.message);
			console.log("- Status:", result.error.status);
			console.log("- Code:", result.error.code);
			console.log("- Timestamp:", result.error.timestamp);
			
			// Handle specific error cases
			if (result.error.status === 404) {
				console.log("Product not found (HTTP 404)");
			} else if (result.error.code === "PRODUCT_NOT_FOUND") {
				console.log("Product not found (API-specific error)");
			} else {
				console.log("Other error occurred");
			}
		} else {
			console.log("Product found:", result.data?.product);
		}
	} catch (error: any) {
		// This should rarely happen now since errors are returned in the result
		console.error("Unexpected error (this shouldn't happen often):", error);
}

// Example 4: Advanced usage with authentication
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

		// Use the token for other API calls (token is automatically set after successful login)
		const productsResult = await api1Client.getProducts();
		if (productsResult.error) {
			console.error("Error fetching products:", productsResult.error.message);
		} else {
			console.log(`Fetched ${productsResult.data!.products.length} products with authentication`);
		}

		// Update user profile
		const profileResult = await userClient.updateCurrentUserProfile({
			bio: "Updated via API client demo",
			preferences: {
				theme: "dark",
				language: "en",
				timezone: "UTC",
				notifications: {
					email: true,
					push: false,
					sms: false,
				},
			},
		});
		
		if (profileResult.error) {
			console.error("Error updating profile:", profileResult.error.message);
		} else {
			console.log("User profile updated");
		}

		// Refresh token before it expires
		const refreshResult = await userClient.refreshToken({
			refreshToken: loginResult.data!.refreshToken,
		});
		
		if (refreshResult.error) {
			console.error("Token refresh failed:", refreshResult.error.message);
		} else {
			console.log("Token refreshed successfully");
		}

		// Logout when done
		const logoutResult = await userClient.logout();
		if (logoutResult.error) {
			console.error("Logout failed:", logoutResult.error.message);
		} else {
			console.log("Logged out successfully");
		}
	} catch (error) {
		console.error("Error in authentication example:", error);
	}
}

// Example 5: Batch operations
async function batchOperationsExample() {
	console.log("\n=== Batch Operations Example ===");

	const clients = createClients({
		api1: { baseURL: "https://api-1.example.com" },
		anotherApi: { baseURL: "https://orders-api.example.com" },
		userService: { baseURL: "https://users.example.com/api/v1" },
	});

	try {
		// Perform multiple operations in parallel
		const [productsResult, ordersResult, usersResult] = await Promise.all([
			clients.api1?.getProducts({ limit: 5 }) ?? Promise.resolve(null),
			clients.anotherApi?.getOrders({ limit: 5 }) ?? Promise.resolve(null),
			clients.userService?.getUsers({ limit: 5 }) ?? Promise.resolve(null),
		]);

		console.log("Parallel requests completed:");
		console.log(`- Products: ${productsResult?.data?.products.length || 0} (${productsResult?.error ? 'error' : 'success'})`);
		console.log(`- Orders: ${ordersResult?.data?.orders.length || 0} (${ordersResult?.error ? 'error' : 'success'})`);
		console.log(`- Users: ${usersResult?.data?.users.length || 0} (${usersResult?.error ? 'error' : 'success'})`);

		// Create multiple products in sequence
		if (clients.api1) {
			const productPromises = [
				clients.api1.createProduct({
					name: "Batch Product 1",
					description: "First batch product",
					price: 19.99,
					category: "batch",
				}),
				clients.api1.createProduct({
					name: "Batch Product 2",
					description: "Second batch product",
					price: 29.99,
					category: "batch",
				}),
				clients.api1.createProduct({
					name: "Batch Product 3",
					description: "Third batch product",
					price: 39.99,
					category: "batch",
				}),
			];

			const createdProducts = await Promise.all(productPromises);
			const successfulProducts = createdProducts.filter(result => !result.error);
			console.log(`Created ${successfulProducts.length} products in batch (${createdProducts.length - successfulProducts.length} failed)`);
		}
	} catch (error) {
		console.error("Error in batch operations example:", error);
	}
}

// Run all examples
async function runAllExamples() {
	console.log("API Clients Usage Examples");
	console.log("============================");

	await individualClientExample();
	await multipleClientsExample();
	await errorHandlingExample();
	await authenticationExample();
	await batchOperationsExample();

	console.log("\n=== All Examples Completed ===");
}

// Export for use in other files
export {
	individualClientExample,
	multipleClientsExample,
	errorHandlingExample,
	authenticationExample,
	batchOperationsExample,
	runAllExamples,
};
