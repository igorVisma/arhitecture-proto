/**
 * @package api-queries
 *
 * TanStack Query hooks for API clients
 */

// Export provider and context
export { ApiClientsProvider, useApiClients, useApiClient } from "./provider";
export type { ApiClientsContextType, ApiClientsProviderProps } from "./provider";

// Export Visma Sign hooks and query keys
export {
	useProducts,
	useCreateProduct,
	useProductsWithStates,
	useCreateProductWithStates,
	vismaSignQueryKeys,
} from "./visma-sign";

// Export Share Link hooks and query keys
export {
	useOrders,
	useCreateOrder,
	useOrdersWithStates,
	useCreateOrderWithStates,
	shareLinkQueryKeys,
} from "./share-link";

// Export User Service hooks and query keys
export { useUsers, useLogin, useUsersWithStates, useLoginWithStates, userServiceQueryKeys } from "./user-service";

// Export all query keys for easy access
export const queryKeys = {
	vismaSign: vismaSignQueryKeys,
	shareLink: shareLinkQueryKeys,
	userService: userServiceQueryKeys,
} as const;
