import { BaseApiClient } from "../base-client";
import { BaseClientConfig } from "../types";
import { CreateOrderRequest, OrdersListResponse, OrderResponse, ShareLinkApiError } from "./types";

export class ShareLinkApiClient extends BaseApiClient {
	constructor(config: BaseClientConfig) {
		super(config);
	}

	/**
	 * Get all orders with optional filtering
	 * @method GET /orders
	 */
	async getOrders(params?: URLSearchParams) {
		return this.get<OrdersListResponse, ShareLinkApiError>("/orders", { params });
	}

	/**
	 * Create a new order
	 * @method POST /orders
	 */
	async createOrder(orderData: CreateOrderRequest) {
		return this.post<OrderResponse, ShareLinkApiError, CreateOrderRequest>("/orders", orderData);
	}
}

// Export types for external use
export * from "./types";
