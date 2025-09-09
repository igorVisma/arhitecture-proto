import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateOrderRequest, OrdersListResponse, OrderResponse, ShareLinkApiError } from "@repo/api-clients";
import { useApiClient } from "../provider";

/**
 * Query keys for Share Link API
 */
export const shareLinkQueryKeys = {
	all: ["share-link"] as const,
	orders: () => [...shareLinkQueryKeys.all, "orders"] as const,
	ordersList: (params?: URLSearchParams) => [...shareLinkQueryKeys.orders(), "list", params?.toString()] as const,
} as const;

/**
 * Hook to fetch orders with TanStack Query
 */
export function useOrders(params?: URLSearchParams) {
	const client = useApiClient("shareLinkApi");

	return useQuery({
		queryKey: shareLinkQueryKeys.ordersList(params),
		queryFn: async () => {
			const result = await client.orders.get(params);

			if (result.error) {
				throw new Error(result.error.message);
			}

			return result.data;
		},
	});
}

/**
 * Hook to create an order with TanStack Query
 */
export function useCreateOrder() {
	const client = useApiClient("shareLinkApi");
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (orderData: CreateOrderRequest) => {
			const result = await client.orders.create(orderData);

			if (result.error) {
				throw new Error(result.error.message);
			}

			return result.data;
		},
		onSuccess: () => {
			// Invalidate orders queries when a new order is created
			queryClient.invalidateQueries({
				queryKey: shareLinkQueryKeys.orders(),
			});
		},
	});
}

/**
 * Custom hook for orders with loading and error states
 */
export function useOrdersWithStates(params?: URLSearchParams) {
	const query = useOrders(params);

	return {
		orders: query.data?.orders || [],
		pagination: query.data?.pagination,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error?.message,
		refetch: query.refetch,
	};
}

/**
 * Custom hook for creating orders with loading states
 */
export function useCreateOrderWithStates() {
	const mutation = useCreateOrder();

	return {
		createOrder: mutation.mutate,
		createOrderAsync: mutation.mutateAsync,
		isCreating: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error?.message,
		reset: mutation.reset,
	};
}
