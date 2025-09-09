import { QueryClient } from "@tanstack/react-query";
import { createShareLinkHooks } from "./share-link";
import { ShareLinkApiClient, VismaSignApiClient } from "@repo/api-clients";
import { createVismaSignHooks } from "./visma-sign";

const queryClient = new QueryClient();

const shareLinkApiClient = new ShareLinkApiClient({
	baseURL: "https://api.example.com",
});
const vismaSignApiClient = new VismaSignApiClient({
	baseURL: "https://api.example.com",
});

export const shareLinkHooks = createShareLinkHooks(shareLinkApiClient, queryClient);
export const vismaSignHooks = createVismaSignHooks(vismaSignApiClient, queryClient);

// Example usage

const { data: ordersData, error: ordersError } = shareLinkHooks.useGetOrders({});
const createMutateOrder = shareLinkHooks.useMutateOrder();

const { data: productsData, error: productsError } = vismaSignHooks.useGetProducts({});
const createMutateProduct = vismaSignHooks.useMutateProduct();
/**
 * Simple examples for API clients usage
 */
