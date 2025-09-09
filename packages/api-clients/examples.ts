/**
 * Simple examples for API clients usage
 */

import { VismaSignApiClient, ShareLinkApiClient } from "./src";

// Basic usage example
async function basicExample() {
	// Create clients
	const vismaSignClient = new VismaSignApiClient({
		baseURL: "https://visma-sign-api.example.com",
	});

	const shareLinkClient = new ShareLinkApiClient({
		baseURL: "https://share-link-api.example.com",
	});

	// Get products
	const productsResult = await vismaSignClient.products.get();
	if (productsResult.error) {
		console.error("Failed to get products:", productsResult.error.message);
	} else {
		console.log(`Found ${productsResult.data.products.length} products`);
	}

	// Create a product
	const newProduct = await vismaSignClient.products.create({
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

	// Get orders
	const ordersResult = await shareLinkClient.orders.get();
	if (ordersResult.error) {
		console.error("Failed to get orders:", ordersResult.error.message);
	} else {
		console.log(`Found ${ordersResult.data.orders.length} orders`);
	}
}

// Export main function
export { basicExample };
