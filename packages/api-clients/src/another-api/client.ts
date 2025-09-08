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
	 * Get a single order by ID
	 */
	async getOrder(id: string): Promise<ApiResult<OrderResponse, AnotherApiError>> {
		return this.get<OrderResponse, AnotherApiError>(`/orders/${id}`);
	}

	/**
	 * Create a new order
	 */
	async createOrder(orderData: CreateOrderRequest): Promise<ApiResult<OrderResponse, AnotherApiError>> {
		return this.post<OrderResponse, AnotherApiError, CreateOrderRequest>("/orders", orderData);
	}

	/**
	 * Update order status
	 */
	async updateOrderStatus(
		id: string,
		statusData: UpdateOrderStatusRequest,
	): Promise<ApiResult<OrderResponse, AnotherApiError>> {
		return this.patch<OrderResponse, AnotherApiError, UpdateOrderStatusRequest>(`/orders/${id}/status`, statusData);
	}

	/**
	 * Cancel an order
	 */
	async cancelOrder(id: string, reason?: string): Promise<ApiResult<OrderResponse, AnotherApiError>> {
		return this.updateOrderStatus(id, {
			status: "cancelled",
			notes: reason,
		});
	}

	/**
	 * Get order status history
	 */
	async getOrderStatusHistory(id: string): Promise<ApiResult<OrderStatusHistoryResponse, AnotherApiError>> {
		return this.get<OrderStatusHistoryResponse, AnotherApiError>(`/orders/${id}/status-history`);
	}

	/**
	 * Get orders by customer ID
	 */
	async getOrdersByCustomer(
		customerId: number,
		params?: Omit<OrdersQueryParams, "customerId">,
	): Promise<ApiResult<OrdersListResponse, AnotherApiError>> {
		return this.getOrders({ ...params, customerId });
	}

	/**
	 * Get orders by status
	 */
	async getOrdersByStatus(
		status: OrderStatus,
		params?: Omit<OrdersQueryParams, "status">,
	): Promise<ApiResult<OrdersListResponse, AnotherApiError>> {
		return this.getOrders({ ...params, status });
	}

	/**
	 * Get orders within date range
	 */
	async getOrdersByDateRange(
		dateFrom: string,
		dateTo: string,
		params?: Omit<OrdersQueryParams, "dateFrom" | "dateTo">,
	): Promise<ApiResult<OrdersListResponse, AnotherApiError>> {
		return this.getOrders({ ...params, dateFrom, dateTo });
	}

	/**
	 * Get pending orders
	 */
	async getPendingOrders(): Promise<ApiResult<OrdersListResponse, AnotherApiError>> {
		return this.getOrdersByStatus("pending");
	}

	/**
	 * Get orders ready for shipping
	 */
	async getOrdersReadyForShipping(): Promise<ApiResult<OrdersListResponse, AnotherApiError>> {
		return this.getOrdersByStatus("processing");
	}

	/**
	 * Process order (change status from pending to confirmed)
	 */
	async processOrder(id: string): Promise<ApiResult<OrderResponse, AnotherApiError>> {
		return this.updateOrderStatus(id, { status: "confirmed" });
	}

	/**
	 * Ship order (change status to shipped)
	 */
	async shipOrder(id: string, trackingNumber?: string): Promise<ApiResult<OrderResponse, AnotherApiError>> {
		return this.updateOrderStatus(id, {
			status: "shipped",
			notes: trackingNumber ? `Tracking: ${trackingNumber}` : undefined,
		});
	}

	/**
	 * Mark order as delivered
	 */
	async deliverOrder(id: string): Promise<ApiResult<OrderResponse, AnotherApiError>> {
		return this.updateOrderStatus(id, { status: "delivered" });
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
