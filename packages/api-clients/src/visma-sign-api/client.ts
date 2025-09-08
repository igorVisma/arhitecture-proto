import { BaseApiClient } from "../base-client";
import { BaseClientConfig } from "../types";
import { CreateProductRequest, ProductsListResponse, ProductResponse, VismaSignApiError } from "./types";

export class VismaSignApiClient extends BaseApiClient {
	constructor(config: BaseClientConfig) {
		super(config);
	}

	/**
	 * Get all products with optional filtering
	 * @method GET `/products`
	 */
	async getProducts(params?: URLSearchParams) {
		return this.get<ProductsListResponse, VismaSignApiError>("/products", { params });
	}

	/**
	 * Create a new product
	 * @method POST `/products`
	 */
	async createProduct(productData: CreateProductRequest) {
		return this.post<ProductResponse, VismaSignApiError, CreateProductRequest>("/products", productData);
	}
}
