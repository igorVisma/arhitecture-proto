import { BaseApiClient, BaseClientConfig, ApiResult } from "../base-client";
import {
	Order,
	CreateOrderRequest,
	UpdateOrderStatusRequest,
	OrdersListResponse,
	OrdersQueryParams,
	OrderResponse,
	OrderStatusHistoryResponse,
	AnotherApiError,
	OrderStatus,
} from "./types";

/**
 * Another API Client for order management
 *
 * @example
 * ```typescript
 * const anotherApiClient = new AnotherApiClient({
 *   baseURL: 'https://another-api.example.com/v1'
 * });
 *
 * // Get all orders
 * const orders = await anotherApiClient.getOrders();
 *
 * // Get orders for specific customer
 * const customerOrders = await anotherApiClient.getOrders({ customerId: 123 });
 *
 * // Create new order
 * const newOrder = await anotherApiClient.createOrder({
 *   customerId: 123,
 *   items: [
 *     { productId: 1, quantity: 2, unitPrice: 29.99 }
 *   ],
 *   shippingAddress: {
 *     street: '123 Main St',
 *     city: 'New York',
 *     state: 'NY',
 *     zipCode: '10001',
 *     country: 'US'
 *   }
 * });
 * ```
 */
export class AnotherApiClient extends BaseApiClient {
	constructor(config: BaseClientConfig) {
		super(config);
	}

	/**
	 * Get all orders with optional filtering
	 */
	async getOrders(params?: OrdersQueryParams): Promise<ApiResult<OrdersListResponse, AnotherApiError>> {
		const queryParams = new URLSearchParams();

		if (params?.page) queryParams.append("page", params.page.toString());
		if (params?.limit) queryParams.append("limit", params.limit.toString());
		if (params?.customerId) queryParams.append("customerId", params.customerId.toString());
		if (params?.status) queryParams.append("status", params.status);
		if (params?.dateFrom) queryParams.append("dateFrom", params.dateFrom);
		if (params?.dateTo) queryParams.append("dateTo", params.dateTo);

		const endpoint = `/orders${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

		return this.get<OrdersListResponse, AnotherApiError>(endpoint);
	}

	/**
	 * Create a new order
	 */
	async createOrder(orderData: CreateOrderRequest): Promise<ApiResult<OrderResponse, AnotherApiError>> {
		return this.post<OrderResponse, AnotherApiError, CreateOrderRequest>("/orders", orderData);
	}

	/**
	 * Override error handler for Another API specific errors
	 */
	protected handleError(error: unknown): AnotherApiError {
		// Handle Another API specific error format
		if (error && typeof error === "object" && "details" in error) {
			const details = (error as any).details;
			if (details && typeof details === "object" && "code" in details) {
				const anotherApiError = details as AnotherApiError;
				return {
					message: anotherApiError.message,
					code: anotherApiError.code,
					status: anotherApiError.status,
					correlationId: anotherApiError.correlationId,
				};
			}
		}

		// Convert generic error to AnotherApiError
		const baseError = super.handleError(error);
		return {
			message: baseError.message,
			code: "SERVER_ERROR" as const,
			status: baseError.status || 500,
			correlationId: crypto.randomUUID(),
		};
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
