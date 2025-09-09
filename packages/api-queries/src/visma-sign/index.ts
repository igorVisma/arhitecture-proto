import { VismaSignApiClient } from "@repo/api-clients";
import { QueryClient } from "@tanstack/react-query";
import { createMutation, createQuery } from "react-query-kit";
import type {
	CreateProductRequest,
	ProductResponse,
	ProductsListResponse,
	VismaSignApiError,
} from "@repo/api-clients/src/visma-sign-api/types";
import { unwrapResult } from "../utils";

export const createVismaSignHooks = (vismaSignClient: VismaSignApiClient, queryClient: QueryClient) => {
	const useGetProducts = createQuery<ProductsListResponse, void, VismaSignApiError>({
		queryKey: ["products"],
		fetcher: async () => unwrapResult(await vismaSignClient.products.get()),
	});

	const useMutateProduct = createMutation<ProductResponse, CreateProductRequest, VismaSignApiError>({
		mutationKey: ["createProduct"],
		mutationFn: async (productData) => unwrapResult(await vismaSignClient.products.create(productData)),
	});

	return {
		useGetProducts,
		useMutateProduct,
	};
};
