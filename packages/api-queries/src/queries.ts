import { VismaSignApiClient } from "@repo/api-clients";
import { QueryClient } from "@tanstack/react-query";
import { createMutation, createQuery } from "react-query-kit";
import type {
	CreateProductRequest,
	ProductResponse,
	ProductsListResponse,
	VismaSignApiError,
} from "@repo/api-clients/src/visma-sign-api/types";

const vismaSignQueryClient = new QueryClient();

const createVismaSignHooks = (vismaSignClient: VismaSignApiClient, queryClient: QueryClient) => {
	const useGetProducts = createQuery({
		queryKey: ["products"],
		fetcher: async () => {
			const { data, error } = await vismaSignClient.getProducts();
			if (error) {
				throw error;
			}
			return data;
		},
	});

	const useMutateProduct = createMutation<ProductResponse, CreateProductRequest, VismaSignApiError>({
		mutationKey: ["createProduct"],
		mutationFn: async (productData) => {
			const { data, error } = await vismaSignClient.createProduct(productData);
			if (error) {
				throw error;
			}
			return data;
		},
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
const { mutate, error } = vismaSignHooks.useMutateProduct({});
