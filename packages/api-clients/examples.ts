/**
 * Simple examples for API clients usage
 */

import { VismaSignApiClient, ShareLinkApiClient } from "./src";

// Basic usage example
async function basicExample() {
	console.log("=== Basic API Usage ===");

	// Create clients
	const vismaSignClient = new VismaSignApiClient({
		baseURL: "https://visma-sign-api.example.com",
	});

	const shareLinkClient = new ShareLinkApiClient({
		baseURL: "https://share-link-api.example.com",
	});

	// Get products
	const productsResult = await vismaSignClient.getProducts();
	if (productsResult.error) {
		console.error("Failed to get products:", productsResult.error.message);
	} else {
		console.log(`Found ${productsResult.data.products.length} products`);
	}

	// Create a product
	const newProduct = await vismaSignClient.createProduct({
		name: "Example Product",
		description: "A simple example product",
		price: 29.99,
		category: "example",
	});

	if (newProduct.error) {
		console.error("Failed to create product:", newProduct.error.message);
	} else {
		console.log(`Created product: ${newProduct.data.product.name}`);
	}

	// Login user
	const loginResult = await userClient.login({
		email: "user@example.com",
		password: "password123",
	});

	if (loginResult.error) {
		console.error("Login failed:", loginResult.error.message);
	} else {
		console.log(`Logged in as: ${loginResult.data.user.username}`);
	}

	// Get orders
	const ordersResult = await shareLinkClient.getOrders();
	if (ordersResult.error) {
		console.error("Failed to get orders:", ordersResult.error.message);
	} else {
		console.log(`Found ${ordersResult.data.orders.length} orders`);
	}
}

// Error handling example
async function errorHandlingExample() {
	console.log("\n=== Error Handling ===");

	const client = new VismaSignApiClient({
		baseURL: "https://invalid-url.example.com",
	});

	const result = await client.getProducts();

	// Check for errors
	if (result.error) {
		console.log(`Error: ${result.error.message}`);
		console.log(`Status: ${result.error.status}`);
		console.log(`Code: ${result.error.code}`);
	} else {
		console.log("Success:", result.data);
	}
}

// Authentication example
async function authExample() {
	console.log("\n=== Authentication ===");

	const vismaSignClient = new VismaSignApiClient({
		baseURL: "https://visma-sign-api.example.com",
	});

	// Set token for other API calls
	vismaSignClient.setAuthToken("#####");

	// Now make authenticated requests
	const products = await vismaSignClient.getProducts();
	if (products.error) {
		console.error("Failed to get products:", products.error.message);
	} else {
		console.log(`Got ${products.data.products.length} products with auth`);
	}
}

// Run examples
async function runExamples() {
	await basicExample();
	await errorHandlingExample();
	await authExample();
}

// Export main function
export { runExamples };
