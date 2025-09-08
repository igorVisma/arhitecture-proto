import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateProductRequest, ProductsListResponse, ProductResponse, VismaSignApiError } from "@repo/api-clients";
import { useApiClient } from "../provider";

/**
 * Query keys for Visma Sign API
 */
export const vismaSignQueryKeys = {
	all: ["visma-sign"] as const,
	products: () => [...vismaSignQueryKeys.all, "products"] as const,
	productsList: (params?: URLSearchParams) => [...vismaSignQueryKeys.products(), "list", params?.toString()] as const,
} as const;

/**
 * Hook to fetch products with TanStack Query
 */
export function useProducts(params?: URLSearchParams) {
	const client = useApiClient("vismaSignApi");

	return useQuery({
		queryKey: vismaSignQueryKeys.productsList(params),
		queryFn: async () => {
			const result = await client.getProducts(params);

			if (result.error) {
				throw new Error(result.error.message);
			}

			return result.data;
		},
	});
}

/**
 * Hook to create a product with TanStack Query
 */
export function useCreateProduct() {
	const client = useApiClient("vismaSignApi");
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (productData: CreateProductRequest) => {
			const result = await client.createProduct(productData);

			if (result.error) {
				throw new Error(result.error.message);
			}

			return result.data;
		},
		onSuccess: () => {
			// Invalidate products queries when a new product is created
			queryClient.invalidateQueries({
				queryKey: vismaSignQueryKeys.products(),
			});
		},
	});
}

/**
 * Custom hook for products with loading and error states
 */
export function useProductsWithStates(params?: URLSearchParams) {
	const query = useProducts(params);

	return {
		products: query.data?.products || [],
		total: query.data?.total || 0,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error?.message,
		refetch: query.refetch,
	};
}

/**
 * Custom hook for creating products with loading states
 */
export function useCreateProductWithStates() {
	const mutation = useCreateProduct();

	return {
		createProduct: mutation.mutate,
		createProductAsync: mutation.mutateAsync,
		isCreating: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error?.message,
		reset: mutation.reset,
	};
}
