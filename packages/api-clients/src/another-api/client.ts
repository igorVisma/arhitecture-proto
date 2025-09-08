import { BaseApiClient } from "../base-client";
import { BaseClientConfig } from "../types";
import { CreateOrderRequest, OrdersListResponse, OrderResponse, AnotherApiError } from "./types";

export class AnotherApiClient extends BaseApiClient {
	constructor(config: BaseClientConfig) {
		super(config);
	}

	/**
	 * Get all orders with optional filtering
	 * @method GET /orders
	 */
	async getOrders(params?: URLSearchParams) {
		return this.get<OrdersListResponse, AnotherApiError>("/orders", { params });
	}

	/**
	 * Create a new order
	 * @method POST /orders
	 */
	async createOrder(orderData: CreateOrderRequest) {
		return this.post<OrderResponse, AnotherApiError, CreateOrderRequest>("/orders", orderData);
	}
}

// Export types for external use
export * from "./types";
