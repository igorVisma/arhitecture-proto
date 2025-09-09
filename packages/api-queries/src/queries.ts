import { VismaSignApiClient } from "@repo/api-clients";
import { QueryClient } from "@tanstack/react-query";
import { createMutation, createQuery } from "react-query-kit";
import type {
	CreateProductRequest,
	ProductResponse,
	ProductsListResponse,
	VismaSignApiError,
} from "@repo/api-clients/src/visma-sign-api/types";
import { unwrapResult } from "./utils";

const vismaSignQueryClient = new QueryClient();

const createVismaSignHooks = (vismaSignClient: VismaSignApiClient, queryClient: QueryClient) => {
	const useGetProducts = createQuery({
		queryKey: ["products"],
		fetcher: async () => unwrapResult(await vismaSignClient.products.get()),
	});

	const useMutateProduct = createMutation<ProductResponse, CreateProductRequest, VismaSignApiError>({
		mutationKey: ["createProduct"],
		mutationFn: async (productData) => unwrapResult(await vismaSignClient.createProduct(productData)),
		onSuccess: () => {
			useGetProducts.getKey();
			queryClient.fetchQuery(useGetProducts.getFetchOptions());
		},
	});

	return {
		useGetProducts,
		useMutateProduct,
	};
};

const vismaSignHooks = createVismaSignHooks(new VismaSignApiClient({ baseURL: "1" }), vismaSignQueryClient);

const { data, error } = vismaSignHooks.useGetProducts({});
const createMutateProduct = vismaSignHooks.useMutateProduct();
