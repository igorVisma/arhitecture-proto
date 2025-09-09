import { BaseApiClient } from "../base-client";
import { BaseClientConfig } from "../types";
import { CreateProductRequest, ProductsListResponse, ProductResponse, VismaSignApiError } from "./types";

export class VismaSignApiClient extends BaseApiClient {
	constructor(config: BaseClientConfig) {
		super(config);
	}

	/**
	 * Product related collection with `/products` endpoint methods
	 */
	get products() {
		const self = this;
		return {
			/**
			 * Get all products with optional filtering
			 * @method GET `/products`
			 */
			async get(params?: URLSearchParams) {
				return self.get<ProductsListResponse, VismaSignApiError>("/products", { params });
			},

			/**
			 * Create a new product
			 * @method POST `/products`
			 */
			async create(productData: CreateProductRequest) {
				return self.post<ProductResponse, VismaSignApiError, CreateProductRequest>("/products", productData);
			},
		};
	}
}
