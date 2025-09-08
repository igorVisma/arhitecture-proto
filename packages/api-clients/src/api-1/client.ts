import { BaseApiClient } from "../base-client";
import { BaseClientConfig, ApiResult } from "../types";
import { CreateProductRequest, ProductsListResponse, ProductResponse, Api1Error } from "./types";

export class Api1Client extends BaseApiClient {
	constructor(config: BaseClientConfig) {
		super(config);
	}

	/**
	 * Get all products with optional filtering
	 * @method GET /products
	 */
	async getProducts(params?: URLSearchParams) {
		return this.get<ProductsListResponse, Api1Error>("/products", { params });
	}

	/**
	 * Create a new product
	 * @method POST /products
	 */
	async createProduct(productData: CreateProductRequest) {
		return this.post<ProductResponse, Api1Error, CreateProductRequest>("/products", productData);
	}
}

// Export types for external use
export * from "./types";
