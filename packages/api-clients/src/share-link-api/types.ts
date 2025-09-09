/**
 * Types for Share Link API service (Order Management)
 */

export interface Order {
	id: string;
	customerId: number;
	items: OrderItem[];
	total: number;
	status: OrderStatus;
	shippingAddress: Address;
	billingAddress: Address;
	createdAt: string;
	updatedAt: string;
}

export interface OrderItem {
	productId: number;
	productName: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
}

export interface Address {
	street: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";

export interface CreateOrderRequest {
	customerId: number;
	items: Omit<OrderItem, "productName" | "totalPrice">[];
	shippingAddress: Address;
	billingAddress?: Address; // Optional, can use shipping address
}

export interface OrdersListResponse {
	orders: Order[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export interface OrderResponse {
	order: Order;
}

export interface ShareLinkApiError {
	message: string;
	code:
		| "ORDER_NOT_FOUND"
		| "CUSTOMER_NOT_FOUND"
		| "INVALID_STATUS"
		| "INSUFFICIENT_INVENTORY"
		| "PAYMENT_FAILED"
		| "SERVER_ERROR";
	status: number;
	correlationId: string;
}
