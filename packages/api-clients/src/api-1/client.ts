import { BaseApiClient, BaseClientConfig, ApiResult } from "../base-client";
import {
	Product,
	CreateProductRequest,
	UpdateProductRequest,
	ProductsListResponse,
	ProductsQueryParams,
	ProductResponse,
	Api1Error,
} from "./types";

/**
 * API-1 Client for managing products
 *
 * @example
 * ```typescript
 * const api1Client = new Api1Client({
 *   baseURL: 'https://api-1.example.com'
 * });
 *
 * // Get all products
 * const products = await api1Client.getProducts();
 *
 * // Get product by ID
 * const product = await api1Client.getProduct(123);
 *
 * // Create new product
 * const newProduct = await api1Client.createProduct({
 *   name: 'New Product',
 *   description: 'Product description',
 *   price: 99.99,
 *   category: 'electronics'
 * });
 * ```
 */
export class Api1Client extends BaseApiClient {
	constructor(config: BaseClientConfig) {
		super(config);
	}

	/**
	 * Get all products with optional filtering
	 */
	async getProducts(params?: ProductsQueryParams): Promise<ApiResult<ProductsListResponse, Api1Error>> {
		const queryParams = new URLSearchParams();

		if (params?.page) queryParams.append("page", params.page.toString());
		if (params?.limit) queryParams.append("limit", params.limit.toString());
		if (params?.category) queryParams.append("category", params.category);
		if (params?.inStock !== undefined) queryParams.append("inStock", params.inStock.toString());
		if (params?.search) queryParams.append("search", params.search);

		const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

		return this.get<ProductsListResponse, Api1Error>(endpoint);
	}

	/**
	 * Get a single product by ID
	 */
	async getProduct(id: number): Promise<ApiResult<ProductResponse, Api1Error>> {
		return this.get<ProductResponse, Api1Error>(`/products/${id}`);
	}

	/**
	 * Create a new product
	 */
	async createProduct(productData: CreateProductRequest): Promise<ApiResult<ProductResponse, Api1Error>> {
		return this.post<ProductResponse, Api1Error, CreateProductRequest>("/products", productData);
	}

	/**
	 * Update an existing product
	 */
	async updateProduct(id: number, productData: UpdateProductRequest): Promise<ApiResult<ProductResponse, Api1Error>> {
		return this.put<ProductResponse, Api1Error, UpdateProductRequest>(`/products/${id}`, productData);
	}

	/**
	 * Partially update a product
	 */
	async patchProduct(
		id: number,
		productData: Partial<UpdateProductRequest>,
	): Promise<ApiResult<ProductResponse, Api1Error>> {
		return this.patch<ProductResponse, Api1Error, Partial<UpdateProductRequest>>(`/products/${id}`, productData);
	}

	/**
	 * Delete a product
	 */
	async deleteProduct(id: number): Promise<ApiResult<void, Api1Error>> {
		return this.delete<void, Api1Error>(`/products/${id}`);
	}

	/**
	 * Get products by category
	 */
	async getProductsByCategory(category: string): Promise<ApiResult<ProductsListResponse, Api1Error>> {
		return this.getProducts({ category });
	}

	/**
	 * Search products by name or description
	 */
	async searchProducts(searchTerm: string, limit?: number): Promise<ApiResult<ProductsListResponse, Api1Error>> {
		return this.getProducts({ search: searchTerm, limit });
	}

	/**
	 * Get only in-stock products
	 */
	async getInStockProducts(): Promise<ApiResult<ProductsListResponse, Api1Error>> {
		return this.getProducts({ inStock: true });
	}

	/**
	 * Override error handler for API-1 specific errors
	 */
	protected handleError(error: unknown): Api1Error {
		// Handle API-1 specific error format
		if (error && typeof error === "object" && "details" in error) {
			const details = (error as any).details;
			if (details && typeof details === "object" && "code" in details) {
				const api1Error = details as Api1Error;
				return {
					message: api1Error.message,
					code: api1Error.code,
					status: api1Error.status,
					timestamp: api1Error.timestamp,
				};
			}
		}

		// Convert generic error to Api1Error
		const baseError = super.handleError(error);
		return {
			message: baseError.message,
			code: "SERVER_ERROR" as const,
			status: baseError.status || 500,
			timestamp: new Date().toISOString(),
		};
	}
}

/**
 * Factory function to create API-1 client instance
 */
export const createApi1Client = (config: BaseClientConfig): Api1Client => {
	return new Api1Client(config);
};

// Export types for external use
export * from "./types";
