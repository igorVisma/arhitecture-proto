import { BaseApiClient } from "../base-client";
import { BaseClientConfig, ApiResult } from "../types";
import { CreateProductRequest, ProductsListResponse, ProductResponse, Api1Error } from "./types";

export class Api1Client extends BaseApiClient {
	constructor(config: BaseClientConfig) {
		super(config);
	}

	/**
	 * Get all products with optional filtering
	 */
	async getProducts(params?: URLSearchParams): Promise<ApiResult<ProductsListResponse, Api1Error>> {
		return this.get<ProductsListResponse, Api1Error>("/products", { params });
	}

	/**
	 * Create a new product
	 */
	async createProduct(productData: CreateProductRequest): Promise<ApiResult<ProductResponse, Api1Error>> {
		return this.post<ProductResponse, Api1Error, CreateProductRequest>("/products", productData);
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
