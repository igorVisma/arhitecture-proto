/**
 * Example tests for API queries hooks
 * This shows how you would test the TanStack Query hooks
 */

import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { VismaSignApiClient, ShareLinkApiClient, UserServiceClient } from "@repo/api-clients";
import { ApiClientsProvider, useProducts, useCreateProduct } from "../src";
import React from "react";

// Mock API clients
const mockClients = {
	vismaSignApi: {
		getProducts: jest.fn(),
		createProduct: jest.fn(),
	} as any as VismaSignApiClient,
	shareLinkApi: {} as ShareLinkApiClient,
	userService: {} as UserServiceClient,
};

// Test wrapper
const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});

	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>
			<ApiClientsProvider clients={mockClients}>{children}</ApiClientsProvider>
		</QueryClientProvider>
	);
};

describe("useProducts", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch products successfully", async () => {
		const mockProducts = {
			products: [
				{ id: 1, name: "Product 1", price: 10 },
				{ id: 2, name: "Product 2", price: 20 },
			],
			total: 2,
			page: 1,
			limit: 10,
		};

		mockClients.vismaSignApi.getProducts.mockResolvedValue({
			data: mockProducts,
			error: null,
		});

		const { result } = renderHook(() => useProducts(), {
			wrapper: createWrapper(),
		});

		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data).toEqual(mockProducts);
		expect(mockClients.vismaSignApi.getProducts).toHaveBeenCalledWith(undefined);
	});

	it("should handle errors", async () => {
		mockClients.vismaSignApi.getProducts.mockResolvedValue({
			data: null,
			error: { message: "Network error", status: 500, code: "SERVER_ERROR" },
		});

		const { result } = renderHook(() => useProducts(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.error?.message).toBe("Network error");
	});
});

describe("useCreateProduct", () => {
	it("should create product successfully", async () => {
		const newProduct = {
			name: "Test Product",
			description: "Test",
			price: 50,
			category: "test",
		};

		const createdProduct = {
			product: { id: 1, ...newProduct, createdAt: "2024-01-01", updatedAt: "2024-01-01", inStock: true },
		};

		mockClients.vismaSignApi.createProduct.mockResolvedValue({
			data: createdProduct,
			error: null,
		});

		const { result } = renderHook(() => useCreateProduct(), {
			wrapper: createWrapper(),
		});

		result.current.mutate(newProduct);

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data).toEqual(createdProduct);
		expect(mockClients.vismaSignApi.createProduct).toHaveBeenCalledWith(newProduct);
	});
});
