/**
 * Types for Visma Sign API service
 */

export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	category: string;
	inStock: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface CreateProductRequest {
	name: string;
	description: string;
	price: number;
	category: string;
	inStock?: boolean;
}

export interface UpdateProductRequest {
	name?: string;
	description?: string;
	price?: number;
	category?: string;
	inStock?: boolean;
}

export interface ProductsListResponse {
	products: Product[];
	total: number;
	page: number;
	limit: number;
}

export interface ProductsQueryParams {
	page?: number;
	limit?: number;
	category?: string;
	inStock?: boolean;
	search?: string;
}

export interface ProductResponse {
	product: Product;
}

export interface VismaSignApiError {
	message: string;
	code: "PRODUCT_NOT_FOUND" | "INVALID_INPUT" | "UNAUTHORIZED" | "SERVER_ERROR";
	status: number;
	timestamp: string;
}
