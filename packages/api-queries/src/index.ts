/**
 * @package api-queries
 *
 * TanStack Query hooks for API clients
 */

// Hook creators
export { createVismaSignHooks } from "./visma-sign";
export { createShareLinkHooks } from "./share-link";

// Utilities
export { unwrapResult } from "./utils";

// Re-export commonly used types from react-query-kit for convenience
export type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";

// Re-export API client types that are commonly used with hooks
export type {
	// Visma Sign API types
	CreateProductRequest,
	ProductResponse,
	ProductsListResponse,
	VismaSignApiError,
} from "@repo/api-clients/src/visma-sign-api/types";

export type {
	// Share Link API types
	CreateOrderRequest,
	OrderResponse,
	OrdersListResponse,
	ShareLinkApiError,
} from "@repo/api-clients/src/share-link-api/types";

// Re-export base types
export type { ApiResult } from "@repo/api-clients/src/types";
