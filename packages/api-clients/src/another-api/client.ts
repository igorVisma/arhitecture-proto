import { BaseApiClient } from "../base-client";
import { BaseClientConfig, ApiResult } from "../types";
import { CreateOrderRequest, OrdersListResponse, OrderResponse, AnotherApiError } from "./types";

export class AnotherApiClient extends BaseApiClient {
	constructor(config: BaseClientConfig) {
		super(config);
	}

	/**
	 * Get all orders with optional filtering
	 * @method GET /orders
	 */
	async getOrders(params?: URLSearchParams): Promise<ApiResult<OrdersListResponse, AnotherApiError>> {
		return this.get<OrdersListResponse, AnotherApiError>("/orders", { params });
	}

	/**
	 * Create a new order
	 * @method POST /orders
	 */
	async createOrder(orderData: CreateOrderRequest): Promise<ApiResult<OrderResponse, AnotherApiError>> {
		return this.post<OrderResponse, AnotherApiError, CreateOrderRequest>("/orders", orderData);
	}
}

/**
 * Factory function to create Another API client instance
 */
export const createAnotherApiClient = (config: BaseClientConfig): AnotherApiClient => {
	return new AnotherApiClient(config);
};

// Export types for external use
export * from "./types";
