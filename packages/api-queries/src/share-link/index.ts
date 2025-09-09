import { ApiResult, ShareLinkApiClient } from "@repo/api-clients";
import { QueryClient } from "@tanstack/react-query";
import { createMutation, createQuery } from "react-query-kit";
import type { CreateOrderRequest, OrderResponse, OrdersListResponse, ShareLinkApiError } from "@repo/api-clients/src/share-link-api/types";
import { unwrapResult } from "../utils";

export const createShareLinkHooks = (shareLinkClient: ShareLinkApiClient, queryClient: QueryClient) => {


	const useGetOrders = createQuery<OrdersListResponse, void, ShareLinkApiError >({
		queryKey: ["orders"],
		fetcher: async () => unwrapResult(await shareLinkClient.orders.get()),
	});

	const useMutateOrder = createMutation<OrderResponse, CreateOrderRequest, ShareLinkApiError>({
		mutationKey: ["createOrder"],
		mutationFn: async (orderData) => unwrapResult(await shareLinkClient.orders.create(orderData)),
		onSuccess: () => {
			useGetOrders.getKey();
			queryClient.fetchQuery(useGetOrders.getFetchOptions());
		},
	});

	return {
		useGetOrders,
		useMutateOrder,
	};
};

// Fixed utility type to extract mutation types from API functions
type ApiFunctionToMutationType<T> = T extends (...args: infer Arguments) => Promise<ApiResult<infer ReturnType, infer ErrorType>> ? <ReturnType, ErrorType, Arguments> : never;
