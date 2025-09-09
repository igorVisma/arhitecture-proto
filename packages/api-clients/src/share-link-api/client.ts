import { BaseApiClient } from "../base-client";
import { BaseClientConfig } from "../types";
import { CreateOrderRequest, OrdersListResponse, OrderResponse, ShareLinkApiError } from "./types";

export class ShareLinkApiClient extends BaseApiClient {
	constructor(config: BaseClientConfig) {
		super(config);
	}

	/**
	 * Orders related collection with `/orders` endpoint methods
	 */
	get orders() {
		const self = this;
		return {
			/**
			 * Get all orders with optional filtering
			 * @method GET `/orders`
			 */
			async get(params?: URLSearchParams) {
				return self.get<OrdersListResponse, ShareLinkApiError>("/orders", { params });
			},

			/**
			 * Create a new order
			 * @method POST `/orders`
			 */
			async create(orderData: CreateOrderRequest) {
				return self.post<OrderResponse, ShareLinkApiError, CreateOrderRequest>("/orders", orderData);
			},
		};
	}
}
